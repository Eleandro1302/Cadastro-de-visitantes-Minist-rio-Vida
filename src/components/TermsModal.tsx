import React from 'react';
import { useTranslation } from 'react-i18next';

interface TermsModalProps {
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="p-6 lg:p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-slate-800">{t('termsModalTitle')}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 bg-slate-100 rounded-full">
              {t('termsModalClose')}
            </button>
          </div>
          
          <div className="prose prose-slate prose-blue w-full max-w-none text-sm text-slate-600">
            <p>{t('termsP1')}</p>
            
            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-2">{t('termsH1')}</h4>
            <p>{t('termsD1')}</p>
            
            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-2">{t('termsH2')}</h4>
            <p>{t('termsD2')}</p>
            
            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-2">{t('termsH3')}</h4>
            <p>{t('termsD3')}</p>
            
            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-2">{t('termsH4')}</h4>
            <p>{t('termsD4')}</p>
            
            <p className="mt-8 text-xs text-slate-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        
        <div className="border-t border-slate-100 p-6 bg-slate-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {t('termsAccept')}
          </button>
        </div>
      </div>
    </div>
  );
};
