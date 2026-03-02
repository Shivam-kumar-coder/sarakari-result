import React from 'react';
import { MessageCircle, Bell, ArrowRight } from 'lucide-react';

export const WhatsAppJoin = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <MessageCircle size={32} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Join WhatsApp Group</h3>
            <p className="text-green-50 opacity-90 text-sm">Get instant job alerts directly on your phone!</p>
          </div>
        </div>
        
        <a 
          href="https://chat.whatsapp.com/IxNy4YHVf6KBOJwbWIrlfF?mode=hqctswa" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-green-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-50 transition-colors shadow-md whitespace-nowrap"
        >
          Join Now <ArrowRight size={18} />
        </a>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
    </div>
  );
};

export const TelegramJoin = () => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group mt-4">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <Bell size={32} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Join Telegram Channel</h3>
            <p className="text-sky-50 opacity-90 text-sm">Never miss an update. Join 50k+ students.</p>
          </div>
        </div>
        
        <a 
          href="https://t.me/your-channel-link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-sky-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-sky-50 transition-colors shadow-md whitespace-nowrap"
        >
          Join Channel <ArrowRight size={18} />
        </a>
      </div>
      
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
    </div>
  );
};
