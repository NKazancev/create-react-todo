import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        done: PropTypes.bool,
        date: PropTypes.instanceOf(Date),
      })
    ),
    editTask: PropTypes.func,
    completeTask: PropTypes.func,
    deleteTask: PropTypes.func,
  };

  static defaultProps = {
    tasks: [],
    editTask: () => {},
    completeTask: () => {},
    deleteTask: () => {},
  };

  render() {
    const { tasks, editTask, completeTask, deleteTask } = this.props;

    let className = 'list-container';
    if (!tasks.length) className += ' no-padding';

    const todos = tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          done={task.done}
          date={task.date}
          onEdit={editTask}
          onComplete={() => completeTask(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      );
    });

    return (
      <div className={className}>
        <ul className="list">{todos}</ul>
      </div>
    );
  }
}
