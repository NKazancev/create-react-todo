import PropTypes from 'prop-types';

import TaskFilter from './TaskFilter';

export default function Tools(props) {
  const { total, filter, setFilter, clearTasks } = props;

  return (
    <div className="tools">
      <span className="tools__stat">
        Uncompleted <br /> tasks: {total}
      </span>

      <TaskFilter setFilter={setFilter} filter={filter} />

      <button
        type="button"
        className="tools__button tools__button--clear"
        onClick={clearTasks}
      >
        Clear completed
      </button>
    </div>
  );
}

Tools.propTypes = {
  total: PropTypes.number,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  clearTasks: PropTypes.func,
};

Tools.defaultProps = {
  total: 0,
  filter: 'all',
  setFilter: () => {},
  clearTasks: () => {},
};
