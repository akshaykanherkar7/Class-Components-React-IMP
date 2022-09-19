import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    //initialize
    //state management
    this.state = {
      counter: 0,
    };
    //single object
  }
  handleCounter = (value) => {
    // Way 1
    // this.setState(
    //   {
    //     counter: value + this.state.counter,
    //   },
    //   () => console.log("counter", this.state)
    // );
    // Way 2
    this.setState((prev) => {
      return {
        counter: prev.counter + value,
      };
    });
  };
  render() {
    const { title } = this.props;
    const { counter } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <h2>{counter}</h2>
        <button onClick={() => this.handleCounter(1)}>ADD</button>
        <button onClick={() => this.handleCounter(-1)}>REDUCE</button>
      </div>
    );
  }
}

export { Counter };
