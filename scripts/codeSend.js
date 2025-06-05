const nodemailer = require('nodemailer');
require('dotenv').config(); // ← carrega o .env

function gerarCodigoNumerico() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const codigo = gerarCodigoNumerico();
console.log('Código gerado:', codigo);

async function enviarCodigoPorEmail(destinatario, codigo) {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: 'Código de Recuperação de Senha',
    text: `Seu código de recuperação é: ${codigo}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
}