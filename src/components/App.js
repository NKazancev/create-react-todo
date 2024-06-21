import { Component } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Tools from './Tools';

export default class App extends Component {
  state = {
    toDoList: [],
    filter: 'all',
  };

  addTask = (text) => {
    if (text.match(/[^\s]/g)) {
      const newTask = {
        id: String(Math.random()).slice(2, 8),
        text: text.trim(),
        done: false,
        date: new Date(),
      };

      this.setState(({ toDoList }) => {
        const newToDoList = [...toDoList, newTask];
        return {
          toDoList: newToDoList,
        };
      });
    }
  };

  completeTask = (id) => {
    this.setState(({ toDoList }) => {
      const index = toDoList.findIndex((task) => task.id === id);
      const oldTask = toDoList[index];
      const newTask = { ...oldTask, done: !oldTask.done };
      const newList = toDoList.with(index, newTask);

      return {
        toDoList: newList,
      };
    });
  };

  editTask = (id, text) => {
    if (text.match(/[^\s]/g)) {
      this.setState(({ toDoList }) => {
        const index = toDoList.findIndex((task) => task.id === id);
        const oldTask = toDoList[index];
        const newTask = { ...oldTask, text };
        const newList = toDoList.with(index, newTask);

        return {
          toDoList: newList,
        };
      });
    }
  };

  deleteTask = (id) => {
    this.setState(({ toDoList }) => {
      return {
        toDoList: toDoList.filter((task) => task.id !== id),
      };
    });
  };

  clearTasks = () => {
    this.setState(({ toDoList }) => {
      return {
        toDoList: toDoList.filter((task) => !task.done),
      };
    });
  };

  setFilter = (filter) => this.setState({ filter });

  static filterTasks(items, filter) {
    return items.filter((task) => {
      switch (filter) {
        case 'completed':
          return task.done;
        case 'active':
          return !task.done;
        default:
          return items;
      }
    });
  }

  render() {
    const { toDoList, filter } = this.state;
    const tasks = App.filterTasks(toDoList, filter);
    const completedTasks = toDoList.filter((task) => task.done).length;
    const uncompletedTasks = toDoList.length - completedTasks;

    return (
      <div className="app">
        <header>
          <h1 className="title">ToDo List</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <main>
          <TaskList
            tasks={tasks}
            completeTask={this.completeTask}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
          />
        </main>
        <footer>
          <Tools
            setFilter={this.setFilter}
            clearTasks={this.clearTasks}
            total={uncompletedTasks}
            filter={filter}
          />
        </footer>
      </div>
    );
  }
}
