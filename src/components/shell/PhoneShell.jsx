import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNav = ['/', '/signin', '/welcome', '/booking-confirmed'].includes(location.pathname);

  return (
    <div className="w-full min-h-screen bg-bgBase flex flex-col md:flex-row font-sans text-textPrimary">
      {/* Desktop Sidebar */}
      {!hideNav && <DesktopSidebar />}

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto thin-scrollbar relative bg-bgBase">
          <div className="w-full min-h-full flex flex-col relative pb-[60px] md:pb-0">
            {children}
          </div>
        </div>
        
        {/* Mobile Bottom Nav */}
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
};

export default AppLayout;
