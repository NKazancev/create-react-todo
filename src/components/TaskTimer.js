import PropTypes from 'prop-types';

import playIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';

export default function TaskTimer(props) {
  const { time, startTimer, stopTimer } = props;

  const seconds = (time % 60).toString().padStart(2, 0);
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);

  return (
    <div className="timer">
      <div className="timer__buttons">
        <button className="timer__start" type="button" onClick={startTimer}>
          <img src={playIcon} alt="play-icon" />
        </button>
        <button className="timer__stop" type="button" onClick={stopTimer}>
          <img src={pauseIcon} alt="pause-icon" />
        </button>
      </div>

      <div className="timer__display">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
    </div>
  );
}

TaskTimer.propTypes = {
  time: PropTypes.number,
  stopTimer: PropTypes.func,
  startTimer: PropTypes.func,
};

TaskTimer.defaultProps = {
  time: 0,
  stopTimer: () => {},
  startTimer: () => {},
};
