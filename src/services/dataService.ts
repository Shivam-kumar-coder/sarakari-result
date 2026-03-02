
export interface JobData {
  id: string;
  category: 'Result' | 'Admit Card' | 'Latest Job' | 'Answer Key' | 'Syllabus' | 'Admission' | 'Certificate Verification' | 'Important';
  title: string;
  link: string;
  postDate: string;
  shortInfo: string;
  details?: string;
  applicationFee?: string;
  ageLimit?: string;
  eligibility?: string;
  importantDates?: string;
  vacancyDetails?: string;
  howToFill?: string;
  extraInfo?: string;
}

// Mock data for initial development
export const mockJobs: JobData[] = [
  {
    id: '1',
    category: 'Latest Job',
    title: 'SSC CGL 2024 Online Form',
    link: 'https://www.sarkariresult.com',
    postDate: '2024-03-01',
    shortInfo: 'Staff Selection Commission (SSC) has released the Combined Graduate Level CGL Exam 2024. Those candidates who are interested in this SSC CGL 2024 recruitment can apply online.',
    applicationFee: '• General / OBC / EWS : 100/-\n• SC / ST / PH : 0/-\n• All Category Female : 0/-\n• Pay the Examination Fee Through Debit Card, Credit Card, Net Banking or E Challan Fee Mode Only.',
    ageLimit: '• Minimum Age : 18 Years.\n• Maximum Age : 27-32 Years (Post Wise).\n• Age Relaxation Extra as per SSC Combined Graduate Level Exam 2024 Recruitment Rules.',
    eligibility: '• Bachelor Degree in Any Stream from Any Recognized University in India.\n• For Post Wise Eligibility Details Read the Notification.',
    importantDates: '• Application Begin : 24/06/2024\n• Last Date for Apply Online : 24/07/2024\n• Last Date Pay Exam Fee : 25/07/2024\n• Correction Date : 10-11 August 2024\n• Exam Date Tier I : Sept/Oct 2024',
    vacancyDetails: 'Total Posts: 17727 (Approx)',
    howToFill: '• Staff Selection Commission SSC Are Released Combined Graduate Level CGL Recruitment 2024. Candidate Can Apply Between 24/06/2024 to 24/07/2024.\n• Candidate Read the Notification Before Apply the Recruitment Application Form in SSC CGL 2024.\n• Kindly Check and Collect the All Document - Eligibility, ID Proof, Address Details, Basic Details.\n• Kindly Ready Scan Document Related to Recruitment Form - Photo, Sign, ID Proof, Etc.\n• Before Submit the Application Form Must Check the Preview and All Column Carefully.\n• Take A Print Out of Final Submitted Form.',
    extraInfo: 'The Staff Selection Commission will hold the Combined Graduate Level Examination, 2024 for filling up of various Group ‘B’ and Group ‘C’ posts in different Ministries/ Departments/ Organizations of Government of India and various Statutory/ Bodies/ Authorities/ Tribunals, etc.'
  },
  {
    id: '2',
    category: 'Result',
    title: 'UP Police Constable Result 2024',
    link: 'https://www.sarkariresult.com',
    postDate: '2024-02-28',
    shortInfo: 'Uttar Pradesh Recruitment and Promotion Board (UPPRPB) has declared the result for Constable posts. Candidates can check their result using the link below.',
    eligibility: '• 10+2 Intermediate Exam in Any Recognized Board in India.',
    vacancyDetails: '60244 Posts',
    extraInfo: 'UPPRPB Constable Recruitment 2023-24 Result has been announced. Candidates who appeared in the written exam can now download their result and check their status for the next stage of recruitment.'
  },
  {
    id: '3',
    category: 'Admit Card',
    title: 'UPSC Civil Services Admit Card 2024',
    link: 'https://www.sarkariresult.com',
    postDate: '2024-02-25',
    shortInfo: 'Union Public Service Commission (UPSC) has released the admit card for Prelims 2024. Download your hall ticket now.',
    eligibility: '• Bachelor Degree in Any Stream.',
    importantDates: '• Exam Date : 16/06/2024\n• Admit Card Available : 07/06/2024',
    howToFill: '• Visit the official UPSC website.\n• Click on the Civil Services Admit Card link.\n• Enter your Registration ID or Roll Number.\n• Download and print the admit card.',
    extraInfo: 'The UPSC Civil Services Examination is conducted in three stages: Preliminary, Main, and Interview. The Preliminary exam is the first step towards joining the prestigious Indian Administrative Service (IAS), Indian Foreign Service (IFS), and Indian Police Service (IPS).'
  }
];

export async function fetchSheetData(sheetId: string): Promise<JobData[]> {
  if (!sheetId) return mockJobs;
  
  try {
    // Add a timestamp to bypass browser cache for "auto-refresh" effect
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&t=${Date.now()}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const csvText = await response.text();
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length <= 1) return mockJobs;

    const data: JobData[] = lines.slice(1).map((line, index) => {
      // Simple CSV parser that handles basic commas
      // For more complex CSVs, a library like papaparse would be better
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
      
      return {
        id: values[0] || String(index),
        category: (values[1] as any) || 'Latest Job',
        title: values[2] || 'Untitled',
        link: values[3] || '#',
        postDate: values[4] || new Date().toLocaleDateString(),
        shortInfo: values[5] || '',
        applicationFee: values[6] || '',
        ageLimit: values[7] || '',
        eligibility: values[8] || '',
        importantDates: values[9] || '',
        vacancyDetails: values[10] || '',
        howToFill: values[11] || '',
        extraInfo: values[12] || ''
      };
    });

    return data.length > 0 ? data : mockJobs;
  } catch (e) {
    console.error("Error fetching sheet data", e);
    return mockJobs;
  }
}
