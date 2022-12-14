const express = require('express');
const bodyParser = require('body-parser');
const Author = require('./service/Author');
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
app.get('/talker', Author.getTalkers);

  /**  2 - Crie o endpoint GET /talker/:id */

app.get('/talker/:id', Author.getTalkersID);

 /** 3 - Crie o endpoint POST /login  */
 app.post('/login', isValidEmail, isValidPassword, Author.postLogin);

/** 4 - Adicione as validações para o endpoint /login */

  /** 5 - Crie o endpoint POST /talker */
  app.post('/talker',
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateTalkField,
  isValidateWatchedAt,
  isValidateRate, 
  Author.postTalkers); // endpoint POST /talker

  /** 6 - Crie o endpoint PUT /talker/:id */

  app.put('/talker/:id', 
  isValidateToken,
  isValidateName,
  isValidateAge,
  isValidateTalkField,
  isValidateWatchedAt,
  isValidateRate, 
  Author.putTalkersId); // endpoint PUT /talker/:id 

  /* 7 - Crie o endpoint DELETE /talker/:id */

  app.delete('/talker/:id', isValidateToken, Author.deleteTalkersId); 
  
  // endpoint DELETE /talker/:id

  /** 8 - Crie o endpoint GET /talker/search?q=searchTerm */

  app.get('/talker/search', 
  isValidateToken,  
  Author.getTalkerSerarch); // endpoint GET /talker/search?q=searchTerm

/* não remova esse endpoint, e para o avaliador funcionar */
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
