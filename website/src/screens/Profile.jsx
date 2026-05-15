import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IconGear, IconClock, IconHelp, IconLogout, IconMail, IconShieldCheck } from '@tabler/icons-react';
import SignIn from './SignIn';

const Profile = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <SignIn />;
  }

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[100px]">
      {/* Profile Header */}
      <div className="px-6 py-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-accentPurpleDeep flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-serif text-white">
              {currentUser.displayName?.charAt(0) || 'S'}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-[24px] text-textPrimary font-semibold mb-1">
              My Profile
            </h1>
            <p className="text-textMuted text-[13px]">{currentUser.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {/* Account Settings */}
        <button className="w-full bg-surfaceElevated border border-borderDefault rounded-[16px] p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-accentPurple/20 flex items-center justify-center group-hover:bg-accentPurple/30 transition-colors">
            <IconGear size={20} className="text-accentPurple" />
          </div>
          <div className="text-left flex-1">
            <p className="text-textPrimary font-medium text-[14px]">Account Settings</p>
            <p className="text-textMuted text-[12px]">Manage your account</p>
          </div>
        </button>

        {/* Booking History */}
        <button 
          onClick={() => navigate('/trips')}
          className="w-full bg-surfaceElevated border border-borderDefault rounded-[16px] p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-accentPurple/20 flex items-center justify-center group-hover:bg-accentPurple/30 transition-colors">
            <IconClock size={20} className="text-accentPurple" />
          </div>
          <div className="text-left flex-1">
            <p className="text-textPrimary font-medium text-[14px]">Booking History</p>
            <p className="text-textMuted text-[12px]">View past trips</p>
          </div>
        </button>

        {/* Support & Help */}
        <button className="w-full bg-surfaceElevated border border-borderDefault rounded-[16px] p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-accentPurple/20 flex items-center justify-center group-hover:bg-accentPurple/30 transition-colors">
            <IconHelp size={20} className="text-accentPurple" />
          </div>
          <div className="text-left flex-1">
            <p className="text-textPrimary font-medium text-[14px]">Support & Help</p>
            <p className="text-textMuted text-[12px]">Get assistance</p>
          </div>
        </button>
      </div>

      {/* Admin Badge */}
      {isAdmin && (
        <div className="px-6 mt-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-[16px] p-4 flex items-center gap-3">
            <IconShieldCheck size={20} className="text-emerald-400" />
            <div>
              <p className="text-emerald-400 font-semibold text-[13px]">Administrator</p>
              <p className="text-emerald-400/70 text-[11px]">You have admin access</p>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="px-6 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500/10 border border-red-500/30 rounded-[16px] p-4 flex items-center gap-3 hover:bg-red-500/20 transition-colors"
        >
          <IconLogout size={20} className="text-red-400" />
          <span className="text-red-400 font-semibold text-[14px]">Log Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-textMuted text-[12px]">AURA YATRA V1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;
