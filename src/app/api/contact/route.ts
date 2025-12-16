import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  turnstileToken?: string;
}

interface LocationData {
  ip: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  userAgent?: string;
}

async function getLocationFromIP(ip: string): Promise<LocationData> {
  try {
    // Using ip-api.com (free, no API key needed, 45 requests per minute)
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    if (data.status === 'success') {
      return {
        ip: ip,
        country: data.country || 'Unknown',
        city: data.city || 'Unknown',
        region: data.regionName || 'Unknown',
        timezone: data.timezone || 'Unknown',
      };
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  }

  return { ip };
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Turnstile verification failed' },
        { status: 400 }
      );
    }

    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Turnstile verification failed' },
        { status: 403 }
      );
    }

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'Unknown';

    // Get User Agent
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Get location data
    const locationData = await getLocationFromIP(ip);
    locationData.userAgent = userAgent;

    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dev.nirajandhakal634@gmail.com',
      subject: `New contact message from: ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #9333ea 0%, #06b6d4 100%); padding: 40px 32px; text-align: center;">
                        <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                          📬 New Contact Message
                        </h1>
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                          Someone reached out via your portfolio
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 32px;">
                        
                        <!-- Sender Info -->
                        <table width="100%" cellpadding="20" cellspacing="0" style="background-color: #151515; border-radius: 12px; margin-bottom: 20px;">
                          <tr>
                            <td style="text-align: left;">
                              <p style="margin: 0 0 16px 0; color: #a855f7; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; text-align: left;">
                                SENDER DETAILS
                              </p>
                              
                              <p style="margin: 0 0 4px 0; color: #888888; font-size: 13px; text-align: left;">Name</p>
                              <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px; font-weight: 600; text-align: left;">
                                ${name}
                              </p>
                              
                              <p style="margin: 0 0 4px 0; color: #888888; font-size: 13px; text-align: left;">Email</p>
                              <p style="margin: 0 0 16px 0; text-align: left;">
                                <a href="mailto:${email}" style="color: #06b6d4; font-size: 16px; font-weight: 500; text-decoration: none;">
                                  ${email}
                                </a>
                              </p>
                              
                              <p style="margin: 0 0 4px 0; color: #888888; font-size: 13px; text-align: left;">Location</p>
                              <p style="margin: 0 0 2px 0; color: #ffffff; font-size: 15px; text-align: left;">
                                📍 ${locationData.city || 'Unknown'}, ${locationData.region || 'Unknown'}
                              </p>
                              <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 15px; text-align: left;">
                                🌍 ${locationData.country || 'Unknown'}
                              </p>
                              
                              <p style="margin: 0 0 4px 0; color: #888888; font-size: 13px; text-align: left;">IP Address</p>
                              <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 15px; text-align: left;">
                                ${locationData.ip}
                              </p>
                              
                              <p style="margin: 0 0 4px 0; color: #888888; font-size: 13px; text-align: left;">Timezone</p>
                              <p style="margin: 0; color: #ffffff; font-size: 15px; text-align: left;">
                                🕐 ${locationData.timezone || 'Unknown'}
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message -->
                        <table width="100%" cellpadding="20" cellspacing="0" style="background-color: #151515; border-radius: 12px; margin-bottom: 20px;">
                          <tr>
                            <td style="text-align: left;">
                              <p style="margin: 0 0 16px 0; color: #a855f7; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; text-align: left;">
                                MESSAGE
                              </p>
                              <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 12px; text-align: left;">
                                ${message}
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Technical Details -->
                        <table width="100%" cellpadding="20" cellspacing="0" style="background-color: #151515; border-radius: 12px; margin-bottom: 32px;">
                          <tr>
                            <td style="text-align: left;">
                              <p style="margin: 0 0 16px 0; color: #a855f7; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; text-align: left;">
                                TECHNICAL DETAILS
                              </p>
                              <p style="margin: 0 0 4px 0; color: #888888; font-size: 12px; text-align: left;">User Agent</p>
                              <p style="margin: 0; color: #ffffff; font-size: 13px; text-align: left; word-break: break-all;">
                                ${locationData.userAgent}
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Reply Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="mailto:${email}?subject=Re: Your message" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #9333ea 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                                Reply to ${name.split(' ')[0]}
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="margin: 0 0 8px 0; color: #888888; font-size: 13px;">
                          This message was sent from your portfolio contact form
                        </p>
                        <p style="margin: 0; color: #666666; font-size: 12px;">
                          ${currentDate}
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
