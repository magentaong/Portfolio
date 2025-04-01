import { NextResponse } from 'next/server'
import { Resend } from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY || "")


export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  try {
    const response = await resend.emails.send({
      from: 'Magenta Ong <onboarding@resend.dev>',
      to: 'ongmagenta@gmail.com',
      subject: `New contact from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    })
    console.log("📨 Resend response:", response)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
} 
