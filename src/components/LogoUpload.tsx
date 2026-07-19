import { useRef, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface LogoUploadProps {
  logoDataUrl: string | null;
  isProcessing: boolean;
  onUpload: (file: File | null) => void;
  onRemove: () => void;
}

export function LogoUpload({
  logoDataUrl,
  isProcessing,
  onUpload,
  onRemove,
}: LogoUploadProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onUpload(file);
    // Clears the input to allow uploading the same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label={t('form.logoUpload')}
      />

      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={handleButtonClick}
        disabled={isProcessing}
        className="h-11"
      >
        <Upload className="w-4 h-4 mr-2" />
        {isProcessing ? t('form.logoProcessing') : t('form.logoUpload')}
      </Button>

      {logoDataUrl && (
        <div className="flex items-center gap-2">
          <img
            src={logoDataUrl}
            alt="Logo preview"
            className="w-11 h-11 rounded-md object-contain border border-neutral-300"
          />
          <button
            type="button"
            onClick={onRemove}
            className="text-brand-red text-sm font-medium hover:opacity-80 transition-opacity p-1 cursor-pointer"
            aria-label="Remover logo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
