const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

// create
router.post('/', async (req, res) => {
  try {
    const t = await Tutor.create(req.body);
    res.status(201).json(t);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// list
router.get('/', async (req, res) => {
  const tutors = await Tutor.findAll({ attributes: ['cpf','nome','email'] });
  res.json(tutors);
});

// get by cpf
router.get('/:cpf', async (req, res) => {
  const t = await Tutor.findByPk(req.params.cpf, { attributes: ['cpf','nome','email'] });
  if (!t) return res.sendStatus(404);
  res.json(t);
});

module.exports = router;
