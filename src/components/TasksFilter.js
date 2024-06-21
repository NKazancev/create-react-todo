import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
  };

  static defaultProps = {
    filter: 'all',
    setFilter: () => {},
  };

  render() {
    const { setFilter, filter } = this.props;
    const btn = 'tools__button';
    const selectedBtn = 'tools__button selected';

    return (
      <div className="tools__filters">
        <button
          type="button"
          data-filter="all"
          onClick={(e) => setFilter(e.target.dataset.filter)}
          className={filter === 'all' ? selectedBtn : btn}
        >
          All
        </button>

        <button
          type="button"
          data-filter="active"
          onClick={(e) => setFilter(e.target.dataset.filter)}
          className={filter === 'active' ? selectedBtn : btn}
        >
          Active
        </button>

        <button
          type="button"
          data-filter="completed"
          onClick={(e) => setFilter(e.target.dataset.filter)}
          className={filter === 'completed' ? selectedBtn : btn}
        >
          Completed
        </button>
      </div>
    );
  }
}
