import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-0.5 border border-neutral-300 rounded-lg overflow-hidden">
      <Button
        type="button"
        onClick={() => switchLanguage('en')}
        className={
          currentLang === 'en'
            ? 'bg-brand-blue text-white hover:bg-brand-blue/90 border-0 rounded-none h-9 px-3 text-sm font-medium'
            : 'bg-white text-neutral-900 hover:bg-neutral-100 border-0 rounded-none h-9 px-3 text-sm font-medium'
        }
        aria-label="Switch to English"
        aria-pressed={currentLang === 'en'}
      >
        🇺🇸 EN
      </Button>
      <Button
        type="button"
        onClick={() => switchLanguage('pt-BR')}
        className={
          currentLang === 'pt-BR'
            ? 'bg-brand-blue text-white hover:bg-brand-blue/90 border-0 rounded-none h-9 px-3 text-sm font-medium'
            : 'bg-white text-neutral-900 hover:bg-neutral-100 border-0 rounded-none h-9 px-3 text-sm font-medium'
        }
        aria-label="Mudar para Português"
        aria-pressed={currentLang === 'pt-BR'}
      >
        🇧🇷 PT
      </Button>
    </div>
  );
}
