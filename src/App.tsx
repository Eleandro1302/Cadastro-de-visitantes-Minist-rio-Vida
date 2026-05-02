import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessScreen } from './components/SuccessScreen';
import { TermsModal } from './components/TermsModal';

export default function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  if (isSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row selection:bg-blue-100 animate-in fade-in duration-700">
      <HeroSection />
      
      <RegistrationForm 
        onSuccess={() => setIsSuccess(true)} 
        onShowTerms={() => setShowTerms(true)} 
      />
      
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </div>
  );
}
