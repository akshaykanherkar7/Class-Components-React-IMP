import React from "react";
import axios from "axios";

export class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      title: "",
      page: 1,
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleAdd() {
    const { title } = this.state;
    const payload = {
      title: title,
      status: false,
    };
    axios
      .post("https://json-server-mocker-masai.herokuapp.com/tasks", payload)
      .then((res) => {
        this.handleGetData();
      });
  }

  handleDelete(id) {
    axios
      .delete(`https://json-server-mocker-masai.herokuapp.com/tasks/${id}`)
      .then((res) => {
        this.handleGetData();
      });
  }

  handleGetData() {
    const { page } = this.state;
    return axios
      .get("https://json-server-mocker-masai.herokuapp.com/tasks", {
        params: {
          _limit: 2,
          _page: page,
        },
      })
      .then((res) =>
        this.setState(
          {
            todo: res.data,
          },
          () => console.log(this.state)
        )
      );
  }
  componentDidMount() {
    this.handleGetData();
  }

  //componentDidUdate
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.handleGetData();
    }
  }

  render() {
    const { todo, title } = this.state;
    return (
      <>
        <div>
          <h1>Todo</h1>
          <input
            type="text"
            value={title}
            placeholder="enter something"
            onChange={this.handleChange}
          />
          <button onClick={this.handleAdd.bind(this)}>ADD</button>
          <div>
            {todo?.map((el) => (
              <div
                key={el.id}
                style={{
                  width: "50%",
                  padding: 10,
                  margin: "auto",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>{el.title}</div>
                <button onClick={this.handleDelete.bind(this, el.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => this.setState({ page: this.state.page - 1 })}>
            Prev
          </button>
          <button onClick={() => this.setState({ page: this.state.page + 1 })}>
            Next
          </button>
        </div>
      </>
    );
  }
}
