import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import NavPillsRow from '../components/home/NavPillsRow';
import ExploreGrid from '../components/home/ExploreGrid';
import BlogScroll from '../components/home/BlogScroll';
import ReviewScroll from '../components/home/ReviewScroll';
import { IconChevronRight, IconMapPin, IconSparkles, IconBulb } from '@tabler/icons-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-bgBase flex flex-col font-sans pb-[100px]">
      <HeroSection />
      
      {/* Navigation Pills */}
      <NavPillsRow />
      
      <div className="flex-1 w-full relative z-10">
        {/* Surprise Me - Featured Destination */}
        <div className="px-6 py-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-[24px] text-textPrimary font-semibold">Surprise Me</h2>
            <p className="text-textMuted text-[12px]">Min. 10 pax • Hyderabad</p>
          </div>
          
          <div 
            onClick={() => navigate('/plan-detail')}
            className="group relative h-[240px] rounded-[24px] overflow-hidden cursor-pointer shadow-lg"
          >
            <img 
              src="/assets/hero_temple_cinematic_1778623906123.png" 
              alt="Varanasi Ghats" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider w-fit">
                TRENDING DESTINATION
              </span>
              <h3 className="font-serif text-[32px] text-white font-bold mb-2">Varanasi Ghats</h3>
              <p className="text-zinc-300 text-[14px] mb-4">Experience the divine evening aarti</p>
            </div>
          </div>
        </div>

        {/* Guide My Yatra Card */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div 
            onClick={() => navigate('/guide-my-yatra')}
            className="group bg-gradient-to-r from-accentPurple/20 to-accentPurpleDeep/20 border border-accentPurple/30 rounded-[24px] p-8 cursor-pointer hover:border-accentPurple/60 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-[24px] text-white font-bold mb-2">Guide My Yatra</h3>
                <p className="text-textMuted text-[14px]">Find yatras tailored for you!</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accentPurple/30 flex items-center justify-center group-hover:bg-accentPurple/50 transition-colors">
                <IconChevronRight size={20} className="text-accentPurple" />
              </div>
            </div>
          </div>
        </div>

        {/* Tell Us & We Curate Cards */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surfaceElevated border border-borderDefault rounded-[24px] p-6 cursor-pointer hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accentPurple/20 flex items-center justify-center mb-4">
                <IconBulb size={20} className="text-accentPurple" />
              </div>
              <h3 className="font-serif text-[18px] text-white font-bold mb-1">Tell Us</h3>
              <p className="text-textMuted text-[12px]">Share your requirements</p>
            </div>

            <div className="bg-surfaceElevated border border-borderDefault rounded-[24px] p-6 cursor-pointer hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accentPurple/20 flex items-center justify-center mb-4">
                <IconSparkles size={20} className="text-accentPurple" />
              </div>
              <h3 className="font-serif text-[18px] text-white font-bold mb-1">We Curate</h3>
              <p className="text-textMuted text-[12px]">Get curated yatra options</p>
            </div>
          </div>
        </div>

        {/* Explore More */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <h2 className="font-serif text-[24px] text-textPrimary font-semibold mb-6">Explore More</h2>
          <ExploreGrid />
        </div>
        
        {/* Yatra Blogs */}
        <BlogScroll />
        
        {/* Traveller Stories */}
        <ReviewScroll />
      </div>
    </div>
  );
};

export default Home;
