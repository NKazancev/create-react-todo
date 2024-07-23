import { useState } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Tools from './Tools';

export default function App() {
  const [toDoList, setToDoList] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (text, time) => {
    if (text.match(/[^\s]/g)) {
      let task = {
        id: String(Math.random()).slice(2, 8),
        text: text.trim(),
        done: false,
        date: new Date(),
        paused: true,
        reversed: undefined,
        time,
      };

      if (time === 0) {
        task = { ...task, reversed: false };
      } else {
        task = { ...task, reversed: true };
      }
      setToDoList([...toDoList, task]);
    }
  };

  const completeTask = (id) => {
    const index = toDoList.findIndex((task) => task.id === id);
    const oldTask = toDoList[index];
    const newTask = {
      ...oldTask,
      done: !oldTask.done,
      paused: true,
    };
    stopTimer(id);
    setToDoList(toDoList.with(index, newTask));
  };

  const editTask = (id, text) => {
    if (text.match(/[^\s]/g)) {
      const index = toDoList.findIndex((task) => task.id === id);
      const oldTask = toDoList[index];
      const newTask = { ...oldTask, text };
      setToDoList(toDoList.with(index, newTask));
    }
  };

  const deleteTask = (id) => {
    const newList = toDoList.filter((task) => task.id !== id);
    setToDoList(newList);
  };

  const startTimer = (id) => {
    const { paused } = toDoList.find((task) => task.id === id);
    if (paused) {
      const timer = setInterval(() => {
        setToDoList((prevToDoList) => {
          return prevToDoList.map((task) => {
            const newTask = task;
            if (newTask.id === id) {
              if (!task.paused && !newTask.reversed) {
                newTask.time += 1;
              }
              if (!newTask.paused && newTask.reversed) {
                newTask.time -= 1;
              }
              if (newTask.time <= 0) {
                newTask.time = 0;
                stopTimer(id);
              }
            }
            return newTask;
          });
        });
      }, 1000);

      const index = toDoList.findIndex((task) => task.id === id);
      const oldTask = toDoList[index];
      const newTask = { ...oldTask, paused: false, timer };
      setToDoList(toDoList.with(index, newTask));
    }
  };

  const stopTimer = (id) => {
    const { paused } = toDoList.find((task) => task.id === id);
    if (!paused) {
      const index = toDoList.findIndex((task) => task.id === id);
      const oldTask = toDoList[index];
      clearInterval(oldTask.timer);
      const newTask = { ...oldTask, paused: true };
      setToDoList(toDoList.with(index, newTask));
    }
  };

  const clearTasks = () => setToDoList(toDoList.filter((task) => !task.done));

  function filterTasks(items, itemsFilter) {
    return items.filter((task) => {
      switch (itemsFilter) {
        case 'completed':
          return task.done;
        case 'active':
          return !task.done;
        default:
          return items;
      }
    });
  }

  const tasks = filterTasks(toDoList, filter);
  const uncompletedTasks = filterTasks(toDoList, 'active').length;

  return (
    <div className="app">
      <header>
        <h1 className="title">ToDo List</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <main>
        <TaskList
          tasks={tasks}
          completeTask={completeTask}
          editTask={editTask}
          deleteTask={deleteTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
      </main>
      <footer>
        <Tools
          setFilter={(itemsFilter) => setFilter(itemsFilter)}
          clearTasks={clearTasks}
          total={uncompletedTasks}
          filter={filter}
        />
      </footer>
    </div>
  );
}
