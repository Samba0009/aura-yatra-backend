import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconClipboardList, IconSearch, IconCalendar } from '@tabler/icons-react';
import { fetchBookings } from '../../api';

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (err) {
        console.error('Failed to load bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  return (
    <div className="min-h-full bg-slate-900 text-white flex flex-col">
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center gap-4">
        <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <IconArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-serif">Customer Bookings</h1>
      </div>

      <div className="p-6 flex-1">
        <div className="relative mb-6">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by ID or Type..."
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading bookings...</p>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded border border-blue-500/20">
                    {booking.item_type || 'Unknown'}
                  </div>
                  <span className="text-slate-500 text-[10px]">ID: {booking.id.slice(0, 8)}...</span>
                </div>

                <h3 className="font-semibold text-lg mb-1">
                  {booking.item_id || 'Travel Package'}
                </h3>

                <div className="flex items-center gap-2 text-slate-400 text-xs mb-4">
                  <IconCalendar size={14} />
                  <span>{booking.createdAt?.toDate ? booking.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Customer Info</p>
                  <p className="text-sm text-slate-300">
                    {booking.user_details?.name || 'Guest User'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {booking.user_details?.email || 'No email provided'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <IconClipboardList size={48} className="mx-auto mb-4 opacity-20" />
            <p>No bookings found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
