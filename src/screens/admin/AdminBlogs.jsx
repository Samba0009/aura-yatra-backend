import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconTrash, IconEye, IconArticle } from '@tabler/icons-react';
import { fetchBlogs } from '../../api';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        // await deleteBlog(id); // Implement in local API if needed
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (err) {
        alert('Failed to delete blog');
      }
    }
  };

  return (
    <div className="min-h-full bg-slate-900 text-white flex flex-col">
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center gap-4">
        <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <IconArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-serif">Blog Moderation</h1>
      </div>

      <div className="p-6 flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading blogs...</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="h-24 opacity-20" style={{ backgroundColor: blog.color || '#4f46e5' }}></div>
                <div className="p-4 -mt-12">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 shadow-xl">
                    <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">{blog.tag}</span>
                    <h3 className="font-semibold text-base mb-1 line-clamp-1">{blog.title}</h3>
                    <p className="text-slate-400 text-xs mb-4">By {blog.author} • {blog.time}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate('/blog-detail', { state: { blog } })}
                        className="flex-1 py-2 bg-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <IconEye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold flex items-center justify-center"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <IconArticle size={48} className="mx-auto mb-4 opacity-20" />
            <p>No blogs found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
