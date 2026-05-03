import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

const promises = {
  pt: [
    { verse: "Pois eu sei os planos que tenho para vocês", ref: "Jeremias 29:11", detail: "planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro." },
    { verse: "O Senhor é o meu pastor; nada me faltará.", ref: "Salmos 23:1" },
    { verse: "Tudo posso naquele que me fortalece.", ref: "Filipenses 4:13" },
    { verse: "Seja forte e corajoso! Não se apavore nem desanime.", ref: "Josué 1:9", detail: "Pois o Senhor, o seu Deus, estará com você por onde você andar." },
    { verse: "Lembrem-se disto: o Senhor é bom.", ref: "Salmos 100:5", detail: "O seu amor fiel dura para sempre e a sua fidelidade não tem fim." },
    { verse: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.", ref: "1 Pedro 5:7" },
    { verse: "O Senhor te abençoe e te guarde.", ref: "Números 6:24" },
    { verse: "Aí os teus olhos verão o que é reto.", ref: "Provérbios 4:25" },
    { verse: "O Senhor é a minha luz e a minha salvação; de quem terei medo?", ref: "Salmos 27:1" },
    { verse: "Agrada-te do Senhor, e ele satisfará os desejos do teu coração.", ref: "Salmos 37:4" }
  ],
  en: [
    { verse: "For I know the plans I have for you,", ref: "Jeremiah 29:11", detail: "plans to prosper you and not to harm you, plans to give you hope and a future." },
    { verse: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
    { verse: "I can do all things through him who strengthens me.", ref: "Philippians 4:13" },
    { verse: "Be strong and courageous. Do not be afraid.", ref: "Joshua 1:9", detail: "For the Lord your God will be with you wherever you go." },
    { verse: "The Lord is good and his love endures forever.", ref: "Psalm 100:5", detail: "His faithfulness continues through all generations." },
    { verse: "Casting all your anxieties on him, because he cares for you.", ref: "1 Peter 5:7" },
    { verse: "The Lord bless you and keep you.", ref: "Numbers 6:24" },
    { verse: "Let your eyes look straight ahead.", ref: "Proverbs 4:25" },
    { verse: "The Lord is my light and my salvation; whom shall I fear?", ref: "Psalm 27:1" },
    { verse: "Delight yourself in the Lord, and he will give you the desires of your heart.", ref: "Psalm 37:4" }
  ]
};

export const PromiseBox: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPromise, setCurrentPromise] = useState<{ verse: string; ref: string; detail?: string } | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
  const currentPromises = promises[lang];

  const getNewPromise = () => {
    setIsSpinning(true);
    
    // Simulate a bit of "searching" for a promise
    setTimeout(() => {
      let next;
      do {
        next = currentPromises[Math.floor(Math.random() * currentPromises.length)];
      } while (next.ref === currentPromise?.ref && currentPromises.length > 1);
      
      setCurrentPromise(next);
      setIsSpinning(false);
    }, 600);
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-900 pointer-events-none">
        <Sparkles size={64} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-amber-500 rounded-lg text-white">
            <Sparkles size={16} />
          </div>
          <h3 className="font-bold text-amber-900">{t('promiseBoxTitle')}</h3>
        </div>
        
        <p className="text-amber-800 text-sm mb-6 leading-snug">
          {t('promiseBoxDesc')}
        </p>

        <AnimatePresence mode="wait">
          {!currentPromise ? (
            <motion.button
              key="initial-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={getNewPromise}
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isSpinning ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {t('promiseBoxBtn')}
            </motion.button>
          ) : (
            <motion.div
              key="promise-card"
              initial={{ opacity: 0, scale: 0.9, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-amber-200 relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
               
               <p className="text-slate-800 font-medium italic mb-2 leading-relaxed">
                 "{currentPromise.verse}"
               </p>
               {currentPromise.detail && (
                 <p className="text-slate-500 text-xs mb-3">
                   {currentPromise.detail}
                 </p>
               )}
               <p className="text-amber-700 font-bold text-sm text-right">
                 — {currentPromise.ref}
               </p>
               
               <button
                 onClick={getNewPromise}
                 className="mt-4 w-full py-2 border border-amber-200 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5"
               >
                 <RefreshCw size={14} className={isSpinning ? "animate-spin" : ""} />
                 {t('promiseBoxAgain')}
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
