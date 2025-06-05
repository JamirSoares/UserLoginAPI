const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const Usuario = require('../models/Usuarios'); // ajuste conforme seu caminho
const RecuperacaoSenha = require('../models/Codigo'); // ajuste conforme seu caminho

// Função para gerar código de 6 dígitos
function gerarCodigoNumerico() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Formatar para SQL (sem fuso nem milissegundos)
function formatarDataSQL(data) {
  const pad = n => String(n).padStart(2, '0');
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())} ${pad(data.getHours())}:${pad(data.getMinutes())}:${pad(data.getSeconds())}`;
}

// Envio de e-mail
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

  await transporter.sendMail(mailOptions);
}

router.post('/recovery', async (req, res) => {
  try {
    const {
      cpf,
      email
    } = req.body;

    if (!cpf || !email) {
      return res.status(400).json({
        error: 'CPF e Email são obrigatórios.'
      });
    }

    const CodigoRecuperacao = gerarCodigoNumerico();
    const criado = new Date();
    const expira = new Date(criado.getTime() + 60 * 60 * 1000); // +1 hora

    await enviarCodigoPorEmail(email, CodigoRecuperacao);
    console.log(expira, criado);
    const novaEntrada = await RecuperacaoSenha.create({
      cpf,
      Email: email,
      CodigoRecuperacao,
      ExpiraEm: formatarDataSQL(expira),
      CriadoEm: formatarDataSQL(criado),
    });

    res.status(201).json({
      message: 'Código enviado e salvo com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao criar recuperação de senha:', error);
    res.status(500).json({
      error: 'Erro ao criar recuperação de senha.'
    });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const {
      email,
      cpf,
      CodigoRecuperacao
    } = req.body;

    if (!email || !CodigoRecuperacao || !cpf) {
      return res.status(400).json({
        error: 'Email, CPF e Código de Recuperação são obrigatórios.'
      });
    }

    const entrada = await RecuperacaoSenha.findOne({
      where: {
        Email: email,
        CodigoRecuperacao
      }
    });

    if (!entrada) {
      return res.status(404).json({
        error: 'Código de recuperação não encontrado.'
      });
    }


    // agora busca o usuário
    const usuario = await Usuario.findOne({
      where: {
        cpf: cpf
      }
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário com esse CPF não encontrado.'
      });
    }

    // Verifica validade do código
    const agora = new Date();
    var expiraEm = new Date(entrada.ExpiraEm);
    expiraEm = formatarDataSQL(expiraEm);
    console.log('Agora:', agora);
    console.log('Expira em:', expiraEm);
    if (agora > expiraEm) {
      return res.status(400).json({
        error: 'Código de recuperação expirado.'
      });
    }

    res.status(200).json({
      message: 'Código de recuperação válido.'
      
    });
  } catch (error) {
    console.error('Erro ao verificar código de recuperação:', error);
    res.status(500).json({
      error: 'Erro ao verificar código de recuperação.'
    });
  }
});

module.exports = router;