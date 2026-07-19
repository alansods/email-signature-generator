import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSignature } from '@/hooks/useSignature';
import { SignatureForm } from '@/components/SignatureForm';
import { SignaturePreview } from '@/components/SignaturePreview';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();
  const {
    state,
    isProcessingLogo,
    validationErrors,
    validateForm,
    updateField,
    handleLogoUpload,
    removeLogo,
    selectTemplate,
  } = useSignature();

  return (
    <div className="min-h-screen bg-neutral-100 font-sans antialiased p-4 md:p-6 flex flex-col items-center gap-6">

      <div className="w-full max-w-7xl flex items-center gap-3.5">
        <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-brand-blue-soft flex items-center justify-center text-brand-blue shrink-0">
          <Mail className="w-5 h-5 md:w-5.5 md:h-5.5" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-xl font-medium text-brand-blue leading-snug">
            {t('header.title')}
          </h1>
          <p className="text-xs md:text-sm text-neutral-600 leading-normal">
            {t('header.subtitle')}
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 md:gap-6 items-start">

        <SignatureForm
          state={state}
          isProcessingLogo={isProcessingLogo}
          validationErrors={validationErrors}
          onFieldChange={updateField}
          onLogoUpload={handleLogoUpload}
          onLogoRemove={removeLogo}
        />

        <SignaturePreview
          data={{
            nome: state.nome,
            cargo: state.cargo,
            email: state.email,
            telefone: state.telefone,
            empresa: state.empresa,
          }}
          template={state.template}
          color={state.detectedColor}
          logoDataUrl={state.dataUrl}
          onValidate={validateForm}
          onTemplateSelect={selectTemplate}
        />
      </div>
    </div>
  );
}

export default App;
