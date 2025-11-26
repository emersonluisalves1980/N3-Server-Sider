require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./src/db');
const Tutor = require('./src/models/Tutor');
const Pet = require('./src/models/Pet');
const Altura = require('./src/models/Altura');

app.use(express.json());


app.use('/auth', require('./src/routes/authRoutes'));
app.use('/tutores', require('./src/routes/tutorRoutes'));
app.use('/pets', require('./src/routes/petRoutes'));


async function start(){
  await sequelize.sync({ force: true });

  await Altura.bulkCreate([
    { id: 1, altura: 'pequeno' },
    { id: 2, altura: 'medio' },
    { id: 3, altura: 'alto' }
  ]);
  app.listen(process.env.PORT || 3000, () => console.log('API rodando na porta', process.env.PORT || 3000));
}

start().catch(err => { console.error('Erro ao iniciar:', err); process.exit(1); });
