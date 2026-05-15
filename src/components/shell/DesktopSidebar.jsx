import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome, IconRoute, IconHeart, IconUserCircle, IconShieldLock } from '@tabler/icons-react';
import { useAuth } from '../../contexts/AuthContext';

const DesktopSidebar = () => {
  const { isAdmin } = useAuth();
  
  const navItems = [
    { path: '/home', label: 'Home', icon: <IconHome size={24} /> },
    { path: '/trips', label: 'Trips', icon: <IconRoute size={24} /> },
    { path: '/saved', label: 'Saved', icon: <IconHeart size={24} /> },
    { path: '/profile', label: 'Profile', icon: <IconUserCircle size={24} /> },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: <IconShieldLock size={24} /> });
  }

  return (
    <div className="hidden md:flex flex-col w-[260px] bg-[#09090b]/80 backdrop-blur-xl border-r border-white/5 h-screen p-6 relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div className="mb-12 mt-4 text-center">
        <h1 className="font-serif text-[28px] text-white font-bold tracking-wide inline-block">
          Aura Yatra
        </h1>
        <p className="text-[11px] text-goldAmber tracking-[0.2em] uppercase font-semibold mt-1">
          Concierge
        </p>
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-goldAmber'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium text-[15px]">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-auto mb-4">
        <div className="bg-gradient-to-br from-goldAmber/20 to-transparent p-[1px] rounded-2xl">
          <div className="bg-[#09090b]/90 backdrop-blur-sm rounded-2xl p-5 text-center">
            <h4 className="text-white font-serif text-[18px] mb-1">Premium Plan</h4>
            <p className="text-zinc-400 text-[12px] mb-3">Unlock exclusive spiritual retreats</p>
            <button className="w-full py-2.5 rounded-xl bg-goldAmber text-black font-semibold text-[13px] hover:bg-yellow-400 transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
