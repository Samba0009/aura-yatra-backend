import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';

const ExploreGrid = () => {
  const tiles = [
    { id: 1, name: 'Adventure', img: '/assets/explore_adventure_1778623926947.png', tag: 'Thrilling' },
    { id: 2, name: 'Luxury Stays', img: '/assets/explore_luxury_1778623955229.png', tag: 'Premium' },
    { id: 3, name: 'Spiritual', img: '/assets/hero_temple_cinematic_1778623906123.png', tag: 'Curated' },
    { id: 4, name: 'Monuments', img: '/assets/hero_temple_cinematic_1778623906123.png', tag: 'Historic' },
  ];

  return (
    <div className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-serif text-[32px] text-white font-bold mb-1">Explore Experiences</h2>
          <p className="text-zinc-400 text-[14px]">Discover journeys crafted for every soul.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiles.map((tile) => (
          <div key={tile.id} className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <img 
              src={tile.img} 
              alt={tile.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest mb-3 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {tile.tag}
              </span>
              <h4 className="font-serif text-[24px] text-white font-bold mb-1 transform transition-transform duration-300 group-hover:-translate-y-1">{tile.name}</h4>
              <div className="flex items-center gap-2 text-goldAmber text-[13px] font-medium opacity-0 transform translate-y-4 transition-all duration-300 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                <span>View itineraries</span>
                <IconChevronRight size={14} stroke={2.5} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreGrid;
