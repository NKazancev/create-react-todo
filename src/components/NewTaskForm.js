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
  };

  onTextChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { addTask } = this.props;
    const { text } = this.state;
    addTask(text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <button type="submit" className="form__button">
          Add task
        </button>

        <input
          type="text"
          className="form__input"
          onChange={this.onTextChange}
          value={text}
          placeholder="What needs to be done"
        />
      </form>
    );
  }
}
