import React, { Component } from "react";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pseudo } = this.props.userData;
    return (
      <div>
        <h2>Pseudo: {pseudo}</h2>
      </div>
    );
  }
}

export default Quiz;
