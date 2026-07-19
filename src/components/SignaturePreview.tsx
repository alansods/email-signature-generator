import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { buildSignatureHtml, buildPlainText } from '@/lib/signatureBuilder';
import { TemplateSelector } from '@/components/TemplateSelector';
import type { SignatureTemplate } from '../hooks/useSignature';

interface SignatureData {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  empresa: string;
}

interface SignaturePreviewProps {
  data: SignatureData;
  template: SignatureTemplate;
  color: string;
  logoDataUrl: string | null;
  onValidate: () => boolean;
  onTemplateSelect: (template: SignatureTemplate) => void;
}

export function SignaturePreview({ data, template, color, logoDataUrl, onValidate, onTemplateSelect }: SignaturePreviewProps) {
  const { t } = useTranslation();
  const previewRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState('');

  const placeholders = {
    name: t('placeholders.name'),
    jobTitle: t('placeholders.jobTitle'),
    company: t('placeholders.company'),
    email: t('placeholders.email'),
    phone: t('placeholders.phone'),
  };

  const signatureHtml = buildSignatureHtml(data, template, color, logoDataUrl, placeholders);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 3500);
  };

  const handleCopy = async () => {
    // Validate form first
    if (!onValidate()) {
      return;
    }

    const html = signatureHtml;
    const plain = buildPlainText(data, placeholders);

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' }),
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(plain);
      }
      showToast(t('messages.copiedSuccess'));
    } catch (error) {
      console.error('Erro ao copiar:', error);
      showToast(t('messages.copyError'));
    }
  };

  const handleDownload = async () => {
    // Validate form first
    if (!onValidate()) {
      return;
    }

    try {
      // Dynamically imports html2canvas
      const { default: html2canvas } = await import('html2canvas');

      const node = previewRef.current;
      if (!node) return;

      const canvas = await html2canvas(node, {
        backgroundColor: '#ffffff',
        scale: 2, // 2x resolution for better quality
      });

      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'assinatura-email.png';
        a.click();
        URL.revokeObjectURL(url);

        showToast(t('messages.downloadSuccess'));
      });
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
      showToast(t('messages.downloadError'));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="border-b border-neutral-300 py-4 md:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          <CardTitle className="text-sm font-medium text-neutral-600">
            {t('preview.title')}
          </CardTitle>
          <TemplateSelector
            selected={template}
            onSelect={onTemplateSelect}
          />
        </CardHeader>
        <CardContent className="p-4 md:p-8">
          <div
            ref={previewRef}
            className="p-2 max-w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: signatureHtml }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 md:p-5 flex flex-col gap-3">
          <Button
            onClick={handleCopy}
            size="lg"
            className="w-full h-12 md:h-11 text-base md:text-sm"
          >
            <Copy className="w-4 h-4 mr-2" />
            {t('preview.copy')}
          </Button>

          <Button
            onClick={handleDownload}
            variant="outline"
            size="default"
            className="w-full h-11 md:h-10"
          >
            <Download className="w-4 h-4 mr-2" />
            {t('preview.download')}
          </Button>

          {toast && (
            <p className="text-sm text-green-600 font-medium text-center">
              {toast}
            </p>
          )}

          <CardDescription className="text-xs text-neutral-500 text-center">
            {t('preview.hint')}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
