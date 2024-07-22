import PropTypes from 'prop-types';

import Task from './Task';

export default function TaskList(props) {
  const { tasks, completeTask, deleteTask, editTask, startTimer, stopTimer } =
    props;

  const todos = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        text={task.text}
        done={task.done}
        date={task.date}
        time={task.time}
        isEdited={task.isEdited}
        onComplete={() => completeTask(task.id)}
        onDelete={() => deleteTask(task.id)}
        onEdit={editTask}
        startTimer={() => startTimer(task.id)}
        stopTimer={() => stopTimer(task.id)}
      />
    );
  });

  let className = 'list-container';
  if (!tasks.length) className += ' no-padding';

  return (
    <div className={className}>
      <ul className="list">{todos}</ul>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
      time: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    })
  ),
  editTask: PropTypes.func,
  completeTask: PropTypes.func,
  deleteTask: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

TaskList.defaultProps = {
  tasks: [],
  editTask: () => {},
  completeTask: () => {},
  deleteTask: () => {},
  startTimer: () => {},
  stopTimer: () => {},
};
