const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Tutor = require('../models/Tutor');

const SECRET = process.env.JWT_SECRET || 'segredo123';


router.post('/register', async (req, res) => {
  const { cpf, nome, email, password } = req.body;
  if (!cpf || !nome || !email || !password) return res.status(400).json({ error: 'dados incompletos' });
  const exists = await Tutor.findByPk(cpf);
  if (exists) return res.status(409).json({ error: 'Tutor já existe' });
  const hash = bcrypt.hashSync(password, 10);
  await Tutor.create({ cpf, nome, email, password: hash });
  res.status(201).json({ cpf, nome, email });
});

router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;
  if (!cpf || !password) return res.status(400).json({ error: 'cpf e senha necessários' });
  const tutor = await Tutor.findByPk(cpf);
  if (!tutor) return res.status(401).json({ error: 'tutor não encontrado' });
  
  if (!tutor.password) return res.status(401).json({ error: 'sem senha registrada' });
  const ok = bcrypt.compareSync(password, tutor.password);
  if (!ok) return res.status(401).json({ error: 'senha inválida' });
  const token = jwt.sign({ cpf: tutor.cpf, nome: tutor.nome }, SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  res.json({ token });
});

module.exports = router;
