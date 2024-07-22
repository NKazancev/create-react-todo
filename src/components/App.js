import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setToDoList(
        toDoList.map((task) => {
          const taskItem = task;

          if (!taskItem.paused && !taskItem.reversed) {
            taskItem.time += 1;
          }
          if (!taskItem.paused && taskItem.reversed) {
            taskItem.time -= 1;
          }
          if (taskItem.time <= 0) {
            taskItem.time = 0;
          }
          return taskItem;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  });

  const completeTask = (id) => {
    const index = toDoList.findIndex((task) => task.id === id);
    const oldTask = toDoList[index];
    const newTask = {
      ...oldTask,
      done: !oldTask.done,
      paused: true,
    };
    setToDoList(toDoList.with(index, newTask));
  };

  const deleteTask = (id) => {
    const newList = toDoList.filter((task) => task.id !== id);
    setToDoList(newList);
  };

  const startTimer = (id) => {
    const index = toDoList.findIndex((task) => task.id === id);
    const oldTask = toDoList[index];
    if (!oldTask.paused) return;
    const newTask = { ...oldTask, paused: false };
    setToDoList(toDoList.with(index, newTask));
  };

  function handleTask(id, prop, value) {
    const index = toDoList.findIndex((task) => task.id === id);
    const oldTask = toDoList[index];
    const newTask = { ...oldTask, [prop]: value };
    setToDoList(toDoList.with(index, newTask));
  }

  const stopTimer = (id) => {
    handleTask(id, 'paused', true);
  };

  const editTask = (id, text) => {
    if (text.match(/[^\s]/g)) {
      handleTask(id, 'text', text);
    }
  };

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
          clearTasks={() => setToDoList(toDoList.filter((task) => !task.done))}
          total={uncompletedTasks}
          filter={filter}
        />
      </footer>
    </div>
  );
}
