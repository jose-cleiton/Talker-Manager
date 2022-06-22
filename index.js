const express = require('express');
const bodyParser = require('body-parser');

const fsHelps = require('./helpers/fs');

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
/* não remova esse endpoint, e para o avaliador funcionar */
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
