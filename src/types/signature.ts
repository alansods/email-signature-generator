export type SignatureTemplate = 'classico' | 'compacto' | 'divisor';

export interface SignatureData {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  empresa: string;
}

export interface LogoData {
  dataUrl: string | null;
  detectedColor: string;
  colorDetected: boolean;
}

export interface SignatureState extends SignatureData, LogoData {
  template: SignatureTemplate;
}

// Re-export para garantir compatibilidade
export type { SignatureTemplate as Template };
export type { SignatureData as Data };
export type { LogoData as Logo };
export type { SignatureState as State };
