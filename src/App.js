import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    lists: [
      { id: 1, show: true },
      { id: 2, show: true },
      { id: 3, show: true },
      { id: 4, show: true }
    ]
  };
  handleDelete = (item) => {
    let updated = this.state.lists.filter((list) => list.id !== item.id);
    this.setState({ lists: updated });
  };
  render() {
    return (
      <div className="App">
        {this.state.lists.map((list, indx) => (
          <React.Fragment key={indx}>
            <div>
              <input type="textarea" placeholder="Enter something" />
              <button onClick={() => this.handleDelete(list)}>Delete</button>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}
