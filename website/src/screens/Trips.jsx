import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { IconMapPin, IconCalendarEvent, IconTicket, IconArrowLeft } from '@tabler/icons-react';

const Trips = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'bookings'), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
  
  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : completedBookings;
  const isEmpty = displayBookings.length === 0;

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[100px]">
      {/* Header */}
      <div className="relative px-6 py-6 flex items-center justify-between border-b border-borderDefault">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 transition-colors"
        >
          <IconArrowLeft size={20} className="text-textPrimary" />
        </button>
        <h1 className="font-serif text-[24px] text-textPrimary font-semibold absolute left-1/2 -translate-x-1/2">My Yatras</h1>
        <div className="w-8"></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-borderDefault px-6">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-4 text-center font-semibold text-[14px] transition-colors relative ${
            activeTab === 'upcoming' 
              ? 'text-textPrimary' 
              : 'text-textMuted hover:text-textSecondary'
          }`}
        >
          UPCOMING
          {activeTab === 'upcoming' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-accentPurple"></div>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-4 text-center font-semibold text-[14px] transition-colors relative ${
            activeTab === 'completed' 
              ? 'text-textPrimary' 
              : 'text-textMuted hover:text-textSecondary'
          }`}
        >
          COMPLETED
          {activeTab === 'completed' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-accentPurple"></div>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        {!currentUser ? (
          <div className="bg-surfaceElevated p-6 rounded-[16px] text-center">
            <p className="text-textSecondary mb-4">Please log in to view your bookings.</p>
          </div>
        ) : loading ? (
          <div className="text-center text-textMuted py-8">Loading your journeys...</div>
        ) : isEmpty ? (
          <div className="h-[400px] flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-accentPurpleDeep/30 flex items-center justify-center mb-6">
              <IconTicket size={48} className="text-accentPurple" stroke={1} />
            </div>
            <h2 className="font-serif text-[22px] text-textPrimary mb-2">
              {activeTab === 'upcoming' ? 'No upcoming yatras' : 'No completed yatras'}
            </h2>
            <p className="text-textMuted text-[14px] max-w-[260px] text-center mb-8">
              {activeTab === 'upcoming' 
                ? 'When you book a journey, your tickets will appear here.'
                : 'Your completed journeys will show here.'}
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="px-8 py-3 bg-accentPurpleDeep rounded-full text-white text-[14px] font-semibold"
            >
              Start Your Journey
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div key={booking.id} className="bg-surfaceElevated rounded-[16px] border border-borderDefault p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accentPurpleDeep flex items-center justify-center">
                      <IconMapPin size={16} className="text-accentPurpleBright" />
                    </div>
                    <h3 className="font-serif text-[18px] text-textPrimary">{booking.destination}</h3>
                  </div>
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${
                    booking.status === 'completed' 
                      ? 'bg-emerald-900/30 text-emerald-400'
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-textMuted text-[12px] mb-3">
                  <IconCalendarEvent size={14} />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="pt-3 border-t border-borderSubtle flex justify-between items-center">
                  <span className="text-[12px] text-textSecondary">Paid via {booking.method}</span>
                  <span className="font-medium text-textPrimary">₹{booking.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
