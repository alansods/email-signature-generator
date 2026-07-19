import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { extractDominantColor } from '../lib/colorExtractor';

export type SignatureTemplate = 'classico' | 'compacto' | 'divisor';

export interface SignatureState {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  empresa: string;
  dataUrl: string | null;
  detectedColor: string;
  colorDetected: boolean;
  template: SignatureTemplate;
}

export interface ValidationErrors {
  nome?: boolean;
  cargo?: boolean;
  email?: 'required' | 'invalid' | false;
  telefone?: 'required' | 'invalid' | false;
  empresa?: boolean;
  logo?: boolean;
}

const DEFAULT_COLOR = '#0047BB';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
// PT-BR: (11) 91234-5678 or (11) 1234-5678 or variations
const PHONE_REGEX_PT_BR = /^[\s(]*\d{2}[\s)]*\d{4,5}[\s-]*\d{4}$/;
// EN (US): (555) 123-4567 or 555-123-4567 or variations
const PHONE_REGEX_EN = /^[\s(]*\d{3}[\s)]*\d{3}[\s-]*\d{4}$/;

// Phone formatting functions
const formatPhonePTBR = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length === 0) return '';
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

const formatPhoneEN = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length === 0) return '';
  if (numbers.length <= 3) return `(${numbers}`;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

export function useSignature() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<SignatureState>({
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    empresa: '',
    dataUrl: null,
    detectedColor: DEFAULT_COLOR,
    colorDetected: false,
    template: 'classico',
  });

  const [isProcessingLogo, setIsProcessingLogo] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Updates a form field and clears its validation error
  const updateField = useCallback((field: keyof SignatureState, value: string) => {
    // Apply phone mask if field is telefone
    let finalValue = value;
    if (field === 'telefone') {
      const formatFunction = i18n.language === 'pt-BR' ? formatPhonePTBR : formatPhoneEN;
      finalValue = formatFunction(value);
    }

    setState((prev) => ({ ...prev, [field]: finalValue }));
    // Clear validation error for this field when user types
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: false }));
    }
  }, [validationErrors, i18n.language]);

  // Handles logo upload
  const handleLogoUpload = useCallback(async (file: File | null) => {
    if (!file) return;

    // Validates file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert(t('messages.fileTooLarge'));
      return;
    }

    setIsProcessingLogo(true);

    try {
      // Converts to data URL
      const reader = new FileReader();

      reader.onload = async () => {
        const dataUrl = reader.result as string;

        // Updates logo
        setState((prev) => ({ ...prev, dataUrl }));

        // Clear logo validation error
        setValidationErrors((prev) => ({ ...prev, logo: false }));

        // Extracts dominant color
        const detectedColor = await extractDominantColor(dataUrl);

        if (detectedColor) {
          setState((prev) => ({
            ...prev,
            detectedColor,
            colorDetected: true,
          }));
        }

        setIsProcessingLogo(false);
      };

      reader.onerror = () => {
        alert('Erro ao carregar imagem.');
        setIsProcessingLogo(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro ao processar logo:', error);
      alert('Erro ao processar imagem.');
      setIsProcessingLogo(false);
    }
  }, [t]);

  // Removes logo
  const removeLogo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      dataUrl: null,
      detectedColor: DEFAULT_COLOR,
      colorDetected: false,
    }));
  }, []);

  // Selects template
  const selectTemplate = useCallback((template: SignatureTemplate) => {
    setState((prev) => ({ ...prev, template }));
  }, []);

  // Validates form and shows errors if invalid
  const validateForm = useCallback((): boolean => {
    // Validate email field
    let emailError: 'required' | 'invalid' | false = false;
    if (!state.email.trim()) {
      emailError = 'required';
    } else if (!EMAIL_REGEX.test(state.email.trim())) {
      emailError = 'invalid';
    }

    // Validate phone field based on current language
    let phoneError: 'required' | 'invalid' | false = false;
    if (!state.telefone.trim()) {
      phoneError = 'required';
    } else {
      const phoneRegex = i18n.language === 'pt-BR' ? PHONE_REGEX_PT_BR : PHONE_REGEX_EN;
      if (!phoneRegex.test(state.telefone.trim())) {
        phoneError = 'invalid';
      }
    }

    const errors: ValidationErrors = {
      nome: !state.nome.trim(),
      cargo: !state.cargo.trim(),
      email: emailError,
      telefone: phoneError,
      empresa: !state.empresa.trim(),
      logo: !state.dataUrl,
    };

    setValidationErrors(errors);

    // Returns true if no errors
    return !Object.values(errors).some((hasError) => hasError);
  }, [state.nome, state.cargo, state.email, state.telefone, state.empresa, state.dataUrl, i18n.language]);

  // Reformat phone when language changes
  useEffect(() => {
    setState((prev) => {
      if (prev.telefone) {
        const formatFunction = i18n.language === 'pt-BR' ? formatPhonePTBR : formatPhoneEN;
        const reformatted = formatFunction(prev.telefone);
        if (reformatted !== prev.telefone) {
          return { ...prev, telefone: reformatted };
        }
      }
      return prev;
    });
    // Clear phone validation error when language changes
    setValidationErrors((prev) => ({ ...prev, telefone: false }));
  }, [i18n.language]);

  return {
    state,
    isProcessingLogo,
    validationErrors,
    validateForm,
    updateField,
    handleLogoUpload,
    removeLogo,
    selectTemplate,
  };
}
