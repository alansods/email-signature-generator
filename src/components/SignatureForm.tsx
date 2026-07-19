import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoUpload } from '@/components/LogoUpload';
import type { SignatureState, ValidationErrors } from '../hooks/useSignature';

interface SignatureFormProps {
  state: SignatureState;
  isProcessingLogo: boolean;
  validationErrors: ValidationErrors;
  onFieldChange: (field: keyof SignatureState, value: string) => void;
  onLogoUpload: (file: File | null) => void;
  onLogoRemove: () => void;
}

export function SignatureForm({
  state,
  isProcessingLogo,
  validationErrors,
  onFieldChange,
  onLogoUpload,
  onLogoRemove,
}: SignatureFormProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col gap-6 md:gap-6">
        {/* Personal Information */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-medium text-neutral-900">
            {t('form.personalInfo')}
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="nome">{t('form.fullName')}</Label>
              <Input
                id="nome"
                type="text"
                placeholder={t('placeholders.name')}
                value={state.nome}
                onChange={(e) => onFieldChange('nome', e.target.value)}
                className={validationErrors.nome ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {validationErrors.nome && (
                <span className="text-xs text-red-600">{t('validation.required')}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="cargo">{t('form.jobTitle')}</Label>
              <Input
                id="cargo"
                type="text"
                placeholder={t('placeholders.jobTitle')}
                value={state.cargo}
                onChange={(e) => onFieldChange('cargo', e.target.value)}
                className={validationErrors.cargo ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {validationErrors.cargo && (
                <span className="text-xs text-red-600">{t('validation.required')}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">{t('form.email')}</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                placeholder={t('placeholders.email')}
                value={state.email}
                onChange={(e) => onFieldChange('email', e.target.value)}
                className={validationErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {validationErrors.email && (
                <span className="text-xs text-red-600">
                  {validationErrors.email === 'invalid' ? t('validation.invalidEmail') : t('validation.required')}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="telefone">{t('form.phone')}</Label>
              <Input
                id="telefone"
                type="tel"
                inputMode="tel"
                placeholder={t('placeholders.phone')}
                value={state.telefone}
                onChange={(e) => onFieldChange('telefone', e.target.value)}
                className={validationErrors.telefone ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {validationErrors.telefone && (
                <span className="text-xs text-red-600">
                  {validationErrors.telefone === 'invalid' ? t('validation.invalidPhone') : t('validation.required')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-300" />

        {/* Company and Logo */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-medium text-neutral-900">
            {t('form.companySection')}
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="empresa">{t('form.companyName')}</Label>
              <Input
                id="empresa"
                type="text"
                placeholder={t('placeholders.company')}
                value={state.empresa}
                onChange={(e) => onFieldChange('empresa', e.target.value)}
                className={validationErrors.empresa ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {validationErrors.empresa && (
                <span className="text-xs text-red-600">{t('validation.required')}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <LogoUpload
                logoDataUrl={state.dataUrl}
                isProcessing={isProcessingLogo}
                onUpload={onLogoUpload}
                onRemove={onLogoRemove}
              />
              {validationErrors.logo && (
                <span className="text-xs text-red-600">{t('validation.logoRequired')}</span>
              )}
              <p className="text-xs text-neutral-500">
                {t('form.logoHint')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
