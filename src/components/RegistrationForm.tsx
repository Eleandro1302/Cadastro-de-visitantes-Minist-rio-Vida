import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Info, Loader2, Plus, Trash2, HelpCircle } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { submitRegistration } from '../services/api';
import { PromiseBox } from './PromiseBox';

interface RegistrationFormProps {
  onSuccess: () => void;
  onShowTerms: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onShowTerms }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    visitantes: [{ nome: '', whatsapp: '', showPhone: true }],
    origem: '',
    amigo: '',
    cookieConsent: false,
    privacyConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNameChange = (index: number, value: string) => {
    const newVisitantes = [...formData.visitantes];
    newVisitantes[index] = { ...newVisitantes[index], nome: value };
    setFormData(prev => ({ ...prev, visitantes: newVisitantes }));
  };

  const handleVisitorPhoneChange = (index: number, value?: string) => {
    const newVisitantes = [...formData.visitantes];
    newVisitantes[index] = { ...newVisitantes[index], whatsapp: value || '' };
    setFormData(prev => ({ ...prev, visitantes: newVisitantes }));
  };

  const togglePhoneField = (index: number) => {
    const newVisitantes = [...formData.visitantes];
    newVisitantes[index] = { ...newVisitantes[index], showPhone: !newVisitantes[index].showPhone };
    setFormData(prev => ({ ...prev, visitantes: newVisitantes }));
  };

  const addNameField = () => {
    setFormData(prev => ({ ...prev, visitantes: [...prev.visitantes, { nome: '', whatsapp: '', showPhone: false }] }));
  };
  
  const removeNameField = (index: number) => {
    const newVisitantes = [...formData.visitantes];
    newVisitantes.splice(index, 1);
    setFormData(prev => ({ ...prev, visitantes: newVisitantes }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    const validVisitantes = formData.visitantes.filter(v => v.nome.trim() !== '');
    
    if (validVisitantes.length === 0 || !validVisitantes[0].whatsapp || !formData.origem) {
      setErrorMsg(t('errorsRequired'));
      return;
    }
    
    if (formData.origem === 'Amigo' && !formData.amigo) {
      setErrorMsg(t('errorFriend'));
      return;
    }
    
    if (!formData.cookieConsent || !formData.privacyConsent) {
      setErrorMsg(t('errorConsent'));
      return;
    }

    if (validVisitantes[0].whatsapp.length < 10) {
      setErrorMsg(t('errorPhone'));
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = await submitRegistration({
        visitantes: validVisitantes.map(v => ({ nome: v.nome, whatsapp: v.whatsapp })),
        origem: t(`origin${formData.origem === 'Redes sociais' ? 'Social' : formData.origem === 'Google' ? 'Google' : 'Friend'}`),
        amigo: formData.amigo,
        consentimentos: true
      });
      
      if (data.success) {
        onSuccess();
      } else {
        setErrorMsg(data.error || t('errorSubmit'));
      }
    } catch (error: any) {
      console.error(error);
      const msg = error instanceof Error ? error.message : t('errorNetwork');
      setErrorMsg(msg.includes('fetch') ? t('errorNetwork') : msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-7/12 flex items-center justify-center p-6 lg:p-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-slate-100">
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
           <div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">{t('formTitle')}</h2>
            <p className="text-slate-600">{t('formDesc')}</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r text-sm">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            {/* Visitantes */}
            <div className="space-y-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t('nameLabel')} <span className="text-red-500">*</span>
              </label>
              
              {formData.visitantes.map((v, index) => (
                <div key={index} className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 relative group animate-in slide-in-from-top-2 duration-300">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        value={v.nome}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-shadow bg-white"
                        placeholder={index === 0 ? t('namePlaceholder') : `${t('namePlaceholder')} (Extra)`}
                        required
                      />
                    </div>
                    {formData.visitantes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNameField(index)}
                        className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={t('removeVisitor')}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  {v.showPhone ? (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          {t('phoneLabel')} {index === 0 && <span className="text-red-500">*</span>}
                        </label>
                        {index > 0 && (
                           <button 
                             type="button" 
                             onClick={() => togglePhoneField(index)}
                             className="text-[10px] text-red-500 hover:underline"
                           >
                             remover telefone
                           </button>
                        )}
                      </div>
                      <PhoneInput
                        defaultCountry="GB"
                        international
                        countryOptionsOrder={['GB', 'BR', '|', '...']}
                        value={v.whatsapp}
                        onChange={(val) => handleVisitorPhoneChange(index, val)}
                        className="flex w-full px-4 py-3 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 outline-none transition-shadow bg-white custom-phone-input"
                        placeholder={t('phonePlaceholder')}
                        required={index === 0}
                      />
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => togglePhoneField(index)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-white px-3 py-1.5 rounded-full border border-blue-100 shadow-sm"
                    >
                      <Plus size={14} /> Adicionar telefone para {v.nome || 'visitante'}
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addNameField}
                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all font-medium flex items-center justify-center gap-2 mt-2"
              >
                <Plus size={18} /> {t('addVisitor')}
              </button>
            </div>

            <style>{`
              .custom-phone-input {
                --PhoneInputCountryFlag-height: 16px;
                --PhoneInputCountrySelectArrow-color: #64748b;
                --PhoneInputCountrySelectArrow-opacity: 1;
              }
              .custom-phone-input input {
                border: none;
                background: transparent;
                outline: none;
                flex: 1;
                min-width: 0;
                padding-left: 8px;
                font-size: 1rem;
              }
              .custom-phone-input .PhoneInputCountry {
                margin-right: 12px;
                padding-right: 12px;
                border-right: 1px solid #e2e8f0;
              }
            `}</style>

            {/* Como conheceu */}
            <div>
              <label htmlFor="origem" className="block text-sm font-medium text-slate-700 mb-1">
                {t('originLabel')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Info size={18} />
                </div>
                <select
                  id="origem"
                  name="origem"
                  value={formData.origem}
                  onChange={handleInputChange}
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none appearance-none bg-slate-50 focus:bg-white transition-shadow"
                  required
                >
                  <option value="" disabled>{t('originPlaceholder')}</option>
                  <option value="Redes sociais">{t('originSocial')}</option>
                  <option value="Google">{t('originGoogle')}</option>
                  <option value="Amigo">{t('originFriend')}</option>
                </select>
              </div>
            </div>

            {/* Nome do Amigo (condicional) */}
            {formData.origem === 'Amigo' && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label htmlFor="amigo" className="block text-sm font-medium text-slate-700 mb-1">
                  {t('friendLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="amigo"
                    name="amigo"
                    value={formData.amigo}
                    onChange={handleInputChange}
                    className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-shadow bg-blue-50/50 focus:bg-white"
                    placeholder={t('friendPlaceholder')}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Consentimentos */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="cookieConsent"
                  checked={formData.cookieConsent}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
                />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                {t('cookieConsent')} <span className="text-red-500">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
                />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors leading-tight">
                {t('termsConsent')} <span className="text-red-500">*</span>
              </span>
            </label>
            
            <div className="pl-8">
              <button 
                type="button" 
                onClick={onShowTerms}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2 flex items-center gap-1"
              >
                <HelpCircle size={14} /> {t('readTerms')}
              </button>
            </div>
          </div>

          <PromiseBox />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                {t('submittingText')}
              </>
            ) : (
              t('submitBtn')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
