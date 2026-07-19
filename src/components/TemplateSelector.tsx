import { useTranslation } from 'react-i18next';
import type { SignatureTemplate } from '../hooks/useSignature';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selected: SignatureTemplate;
  onSelect: (template: SignatureTemplate) => void;
}

const templates: Array<{ id: SignatureTemplate; labelKey: string }> = [
  { id: 'classico', labelKey: 'templates.classic' },
  { id: 'compacto', labelKey: 'templates.compact' },
  { id: 'divisor', labelKey: 'templates.divider' },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-1.5 flex-wrap">
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onSelect(template.id)}
          className={cn(
            'px-2.5 py-1.5 rounded text-xs font-medium transition-all border cursor-pointer',
            selected === template.id
              ? 'border-brand-blue bg-brand-blue-soft text-brand-blue'
              : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-150'
          )}
        >
          {t(template.labelKey)}
        </button>
      ))}
    </div>
  );
}
