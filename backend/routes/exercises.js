const express = require('express');
const router = express.Router();
const Excercise = require('../models/excercise.model');

router.get('/', (req, res) => {
  Excercise.find()
    .then(Excercise => res.json(Excercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const { username, description, duration } = req.body;
  const date = Date.parse(req.body.date);

  const newExcercise = new Excercise({
    username,
    description,
    duration,
    date,
  });

  newExcercise
    .save()
    .then(() => res.json('Excercise added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
