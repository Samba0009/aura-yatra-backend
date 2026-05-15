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
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-[24px] text-textPrimary font-semibold">Yatra Blogs</h2>
        <button 
          onClick={() => navigate('/blogs')} 
          className="text-accentPurple text-[12px] font-semibold uppercase tracking-wider hover:text-accentPurpleBright transition-colors"
        >
          See All
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            onClick={() => navigate('/blog-detail')}
            className="group min-w-[200px] bg-surfaceElevated rounded-[20px] border border-borderDefault overflow-hidden shrink-0 cursor-pointer snap-start hover:border-borderActive transition-all"
          >
            <div className="h-[150px] relative overflow-hidden">
               <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-goldAmber text-[9px] uppercase font-bold tracking-wider rounded-full mb-2">
                {blog.tag}
              </span>
              <h3 className="text-textPrimary text-[13px] font-semibold leading-snug mb-2 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-textMuted text-[11px] uppercase tracking-wider font-medium">{blog.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogScroll;
