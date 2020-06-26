import React, { Component, ChangeEvent } from "react";
import { Task } from "../Types/task";
import api from "../Shared/api";

const ACTIVE = "active";
const COMPLETE = "completed";
const ALL = "all";

interface PropsTypes {}
interface StateTypes {
  tasks: Task[];
  name: string;
  type: string;
  activeType: string;
  [propName: string]: any;
}

export default class Tasks extends Component<PropsTypes, StateTypes> {
  state = {
    tasks: [],
    name: "",
    type: "",
    activeType: ALL,
  };

  componentDidMount = async () => {
    const res: any = await api.get("/task");
    this.setState({ tasks: res.data });
  };

  inputChange = (element: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [element.target.name]: element.target.value });
  };

  addTask = async () => {
    const { tasks, name, type } = this.state;
    const res: any = await api.post("/task", { name, type });
    console.log(res);
    this.setState({
      tasks: [...tasks, { name, type, id: res.data._id }],
      name: "",
      type: "",
    });
  };

  setActiveTab = (name: string) => {
    this.setState({ activeType: name });
  };

  render() {
    const { tasks, name, type, activeType } = this.state;
    const filtredTasks = tasks.filter((e: Task) =>
      activeType === ALL ? true : e.type === activeType
    );
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input
            data-testid="input-Task-name"
            value={name}
            name="name"
            onChange={this.inputChange}
            type="text"
            className="large mx-8"
            placeholder="Task Title"
          />
          <input
            data-testid="input-Task-status"
            value={type}
            name="type"
            onChange={this.inputChange}
            type="text"
            className="large mx-8"
            placeholder="Task Status"
          />
          <button
            onClick={this.addTask}
            className=""
            data-testid="submit-button"
          >
            Add Task
          </button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li
              className={`tab-item slide-up-fade-in ${
                activeType === ALL ? "activeTab" : ""
              }`}
              onClick={() => this.setActiveTab(ALL)}
              data-testid="allButton"
            >
              All
            </li>
            <li
              className={`tab-item slide-up-fade-in ${
                activeType === ACTIVE ? "activeTab" : ""
              }`}
              onClick={() => this.setActiveTab(ACTIVE)}
              data-testid="activeButton"
            >
              Active
            </li>
            <li
              className={`tab-item slide-up-fade-in ${
                activeType === COMPLETE ? "activeTab" : ""
              }`}
              onClick={() => this.setActiveTab(COMPLETE)}
              data-testid="completedButton"
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="TaskList">
              {filtredTasks.map((task: Task) => (
                <tr key={task.id}>
                  <td> {task.name} </td>
                  <td> {task.type} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
