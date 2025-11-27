const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Tutor = require('../models/Tutor');
const Pet = require('../models/Pet');
const Altura = require('../models/Altura');

const SECRET = process.env.JWT_SECRET || 'segredo123';


function authMiddleware(req, res, next){
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'token requerido' });
  const token = h.split(' ')[1];
  try { req.user = jwt.verify(token, SECRET); next(); }
  catch(e){ return res.status(401).json({ error: 'token inválido' }); }
}

async function resolveAlturaId(altura_cm){
  if (altura_cm <= 13) return 1;
  if (altura_cm > 14 && altura_cm < 40) return 2;
  return 3;
}


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nome_pet, genero_pet, altura_cm, tutorCpf } = req.body;
    if (!nome_pet || !genero_pet || altura_cm == null || !tutorCpf) return res.status(400).json({ error: 'dados insuficientes' });
    const tutor = await Tutor.findByPk(tutorCpf);
    if (!tutor) return res.status(404).json({ error: 'tutor não existe' });
    const id_altura = await resolveAlturaId(Number(altura_cm));
    const pet = await Pet.create({ nome_pet, genero_pet, altura_cm, tutorCpf, id_altura });
    res.status(201).json(pet);
  } catch (err) { console.error(err); res.status(500).json({ error: 'erro' }); }
});


router.get('/', async (req, res) => {
  const pets = await Pet.findAll({ include: [{ model: Altura }, { model: Tutor }] });
  res.json(pets);
});


router.get('/:id', async (req, res) => {
  const pet = await Pet.findByPk(req.params.id, { include: [Altura, Tutor] });
  if (!pet) return res.sendStatus(404);
  res.json(pet);
});


router.put('/:id', authMiddleware, async (req, res) => {
  const pet = await Pet.findByPk(req.params.id);
  if (!pet) return res.sendStatus(404);
  if (req.body.altura_cm != null) req.body.id_altura = await resolveAlturaId(Number(req.body.altura_cm));
  await pet.update(req.body);
  res.json(pet);
});


router.delete('/:id', authMiddleware, async (req, res) => {
  const pet = await Pet.findByPk(req.params.id);
  if (!pet) return res.sendStatus(404);
  await pet.destroy();
  res.json({ ok: true });
});


router.get('/by-tutor/:cpf', async (req, res) => {
  const pets = await Pet.findAll({ where: { tutorCpf: req.params.cpf }, include: [Altura] });
  res.json(pets);
});


router.get('/by-altura/:altura', async (req, res) => {
  const a = req.params.altura;
  const altura = await Altura.findOne({ where: { altura: a } });
  if (!altura) return res.status(404).json({ error: 'altura não encontrada' });
  const pets = await Pet.findAll({ where: { id_altura: altura.id }, include: [Tutor] });
  res.json(pets);
});

module.exports = router;
