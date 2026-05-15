import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');
    try {
      await signup(email, password);
      navigate('/welcome');
    } catch (err) {
      console.error(err);
      setError('Failed to create an account. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-bgBase p-8 px-6 flex flex-col overflow-y-auto">
      <div className="mt-8 mb-12">
        <h2 className="font-serif text-[26px] text-textPrimary leading-none mb-2">Aura Yatra</h2>
        <p className="text-[#5a4a3a] text-[10px] tracking-[0.15em] uppercase font-medium">Create Your Account</p>
      </div>

      <div className="mb-8">
        <h1 className="font-serif text-[22px] text-[#d4c4a8] font-light mb-1">Join the Journey</h1>
        <p className="text-[#4a4060] text-[12px]">Register to start your sacred yatra</p>
      </div>

      {error && <div className="mb-4 text-red-500 text-[12px] text-center bg-red-500/10 py-2 rounded">{error}</div>}

      <div className="space-y-4 mb-8">
        <div className="bg-surface border-[0.5px] border-[#2a2040] rounded-[10px] p-3 px-3.5">
          <label className="block text-[#5a5070] text-[9px] uppercase font-medium mb-1">Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-transparent text-[#a090c0] text-[13px] outline-none placeholder:text-[#4a3060]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="bg-surface border-[0.5px] border-[#2a2040] rounded-[10px] p-3 px-3.5">
          <label className="block text-[#5a5070] text-[9px] uppercase font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent text-[#a090c0] text-[13px] outline-none placeholder:text-[#4a3060]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="bg-surface border-[0.5px] border-[#2a2040] rounded-[10px] p-3 px-3.5">
          <label className="block text-[#5a5070] text-[9px] uppercase font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent text-[#a090c0] text-[13px] outline-none placeholder:text-[#4a3060]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSignUp}
        disabled={loading}
        className={`w-full py-3.5 rounded-full text-textPrimary font-medium text-[14px] mb-6 shadow-[0_4px_14px_rgba(58,31,90,0.4)] transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        style={{ background: 'linear-gradient(135deg, #3a1f5a, #5a2a7a)' }}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>

      <div className="text-center mt-auto pb-4">
        <span className="text-[#4a4060] text-[12px]">Already have an account? </span>
        <button onClick={() => navigate('/signin')} className="text-[#8060a0] text-[12px] font-medium">Sign In</button>
      </div>
    </div>
  );
};

export default SignUp;
