import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { IconUserCircle, IconLogout, IconMail, IconShieldCheck } from '@tabler/icons-react';
import SignIn from './SignIn';

const Profile = () => {
  const { currentUser, isAdmin, logout } = useAuth();

  if (!currentUser) {
    return <SignIn />;
  }

  return (
    <div className="h-full bg-bgBase flex flex-col p-6 max-w-lg mx-auto w-full">
      <div className="mt-8 mb-10 text-center">
        <h2 className="font-serif text-[26px] text-textPrimary leading-none mb-2">My Profile</h2>
        <p className="text-accentPurple text-[10px] tracking-[0.15em] uppercase font-medium">Aura Yatra Account</p>
      </div>

      <div className="bg-surfaceElevated border border-borderDefault rounded-[16px] p-6 mb-6 shadow-md flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-accentPurpleDeep flex items-center justify-center text-textPrimary mb-4">
          <IconUserCircle size={48} stroke={1} />
        </div>
        <h3 className="text-[18px] text-white font-medium mb-1">
          {currentUser.displayName || 'Devotee'}
        </h3>
        <div className="flex items-center gap-2 text-textMuted text-[13px] mb-4">
          <IconMail size={16} />
          {currentUser.email}
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px] font-medium">
            <IconShieldCheck size={14} />
            Administrator
          </div>
        )}
      </div>

      <div className="space-y-3 mt-auto mb-10">
        <button 
          onClick={logout}
          className="w-full py-4 rounded-[14px] border border-borderDefault bg-surface text-textPrimary font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
        >
          <IconLogout size={18} className="text-red-400" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
