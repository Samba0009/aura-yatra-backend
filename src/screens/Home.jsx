import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ExploreGrid from '../components/home/ExploreGrid';
import BlogScroll from '../components/home/BlogScroll';
import ReviewScroll from '../components/home/ReviewScroll';

const Home = () => {
  return (
    <div className="min-h-full bg-bgBase flex flex-col font-sans">
      <HeroSection />
      
      <div className="flex-1 w-full relative z-10 -mt-8 rounded-t-[40px] bg-bgBase">
        <ExploreGrid />
        
        <BlogScroll />
        
        <ReviewScroll />
      </div>
    </div>
  );
};

export default Home;
