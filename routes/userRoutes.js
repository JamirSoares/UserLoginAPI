// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuarios'); // Ajuste o caminho conforme necessário
const bcrypt = require('bcryptjs');

// Criar usuário
router.post('/create', async (req, res) => {
  try {
    const {
      nome,
      email,
      cpf,
      senha
    } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      cpf,
      senha: senhaHash
    });

    const {
      senha: _,
      ...usuarioSemSenha
    } = usuario.toJSON();
    res.status(201).json("usuario criado com sucesso");
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
});

// Listar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      const {
        senha,
        ...usuarioSemSenha
      } = usuario.toJSON();
      res.json(usuarioSemSenha);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
});

// Atualizar usuário
router.put('/reset-senha', async (req, res) => {
  const {
    email,
    cpf,
    senha,
    confirmarSenha,
  } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        email,
        cpf
      } // 👈 cpf minúsculo aqui também
    });

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado com esse e-mail e CPF'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await Usuario.update({
      senha: senhaHash
    }, {
      where: {
        id: usuario.id
      }
    });

    res.json({
      mensagem: 'Senha atualizada com sucesso!'
    });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao atualizar senha: ' + err.message
    });
  }
});



// Excluir usuário
router.delete('/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deleted = await Usuario.destroy({
      where: {
        id
      }
    });

    if (deleted) {
      res.send('Usuário excluído');
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const {
    email,
    senha
  } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        email
      }
    });

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).send('Senha incorreta');
    }

    const {
      senha: _,
      ...usuarioSemSenha
    } = usuario.toJSON();
    res.json({
      mensagem: "Autenticado com sucesso"
    });
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
});


module.exports = router;