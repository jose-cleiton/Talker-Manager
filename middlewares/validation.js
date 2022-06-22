const validator = require('email-validator');

const isValidUsername = (req, res, next) => {
  const { username } = req.body;
  
  if (!username || username.length < 3) {
    return res.status(400).json({ message: 'invalid data' });
  }  
  next();
};
  
const isValidEmail = (req, res, next) => {
  const { email } = req.body;
 
  if (!email) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validator.validate(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};
  
module.exports = {
  isValidUsername,
  isValidEmail,
  isValidPassword,
};
