import { Component } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Tools from './Tools';

export default class App extends Component {
  state = {
    toDoList: [],
    filter: 'all',
  };

  addTask = (text, time) => {
    if (text.match(/[^\s]/g)) {
      let newTask = {
        id: String(Math.random()).slice(2, 8),
        text: text.trim(),
        done: false,
        paused: true,
        date: new Date(),
        time,
      };

      if (time === 0) {
        newTask = { ...newTask, reversed: false };
      } else {
        newTask = { ...newTask, reversed: true };
      }

      this.setState(({ toDoList }) => {
        const newToDoList = [...toDoList, newTask];
        return {
          toDoList: newToDoList,
        };
      });
    }
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ toDoList }) => {
        const newList = toDoList.map((task) => {
          const taskItem = task;

          if (!taskItem.paused && !taskItem.reversed) {
            taskItem.time += 0.5;
          }
          if (!taskItem.paused && taskItem.reversed) {
            taskItem.time -= 0.5;
          }
          if (taskItem.time <= 0) {
            taskItem.time = 0;
          }
          return taskItem;
        });
        return {
          toDoList: newList,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  completeTask = (id) => {
    this.setState(({ toDoList }) => {
      const index = toDoList.findIndex((task) => task.id === id);
      const oldTask = toDoList[index];
      const newTask = {
        ...oldTask,
        done: !oldTask.done,
        paused: true,
      };
      const newList = toDoList.with(index, newTask);

      return {
        toDoList: newList,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ toDoList }) => {
      const newList = toDoList.filter((task) => task.id !== id);
      return {
        toDoList: newList,
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

  startTimer = (id) => {
    this.handleTask(id, 'paused', false);
  };

  stopTimer = (id) => {
    this.handleTask(id, 'paused', true);
  };

  editTask = (id, text) => {
    if (text.match(/[^\s]/g)) {
      this.handleTask(id, 'text', text);
    }
  };

  handleTask = (id, prop, value) => {
    this.setState(({ toDoList }) => {
      const index = toDoList.findIndex((task) => task.id === id);
      const oldTask = toDoList[index];
      const newTask = { ...oldTask, [prop]: value };
      const newList = toDoList.with(index, newTask);

      return {
        toDoList: newList,
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
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
