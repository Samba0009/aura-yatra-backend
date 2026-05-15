import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ExploreGrid = () => {
  const navigate = useNavigate();
  const tiles = [
    { id: 1, name: 'Adventure', img: '/assets/explore_adventure_1778623926947.png', tag: 'PLAN TRIP' },
    { id: 2, name: 'MICE', img: '/assets/explore_luxury_1778623955229.png', tag: 'PLAN TRIP' },
    { id: 3, name: 'Cruise', img: '/assets/hero_temple_cinematic_1778623906123.png', tag: 'PLAN TRIP' },
    { id: 4, name: 'Villas & Stays', img: '/assets/explore_luxury_1778623955229.png', tag: 'PLAN TRIP' },
    { id: 5, name: 'Luxury Trains', img: '/assets/explore_adventure_1778623926947.png', tag: 'PLAN TRIP' },
    { id: 6, name: 'Monuments', img: '/assets/hero_temple_cinematic_1778623906123.png', tag: 'PLAN TRIP' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {tiles.map((tile) => (
        <div 
          key={tile.id} 
          onClick={() => navigate('/plan-detail')}
          className="group relative h-[220px] rounded-[20px] overflow-hidden cursor-pointer shadow-md"
        >
          <img 
            src={tile.img} 
            alt={tile.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95"></div>
          
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <h4 className="font-serif text-[20px] text-white font-bold mb-2">{tile.name}</h4>
            <div className="flex items-center gap-1 text-white text-[12px] font-semibold">
              <span>{tile.tag}</span>
              <IconChevronRight size={14} stroke={2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreGrid;
