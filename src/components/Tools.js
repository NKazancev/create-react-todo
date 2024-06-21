import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

export default class Tools extends Component {
  static propTypes = {
    total: PropTypes.number,
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    clearTasks: PropTypes.func,
  };

  static defaultProps = {
    total: 0,
    filter: 'all',
    setFilter: () => {},
    clearTasks: () => {},
  };

  render() {
    const { total, filter, setFilter, clearTasks } = this.props;

    return (
      <div className="tools">
        <span className="tools__stat">
          Uncompleted <br /> tasks: {total}
        </span>

        <TasksFilter filter={filter} setFilter={setFilter} />

        <button type="button" onClick={() => clearTasks()} className="tools__button button-clear">
          Clear completed
        </button>
      </div>
    );
  }
}
