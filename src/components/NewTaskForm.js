import PropTypes from 'prop-types';
import { useState } from 'react';

export default function NewTaskForm(props) {
  const { addTask } = props;

  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const time = minutes * 60 + Number(seconds);
    addTask(text, time);
    setText('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <button type="submit" className="form__button">
        Add task
      </button>

      <input
        type="text"
        className="form__input form__input--text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="What needs to be done"
      />

      <p className="form__timer">
        <input
          type="number"
          className="form__input form__input--min"
          onChange={(e) => setMinutes(e.target.value)}
          value={minutes}
          placeholder="min"
        />
        <input
          type="number"
          className="form__input form__input--sec"
          onChange={(e) => setSeconds(e.target.value)}
          value={seconds}
          placeholder="sec"
        />
      </p>
    </form>
  );
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

NewTaskForm.defaultProps = {
  addTask: () => {},
};
