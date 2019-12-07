import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

import ExcerciseList from './components/ExcerciseList';
import EditExcercise from './components/EditExcercise';
import CreateExcercise from './components/CreateExcercise';
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Route path="/" exact component={ExcerciseList} />
        <Route path="/edit/:id" component={EditExcercise} />
        <Route path="/create" component={CreateExcercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
};

export default App;
