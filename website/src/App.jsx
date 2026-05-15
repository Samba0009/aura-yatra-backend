import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { initializeFCM } from './firebase_native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import TempleSearch from './screens/TempleSearch';
import TempleResults from './screens/TempleResults';
import GuideMyYatra from './screens/GuideMyYatra';
import CuratedPlans from './screens/CuratedPlans';
import PlanDetail from './screens/PlanDetail';
import ReviewBooking from './screens/ReviewBooking';
import TravellerDetails from './screens/TravellerDetails';
import Payment from './screens/Payment';
import BookingConfirmed from './screens/BookingConfirmed';
import BlogsList from './screens/BlogsList';
import BlogDetail from './screens/BlogDetail';
import WriteBlog from './screens/WriteBlog';
import Trips from './screens/Trips';
import CarSearch from './screens/CarSearch';
import CarResults from './screens/CarResults';
import AppLayout from './components/shell/PhoneShell';
import AdminRoute from './components/auth/AdminRoute';
import AdminDashboard from './screens/admin/AdminDashboard';
import Profile from './screens/Profile';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize FCM on app load for Native Android
    initializeFCM();
  }, []);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/temple-search" element={<TempleSearch />} />
        <Route path="/temple-results" element={<TempleResults />} />
        <Route path="/guide-my-yatra" element={<GuideMyYatra />} />
        <Route path="/curated-plans" element={<CuratedPlans />} />
        <Route path="/plan-detail" element={<PlanDetail />} />
        <Route path="/review-booking" element={<ReviewBooking />} />
        <Route path="/traveller-details" element={<TravellerDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        <Route path="/blogs" element={<BlogsList />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/car-search" element={<CarSearch />} />
        <Route path="/car-results" element={<CarResults />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        
        {/* Placeholder routes */}
        <Route path="*" element={<div className="p-4 text-white">404 - Not Found</div>} />
      </Routes>
    </AppLayout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
