import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconLock, IconShieldCheck, IconWallet, IconCreditCard, IconBuildingBank, IconChartPie } from '@tabler/icons-react';
import ProgressStepper from '../components/booking/ProgressStepper';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Payment = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      if (currentUser) {
        await addDoc(collection(db, 'bookings'), {
          userId: currentUser.uid,
          amount: 54000,
          method: selectedMethod,
          destination: 'Coorg',
          status: 'confirmed',
          date: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error saving booking:", error);
    } finally {
      setIsProcessing(false);
      navigate('/booking-confirmed');
    }
  };

  const methods = [
    { id: 'UPI', label: 'UPI', sub: 'GPay, PhonePe, Paytm', icon: <IconWallet size={20} /> },
    { id: 'Card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: <IconCreditCard size={20} /> },
    { id: 'NetBanking', label: 'Net Banking', sub: 'All major banks', icon: <IconBuildingBank size={20} /> },
    { id: 'EMI', label: 'Pay in Parts', sub: 'EMI or split payment', icon: <IconChartPie size={20} /> },
  ];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[100px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Payment</h1>
      </div>

      <ProgressStepper currentStep={3} />

      <div className="px-4 py-2 space-y-4">
        <h2 className="font-serif text-[18px] text-textPrimary mb-1">Choose Payment Method</h2>
        
        <div className="space-y-3">
          {methods.map((m) => (
            <div 
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              className={`flex items-center gap-3 p-4 rounded-[12px] border transition-colors cursor-pointer ${
                selectedMethod === m.id 
                  ? 'bg-surfaceElevated border-borderActive' 
                  : 'bg-surface border-borderDefault'
              }`}
            >
              <div className="w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0">
                {selectedMethod === m.id && <div className="w-[10px] h-[10px] rounded-full bg-accentPurpleBright"></div>}
              </div>
              <div className={`text-${selectedMethod === m.id ? 'accentPurpleBright' : 'textMuted'}`}>
                {m.icon}
              </div>
              <div>
                <h3 className={`text-[14px] font-medium leading-none mb-1 ${selectedMethod === m.id ? 'text-textPrimary' : 'text-textSecondary'}`}>
                  {m.label}
                </h3>
                <p className="text-[11px] text-textMuted leading-none">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-[#0e0a14] p-3 rounded-[8px] border border-[#1a1520] mt-6">
          <IconShieldCheck size={18} className="text-tealNature shrink-0" />
          <p className="text-[10px] text-[#7a6890] leading-relaxed">
            Payments are 256-bit SSL encrypted via Razorpay. Your details are safe and secure.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bgBase border-t-[0.5px] border-borderSubtle max-w-[320px] mx-auto z-50">
        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-3.5 bg-[#4a2070] rounded-[10px] text-textPrimary font-medium text-[14px] shadow-[0_4px_14px_rgba(74,32,112,0.4)] flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isProcessing ? 'Processing...' : <><IconLock size={16} /> Pay ₹54,000 Securely</>}
        </button>
      </div>
    </div>
  );
};

export default Payment;
