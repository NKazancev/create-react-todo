import PropTypes from 'prop-types';

export default function Filters({ filter = 'all', setFilter = () => {} }) {
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

Filters.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};
