import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBrandGoogle, IconMail, IconLock, IconArrowRight } from '@tabler/icons-react';
import { signInWithGoogle } from '../firebase_native';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        console.log('Signed in as:', user.displayName);
        navigate('/home');
      }
    } catch (error) {
      console.error('Google Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      console.error('Email Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-bgBase flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-surfaceAccent rounded-[18px] flex items-center justify-center mx-auto mb-4 border border-borderActive shadow-[0_0_20px_rgba(112,80,160,0.3)]">
            <span className="text-[32px]">🕉️</span>
          </div>
          <h1 className="font-serif text-[32px] text-textPrimary leading-none mb-2">Aura Yatra</h1>
          <p className="text-textMuted text-[14px]">Your sacred journey begins here</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-surface border border-borderDefault rounded-[14px] p-1 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center text-textMuted">
              <IconMail size={20} />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent text-[14px] text-textPrimary outline-none flex-1 px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="bg-surface border border-borderDefault rounded-[14px] p-1 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center text-textMuted">
              <IconLock size={20} />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-[14px] text-textPrimary outline-none flex-1 px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleEmailSignIn}
            disabled={loading}
            className="w-full py-4 bg-surfaceAccent rounded-[14px] text-textPrimary font-medium text-[15px] flex items-center justify-center gap-2 border border-borderActive disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign In'} <IconArrowRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[1px] bg-borderDefault"></div>
          <span className="text-textDisabled text-[11px] uppercase font-bold tracking-widest">or continue with</span>
          <div className="flex-1 h-[1px] bg-borderDefault"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-4 bg-white rounded-[14px] text-black font-medium text-[15px] flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
        >
          <IconBrandGoogle size={20} /> {loading ? 'Processing...' : 'Sign in with Google'}
        </button>
      </div>

      <div className="text-center pb-4">
        <p className="text-textMuted text-[13px]">
          Don't have an account? <span className="text-accentPurpleBright font-medium cursor-pointer" onClick={() => navigate('/signup')}>Create one</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
