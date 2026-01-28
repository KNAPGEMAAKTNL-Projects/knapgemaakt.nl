import type { APIRoute } from 'astro';
import { createBooking } from '../../lib/create-booking';

interface Env {
  knapgemaakt_bookings: D1Database;
  RESEND_API_KEY?: string;
  N8N_BOOKING_WEBHOOK?: string;
}

type SubmissionType = 'contact' | 'offerte' | 'aanvraag' | 'audit';

interface SubmissionRequest {
  type: SubmissionType;
  specification: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  // aanvraag-only
  industry?: string;
  has_website?: string;
  website_url?: string;
  start_time?: string;
  end_time?: string;
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function normalizeUrl(url: string): string | null {
  if (!url || !url.trim()) return null;
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body: SubmissionRequest = await request.json();

    // Validate shared required fields
    if (!body.type || !body.name || !body.email) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in' }), {
        status: 400, headers: JSON_HEADERS
      });
    }

    // Validate type
    const validTypes: SubmissionType[] = ['contact', 'offerte', 'aanvraag', 'audit'];
    if (!validTypes.includes(body.type)) {
      return new Response(JSON.stringify({ error: 'Ongeldig formuliertype' }), {
        status: 400, headers: JSON_HEADERS
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres' }), {
        status: 400, headers: JSON_HEADERS
      });
    }

    // Type-specific validation
    if (body.type === 'contact' && (!body.specification || !body.message)) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in' }), {
        status: 400, headers: JSON_HEADERS
      });
    }

    if (body.type === 'aanvraag' && (!body.start_time || !body.end_time)) {
      return new Response(JSON.stringify({ error: 'Selecteer een tijdstip voor je gesprek' }), {
        status: 400, headers: JSON_HEADERS
      });
    }

    if (body.type === 'audit' && !body.website_url) {
      return new Response(JSON.stringify({ error: 'Vul je website URL in' }), {
        status: 400, headers: JSON_HEADERS
      });
    }

    const env = locals.runtime.env as Env;
    const db = env.knapgemaakt_bookings;

    let bookingId: string | null = null;

    // For aanvraag: create booking first (so we have the booking_id)
    if (body.type === 'aanvraag' && body.start_time && body.end_time) {
      const bookingResult = await createBooking(db, {
        user_name: body.name,
        user_email: body.email,
        user_phone: body.phone || '',
        user_company: body.company,
        user_industry: body.industry,
        user_website: body.website_url ? normalizeUrl(body.website_url) || undefined : undefined,
        start_time: body.start_time,
        end_time: body.end_time,
      });

      if (!bookingResult.success) {
        return new Response(JSON.stringify({ error: bookingResult.error }), {
          status: bookingResult.status, headers: JSON_HEADERS
        });
      }

      bookingId = bookingResult.booking_id;

      // Trigger n8n webhook for aanvraag
      const webhookUrl = env.N8N_BOOKING_WEBHOOK;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: JSON_HEADERS,
            body: JSON.stringify({
              booking_id: bookingId,
              user_name: body.name,
              user_email: body.email,
              user_phone: body.phone,
              user_company: body.company,
              user_industry: body.industry,
              user_website: body.website_url,
              specification: body.specification,
              start_time: bookingResult.start_time,
              end_time: bookingResult.end_time,
              created_at: new Date().toISOString()
            })
          });
        } catch (err) {
          console.error('[Submissions API] Failed to trigger n8n webhook:', err);
        }
      }
    }

    // Create submission record
    const submissionId = crypto.randomUUID();

    await db.prepare(`
      INSERT INTO submissions (
        id, type, specification, name, email, phone, company, message,
        industry, has_website, website_url, booking_id, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(
      submissionId,
      body.type,
      body.specification || null,
      body.name,
      body.email,
      body.phone || null,
      body.company || null,
      body.message || null,
      body.industry || null,
      body.has_website || null,
      body.website_url ? normalizeUrl(body.website_url) : null,
      bookingId
    ).run();

    // Send email notification via Resend (for contact, offerte, and audit)
    if (body.type === 'contact' || body.type === 'offerte' || body.type === 'audit') {
      const apiKey = env.RESEND_API_KEY;
      if (apiKey) {
        try {
          let emailHtml: string;
          let subject: string;

          if (body.type === 'contact') {
            emailHtml = buildContactEmail(body);
            subject = `Contactformulier: ${body.specification}`;
          } else if (body.type === 'offerte') {
            emailHtml = buildOfferteEmail(body);
            subject = 'Offerte aanvraag: automations';
          } else {
            emailHtml = buildAuditEmail(body);
            subject = 'Nieuwe website-audit aanvraag';
          }

          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              from: 'KNAP GEMAAKT. <contact@knapgemaakt.nl>',
              to: ['info@knapgemaakt.nl'],
              reply_to: body.email,
              subject,
              html: emailHtml
            })
          });
        } catch (err) {
          console.error('[Submissions API] Failed to send email:', err);
        }
      } else {
        console.error('[Submissions API] RESEND_API_KEY not configured');
      }
    }

    return new Response(JSON.stringify({
      success: true,
      submission_id: submissionId,
      booking_id: bookingId,
    }), {
      status: 201, headers: JSON_HEADERS
    });

  } catch (error) {
    console.error('[Submissions API] Error:', error);
    return new Response(JSON.stringify({ error: 'Er ging iets mis' }), {
      status: 500, headers: JSON_HEADERS
    });
  }
};

function buildContactEmail(body: SubmissionRequest): string {
  return `
    <h2>Nieuw bericht via contactformulier</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      ${emailRow('Bedrijf', body.company || '-')}
      ${emailRow('Naam', body.name)}
      ${emailRow('E-mail', `<a href="mailto:${body.email}">${body.email}</a>`)}
      ${emailRow('Telefoon', body.phone || '-')}
      ${emailRow('Onderwerp', body.specification)}
    </table>
    <h3 style="margin-top:24px;">Bericht</h3>
    <p style="white-space:pre-wrap;background:#f9f9f9;padding:16px;border-left:3px solid #ccff00;">${body.message}</p>
  `;
}

function buildOfferteEmail(body: SubmissionRequest): string {
  return `
    <h2>Nieuwe offerte aanvraag: automations</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      ${emailRow('Naam', body.name)}
      ${emailRow('Bedrijf', body.company || '-')}
      ${emailRow('E-mail', `<a href="mailto:${body.email}">${body.email}</a>`)}
      ${emailRow('Telefoon', body.phone || '-')}
      ${emailRow('Interesse in', body.specification || '-')}
    </table>
    ${body.message ? `
      <h3 style="margin-top:24px;">Toelichting</h3>
      <p style="white-space:pre-wrap;background:#f9f9f9;padding:16px;border-left:3px solid #ccff00;">${body.message}</p>
    ` : ''}
  `;
}

function buildAuditEmail(body: SubmissionRequest): string {
  return `
    <h2>Nieuwe website-audit aanvraag</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      ${emailRow('Naam', body.name)}
      ${emailRow('E-mail', `<a href="mailto:${body.email}">${body.email}</a>`)}
      ${emailRow('Website', body.website_url ? `<a href="${body.website_url}">${body.website_url}</a>` : '-')}
    </table>
    <p style="margin-top:24px;color:#666;">
      Deze persoon wil een gratis website-audit ontvangen. Bekijk de website en stuur binnen 2 werkdagen een persoonlijke video-analyse.
    </p>
  `;
}

function emailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${value}</td>
    </tr>
  `;
}
