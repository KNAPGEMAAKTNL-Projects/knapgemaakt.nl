/**
 * Branded email templates for KNAP GEMAAKT.
 * Colors: ink #1A1A1A, canvas #FAFAF8, accent #14B8A6, warm #E8E4DE
 */

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  specification?: string;
  message?: string;
}

interface AanvraagData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  website_url?: string;
  specification?: string;
  start_time?: string;
  end_time?: string;
  booking_id?: string;
}

interface AuditData {
  name: string;
  email: string;
  website_url?: string;
}

// ─── Shared layout ───────────────────────────────────────

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#FAFAF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1A1A1A;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF8;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border:1px solid #E8E4DE;border-radius:12px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#1A1A1A;padding:24px 32px;">
              <span style="font-size:18px;font-weight:bold;color:#FFFFFF;letter-spacing:-0.02em;text-transform:uppercase;">KNAP GEMAAKT.</span>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #E8E4DE;background-color:#FAFAF8;">
              <p style="margin:0;font-size:12px;color:#4A4A4A;">
                KNAP GEMAAKT. &middot; Buren, Gelderland<br>
                <a href="https://knapgemaakt.nl" style="color:#14B8A6;text-decoration:none;">knapgemaakt.nl</a> &middot;
                <a href="tel:+31623571852" style="color:#14B8A6;text-decoration:none;">06-23571852</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 20px 0;font-size:22px;font-weight:bold;color:#1A1A1A;letter-spacing:-0.02em;">${text}</h2>`;
}

function fieldTable(rows: [string, string][]): string {
  const trs = rows
    .filter(([, val]) => val && val !== '-')
    .map(([label, value]) => `
      <tr>
        <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#4A4A4A;border-bottom:1px solid #E8E4DE;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:10px 12px;font-size:14px;color:#1A1A1A;border-bottom:1px solid #E8E4DE;">${value}</td>
      </tr>`)
    .join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E4DE;border-radius:8px;overflow:hidden;margin-bottom:20px;">${trs}</table>`;
}

function messageBlock(text: string): string {
  return `<div style="background-color:#FAFAF8;border-left:3px solid #14B8A6;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;">
    <p style="margin:0;font-size:14px;color:#1A1A1A;white-space:pre-wrap;">${escapeHtml(text)}</p>
  </div>`;
}

