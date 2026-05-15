import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconFilter, IconEdit } from '@tabler/icons-react';

const BlogsList = () => {
  const navigate = useNavigate();

  const filters = ['All', 'Pilgrimage', 'Char Dham', 'Festivals', 'Hill Treks', 'Solo Journey'];
  
  const blogs = [
    { id: 1, title: '12 sacred temples of South India', author: 'Anita Rao', time: '5 min read', tag: 'Pilgrimage', img: '#5dcaa5' },
    { id: 2, title: 'Best time to visit Kedarnath', author: 'Rahul M', time: '3 min read', tag: 'Char Dham', img: '#85b7eb' },
    { id: 3, title: 'Kumbh Mela — a beginner\'s guide', author: 'Vikram S', time: '7 min read', tag: 'Festivals', img: '#ef9f27' },
    { id: 4, title: 'A solo yatra through Vrindavan', author: 'Priya D', time: '4 min read', tag: 'User Story', img: '#c8a8e8' },
  ];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[70px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center justify-between border-b-[0.5px] border-borderSubtle">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-accentPurple">
            <IconArrowLeft size={24} stroke={1.5} />
          </button>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Yatra Blogs</h1>
        </div>
        <button className="text-accentPurple">
          <IconFilter size={20} stroke={1.5} />
        </button>
      </div>

      <div className="px-4 py-6">
        <h2 className="font-serif text-[21px] text-textPrimary mb-2">Stories from the sacred path</h2>
        <div className="flex items-center gap-3 text-[11px] text-[#7a5a8a] mb-6">
          <span>240+ Blogs</span>
          <span className="w-1 h-1 rounded-full bg-[#3a2a50]"></span>
          <span>1.2k Writers</span>
          <span className="w-1 h-1 rounded-full bg-[#3a2a50]"></span>
          <span>18k Reads</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mx-[-16px] px-4 mb-6">
          {filters.map((f, i) => (
            <button key={i} className={`px-3 py-1.5 rounded-full border-[0.5px] text-[11px] font-medium shrink-0 ${
              i === 0 ? 'bg-surfaceAccent border-borderActive text-accentPurpleBright' : 'bg-surface border-borderDefault text-textMuted'
            }`}>
              {f}
            </button>
          ))}
        </div>

        <div 
          className="bg-surface rounded-full border border-borderDefault p-2 pr-4 flex items-center gap-3 mb-8 cursor-pointer"
          onClick={() => navigate('/write-blog')}
        >
          <div className="w-8 h-8 rounded-full bg-[#2a1a42] text-accentPurpleBright flex items-center justify-center text-[10px] font-bold">You</div>
          <span className="text-[12px] text-textMuted flex-1">Share your yatra story…</span>
          <div className="flex items-center gap-1 text-accentPurpleBright text-[12px] font-medium">
            <IconEdit size={14} /> Write
          </div>
        </div>

        <div className="mb-8" onClick={() => navigate('/blog-detail')}>
          <div className="bg-surface rounded-[14px] border border-borderDefault overflow-hidden">
            <div className="h-[140px] bg-[#3a1f5a] flex items-center justify-center relative">
               <span className="text-[48px]" aria-hidden="true">🏔️</span>
               <div className="absolute top-3 left-3 bg-[#1a0a2e]/80 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-goldAmber font-bold tracking-wider">FEATURED</div>
            </div>
            <div className="p-4">
              <span className="text-accentPurple text-[9px] uppercase font-bold tracking-wider mb-1 block">Hill Treks</span>
              <h3 className="font-serif text-[18px] text-textPrimary leading-snug mb-2">The ultimate guide to Amarnath Yatra 2025</h3>
              <p className="text-[11px] text-textMuted line-clamp-2 mb-3">Prepare for the sacred journey with this comprehensive guide covering routes, physical preparation, and essential items to pack.</p>
              <div className="flex justify-between items-center text-[10px] text-[#7a5a8a]">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-borderDefault"></div>
                  <span>By Editorial Team</span>
                </div>
                <span>8 min read · 1.2k likes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {blogs.map((b) => (
            <div key={b.id} onClick={() => navigate('/blog-detail')} className="flex gap-3 bg-surface rounded-[12px] border border-borderDefault p-3 cursor-pointer">
              <div className="w-[54px] h-[54px] rounded-[8px] opacity-40 shrink-0" style={{ backgroundColor: b.img }}></div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-accentPurple text-[9px] uppercase font-bold tracking-wider mb-0.5">{b.tag}</span>
                <h4 className="text-[13px] text-textPrimary font-medium leading-tight mb-1">{b.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-textMuted">
                  <span>{b.author}</span>
                  <span>{b.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsList;
