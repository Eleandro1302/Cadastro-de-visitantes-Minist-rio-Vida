import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { PromiseBox } from './PromiseBox';

export const SuccessScreen: React.FC = () => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(10);

  const redirectToInstagram = () => {
    const appUrl = 'instagram://user?username=ministeriovidagravesend';
    const webUrl = 'https://www.instagram.com/ministeriovidagravesend?igsh=MXQwbzNsNzBhYXhwcw==';
    
    const navigate = (url: string) => {
      try {
        // Tenta redirecionar a janela principal (útil se estiver dentro de um iframe)
        if (window.top && window.top !== window) {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      } catch (e) {
        // Fallback para a própria janela se houver restrição de segurança
        window.location.href = url;
      }
    };

    // Tenta abrir o aplicativo primeiro
    navigate(appUrl);
    
    // Fallback para o navegador web caso o app não abra
    setTimeout(() => {
      navigate(webUrl);
    }, 1200);
  };

  useEffect(() => {
    // Timer para o countdown visual
    const countTimer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Timer para o redirecionamento automático
    const redirectTimer = setTimeout(() => {
      redirectToInstagram();
    }, 10000);

    return () => {
      clearInterval(countTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  const handleInstagramClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    redirectToInstagram();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-blue-600 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 flex justify-center">
          <Logo className="w-24 h-24 sm:w-28 sm:h-28" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('successTitle')}</h2>
        <p className="text-slate-600 mb-6">
          {t('successDesc')}
        </p>
        
        <div className="bg-blue-50 rounded-xl p-4 mb-8 border border-blue-100 flex flex-col items-center gap-2">
          <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            {t('successRedirecting')}
          </p>
          <div className="text-2xl font-bold text-blue-900 tabular-nums">
            {countdown > 0 ? `${countdown}s` : 'Redirecionando...'}
          </div>
        </div>

        <div className="mb-8">
          <PromiseBox />
        </div>

        <a
          href="https://www.instagram.com/ministeriovidagravesend?igsh=MXQwbzNsNzBhYXhwcw=="
          onClick={handleInstagramClick}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
        >
          <Instagram size={22} />
          {t('successBtn')}
          <ArrowRight size={18} className="ml-1" />
        </a>
      </div>
    </div>
  );
};
