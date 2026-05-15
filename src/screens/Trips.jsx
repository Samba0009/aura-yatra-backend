import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { IconMapPin, IconCalendarEvent } from '@tabler/icons-react';

const Trips = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[100px] px-4 pt-6">
      <h1 className="font-serif text-[28px] text-textPrimary font-semibold mb-6">My Yatras</h1>
      
      {!currentUser ? (
        <div className="bg-surfaceElevated p-6 rounded-[16px] text-center">
          <p className="text-textSecondary mb-4">Please log in to view your bookings.</p>
        </div>
      ) : loading ? (
        <div className="text-center text-textMuted py-8">Loading your journeys...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-surfaceElevated p-6 rounded-[16px] text-center border border-borderSubtle">
          <p className="text-textSecondary text-[14px]">You have no upcoming yatras.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-surfaceElevated rounded-[16px] border border-borderDefault p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accentPurpleDeep flex items-center justify-center">
                    <IconMapPin size={16} className="text-accentPurpleBright" />
                  </div>
                  <h3 className="font-serif text-[18px] text-textPrimary">{booking.destination}</h3>
                </div>
                <span className="px-2 py-1 bg-green-900/30 text-green-400 text-[10px] uppercase font-bold rounded-full">
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
  );
};

export default Trips;
