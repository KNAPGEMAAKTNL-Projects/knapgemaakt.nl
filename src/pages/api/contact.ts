import type { APIRoute } from 'astro';

interface Env {
  RESEND_API_KEY?: string;
}

interface ContactRequest {
  company: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body: ContactRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = (locals.runtime.env as Env).RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Contact API] RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Server configuratie fout' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'KNAP GEMAAKT. <contact@knapgemaakt.nl>',
        to: ['info@knapgemaakt.nl'],
        reply_to: body.email,
        subject: `Contactformulier: ${body.subject}`,
        html: `
          <h2>Nieuw bericht via contactformulier</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr>
              <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Bedrijf</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;">${body.company || '-'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Naam</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">E-mail</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${body.email}">${body.email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Telefoon</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;">${body.phone || '-'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Onderwerp</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;">${body.subject}</td>
            </tr>
          </table>
          <h3 style="margin-top:24px;">Bericht</h3>
          <p style="white-space:pre-wrap;background:#f9f9f9;padding:16px;border-left:3px solid #ccff00;">${body.message}</p>
        `
      })
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error('[Contact API] Resend error:', errorData);
      return new Response(JSON.stringify({ error: 'Bericht kon niet worden verzonden' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return new Response(JSON.stringify({ error: 'Er ging iets mis' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
