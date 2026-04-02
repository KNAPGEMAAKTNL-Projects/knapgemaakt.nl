import type { APIRoute } from 'astro';
import { createBooking } from '../../../lib/create-booking';
import {
  buildContactNotification,
  buildContactConfirmation,
  buildAanvraagNotification,
  buildAanvraagConfirmation,
  buildAuditNotification,
} from '../../../lib/email-templates';

interface Env {
  knapgemaakt_bookings: D1Database;
  RESEND_API_KEY?: string;
  N8N_BOOKING_WEBHOOK?: string;
  TURNSTILE_SECRET_KEY?: string;
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

async function sendEmail(apiKey: string, to: string, subject: string, html: string, replyTo?: string) {
  const payload: Record<string, unknown> = {
    from: 'KNAP GEMAAKT. <contact@knapgemaakt.nl>',
    to: [to],
    subject,
    html,
  };
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[Email] Resend error:', res.status, err);
  }
}


export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body: SubmissionRequest & { 'cf-turnstile-response'?: string } = await request.json();

    // Verify Turnstile token (spam protection)
    const env = locals.runtime.env as Env;
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const turnstileToken = body['cf-turnstile-response'];
      if (!turnstileToken) {
        return new Response(JSON.stringify({ error: 'Beveiligingsverificatie mislukt. Vernieuw de pagina en probeer opnieuw.' }), {
          status: 400, headers: JSON_HEADERS
        });
      }
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: turnstileSecret, response: turnstileToken })
      });
      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return new Response(JSON.stringify({ error: 'Beveiligingsverificatie mislukt. Probeer het opnieuw.' }), {
          status: 403, headers: JSON_HEADERS
        });
      }
    }

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

    const db = env.knapgemaakt_bookings;

    let bookingId: string | null = null;
    let bookingStartTime: string | undefined;

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
      bookingStartTime = bookingResult.start_time;

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

    // ── Send notifications (fire-and-forget, don't block response) ──

    const apiKey = env.RESEND_API_KEY;
    const notifications: Promise<void>[] = [];

    if (body.type === 'contact') {
      if (apiKey) {
        // Notification to Yannick
        notifications.push(
          sendEmail(apiKey, 'info@knapgemaakt.nl', `Contactformulier: ${body.specification}`, buildContactNotification(body), body.email)
        );
        // Confirmation to customer
        notifications.push(
          sendEmail(apiKey, body.email, 'Je bericht is ontvangen — KNAP GEMAAKT.', buildContactConfirmation(body))
        );
      }
    } else if (body.type === 'aanvraag') {
      if (apiKey) {
        const aanvraagData = { ...body, booking_id: bookingId || undefined, start_time: bookingStartTime || body.start_time };
        // Notification to Yannick
        notifications.push(
          sendEmail(apiKey, 'info@knapgemaakt.nl', `Kennismaking ingepland: ${body.name}`, buildAanvraagNotification(aanvraagData), body.email)
        );
        // Confirmation to customer
        notifications.push(
          sendEmail(apiKey, body.email, 'Je gesprek is bevestigd — KNAP GEMAAKT.', buildAanvraagConfirmation(aanvraagData))
        );
      }
    } else if (body.type === 'offerte') {
      if (apiKey) {
        // Reuse contact notification format for offerte
        notifications.push(
          sendEmail(apiKey, 'info@knapgemaakt.nl', 'Offerte aanvraag: automations', buildContactNotification(body), body.email)
        );
        notifications.push(
          sendEmail(apiKey, body.email, 'Je aanvraag is ontvangen — KNAP GEMAAKT.', buildContactConfirmation(body))
        );
      }
    } else if (body.type === 'audit') {
      if (apiKey) {
        notifications.push(
          sendEmail(apiKey, 'info@knapgemaakt.nl', 'Nieuwe website-audit aanvraag', buildAuditNotification(body), body.email)
        );
      }
    }

    // Wait for all notifications but don't fail the response
    if (notifications.length > 0) {
      await Promise.allSettled(notifications);
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
