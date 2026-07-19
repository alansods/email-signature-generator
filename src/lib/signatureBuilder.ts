type SignatureTemplate = 'classico' | 'compacto' | 'divisor';

interface SignatureData {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  empresa: string;
}

interface PlaceholderTranslations {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
}

/**
 * Escapes HTML characters to prevent XSS
 */
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Returns display values with fallbacks for empty fields
 */
function getDisplayValues(
  data: SignatureData,
  placeholders: PlaceholderTranslations
): SignatureData {
  return {
    nome: data.nome.trim() || placeholders.name,
    cargo: data.cargo.trim() || placeholders.jobTitle,
    empresa: data.empresa.trim() || placeholders.company,
    email: data.email.trim() || placeholders.email,
    telefone: data.telefone.trim() || placeholders.phone,
  };
}

/**
 * Builds the signature HTML based on the selected template
 */
export function buildSignatureHtml(
  data: SignatureData,
  template: SignatureTemplate,
  color: string,
  logoDataUrl: string | null,
  placeholders: PlaceholderTranslations
): string {
  const d = getDisplayValues(data, placeholders);
  const esc = escapeHtml;

  const nome = esc(d.nome);
  const cargo = esc(d.cargo);
  const empresa = esc(d.empresa);
  const email = esc(d.email);
  const telefone = esc(d.telefone);

  const font = 'Arial, Helvetica, sans-serif';

  // Logo placeholder or actual image
  const logoPlaceholder = `<table cellpadding="0" cellspacing="0" border="0" style="width:96px;height:96px;background:#F1F5F9;border:1px dashed #CBD5E1;border-radius:10px;"><tr><td align="center" valign="middle" style="font-size:12px;color:#94A3B8;font-family:${font};letter-spacing:0.05em;">LOGO</td></tr></table>`;

  const logoImg = logoDataUrl
    ? `<img src="${logoDataUrl}" alt="${empresa}" style="display:block;max-width:120px;max-height:120px;border-radius:8px;object-fit:contain;"/>`
    : logoPlaceholder;

  const logoCell = `<td style="padding:0 20px 0 0;vertical-align:middle;">${logoImg}</td>`;

  // Compact Template
  if (template === 'compacto') {
    const logoRow = `<tr><td style="padding-bottom:10px;">${logoImg}</td></tr>`;
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};">${logoRow}<tr><td>
      <div style="font-size:16px;font-weight:bold;color:#1A202C;">${nome}</div>
      <div style="font-size:13px;color:#64748B;margin:2px 0 8px;">${cargo} — ${empresa}</div>
      <div style="width:32px;height:3px;background:${color};margin-bottom:8px;"></div>
      <div style="font-size:13px;color:#1A202C;"><a href="mailto:${email}" style="color:${color};text-decoration:none;font-weight:bold;">${email}</a> &nbsp;·&nbsp; ${telefone}</div>
    </td></tr></table>`;
  }

  // Colored Divider Template
  if (template === 'divisor') {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};"><tr>
      <td style="width:4px;background:${color};padding:0;font-size:1px;line-height:1px;">&nbsp;</td>
      <td style="width:14px;padding:0;font-size:1px;line-height:1px;">&nbsp;</td>
      ${logoCell}
      <td style="vertical-align:middle;">
        <div style="font-size:17px;font-weight:bold;color:${color};margin:0 0 2px;">${nome}</div>
        <div style="font-size:13px;color:#1A202C;margin:0 0 8px;">${cargo} · ${empresa}</div>
        <div style="font-size:13px;color:#475569;line-height:1.6;"><a href="mailto:${email}" style="color:#475569;text-decoration:none;">${email}</a><br/>${telefone}</div>
      </td>
    </tr></table>`;
  }

  // Classic Template (default)
  const divider = `<td style="padding:0 20px 0 0;"><div style="width:2px;height:64px;background:${color};font-size:1px;">&nbsp;</div></td>`;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};"><tr>
    ${logoCell}${divider}
    <td style="vertical-align:middle;">
      <div style="font-size:17px;font-weight:bold;color:#1A202C;margin:0 0 2px;">${nome}</div>
      <div style="font-size:14px;color:${color};font-weight:bold;margin:0 0 8px;">${cargo} · ${empresa}</div>
      <div style="font-size:13px;color:#475569;line-height:1.6;">${telefone}<br/><a href="mailto:${email}" style="color:#475569;text-decoration:none;">${email}</a></div>
    </td>
  </tr></table>`;
}

/**
 * Builds plain text version of the signature
 */
export function buildPlainText(
  data: SignatureData,
  placeholders: PlaceholderTranslations
): string {
  const d = getDisplayValues(data, placeholders);
  return `${d.nome}\n${d.cargo} — ${d.empresa}\n${d.telefone} | ${d.email}`;
}
