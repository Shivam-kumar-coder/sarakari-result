import React from 'react';
import { Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';

export const ShareSection = ({ title }: { title: string }) => {
  const shareUrl = window.location.href;
  const shareText = `Check out this update: ${title}`;

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={18} />,
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      color: 'bg-sky-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    }
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold">
        <Share2 size={20} />
        <span>Share this Page</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity`}
          >
            {link.icon}
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};
