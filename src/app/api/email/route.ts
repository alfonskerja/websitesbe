import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { email, name, country, subject, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: 'SB Acoustics',
    to: [`${process.env.MY_EMAIL}`, "mynameisqwerty48@gmail.com"],
    replyTo: `${email}`,
    subject: `${subject}`,
    html: `<div><b>Name:</b> ${name}</div>
    <div><b>  Email:</b> ${email}</div>
    <div><b>Country:</b> ${country}</div>
    <div><b>Subject:</b> ${subject}</div>
    <div><b>Message:</b> ${message}</div>`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

