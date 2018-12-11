import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.fetchValues();
    this.fetchIndexes();
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map((teamMember) => {
      return teamMember.name;
    }).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      if(key === this.state.index){
        entries.push(
            <div className="box-item" key={key}>
              <p>Shit {key} will say: </p>
              <p className="box-item-value">{this.state.values[key]}</p>
            </div>
        );
      }
    }

    return entries;
  }

  deleteAll = async () => {
    await axios.get('/api/delete', {});
    this.setState({index: ''});
    this.fetchValues();
    this.fetchIndexes();
  }


  render() {
    return (
      <div>
        <div>
          <p>Examples for searches:</p>
          <p className="examples">omri, ido ,raz , anat , matthew , ron ,guyw , guys , yafit , oleg</p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>Enter a team member name: </label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
          <button type="button" onClick={this.deleteAll}>Delete All</button>
        </form>

        <div className="checked">
          <h3>People you already checked out:</h3>
          {this.renderSeenIndexes()}
        </div>
        <h3>Result:</h3>
        <div className="box">
          {this.renderValues()}
        </div>


      </div>
    );
  }
}

export default Fib;
