import React from 'react';
import { IconStarFilled } from '@tabler/icons-react';

const ReviewScroll = () => {
  const reviews = [
    { id: 1, name: 'Rajesh K.', dest: 'Tirupati', text: '“A seamless darshan experience. Highly recommended for families.”', initials: 'RK' },
    { id: 2, name: 'Priya M.', dest: 'Char Dham', text: '“The curated plan was perfect. Our driver was very polite.”', initials: 'PM' },
    { id: 3, name: 'Anil S.', dest: 'Varanasi', text: '“Beautiful aarti views and excellent hotel location.”', initials: 'AS' },
  ];

  return (
    <div className="py-12 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5 mb-12">
      <h2 className="font-serif text-[32px] text-white font-bold mb-8">Traveller Stories</h2>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x">
        {reviews.map((review) => (
          <div key={review.id} className="min-w-[280px] md:min-w-[400px] bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 shrink-0 snap-start transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-goldAmber to-yellow-600 flex items-center justify-center text-[14px] font-bold text-black shadow-lg">
                {review.initials}
              </div>
              <div>
                <h4 className="text-[15px] text-white font-bold leading-none mb-1.5">{review.name}</h4>
                <p className="text-[11px] text-goldAmber font-medium uppercase tracking-wider leading-none">{review.dest}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4 text-goldAmber">
              {[...Array(5)].map((_, i) => <IconStarFilled key={i} size={14} />)}
            </div>
            <p className="text-[15px] text-zinc-300 italic leading-relaxed font-serif">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewScroll;
