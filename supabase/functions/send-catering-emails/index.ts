import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')!
const ADMIN_EMAIL = 'Chefs@homemademeals.net'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

interface CateringInquiry {
  id: string
  menu_preference: string
  chef_preference: string
  cuisine_style: string
  event_date: string
  guest_count: number
  name: string
  email: string
  status: string
  created_at: string
}

const clientEmailTemplate = (data: CateringInquiry) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catering Inquiry Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #f47a42; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Thank You for Your Inquiry!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #333; line-height: 1.6;">
                Dear ${data.name},
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; color: #333; line-height: 1.6;">
                Thank you for your interest in our catering services! We've received your inquiry and our team will review it shortly. Here's a summary of your request:
              </p>
              
              <!-- Inquiry Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFDFD; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Menu Preference:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.menu_preference || 'Custom'}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Cuisine Style:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.cuisine_style}</td>
                      </tr>
                      ${data.chef_preference ? `
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Preferred Chef:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.chef_preference}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Event Date:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${new Date(data.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Number of Guests:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.guest_count}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; font-size: 16px; color: #333; line-height: 1.6;">
                Our team will get back to you within 24 hours to discuss your event details, menu options, and pricing. We're excited to make your event unforgettable!
              </p>
              
              <p style="margin: 0; font-size: 16px; color: #333; line-height: 1.6;">
                Best regards,<br>
                <strong>The Homemade Catering Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666;">
                Homemade - Catering Services
              </p>
              <p style="margin: 0; font-size: 12px; color: #999;">
                Netherlands | Chefs@homemademeals.net
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

const adminEmailTemplate = (data: CateringInquiry) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Catering Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #2c3e50; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🍽️ New Catering Inquiry</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 30px; font-size: 16px; color: #333; line-height: 1.6;">
                A new catering inquiry has been submitted. Please review and respond within 24 hours:
              </p>
              
              <!-- Inquiry Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFDFD; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 20px; color: #f47a42; font-size: 18px;">Event Details</h3>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0; width: 40%;">Inquiry ID:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.id}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Menu Preference:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.menu_preference || 'Custom'}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Cuisine Style:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.cuisine_style}</td>
                      </tr>
                      ${data.chef_preference ? `
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Preferred Chef:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.chef_preference}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Event Date:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${new Date(data.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Number of Guests:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.guest_count}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Submitted:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${new Date(data.created_at).toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Customer Information -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFDFD; border: 1px solid #e0e0e0; border-radius: 6px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 20px; color: #f47a42; font-size: 18px;">Customer Information</h3>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0; width: 40%;">Name:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #666; font-size: 14px; padding: 8px 0;">Email:</td>
                        <td style="color: #333; font-size: 14px; padding: 8px 0;"><a href="mailto:${data.email}" style="color: #f47a42; text-decoration: none;">${data.email}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <div style="background-color: #fff3cd; border-left: 4px solid #f47a42; padding: 15px; margin-top: 20px;">
                <p style="margin: 0; font-size: 14px; color: #856404;">
                  <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; font-size: 12px; color: #999;">
                This is an automated notification from the Homemade catering system
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const bodyText = await req.text()

    if (!bodyText) {
      throw new Error('Request body is empty')
    }

    const inquiryData: CateringInquiry = JSON.parse(bodyText)

    // Backend rate limiting: Check if this email has submitted recently
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from('catering_inquiries')
      .select('id')
      .eq('email', inquiryData.email)
      .gte('created_at', oneHourAgo)

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError)
    } else if (recentSubmissions && recentSubmissions.length >= 3) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Rate limit exceeded. Please try again later.'
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          status: 429 // Too Many Requests
        }
      )
    }

    // Send client confirmation email
    const clientEmailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: inquiryData.email, name: inquiryData.name }],
          subject: 'Thank You for Your Catering Inquiry! 🍽️',
        }],
        from: { email: ADMIN_EMAIL, name: 'Homemade Catering' },
        content: [{
          type: 'text/html',
          value: clientEmailTemplate(inquiryData),
        }],
      }),
    })

    // Send admin notification email
    const adminEmailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: ADMIN_EMAIL, name: 'Homemade Admin' }],
          subject: `New Catering Inquiry: ${inquiryData.cuisine_style} for ${inquiryData.guest_count} guests`,
        }],
        from: { email: ADMIN_EMAIL, name: 'Homemade Catering System' },
        content: [{
          type: 'text/html',
          value: adminEmailTemplate(inquiryData),
        }],
      }),
    })

    if (!clientEmailResponse.ok || !adminEmailResponse.ok) {
      const clientError = !clientEmailResponse.ok ? await clientEmailResponse.text() : null
      const adminError = !adminEmailResponse.ok ? await adminEmailResponse.text() : null
      throw new Error(`Failed to send emails. Client: ${clientError}, Admin: ${adminError}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 200
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error sending catering emails:', errorMessage, error)
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 500
      }
    )
  }
})