function ctaButton(text: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr>
      <td style="background-color:#1A1A1A;border-radius:8px;">
        <a href="${url}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:bold;color:#FFFFFF;text-decoration:none;letter-spacing:-0.01em;">${text}</a>
      </td>
    </tr>
  </table>`;
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ' om ' + d.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Amsterdam',
    });
  } catch {
    return iso;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Notification emails (to Yannick) ───────────────────

export function buildContactNotification(data: ContactData): string {
  return emailLayout(`
    ${heading('Nieuw bericht via contactformulier')}
    ${fieldTable([
      ['Naam', data.name],
      ['Bedrijf', data.company || '-'],
      ['E-mail', `<a href="mailto:${data.email}" style="color:#14B8A6;text-decoration:none;">${data.email}</a>`],
      ['Telefoon', data.phone || '-'],
      ['Onderwerp', data.specification || '-'],
    ])}
    ${data.message ? `<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#4A4A4A;">Bericht</p>${messageBlock(data.message)}` : ''}
    ${ctaButton('Beantwoorden', `mailto:${data.email}?subject=Re: ${encodeURIComponent(data.specification || 'Je bericht')}`)}
  `);
}

export function buildAanvraagNotification(data: AanvraagData): string {
  return emailLayout(`
    ${heading('Nieuwe kennismaking ingepland')}
    <p style="margin:0 0 20px;font-size:15px;color:#4A4A4A;">
      ${escapeHtml(data.name)} heeft een gesprek ingepland${data.start_time ? ` op <strong style="color:#1A1A1A;">${formatDateTime(data.start_time)}</strong>` : ''}.
    </p>
    ${fieldTable([
      ['Naam', data.name],
      ['Bedrijf', data.company || '-'],
      ['E-mail', `<a href="mailto:${data.email}" style="color:#14B8A6;text-decoration:none;">${data.email}</a>`],
      ['Telefoon', data.phone || '-'],
      ['Branche', data.industry || '-'],
      ['Website', data.website_url ? `<a href="${data.website_url}" style="color:#14B8A6;text-decoration:none;">${data.website_url}</a>` : '-'],
      ['Interesse in', data.specification || '-'],
    ])}
  `);
}

export function buildAuditNotification(data: AuditData): string {
  return emailLayout(`
    ${heading('Nieuwe website-audit aanvraag')}
    ${fieldTable([
      ['Naam', data.name],
      ['E-mail', `<a href="mailto:${data.email}" style="color:#14B8A6;text-decoration:none;">${data.email}</a>`],
      ['Website', data.website_url ? `<a href="${data.website_url}" style="color:#14B8A6;text-decoration:none;">${data.website_url}</a>` : '-'],
    ])}
    <p style="margin:20px 0 0;font-size:14px;color:#4A4A4A;">
      Bekijk de website en stuur binnen 2 werkdagen een persoonlijke video-analyse.
    </p>
    ${data.website_url ? ctaButton('Website bekijken', data.website_url) : ''}
  `);
}

// ─── Confirmation emails (to customer) ──────────────────

export function buildContactConfirmation(data: ContactData): string {
  return emailLayout(`
    ${heading('Bedankt voor je bericht')}
    <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;">
      Hoi ${escapeHtml(data.name.split(' ')[0])},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#4A4A4A;">
      Je bericht is ontvangen. Ik neem zo snel mogelijk contact met je op, meestal binnen een werkdag.
    </p>
    <div style="background-color:#FAFAF8;border-radius:8px;padding:16px 20px;margin:20px 0;border:1px solid #E8E4DE;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#4A4A4A;text-transform:uppercase;letter-spacing:0.05em;">Je bericht</p>
      <p style="margin:0;font-size:14px;color:#1A1A1A;"><strong>${escapeHtml(data.specification || '')}</strong></p>
      ${data.message ? `<p style="margin:8px 0 0;font-size:14px;color:#4A4A4A;white-space:pre-wrap;">${escapeHtml(data.message)}</p>` : ''}
    </div>
    <p style="margin:0;font-size:15px;color:#4A4A4A;">
      Groet,<br><strong style="color:#1A1A1A;">Yannick</strong><br>
      <span style="font-size:13px;">KNAP GEMAAKT.</span>
    </p>
  `);
}

export function buildAanvraagConfirmation(data: AanvraagData): string {
  return emailLayout(`
    ${heading('Je kennismaking is bevestigd')}
    <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;">
      Hoi ${escapeHtml(data.name.split(' ')[0])},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#4A4A4A;">
      Bedankt voor je aanvraag. Je gesprek is ingepland.
    </p>
    ${data.start_time ? `
    <div style="background-color:#FAFAF8;border-radius:8px;padding:20px;margin:20px 0;border:1px solid #E8E4DE;text-align:center;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#4A4A4A;text-transform:uppercase;letter-spacing:0.05em;">Datum &amp; tijd</p>
      <p style="margin:0;font-size:18px;font-weight:bold;color:#1A1A1A;">${formatDateTime(data.start_time)}</p>
    </div>
    ` : ''}
    <p style="margin:0 0 16px;font-size:15px;color:#4A4A4A;">
      Ik neem tijdens het gesprek de tijd om te begrijpen wat je bedrijf nodig heeft. Geen verkooppraatje, gewoon een eerlijk gesprek over de mogelijkheden.
    </p>
    <p style="margin:0 0 8px;font-size:15px;color:#4A4A4A;">
      Mocht je vragen hebben of het tijdstip willen wijzigen, bel of mail gerust:
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#4A4A4A;">
      <a href="tel:+31623571852" style="color:#14B8A6;text-decoration:none;">06-23571852</a> &middot;
      <a href="mailto:info@knapgemaakt.nl" style="color:#14B8A6;text-decoration:none;">info@knapgemaakt.nl</a>
    </p>
    <p style="margin:0;font-size:15px;color:#4A4A4A;">
      Tot snel,<br><strong style="color:#1A1A1A;">Yannick</strong><br>
      <span style="font-size:13px;">KNAP GEMAAKT.</span>
    </p>
  `);
}

// ─── Telegram notification ──────────────────────────────

export function buildTelegramMessage(type: 'contact' | 'aanvraag' | 'audit', data: ContactData | AanvraagData | AuditData): string {
  const lines: string[] = [];

  if (type === 'contact') {
    const d = data as ContactData;
    lines.push(`*Nieuw contactbericht*`);
    lines.push(``);
    lines.push(`*${esc(d.name)}*${d.company ? ` — ${esc(d.company)}` : ''}`);
    lines.push(`${esc(d.email)}${d.phone ? ` | ${esc(d.phone)}` : ''}`);
    if (d.specification) lines.push(`Onderwerp: ${esc(d.specification)}`);
    if (d.message) {
      lines.push(``);
      lines.push(`> ${esc(d.message).split('\n').join('\n> ')}`);
    }
  } else if (type === 'aanvraag') {
    const d = data as AanvraagData;
    lines.push(`*Nieuwe kennismaking ingepland*`);
    lines.push(``);
    lines.push(`*${esc(d.name)}*${d.company ? ` — ${esc(d.company)}` : ''}`);
    lines.push(`${esc(d.email)}${d.phone ? ` | ${esc(d.phone)}` : ''}`);
    if (d.industry) lines.push(`Branche: ${esc(d.industry)}`);
    if (d.website_url) lines.push(`Website: ${esc(d.website_url)}`);
    if (d.specification) lines.push(`Interesse: ${esc(d.specification)}`);
    if (d.start_time) {
      lines.push(``);
      lines.push(`Gesprek: ${formatDateTime(d.start_time)}`);
    }
  } else {
    const d = data as AuditData;
    lines.push(`*Nieuwe audit aanvraag*`);
    lines.push(``);
    lines.push(`*${esc(d.name)}*`);
    lines.push(`${esc(d.email)}`);
    if (d.website_url) lines.push(`Website: ${esc(d.website_url)}`);
  }

  return lines.join('\n');
}

/** Escape Telegram MarkdownV2 special characters */
function esc(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}
