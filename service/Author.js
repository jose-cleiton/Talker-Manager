const generator = require('generate-password');
const fsHelps = require('../helpers/fs');

const HTTP_OK_STATUS = 200;

const getTalkers = async (req, res) => {
  const talker = await fsHelps.read();
  if (talker.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(talker);
};

const getTalkersID = async (req, res) => {
  const { id: userId } = req.params;
  const talker = await fsHelps.read();
  const foundTalker = talker.find((user) => user.id === (+userId));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(foundTalker);
};

const postLogin = (_req, res) => {
  const token = generator.generate({ length: 16, numbers: true });
  return res.status(200).json({ token });
 };

  const postTalkers = async (req, res) => {    
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
 };
 const putTalkersId = async (req, res) => {
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
};

const deleteTalkersId = async (req, res) => {
  const { id } = req.params;
  const talker = await fsHelps.read();
  const foundTalkerId = talker.findIndex((user) => +user.id === (+id));
  talker.splice(foundTalkerId, 1);
  await fsHelps.write(talker);
  res.status(204).end();
};

const getTalkerSerarch = async (req, res) => {
  const { q } = req.query;
  const talker = await fsHelps.read();
  const foundTalker = talker.filter((user) => user.name
  .toLowerCase().includes(q.toLowerCase()));
  if (!q) return res.status(HTTP_OK_STATUS).json(talker);
  
  if (!foundTalker) return res.status(200).json([]);
  
  return res.status(HTTP_OK_STATUS).json(foundTalker);
};

module.exports = { 
  getTalkers, 
  getTalkersID,
  postLogin,
  postTalkers,
  putTalkersId, 
  deleteTalkersId,
  getTalkerSerarch,

};