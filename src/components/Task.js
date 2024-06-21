import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import pen from '../assets/pen.svg';
import trash from '../assets/trash.svg';

export default class Task extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    done: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    onComplete: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    id: '',
    text: '',
    done: false,
    date: new Date(),
    onComplete: () => {},
    onEdit: () => {},
    onDelete: () => {},
  };

  state = {
    text: '',
    done: false,
    edit: false,
  };

  completeTask = () => {
    const { onComplete } = this.props;
    onComplete();
    this.setState((state) => ({ done: !state.done }));
  };

  editTask = () => {
    const { done, text: propsText } = this.props;
    if (!done) {
      this.setState((state) => {
        return {
          edit: !state.edit,
          text: propsText,
        };
      });
    }
  };

  changeTask = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, onEdit } = this.props;
    const { text } = this.state;
    onEdit(id, text);
    this.setState((state) => {
      return {
        edit: !state.edit,
        text: '',
      };
    });
  };

  render() {
    const { id, done, text, date, onDelete } = this.props;
    const { edit, text: stateText } = this.state;

    let taskItem = 'task__item';
    if (done) taskItem += ' completed';

    return (
      <li className="task">
        {edit && (
          <form onSubmit={this.handleSubmit} className="task__form">
            <input
              type="text"
              className="task__input"
              onChange={this.changeTask}
              value={stateText}
            />
          </form>
        )}

        <div className={!edit ? taskItem : 'hidden'}>
          <input
            type="checkbox"
            id={id}
            className="task__checkbox"
            checked={done}
            onChange={this.completeTask}
          />

          <label htmlFor={id} className="task__label">
            {text}
          </label>
        </div>
        <span className="task__date">
          {`created ${formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
          })}`}
        </span>

        <button type="button" onClick={this.editTask} className="task__button">
          <img src={pen} alt="pen-icon" />
        </button>

        <button type="button" onClick={onDelete} className="task__button">
          <img src={trash} alt="trash-icon" />
        </button>
      </li>
    );
  }
}
