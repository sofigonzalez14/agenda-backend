const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendVerificationEmail(toEmail, verificationToken) {
  const FRONTEND_URL = process.env.FRONTEND_URL; 
  const verifyUrl = `${FRONTEND_URL}?token=${verificationToken}`;

  const mailOptions = {
    from: `"Mi Agenda" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Verificá tu cuenta',
    text: `Hola! Por favor verificá tu cuenta haciendo clic en este enlace: ${verifyUrl}`,
    html: `
      <p>Hola!</p>
      <p>Por favor verificá tu cuenta haciendo clic en este enlace:</p>
      <p><a href="${verifyUrl}" target="_blank">${verifyUrl}</a></p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email de verificación enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar email de verificación:', error.message);
  }

  console.log('Link de verificación:', verifyUrl);
}

module.exports = {
  sendVerificationEmail
};
