import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1000);
  };

  if (status === 'success') {
    return (
      <div className="p-6 bg-green-50 text-green-700 rounded-lg border border-green-200 text-center">
        <h3 className="font-bold text-lg mb-2">Form Submitted Successfully!</h3>
        <p>We will get back to you soon.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline font-medium"
        >
          Fill another form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-xl text-gray-800 border-b pb-2 mb-4">Form Fillup / Contact Us</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
          <input 
            required
            type="text" 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email Address</label>
          <input 
            required
            type="email" 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone Number</label>
        <input 
          required
          type="tel" 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Your mobile number"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Message / Query</label>
        <textarea 
          required
          rows={4}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <button 
        disabled={status === 'submitting'}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting...' : (
          <>
            <Send size={18} />
            Submit Details
          </>
        )}
      </button>
    </form>
  );
};
