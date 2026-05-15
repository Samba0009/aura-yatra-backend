import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error(err);
      if (isSignUp) {
        setError(err.message || 'Failed to create an account. Password must be at least 6 characters.');
      } else {
        setError('Failed to sign in. Check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
      setError('Failed to authenticate with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-bgBase p-8 px-6 flex flex-col max-w-lg mx-auto w-full">
      <div className="mt-8 mb-16">
        <h2 className="font-serif text-[26px] text-textPrimary leading-none mb-2">Aura Yatra</h2>
        <p className="text-[#5a4a3a] text-[10px] tracking-[0.15em] uppercase font-medium">Begin Your Journey</p>
      </div>

      <div className="mb-8">
        <h1 className="font-serif text-[22px] text-[#d4c4a8] font-light mb-1">
          {isSignUp ? 'Create Account' : 'Welcome back'}
        </h1>
        <p className="text-[#4a4060] text-[12px]">
          {isSignUp ? 'Sign up to manage your yatras' : 'Sign in to continue your yatra'}
        </p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[12px]">{error}</div>}

      <form onSubmit={handleEmailAuth} className="flex flex-col flex-1">
        <div className="space-y-4 mb-8">
          <div className="bg-surface border-[0.5px] border-[#2a2040] rounded-[10px] p-3 px-3.5 focus-within:border-accentPurple transition-colors">
            <label className="block text-[#5a5070] text-[9px] uppercase font-medium mb-1">Email</label>
            <input 
              type="email" 
              placeholder="user@example.com" 
              className="w-full bg-transparent text-[#a090c0] text-[13px] outline-none placeholder:text-[#4a3060]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="bg-surface border-[0.5px] border-[#2a2040] rounded-[10px] p-3 px-3.5 focus-within:border-accentPurple transition-colors">
            <label className="block text-[#5a5070] text-[9px] uppercase font-medium mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-transparent text-[#a090c0] text-[13px] outline-none placeholder:text-[#4a3060]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="w-full py-3.5 rounded-full text-textPrimary font-medium text-[14px] mb-6 shadow-[0_4px_14px_rgba(58,31,90,0.4)] hover:brightness-110 transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #3a1f5a, #5a2a7a)' }}
        >
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-[1px] flex-1 bg-[#1a1530]"></div>
        <span className="text-[#4a4060] text-[12px]">or</span>
        <div className="h-[1px] flex-1 bg-[#1a1530]"></div>
      </div>

      <button 
        disabled={loading}
        onClick={handleGoogleLogin}
        className="w-full py-3.5 rounded-full text-[#6a5a80] font-medium text-[14px] border border-[#2a2040] mb-auto hover:bg-white/5 transition-colors disabled:opacity-50"
      >
        Continue with Google
      </button>

      <div className="text-center mt-6">
        <span className="text-[#4a4060] text-[12px]">
          {isSignUp ? 'Already have an account? ' : 'New to Aura Yatra? '}
        </span>
        <button 
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
          }} 
          className="text-[#8060a0] text-[12px] font-medium"
        >
          {isSignUp ? 'Sign in' : 'Create account'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
