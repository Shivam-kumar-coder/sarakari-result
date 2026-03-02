
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import Fuse from 'fuse.js';
import { 
  Home, 
  FileText, 
  CreditCard, 
  Briefcase, 
  Search, 
  Menu, 
  X, 
  ArrowLeft,
  Calendar,
  Info,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { mockJobs, JobData, fetchSheetData } from './services/dataService';
import { ContactForm } from './components/ContactForm';
import { ShareSection } from './components/ShareSection';

import { WhatsAppJoin, TelegramJoin } from './components/SocialJoin';

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white w-12 h-12 flex items-center justify-center rounded-xl font-black text-2xl shadow-lg shadow-blue-200">SR</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tighter text-gray-900 leading-none">
                  SARKARI<span className="text-red-600">RESULT</span>
                </span>
                <div className="hidden sm:flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                  <span className="text-[8px] font-black text-red-600 uppercase tracking-tighter">Live</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Official Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-colors">
              <Home size={16} /> Home
            </Link>
            <Link to="/latest-jobs" className="text-gray-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide transition-colors">Latest Jobs</Link>
            <Link to="/results" className="text-gray-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide transition-colors">Results</Link>
            <Link to="/admit-cards" className="text-gray-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide transition-colors">Admit Card</Link>
            <Link to="/contact" className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-blue-700 transition-all shadow-md shadow-blue-100">Contact</Link>
          </nav>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link onClick={() => setIsMenuOpen(false)} to="/" className="block text-gray-600 font-medium">Home</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/latest-jobs" className="block text-gray-600 font-medium">Latest Jobs</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/results" className="block text-gray-600 font-medium">Results</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/admit-cards" className="block text-gray-600 font-medium">Admit Card</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="block text-gray-600 font-medium">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-white font-bold text-lg mb-4 italic">Sarkari Result Clone</h3>
        <p className="text-sm">Providing latest updates on government jobs, results, and admit cards. All information is gathered from official sources.</p>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          <li><Link to="/latest-jobs" className="hover:text-white">Latest Jobs</Link></li>
          <li><Link to="/results" className="hover:text-white">Results</Link></li>
          <li><Link to="/admit-cards" className="hover:text-white">Admit Card</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
        <p className="text-sm">Email: support@sarkariresultclone.com</p>
        <p className="text-sm mt-2">Follow us on social media for instant updates.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">
      &copy; {new Date().getFullYear()} Sarkari Result Clone. All Rights Reserved.
    </div>
  </footer>
);

