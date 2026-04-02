/**
 * Branded email templates for KNAP GEMAAKT.
 * Colors: ink #1A1A1A, canvas #FAFAF8, canvas-alt #F5F3EF, accent #14B8A6, warm #E8E4DE
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
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background-color:#F5F3EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1A1A1A;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3EF;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FAFAF8;border:1px solid #E8E4DE;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #E8E4DE;">
              <span style="font-size:18px;font-weight:900;color:#1A1A1A;letter-spacing:-0.5px;text-transform:uppercase;">KNAP GEMAAKT.</span>
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
            <td style="padding:20px 32px;border-top:1px solid #E8E4DE;background-color:#F5F3EF;">
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
  return `<h1 style="margin:0 0 20px 0;font-size:24px;font-weight:800;color:#1A1A1A;letter-spacing:-0.5px;line-height:1.2;">${text}</h1>`;
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
  return `<div style="background-color:#F5F3EF;border-left:3px solid #14B8A6;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;">
    <p style="margin:0;font-size:14px;color:#1A1A1A;white-space:pre-wrap;">${escapeHtml(text)}</p>
  </div>`;
}

function ctaButton(text: string, url: string, secondary = false): string {
  const bg = secondary ? '#F5F3EF' : '#1A1A1A';
  const color = secondary ? '#1A1A1A' : '#FAFAF8';
  const border = secondary ? 'border:1px solid #E8E4DE;' : '';
  return `<a href="${url}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:700;color:${color};background-color:${bg};${border}text-decoration:none;border-radius:8px;letter-spacing:0.3px;margin-right:10px;margin-bottom:10px;">${text}</a>`;
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Amsterdam',
    });
    const time = d.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Amsterdam',
    });
    return date.charAt(0).toUpperCase() + date.slice(1) + ' om ' + time;
  } catch {
    return iso;
  }
}

function formatDateOnly(iso: string): string {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Amsterdam',
    });
    return date.charAt(0).toUpperCase() + date.slice(1);
  } catch {
    return iso;
  }
}

function formatTimeOnly(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('nl-NL', {
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

// ─── Calendar helpers ────────────────────────────────────

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d{3}/g, '');
}

function buildGoogleCalendarUrl(data: AanvraagData, isInternal: boolean): string {
  const start = new Date(data.start_time!);
  const end = new Date(start.getTime() + 15 * 60000);

  const title = isInternal
    ? `Gesprek met ${data.name}`
    : 'Bellen met Yannick (KNAP GEMAAKT.)';

  const details = isInternal
    ? `Naam: ${data.name}\nBedrijf: ${data.company || '-'}\nTel: ${data.phone}\nEmail: ${data.email}\nWebsite: ${data.website_url || '-'}\nOnderwerp: ${data.specification || 'Kennismaking'}`
    : 'Kennismakingsgesprek met Yannick over jouw project.';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: formatICSDate(start) + '/' + formatICSDate(end),
    details,
    location: 'Telefonisch',
    trp: 'true',
  });

  return 'https://calendar.google.com/calendar/render?' + params.toString();
}

export function buildICSContent(data: AanvraagData, isInternal: boolean): string {
  const start = new Date(data.start_time!);
  const end = new Date(start.getTime() + 15 * 60000);
  const uid = (data.booking_id || Date.now()) + (isInternal ? '-internal' : '') + '@knapgemaakt.nl';

  const summary = isInternal
    ? `Gesprek met ${data.name}`
    : 'Bellen met Yannick (KNAP GEMAAKT.)';

  const description = isInternal
    ? `Tel: ${data.phone}\\nEmail: ${data.email}\\nOnderwerp: ${data.specification || 'Kennismaking'}`
    : 'Kennismakingsgesprek met Yannick over jouw project.';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//KNAP GEMAAKT//Booking//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Telefonisch',
    `ORGANIZER;CN=Yannick Veldhuisen:mailto:yannick@knapgemaakt.nl`,
    isInternal
      ? 'ATTENDEE;CN=Yannick Veldhuisen;RSVP=TRUE:mailto:yannick@knapgemaakt.nl'
      : `ATTENDEE;CN=${data.name.split(' ')[0]};RSVP=TRUE:mailto:${data.email}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

// ─── Contextual questions ────────────────────────────────

function getContextualQuestions(specification: string): { title: string; questions: string[] } | null {
  const sections: Record<string, { title: string; questions: string[] }> = {
    'Website laten maken': {
      title: 'Om alvast over na te denken',
      questions: [
        'Heb je al een idee van de stijl die je mooi vindt?',
        'Zijn er websites die je aanspreken? (mag van alles zijn)',
        'Wat is het belangrijkste doel van je website?',
      ],
    },
    'Advies gesprek': {
      title: 'Om alvast over na te denken',
      questions: [
        'Waar loop je momenteel tegenaan?',
        'Wat zou je graag willen bereiken?',
        'Heb je al iets geprobeerd?',
      ],
    },
    'Bestaande website verbeteren': {
      title: 'Om alvast over na te denken',
      questions: [
        'Wat werkt goed aan je huidige website?',
        'Wat zou je graag anders zien?',
        'Krijg je feedback van klanten over de website?',
      ],
    },
    'Automatisering bespreken': {
      title: 'Om alvast over na te denken',
      questions: [
        'Welke taken kosten je nu veel tijd?',
        'Welke tools gebruik je al? (mail, agenda, boekhouding, etc.)',
        'Wat zou je dag makkelijker maken?',
      ],
    },
  };

  return sections[specification] || null;
}

function contextualSection(specification: string): string {
  const ctx = getContextualQuestions(specification);
  if (!ctx) return '';

  const items = ctx.questions.map(q =>
    `<li style="margin-bottom:8px;color:#4A4A4A;">${q}</li>`
  ).join('');

  return `<div style="margin:24px 0;padding:24px;background-color:#F5F3EF;border:1px solid #E8E4DE;border-radius:12px;">
    <p style="margin:0 0 16px;font-size:14px;color:#14B8A6;font-weight:600;">${ctx.title}</p>
    <ul style="margin:0;padding-left:24px;font-size:15px;line-height:1.8;">${items}</ul>
  </div>`;
}

// ─── Notification emails (to Yannick) ───────────────────

export function buildContactNotification(data: ContactData): string {
  return emailLayout(`
    ${heading('Nieuw bericht via contactformulier')}
    ${fieldTable([
      ['Naam', data.name],
      ['Bedrijf', data.company || '-'],
      ['E-mail', `<a href="mailto:${data.email}" style="color:#14B8A6;text-decoration:none;">${data.email}</a>`],
      ['Telefoon', data.phone ? `<a href="tel:${data.phone}" style="color:#14B8A6;text-decoration:none;">${data.phone}</a>` : '-'],
      ['Onderwerp', data.specification || '-'],
    ])}
    ${data.message ? `<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#4A4A4A;">Bericht</p>${messageBlock(data.message)}` : ''}
    ${ctaButton('Beantwoorden', `mailto:${data.email}?subject=Re: ${encodeURIComponent(data.specification || 'Je bericht')}&body=${encodeURIComponent(`\n\n---\nOrigineel bericht van ${data.name}:\n\n${data.message || ''}`)}`)}\
    ${data.phone ? ctaButton('Bel direct', `tel:${data.phone}`, true) : ''}
  `);
}

export function buildAanvraagNotification(data: AanvraagData): string {
  const spec = data.specification || 'Kennismaking';
  const websiteDisplay = data.website_url ? data.website_url.replace(/^https?:\/\//, '') : '';

  return emailLayout(`
    <div style="background-color:#14B8A6;margin:-32px -32px 24px -32px;padding:12px 32px;border-radius:0;">
      <p style="margin:0;color:#ffffff;font-weight:700;font-size:14px;">${escapeHtml(spec)}</p>
    </div>
    <h1 style="margin:0 0 5px 0;font-size:24px;font-weight:800;color:#1A1A1A;">${escapeHtml(data.name)}</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#4A4A4A;">heeft een afspraak ingepland</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding-bottom:16px;">
          <span style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#4A4A4A;letter-spacing:1px;display:block;margin-bottom:4px;">Wanneer</span>
          <span style="font-size:16px;font-weight:500;color:#1A1A1A;">${data.start_time ? formatDateTime(data.start_time) : '-'}</span>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:16px;">
          <span style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#4A4A4A;letter-spacing:1px;display:block;margin-bottom:4px;">Telefoon</span>
          <a href="tel:${data.phone}" style="font-size:16px;font-weight:500;color:#14B8A6;text-decoration:none;">${data.phone || '-'}</a>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:16px;">
          <span style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#4A4A4A;letter-spacing:1px;display:block;margin-bottom:4px;">Email</span>
          <a href="mailto:${data.email}" style="font-size:16px;font-weight:500;color:#1A1A1A;text-decoration:none;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:16px;">
          <span style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#4A4A4A;letter-spacing:1px;display:block;margin-bottom:4px;">Bedrijf</span>
          <span style="font-size:16px;font-weight:500;color:#1A1A1A;">${escapeHtml(data.company || '-')}</span>
          ${data.industry ? `<span style="font-size:13px;color:#4A4A4A;display:block;margin-top:2px;">${escapeHtml(data.industry)}</span>` : ''}
        </td>
      </tr>
      ${data.website_url ? `
      <tr>
        <td style="padding-bottom:16px;">
          <span style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#4A4A4A;letter-spacing:1px;display:block;margin-bottom:4px;">Website</span>
          <a href="${data.website_url}" target="_blank" style="font-size:16px;font-weight:500;color:#14B8A6;text-decoration:underline;">${escapeHtml(websiteDisplay)}</a>
        </td>
      </tr>` : ''}
    </table>
    <div style="border-top:1px solid #E8E4DE;padding-top:20px;">
      ${data.start_time ? ctaButton('Toevoegen aan agenda', buildGoogleCalendarUrl(data, true)) : ''}
      ${data.phone ? ctaButton('Bel direct', `tel:${data.phone}`, true) : ''}
    </div>
    ${data.booking_id ? `<p style="margin:20px 0 0;font-family:monospace;font-size:10px;color:#4A4A4A;">Booking #${data.booking_id}</p>` : ''}
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
    ${data.website_url ? `<div style="margin-top:20px;">${ctaButton('Website bekijken', data.website_url)}</div>` : ''}
  `);
}

// ─── Confirmation emails (to customer) ──────────────────

export function buildContactConfirmation(data: ContactData): string {
  return emailLayout(`
    ${heading('Bedankt voor je bericht')}
    <p style="margin:0 0 16px;font-size:16px;color:#1A1A1A;line-height:1.7;">
      Hoi ${escapeHtml(data.name.split(' ')[0])},
    </p>
    <p style="margin:0 0 16px;font-size:16px;color:#4A4A4A;line-height:1.7;">
      Je bericht is ontvangen. Ik neem zo snel mogelijk contact met je op, meestal binnen een werkdag.
    </p>
    <div style="background-color:#F5F3EF;border-radius:8px;padding:16px 20px;margin:20px 0;border:1px solid #E8E4DE;">
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
  const firstName = data.name.split(' ')[0];
  const spec = data.specification || 'Kennismaking';

  return emailLayout(`
    ${heading('Je afspraak staat!')}
    <p style="margin:0 0 24px;font-size:16px;color:#4A4A4A;line-height:1.7;">
      Hoi ${escapeHtml(firstName)},<br><br>
      Top dat je een afspraak hebt ingepland! Ik bel je op het afgesproken moment.
    </p>
    ${data.start_time ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E4DE;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <tr>
        <td width="30%" style="padding:15px;border-bottom:1px solid #E8E4DE;border-right:1px solid #E8E4DE;background-color:#F5F3EF;">
          <span style="font-family:monospace;font-size:11px;color:#4A4A4A;text-transform:uppercase;letter-spacing:1px;">Datum</span>
        </td>
        <td style="padding:15px;border-bottom:1px solid #E8E4DE;background-color:#FAFAF8;">
          <span style="font-size:16px;font-weight:500;color:#1A1A1A;">${formatDateOnly(data.start_time)}</span>
        </td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px;border-bottom:1px solid #E8E4DE;border-right:1px solid #E8E4DE;background-color:#F5F3EF;">
          <span style="font-family:monospace;font-size:11px;color:#4A4A4A;text-transform:uppercase;letter-spacing:1px;">Tijd</span>
        </td>
        <td style="padding:15px;border-bottom:1px solid #E8E4DE;background-color:#FAFAF8;">
          <span style="font-size:16px;font-weight:500;color:#1A1A1A;">${formatTimeOnly(data.start_time)}</span>
        </td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px;border-right:1px solid #E8E4DE;background-color:#F5F3EF;">
          <span style="font-family:monospace;font-size:11px;color:#4A4A4A;text-transform:uppercase;letter-spacing:1px;">Onderwerp</span>
        </td>
        <td style="padding:15px;background-color:#FAFAF8;">
          <span style="font-size:16px;font-weight:500;color:#1A1A1A;">${escapeHtml(spec)}</span>
        </td>
      </tr>
    </table>` : ''}
    ${data.phone ? `
    <div style="border:2px solid #14B8A6;border-radius:12px;padding:25px;text-align:center;margin-bottom:24px;background-color:#F5F3EF;">
      <p style="margin:0 0 8px;font-size:14px;color:#14B8A6;font-weight:600;">Ik bel je op</p>
      <p style="margin:0;font-size:24px;font-weight:700;color:#1A1A1A;letter-spacing:1px;">${escapeHtml(data.phone)}</p>
    </div>` : ''}
    ${contextualSection(spec)}
    ${data.start_time ? `
    <div style="margin-bottom:24px;text-align:center;">
      ${ctaButton('Toevoegen aan agenda', buildGoogleCalendarUrl(data, false))}
      <p style="margin:12px 0 0;font-size:12px;color:#4A4A4A;">Voor Apple/Outlook: open de bijlage invite.ics</p>
    </div>` : ''}
    <p style="margin:0;font-size:14px;line-height:1.6;color:#4A4A4A;">
      Komt er iets tussen? Geen probleem, stuur me even een berichtje via
      <a href="mailto:yannick@knapgemaakt.nl" style="color:#14B8A6;text-decoration:none;font-weight:500;">yannick@knapgemaakt.nl</a>
      of reageer op deze mail.
    </p>
    <p style="margin:24px 0 0;font-size:14px;color:#4A4A4A;">
      Groet,<br><strong style="color:#1A1A1A;">Yannick</strong><br>
      <span style="font-size:13px;">KNAP GEMAAKT.</span>
    </p>
  `);
}
