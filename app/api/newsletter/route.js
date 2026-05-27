/**
 * app/api/newsletter/route.js
 *
 * FUTURE UPGRADE PATH:
 *   import Resend from 'resend'
 *   const resend = new Resend(process.env.RESEND_API_KEY)
 *   await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID })
 *
 * OR with a database:
 *   await db.subscribers.create({ data: { email } })
 *   // then trigger a welcome email via Resend/SendGrid/Postmark
 */

import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // TODO: Add to email list via Resend, Loops, ConvertKit, etc.
    console.log('[Newsletter] New subscriber:', email)

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    })

  } catch (error) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
