const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// setup middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// connect to the database
const mongoDB = process.env.ATLAS_URI;
mongoose
  .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.error('An error has occured', err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// set up route
const excercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/excercises', excercisesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('hahahahahah');
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
