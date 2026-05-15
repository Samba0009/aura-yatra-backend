import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconLock } from '@tabler/icons-react';
import ProgressStepper from '../components/booking/ProgressStepper';

const TravellerDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[80px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Traveller Details</h1>
      </div>

      <ProgressStepper currentStep={2} />

      <div className="px-4 py-2 space-y-6">
        <div>
          <h2 className="font-serif text-[18px] text-textPrimary mb-3">Traveller 1 (Lead)</h2>
          <div className="bg-surface rounded-[14px] border border-borderDefault p-4 space-y-4">
            <div className="bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3">
              <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Full Name</label>
              <input type="text" placeholder="As per ID proof" className="w-full bg-transparent text-textPrimary text-[13px] outline-none" defaultValue="Arjun Kumar" />
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3">
                <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Age</label>
                <input type="number" placeholder="Years" className="w-full bg-transparent text-textPrimary text-[13px] outline-none" defaultValue="32" />
              </div>
              <div className="flex-1 bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3 flex items-center gap-2">
                <select className="w-full bg-transparent text-textPrimary text-[13px] outline-none appearance-none">
                  <option className="bg-surface text-textPrimary" value="Male">Male</option>
                  <option className="bg-surface text-textPrimary" value="Female">Female</option>
                  <option className="bg-surface text-textPrimary" value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3">
              <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">ID Type</label>
              <select className="w-full bg-transparent text-textPrimary text-[13px] outline-none appearance-none">
                <option className="bg-surface text-textPrimary" value="Aadhar">Aadhar Card</option>
                <option className="bg-surface text-textPrimary" value="Passport">Passport</option>
                <option className="bg-surface text-textPrimary" value="PAN">PAN Card</option>
              </select>
            </div>

            <div className="bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3">
              <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">ID Number</label>
              <input type="text" placeholder="Enter ID Number" className="w-full bg-transparent text-textPrimary text-[13px] outline-none" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[18px] text-textPrimary mb-3">Contact Details</h2>
          <div className="bg-surface rounded-[14px] border border-borderDefault p-4 space-y-4">
            <div className="bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3">
              <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Mobile Number</label>
              <input type="tel" placeholder="+91 00000 00000" className="w-full bg-transparent text-textPrimary text-[13px] outline-none" defaultValue="+91 98765 43210" />
            </div>
            <div className="bg-bgBase border-[0.5px] border-borderDefault rounded-[10px] p-2 px-3">
              <label className="block text-textMuted text-[9px] uppercase font-bold mb-1">Email Address</label>
              <input type="email" placeholder="For booking confirmation" className="w-full bg-transparent text-textPrimary text-[13px] outline-none" defaultValue="arjun@example.com" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bgBase border-t-[0.5px] border-borderSubtle max-w-[320px] mx-auto z-50">
        <button 
          onClick={() => navigate('/payment')}
          className="w-full py-3.5 bg-accentPurpleDeep rounded-[10px] text-textPrimary font-medium text-[14px] shadow-[0_4px_14px_rgba(58,31,90,0.3)] flex justify-center items-center gap-2"
        >
          <IconLock size={16} /> Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default TravellerDetails;
