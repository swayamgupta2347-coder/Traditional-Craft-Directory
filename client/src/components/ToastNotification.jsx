import React from 'react';
import { useData } from '../context/DataContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage } = useData();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isWarning = toastMessage.type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slideUp">
      <div className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 ${
        isSuccess 
          ? 'bg-[#1E232A] text-white border-emerald-500/50' 
          : isWarning 
            ? 'bg-amber-900 text-amber-50 border-amber-600'
            : 'bg-[#1B365D] text-white border-[#F3A628]'
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : isWarning ? (
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-[#F3A628] shrink-0" />
        )}
        <p className="text-xs sm:text-sm font-medium leading-snug">
          {toastMessage.message}
        </p>
      </div>
    </div>
  );
}
