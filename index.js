const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const fsHelps = require('./helpers/fs');
const { isValidEmail, isValidPassword } = require('./middlewares/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
app.get('/talker', async (req, res) => {
    const talker = await fsHelps.read();
    if (talker.length === 0) {
      return res.status(HTTP_OK_STATUS).json([]);
    } 
      return res.status(HTTP_OK_STATUS).json(talker);
  });

 app.get('/talker/:id', async (req, res) => {
    const { id: userId } = req.params;
    const talker = await fsHelps.read();
    const foundTalker = talker.find((user) => user.id === (+userId));
  
    if (!foundTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(foundTalker);
 });
 app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  const token = generator.generate({ length: 16, numbers: true });
  return res.status(200).json({ token });
 });
/* não remova esse endpoint, e para o avaliador funcionar */
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
