const nodemailer = require('nodemailer');

// Creamos el "transporter": es como el cartero que va a mandar los mails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // para puerto 587 normalmente es false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Función para enviar mail de verificación
async function sendVerificationEmail(toEmail, verificationToken) {
  // De acá armamos el link de verificación
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
  const verifyUrl = `${backendUrl}/api/auth/verify?token=${verificationToken}`;

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

  // Aunque el SMTP no funcione, SIEMPRE vamos a mostrar el link en consola
  console.log('Link de verificación:', verifyUrl);
}

module.exports = {
  sendVerificationEmail
};
