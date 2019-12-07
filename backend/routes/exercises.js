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

router.get('/:id', (req, res) => {
  Excercise.findById(req.params.id)
    .then(excercise => res.json(excercise))
    .catch(err => res.status(400).json('Error:' + err));
});

router.delete('/:id', (req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
    .then(excercise => res.json('Excercise deleted.'))
    .catch(err => res.status(400).json('Error:' + err));
});

router.post('/update/:id', (req, res) => {
  Excercise.findById(req.params.id)
    .then(excercise => {
      excercise.username = req.body.username;
      excercise.description = req.body.description;
      excercise.duration = Number(req.body.duration);
      excercise.date = Date.parse(req.body.date);

      excercise
        .save()
        .then(() => res.json('Excercise updated'))
        .catch(err => res.status(400).json('Error: err'));
    })
    .catch(err => res.status(400).json('Error: err'));
});

module.exports = router;
