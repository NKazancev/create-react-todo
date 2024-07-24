import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import pen from '../assets/pen.svg';
import trash from '../assets/trash.svg';

import TaskTimer from './TaskTimer';

export default function Task({
  id = '',
  done = false,
  text = '',
  date = '',
  time = 0,
  onComplete = () => {},
  onEdit = () => {},
  onDelete = () => {},
  startTimer = () => {},
  stopTimer = () => {},
}) {
  const [stateText, setText] = useState('');
  const [edit, setEdit] = useState(false);

  let taskClass = 'task__item';
  if (done) taskClass += ' completed';

  const editTask = () => {
    if (!done) {
      setText(text);
      setEdit((s) => !s);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit(id, stateText);
    setText('');
    setEdit((s) => !s);
  };

  return (
    <li className="task">
      {edit && (
        <form onSubmit={handleSubmit} className="task__form">
          <input
            type="text"
            className="task__input"
            onChange={(e) => setText(e.target.value)}
            value={stateText}
          />
        </form>
      )}

      <div className={!edit ? taskClass : 'hidden'}>
        <input
          type="checkbox"
          id={id}
          className="task__checkbox"
          checked={done}
          onChange={onComplete}
        />
        <label htmlFor={id} className="task__label">
          {text}
        </label>
      </div>

      <div className="task__date">
        {`created ${formatDistanceToNow(date, {
          includeSeconds: true,
          addSuffix: true,
        })}`}
      </div>

      <TaskTimer time={time} startTimer={startTimer} stopTimer={stopTimer} />

      <button type="button" className="task__button" onClick={editTask}>
        <img src={pen} alt="pen-icon" />
      </button>

      <button type="button" className="task__button" onClick={onDelete}>
        <img src={trash} alt="trash-icon" />
      </button>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  done: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  time: PropTypes.number,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  stopTimer: PropTypes.func,
  startTimer: PropTypes.func,
};
