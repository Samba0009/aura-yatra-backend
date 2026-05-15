import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';

const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Review' },
    { id: 2, label: 'Travellers' },
    { id: 3, label: 'Payment' },
  ];

  return (
    <div className="px-6 py-4 flex items-center justify-between relative mb-4">
      <div className="absolute left-[30px] right-[30px] top-[25px] h-[1px] bg-borderDefault z-0"></div>
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        
        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              isActive ? 'bg-borderActive text-textPrimary' :
              isDone ? 'bg-accentPurpleDeep border border-accentPurple text-textPrimary' :
              'bg-surface border border-borderDefault text-textDisabled'
            }`}>
              {isDone ? <IconCheck size={12} /> : step.id}
            </div>
            <span className={`text-[10px] ${isActive || isDone ? 'text-textPrimary' : 'text-textDisabled'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;
