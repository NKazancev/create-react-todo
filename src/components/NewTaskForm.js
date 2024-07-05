import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    addTask: PropTypes.func,
  };

  static defaultProps = {
    addTask: () => {},
  };

  state = {
    text: '',
    minutes: '',
    seconds: '',
  };

  onTextChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onMinutesChange = (event) => {
    this.setState({
      minutes: event.target.value,
    });
  };

  onSecondsChange = (event) => {
    this.setState({
      seconds: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { addTask } = this.props;
    const { text, minutes, seconds } = this.state;
    const time = minutes * 60 + Number(seconds);

    addTask(text, time);
    this.setState({
      text: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    const { text, minutes, seconds } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <button type="submit" className="form__button">
          Add task
        </button>

        <input
          type="text"
          className="form__input form__input--text"
          onChange={this.onTextChange}
          value={text}
          placeholder="What needs to be done"
        />

        <p className="form__timer">
          <input
            type="number"
            className="form__input form__input--min"
            onChange={this.onMinutesChange}
            value={minutes}
            placeholder="min"
          />
          <input
            type="number"
            className="form__input form__input--sec"
            onChange={this.onSecondsChange}
            value={seconds}
            placeholder="sec"
          />
        </p>
      </form>
    );
  }
}
