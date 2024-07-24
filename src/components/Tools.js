import PropTypes from 'prop-types';

import Filters from './Filters';

export default function Tools({
  total = 0,
  filter = 'all',
  setFilter = () => {},
  clearTasks = () => {},
}) {
  return (
    <div className="tools">
      <span className="tools__stat">
        Uncompleted <br /> tasks: {total}
      </span>

      <Filters setFilter={setFilter} filter={filter} />

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
