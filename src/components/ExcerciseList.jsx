/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Excercise = props => (
  <tr>
    <td>{props.excercise.username}</td>
    <td>{props.excercise.description}</td>
    <td>{props.excercise.duration}</td>
    <td>{props.excercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.excercise._id}`}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteExcercise(props.excercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

class ExcerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = { excercise: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/excercises/')
      .then(res => {
        this.setState({ excercise: res.data });
        console.log(this.state.excercise);
      })
      .catch(err => console.error('Error: ' + err));
  }

  deleteExcercise = id => {
    axios
      .delete(`http://localhost:5000/excercises/${id}`)
      .then(res => console.log(res.data));

    this.setState({
      excercise: this.state.excercise.filter(e => e._id !== id),
    });
  };

  excerciseList = () => {
    return this.state.excercise.map(currentexcercise => {
      return (
        <Excercise
          excercise={currentexcercise}
          deleteExcercise={this.deleteExcercise}
          key={currentexcercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3 className="mt-4 mb-2">Logged Excercise</h3>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.excerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExcerciseList;
