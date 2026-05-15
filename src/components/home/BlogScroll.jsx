import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogScroll = () => {
  const navigate = useNavigate();
  const blogs = [
    { id: 1, tag: 'Pilgrimage', title: '12 sacred temples of South India', time: '5 min read', img: '/assets/hero_temple_cinematic_1778623906123.png' },
    { id: 2, tag: 'Adventure', title: 'Best time to visit Kedarnath', time: '3 min read', img: '/assets/explore_adventure_1778623926947.png' },
    { id: 3, tag: 'Luxury', title: 'Kumbh Mela premium camps guide', time: '7 min read', img: '/assets/explore_luxury_1778623955229.png' },
  ];

  return (
    <div className="py-12 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-serif text-[32px] text-white font-bold mb-1">Yatra Journals</h2>
          <p className="text-zinc-400 text-[14px]">Inspiring stories from the road.</p>
        </div>
        <button onClick={() => navigate('/blogs')} className="text-goldAmber text-[13px] font-semibold uppercase tracking-widest hover:text-white transition-colors">View All</button>
      </div>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            onClick={() => navigate('/blog-detail')}
            className="group min-w-[280px] md:min-w-[360px] bg-[#09090b] rounded-3xl border border-white/10 overflow-hidden shrink-0 cursor-pointer snap-start shadow-xl hover:border-white/30 transition-all duration-300"
          >
            <div className="h-[200px] relative overflow-hidden">
               <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent"></div>
            </div>
            <div className="p-6 relative -mt-8">
              <span className="inline-block px-3 py-1 bg-[#09090b] border border-white/10 text-goldAmber text-[9px] uppercase font-bold tracking-widest rounded-full mb-3">
                {blog.tag}
              </span>
              <h3 className="font-serif text-white text-[20px] font-bold leading-snug mb-3 group-hover:text-goldAmber transition-colors">
                {blog.title}
              </h3>
              <p className="text-zinc-500 text-[12px] uppercase tracking-wider font-semibold">{blog.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogScroll;
