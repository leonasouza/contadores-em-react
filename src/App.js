import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [{ id: 1, value: 0 }],
  };

  prepareHandle = (condition, counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (condition === "add") {
      counters[index].value++;
    } else if (condition === "remove" && counters[index].value > 0) {
      counters[index].value--;
    }
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    this.prepareHandle("add", counter);
  };

  handleDecrement = (counter) => {
    this.prepareHandle("remove", counter);
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    if (this.state.counters.length > 1) {
      const counters = this.state.counters.filter((c) => c.id !== counterId);
      this.setState({ counters });
    }
  };

  handleAdd = () => {
    let quantity = Math.max.apply(
      Math,
      this.state.counters.map((c) => {
        return c.id + 1;
      })
    );
    console.log(quantity);
    this.setState({
      counters: [...this.state.counters, { id: quantity, value: 0 }],
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onAdd={this.handleAdd}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
