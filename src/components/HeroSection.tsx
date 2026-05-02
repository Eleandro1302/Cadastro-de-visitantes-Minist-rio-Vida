import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import i18n from '../i18n';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full md:w-5/12 bg-slate-900 text-white flex flex-col relative overflow-hidden min-h-[50vh] md:min-h-screen">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-8 lg:p-16">
        {/* Mobile Header / Desktop Branding */}
        <div className="flex items-center justify-between md:flex-col md:items-start mb-8 md:mb-12">
          <Logo className="w-12 h-12 md:w-20 md:h-20" />
          
          <div className="flex bg-slate-800/50 p-1 rounded-full border border-slate-700/50 backdrop-blur-sm self-center md:self-auto md:mt-8">
            <button 
              onClick={() => i18n.changeLanguage('pt')} 
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${i18n.language.startsWith('pt') ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              PT
            </button>
            <button 
              onClick={() => i18n.changeLanguage('en')} 
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="mt-auto md:mt-0 flex flex-col">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
            <span className="text-blue-400 block md:inline">{t('title').split(' ')[0]}</span> {t('title').split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md">
            {t('subtitle')}
          </p>
          
          <div className="hidden md:flex flex-col gap-6">
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{t('cultsTitle')}</h3>
                <p className="text-slate-400 text-sm">{t('cultsDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-white/5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{t('safeTitle')}</h3>
                <p className="text-slate-400 text-sm">{t('safeDesc')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Visual Footer hint for mobile */}
        <div className="md:hidden mt-4 flex justify-center animate-bounce text-blue-400/50">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-400/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};
