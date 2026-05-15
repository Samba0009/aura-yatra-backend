import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconBold, IconItalic, IconUnderline, IconH1, IconList, IconQuote, IconPhoto, IconLink, IconUpload, IconChevronDown, IconSend } from '@tabler/icons-react';

const WriteBlog = () => {
  const navigate = useNavigate();

  const toolbar = [
    <IconBold size={16} />, <IconItalic size={16} />, <IconUnderline size={16} />, 
    <IconH1 size={16} />, <IconList size={16} />, <IconQuote size={16} />, 
    <IconPhoto size={16} />, <IconLink size={16} />
  ];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[100px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center justify-between border-b-[0.5px] border-borderSubtle">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-accentPurple">
            <IconArrowLeft size={24} stroke={1.5} />
          </button>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Write a Blog</h1>
        </div>
      </div>

      <div className="bg-surfaceElevated px-4 py-2 border-b-[0.5px] border-borderSubtle overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max text-textMuted">
          {toolbar.map((icon, i) => (
            <button key={i} className="hover:text-accentPurpleBright transition-colors p-1">
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="w-full h-[120px] rounded-[12px] border border-dashed border-borderActive bg-surface flex flex-col items-center justify-center cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-surfaceAccent flex items-center justify-center text-accentPurple mb-2">
            <IconUpload size={20} />
          </div>
          <p className="text-[11px] text-textPrimary font-medium">Add Cover Photo</p>
          <p className="text-[9px] text-textMuted">JPG, PNG (Max 5MB)</p>
        </div>

        <div className="bg-surface border border-borderDefault rounded-[10px] px-3 py-2">
          <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Blog Title</label>
          <input type="text" placeholder="A catchy title for your yatra" className="w-full bg-transparent text-textPrimary text-[14px] outline-none font-serif" />
        </div>

        <div className="bg-surface border border-borderDefault rounded-[10px] px-3 py-2">
          <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Destination</label>
          <input type="text" placeholder="Where did you go?" className="w-full bg-transparent text-textPrimary text-[13px] outline-none" />
        </div>

        <div className="bg-surface border border-borderDefault rounded-[10px] px-3 py-2">
          <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Your Story</label>
          <textarea 
            placeholder="Share your experience, tips, and moments..." 
            className="w-full bg-transparent text-[#c8a8e8] text-[13px] outline-none min-h-[120px] resize-none leading-[1.6]"
          ></textarea>
        </div>

        <div>
          <label className="block text-textMuted text-[9px] uppercase font-bold mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-surfaceAccent rounded border-[0.5px] border-borderActive text-accentPurpleBright text-[11px]">Pilgrimage</span>
            <span className="px-3 py-1.5 bg-surfaceAccent rounded border-[0.5px] border-borderActive text-accentPurpleBright text-[11px]">User Story</span>
            <button className="px-3 py-1.5 rounded border border-dashed border-borderDefault text-textMuted text-[11px] flex items-center gap-1">
              + Add tag
            </button>
          </div>
        </div>

        <div className="bg-surface border border-borderDefault rounded-[10px] px-3 py-2 flex items-center justify-between mt-2">
          <div>
            <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Visibility</label>
            <p className="text-textPrimary text-[13px]">Public</p>
          </div>
          <IconChevronDown size={18} className="text-textMuted" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bgBase border-t-[0.5px] border-borderSubtle max-w-[320px] mx-auto z-50 flex gap-3">
        <button className="flex-[0.6] py-3.5 border border-borderDefault rounded-[10px] text-textMuted font-medium text-[13px]">
          Save Draft
        </button>
        <button 
          onClick={() => navigate('/blogs')}
          className="flex-1 py-3.5 bg-accentPurpleDeep rounded-[10px] text-textPrimary font-medium text-[13px] shadow-[0_4px_14px_rgba(58,31,90,0.3)] flex justify-center items-center gap-2"
        >
          Publish <IconSend size={14} />
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
