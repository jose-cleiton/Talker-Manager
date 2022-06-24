const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const fsHelps = require('./helpers/fs');
const { 
 
  isValidEmail,
  isValidPassword,
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateTalkField,
  isValidateWatchedAt,
  isValidateRate,

} = require('./middlewares/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

/** 1 - Crie o endpoint GET /talker  */
app.get('/talker', async (req, res) => {
    const talker = await fsHelps.read();
    if (talker.length === 0) {
      return res.status(HTTP_OK_STATUS).json([]);
    } 
      return res.status(HTTP_OK_STATUS).json(talker);
  });

  /**  2 - Crie o endpoint GET /talker/:id */

 app.get('/talker/:id', async (req, res) => {
    const { id: userId } = req.params;
    const talker = await fsHelps.read();
    const foundTalker = talker.find((user) => user.id === (+userId));
  
    if (!foundTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(foundTalker);
 });

 /** 3 - Crie o endpoint POST /login  */
 app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  const token = generator.generate({ length: 16, numbers: true });
  return res.status(200).json({ token });
 });

/** 4 - Adicione as validações para o endpoint /login */

  /** 5 - Crie o endpoint POST /talker */
  app.post('/talker',
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateTalkField,
  isValidateWatchedAt,
  isValidateRate,  
   async (req, res) => {    
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = await fsHelps.read();
    talker.push({ 
      id: talker.length + 1, 
      name, 
      age, 
      talk: { watchedAt, rate } });
    await fsHelps.write(talker);
    res.status(201).json({
      id: talker.length,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    });
  }); // endpoint POST /talker

  /** 6 - Crie o endpoint PUT /talker/:id */

  app.put('/talker/:id', 
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateTalkField,
  isValidateWatchedAt,
  isValidateRate,  
  
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = await fsHelps.read();
    const foundTalkerId = talker.findIndex((user) => +user.id === (+id));
    talker[foundTalkerId] = { name, age, id: +id, talk: { watchedAt, rate } };    
    await fsHelps.write(talker);
    res.status(200).json({
      name,
      age,
      id: (+id),
      talk: {
        watchedAt,
        rate,
      },
    });
  });

/* não remova esse endpoint, e para o avaliador funcionar */
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
