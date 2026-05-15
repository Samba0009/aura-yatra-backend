import React from 'react';
import { IconStarFilled } from '@tabler/icons-react';

const ReviewScroll = () => {
  const reviews = [
    { id: 1, name: 'Rajesh K.', dest: 'Tirupati', text: '"A seamless darshan experience. Highly recommended for families."', initials: 'RK', rating: 5 },
    { id: 2, name: 'Priya M.', dest: 'Char Dham', text: '"The curated plan was perfect. Our driver was very polite."', initials: 'PM', rating: 5 },
    { id: 3, name: 'Anil S.', dest: 'Varanasi', text: '"Beautiful aarti views and excellent hotel location."', initials: 'AS', rating: 5 },
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto mb-12">
      <h2 className="font-serif text-[24px] text-textPrimary font-semibold mb-8">Traveller Stories</h2>
      
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
        {reviews.map((review) => (
          <div key={review.id} className="min-w-[280px] bg-surfaceElevated border border-borderDefault rounded-[20px] p-6 shrink-0 snap-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accentPurple flex items-center justify-center text-[14px] font-bold text-white">
                {review.initials}
              </div>
              <div>
                <h4 className="text-[14px] text-textPrimary font-semibold">{review.name}</h4>
                <p className="text-[11px] text-textMuted font-medium">{review.dest}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <IconStarFilled key={i} size={14} className="text-goldAmber" />)}
            </div>
            <p className="text-[13px] text-textSecondary italic">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewScroll;