const GridSection = ({ title, items, colorClass, icon: Icon }: { title: string, items: JobData[], colorClass: string, icon: any }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className={`${colorClass} px-5 py-4 flex items-center justify-between`}>
      <div className="flex items-center gap-2 text-white">
        <Icon size={20} />
        <h2 className="font-black uppercase tracking-tight text-lg">{title}</h2>
      </div>
      <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
        {items.length} Updates
      </span>
    </div>
    <div className="divide-y divide-gray-50">
      {items.slice(0, 5).map((item) => (
        <Link 
          key={item.id} 
          to={`/details/${item.id}`}
          className="block p-4 hover:bg-blue-50/50 transition-colors group"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2">{item.title}</span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.postDate}</span>
              {item.vacancyDetails && (
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">{item.vacancyDetails}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
      {items.length === 0 && (
        <div className="p-8 text-center text-gray-400 text-sm italic">No updates available</div>
      )}
    </div>
    <Link to={`/${title.toLowerCase().replace(' ', '-')}`} className="block p-4 bg-gray-50 text-center text-xs font-black text-gray-500 hover:text-blue-600 uppercase tracking-widest transition-colors border-t border-gray-100">
      View All {title}
    </Link>
  </div>
);

// --- Pages ---

const HomePage = ({ jobs }: { jobs: JobData[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const fuse = new Fuse(jobs, {
    keys: ['title', 'category', 'shortInfo'],
    threshold: 0.4,
    distance: 100,
  });

  const searchResults = searchQuery 
    ? fuse.search(searchQuery).map(result => result.item)
    : jobs;

  const suggestions = searchQuery 
    ? fuse.search(searchQuery).slice(0, 8).map(result => result.item)
    : [];

  const latestJobs = searchResults.filter(j => j.category === 'Latest Job');
  const results = searchResults.filter(j => j.category === 'Result');
  const admitCards = searchResults.filter(j => j.category === 'Admit Card');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Helmet>
        <title>Sarkari Result - Latest Jobs, Admit Card, Results</title>
        <meta name="description" content="Sarkari Result - Get latest updates on Sarkari Results, Latest Jobs, Admit Cards, Syllabus, Answer Keys and Admissions. Official portal for government job seekers." />
      </Helmet>
      
      {/* Official Banner - Full width */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 p-4 md:p-6 text-center shadow-md w-full rounded-lg">
        <h1 className="text-2xl md:text-4xl font-black text-blue-900 tracking-tighter uppercase">Sarkari Result</h1>
        <p className="text-red-600 font-black text-lg md:text-xl uppercase tracking-widest">www.sarkariresult.com</p>
        <div className="w-16 h-0.5 bg-red-500 mx-auto my-2"></div>
        <p className="text-gray-700 font-bold text-sm md:text-base">Official Portal for Latest Jobs, Results, and Admit Cards</p>
      </div>

      {/* Search Bar with Suggestions */}
      <div className="relative max-w-xl mx-auto" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Jobs, Results, Admit Cards..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full border-2 border-blue-800 p-3 pl-10 rounded-full font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-800" size={20} />
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-[60] w-full mt-2 bg-white border-2 border-blue-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="max-h-[400px] overflow-y-auto">
                {suggestions.map((job) => (
                  <Link
                    key={job.id}
                    to={`/details/${job.id}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 p-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors group"
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      job.category === 'Latest Job' ? 'bg-red-500' : 
                      job.category === 'Result' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-gray-800 group-hover:text-blue-700 truncate">
                        {job.title}
                      </span>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                        {job.category} • {job.postDate}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Showing top {suggestions.length} results
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Marquee Area */}
      <div id="updates" className="bg-white border-2 border-gray-300 py-2 overflow-hidden whitespace-nowrap shadow-sm flex items-center">
        <div className="bg-red-600 text-white px-4 py-1 font-black text-xs uppercase tracking-widest ml-4 rounded z-10 shadow-md">Updates</div>
        <div className="animate-marquee inline-block">
          <a 
            href="https://chat.whatsapp.com/your-group-id" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mx-8 font-black text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
          >
            <MessageCircle size={14} /> Join Our WhatsApp Group For Latest Updates! <span className="text-red-500 ml-1">New!</span>
          </a>
          {jobs.slice(0, 10).map(j => (
            <Link key={j.id} to={`/details/${j.id}`} className="mx-8 font-bold text-sm text-blue-700 hover:text-red-600 transition-colors">
              {j.title} <span className="text-red-500 ml-1">New!</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GridSection title="Results" items={results} colorClass="bg-green-700" icon={FileText} />
        <GridSection title="Admit Card" items={admitCards} colorClass="bg-blue-700" icon={CreditCard} />
        <GridSection title="Latest Jobs" items={latestJobs} colorClass="bg-red-700" icon={Briefcase} />
      </div>

      {/* Useful Links Section - Full Width with bigger box */}
      <div className="bg-white border-2 border-gray-300 p-6 shadow-sm w-full">
        <h3 className="text-blue-800 font-black text-xl uppercase border-b-2 border-gray-200 pb-3 mb-4">Useful Links & Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-base font-bold">
          <Link to="/syllabus" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Exam Syllabus
          </Link>
          <Link to="/answer-key" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span> Answer Keys
          </Link>
          <Link to="/admission" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-purple-600 rounded-full"></span> Admission Form
          </Link>
          <Link to="/important" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span> Important Links
          </Link>
          <Link to="/certificate" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-yellow-600 rounded-full"></span> Certificate Verification
          </Link>
          <Link to="/pan-card" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-orange-600 rounded-full"></span> PAN Card Online
          </Link>
          <Link to="/voter-id" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> Voter ID Online
          </Link>
          <Link to="/contact" className="text-blue-700 hover:underline hover:text-blue-900 transition-colors flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-pink-600 rounded-full"></span> Contact Us
          </Link>
        </div>
      </div>

      {/* Additional Sections - With 5 items limit */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Answer Key', 'Syllabus', 'Admission', 'Important'].map((cat) => (
          <div key={cat} className="bg-white border-2 border-gray-300 overflow-hidden shadow-sm">
            <h3 className="bg-gray-800 text-white font-black uppercase tracking-widest text-sm p-3 text-center">{cat}</h3>
            <div className="p-4 space-y-3">
              {jobs.filter(j => j.category === cat).slice(0, 5).map(item => (
                <Link key={item.id} to={`/details/${item.id}`} className="block text-sm font-bold text-blue-700 hover:underline truncate border-b border-gray-100 pb-2 last:border-0">
                  {item.title}
                </Link>
              ))}
              <Link to={`/${cat.toLowerCase()}`} className="block text-xs font-black text-gray-500 uppercase mt-3 text-center hover:text-blue-600 transition-colors bg-gray-50 py-2 rounded">
                View All {cat} &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp and Telegram together at bottom */}
      <div className="mt-8 space-y-4">
        <WhatsAppJoin />
        <TelegramJoin />
      </div>
    </motion.div>
  );
};

const DetailPage = ({ jobs }: { jobs: JobData[] }) => {
  const { id } = useParams();
  const job = jobs.find(j => j.id === id);
  const [showForm, setShowForm] = useState(false);

  if (!job) return <div className="text-center py-20">Job not found</div>;

  // Proper URL generate karne ka function
  const getApplyLink = () => {
    if (job.link && job.link !== '#' && job.link !== '') {
      if (job.link.startsWith('http://') || job.link.startsWith('https://')) {
        return job.link;
      }
      return `https://${job.link}`;
    }
    return 'https://www.sarkariresult.com';
  };

  const applyLink = getApplyLink();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <Helmet>
        <title>{job.title} - Sarkari Result 2024</title>
        <meta name="description" content={job.shortInfo} />
      </Helmet>
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline font-bold text-sm uppercase mb-2">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="bg-white border-2 border-gray-300 p-4 md:p-8 space-y-6 shadow-sm">
        {/* Post Header */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="text-red-700 font-bold min-w-[100px]">Post:</span>
            <h1 className="text-blue-800 font-bold text-lg md:text-xl">{job.title}</h1>
          </div>
          <div className="flex gap-2">
            <span className="text-red-700 font-bold min-w-[100px]">Post Date / Update:</span>
            <span className="text-gray-800 font-medium">{job.postDate}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-red-700 font-bold min-w-[100px]">Short Information:</span>
            <p className="text-gray-800 leading-relaxed">{job.shortInfo}</p>
          </div>
        </div>

        {/* Sarkari Style Table */}
        <div className="border-2 border-gray-400 text-center overflow-hidden">
          <div className="p-4 space-y-2 border-b-2 border-gray-400">
            <h2 className="text-pink-600 font-black text-xl uppercase leading-tight">Central Board of Secondary Education (CBSE)</h2>
            <h3 className="text-green-700 font-black text-lg uppercase leading-tight">{job.title}</h3>
            <p className="text-pink-600 font-bold text-sm uppercase tracking-wider">{job.category} : Short Details of Notification</p>
            <p className="text-red-600 font-black text-lg">WWW.SARKARIRESULT.COM</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-400">
            {/* Important Dates */}
            <div className="p-4 text-left">
              <h4 className="text-green-700 font-black text-center text-lg mb-4 underline">Important Dates</h4>
              <div className="text-sm font-bold space-y-2 whitespace-pre-line">
                {job.importantDates || "• Application Begin : Notified Soon\n• Last Date : Notified Soon"}
              </div>
            </div>

            {/* Application Fee */}
            <div className="p-4 text-left">
              <h4 className="text-green-700 font-black text-center text-lg mb-4 underline">Application Fee</h4>
              <div className="text-sm font-bold space-y-2 whitespace-pre-line">
                {job.applicationFee || "• General / OBC / EWS : 0/-\n• SC / ST / PH : 0/-"}
              </div>
            </div>
          </div>

          {/* Vacancy Details */}
          {job.vacancyDetails && (
            <div className="border-t-2 border-gray-400 p-4">
              <h4 className="text-pink-600 font-black text-lg uppercase mb-2">Vacancy Details</h4>
              <p className="text-sm font-bold text-gray-800">{job.vacancyDetails}</p>
            </div>
          )}

          {/* Age Limit */}
          {job.ageLimit && (
            <div className="border-t-2 border-gray-400 p-4">
              <h4 className="text-pink-600 font-black text-lg uppercase mb-2">Age Limit Details</h4>
              <p className="text-sm font-bold text-gray-800 whitespace-pre-line">{job.ageLimit}</p>
            </div>
          )}

          {/* Eligibility Section */}
          <div className="border-t-2 border-gray-400">
            <div className="bg-gray-50 py-2 border-b-2 border-gray-400">
              <h4 className="text-pink-600 font-black text-lg uppercase">Eligibility Details</h4>
            </div>
            <div className="p-6 text-left">
              <div className="text-sm font-bold text-gray-800 leading-relaxed whitespace-pre-line">
                {job.eligibility || "1. Senior Secondary (or its equivalent) with at least 50% marks.\n2. More Eligibility Details Read the Notification."}
              </div>
            </div>
          </div>

          {/* How to Fill Section */}
          <div className="border-t-2 border-gray-400">
            <div className="bg-gray-50 py-2 border-b-2 border-gray-400">
              <h4 className="text-pink-600 font-black text-lg uppercase">How to Fill {job.title} Online Form</h4>
            </div>
            <div className="p-6 text-left">
              <div className="text-sm font-bold text-gray-800 leading-relaxed whitespace-pre-line">
                {job.howToFill || "• Read the Notification Before Apply the Recruitment Application Form.\n• Kindly Check and Collect the All Document - Eligibility, ID Proof, Address Details, Basic Details.\n• Kindly Ready Scan Document Related to Recruitment Form - Photo, Sign, ID Proof, Etc.\n• Before Submit the Application Form Must Check the Preview and All Column Carefully.\n• Take A Print Out of Final Submitted Form."}
              </div>
            </div>
          </div>

          {/* Extra Info Section */}
          {job.extraInfo && (
            <div className="border-t-2 border-gray-400 p-6 text-left">
              <h4 className="text-pink-600 font-black text-lg uppercase mb-4 text-center">Additional Information</h4>
              <p className="text-sm font-bold text-gray-800 leading-relaxed">{job.extraInfo}</p>
            </div>
          )}
        </div>

        {/* Important Links Section */}
        <div className="border-2 border-gray-400">
          <div className="bg-gray-100 py-3 text-center border-b-2 border-gray-400">
            <h2 className="text-pink-600 font-black text-xl uppercase">How to Fill / Important Links</h2>
          </div>
          <div className="divide-y-2 divide-gray-400">
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 items-center">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
                <a 
                  href={applyLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-black px-6 py-3 rounded text-sm uppercase tracking-widest flex items-center gap-2 shadow-md w-full md:w-auto justify-center transition-all hover:scale-105"
                  onClick={(e) => {
                    if (applyLink === 'https://www.sarkariresult.com') {
                      console.log('Using default link');
                    }
                  }}
                >
                  Apply Online <ExternalLink size={16} />
                </a>
                <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded text-sm uppercase tracking-widest flex items-center gap-2 shadow-md w-full md:w-auto justify-center transition-all hover:scale-105"
                >
                  {showForm ? "Close Form" : "Form Fillup Request"} <Search size={16} />
                </button>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-gray-500 italic">Click "Form Fillup" if you want us to fill your application form.</p>
              </div>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-gray-50"
                >
                  <div className="p-6">
                    <ContactForm />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href={applyLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 font-bold hover:underline flex items-center gap-2 justify-center md:justify-start transition-colors"
              >
                <FileText size={16} /> Download Official Notification
              </a>
              <a 
                href="https://www.sarkariresult.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 font-bold hover:underline flex items-center gap-2 justify-center md:justify-start transition-colors"
              >
                <Home size={16} /> Official Website
              </a>
            </div>
          </div>
        </div>

        <ShareSection title={job.title} />
        
        {/* WhatsApp and Telegram together at bottom of detail page */}
        <div className="space-y-4 mt-6">
          <WhatsAppJoin />
          <TelegramJoin />
        </div>
      </div>
    </motion.div>
  );
};

const CategoryPage = ({ jobs, category }: { jobs: JobData[], category: string }) => {
  const filteredJobs = jobs.filter(j => j.category.toLowerCase() === category.toLowerCase());

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Helmet>
        <title>{category} Updates 2024 - Sarkari Result</title>
        <meta name="description" content={`Get latest ${category} updates, notifications, and results on Sarkari Result official portal.`} />
      </Helmet>
      <div className="bg-white border-2 border-gray-300 p-4 shadow-sm">
        <h1 className="text-2xl font-black text-blue-800 uppercase border-b-2 border-gray-200 pb-2 mb-4">
          {category} Updates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.slice(0, 10).map(job => (
            <Link 
              key={job.id} 
              to={`/details/${job.id}`} 
              className="block p-3 border border-gray-200 hover:bg-gray-50 transition-colors rounded shadow-sm"
            >
              <h3 className="text-blue-700 font-bold hover:underline">{job.title}</h3>
              <p className="text-xs text-gray-500 mt-1">Posted on: {job.postDate}</p>
            </Link>
          ))}
          {filteredJobs.length === 0 && (
            <p className="text-gray-500 italic">No updates available for this category yet.</p>
          )}
        </div>
      </div>
      
      {/* WhatsApp and Telegram together at bottom of category page */}
      <div className="mt-8 space-y-4">
        <WhatsAppJoin />
        <TelegramJoin />
      </div>
    </motion.div>
  );
};

const ContactPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-3xl mx-auto space-y-8 py-12"
  >
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Contact Us</h1>
      <p className="text-gray-500 text-lg">Have questions? We're here to help you navigate your career path.</p>
    </div>
    <ContactForm />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WhatsAppJoin />
      <TelegramJoin />
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [jobs, setJobs] = useState<JobData[]>(mockJobs);
  const [loading, setLoading] = useState(true);
  
  const SHEET_ID = (import.meta as any).env?.VITE_GOOGLE_SHEET_ID || '';

  const loadData = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    const data = await fetchSheetData(SHEET_ID);
    setJobs(data);
    setLoading(false);
  }, [SHEET_ID]);

  useEffect(() => {
    loadData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      loadData(false);
    }, 5 * 60 * 1000);

    // Refresh on window focus for "real-time" feel
    const handleFocus = () => loadData(false);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadData]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage jobs={jobs} />} />
                <Route path="/details/:id" element={<DetailPage jobs={jobs} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/latest-jobs" element={<CategoryPage jobs={jobs} category="Latest Job" />} />
                <Route path="/results" element={<CategoryPage jobs={jobs} category="Result" />} />
                <Route path="/admit-card" element={<CategoryPage jobs={jobs} category="Admit Card" />} />
                <Route path="/admit-cards" element={<CategoryPage jobs={jobs} category="Admit Card" />} />
                <Route path="/syllabus" element={<CategoryPage jobs={jobs} category="Syllabus" />} />
                <Route path="/answer-key" element={<CategoryPage jobs={jobs} category="Answer Key" />} />
                <Route path="/admission" element={<CategoryPage jobs={jobs} category="Admission" />} />
                <Route path="/important" element={<CategoryPage jobs={jobs} category="Important" />} />
                <Route path="/certificate" element={<CategoryPage jobs={jobs} category="Certificate Verification" />} />
                <Route path="*" element={<div className="text-center py-20">Page not found</div>} />
              </Routes>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
