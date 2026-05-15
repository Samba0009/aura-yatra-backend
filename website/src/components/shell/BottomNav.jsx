import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome, IconRoute, IconHeart, IconUserCircle, IconShieldLock } from '@tabler/icons-react';
import { useAuth } from '../../contexts/AuthContext';

const BottomNav = () => {
  const { isAdmin } = useAuth();
  
  const navItems = [
    { path: '/home', label: 'Home', icon: <IconHome size={18} /> },
    { path: '/trips', label: 'Trips', icon: <IconRoute size={18} /> },
    { path: '/saved', label: 'Saved', icon: <IconHeart size={18} /> },
    { path: '/profile', label: 'Profile', icon: <IconUserCircle size={18} /> },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: <IconShieldLock size={18} /> });
  }

  return (
    <div className="md:hidden border-t-[0.5px] border-borderSubtle bg-bgBase flex justify-around items-center py-2 px-1 z-50 absolute bottom-0 left-0 right-0 h-[60px]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              isActive ? 'text-accentPurpleBright' : 'text-[#3a3050]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={isActive ? 'text-accentPurpleBright' : 'text-[#3a3050]'}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-medium tracking-wide ${isActive ? 'text-borderActive' : 'text-[#2a2040]'}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
