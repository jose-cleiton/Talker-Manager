const isValidUsername = (req, res, next) => {
  const { username } = req.body;
  
  if (!username || username.length < 3) {
    return res.status(200).json({ message: 'invalid data' });
  }  
  next();
};
  
const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (
    !email
    || !email.includes('@')
    || !email.includes('.com')
  ) return res.status(200).json({ message: 'invalid data' });

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!/^[0-9]{4,8}$/.test(password)) {
    return res.status(200).json({ message: 'invalid data' });
  }

  next();
};
  
module.exports = {
  isValidUsername,
  isValidEmail,
  isValidPassword,
};