const express = require('express');
const bodyParser = require('body-parser');

const fsHelps = require('./helpers/fs');
const vazio = require('./middlewares/validation');
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
app.get('/talker',  async (req, res) => {
  
    
    const talker = await fsHelps.read();
    if(talker.length === 0) {
      return res.status(HTTP_OK_STATUS).json([])
    }else{
      return res.status(HTTP_OK_STATUS).json(talker)
    }
   
 
    
  }

)





/* não remova esse endpoint, e para o avaliador funcionar*/
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
