import { Component } from 'react';
import PropTypes from 'prop-types';

import play from '../assets/play.svg';
import pause from '../assets/pause.svg';

export default class TaskTimer extends Component {
  static propTypes = {
    time: PropTypes.number,
    stopTimer: PropTypes.func,
    startTimer: PropTypes.func,
  };

  static defaultProps = {
    time: 0,
    stopTimer: () => {},
    startTimer: () => {},
  };

  render() {
    const { time, startTimer, stopTimer } = this.props;

    return (
      <div className="timer">
        <div className="timer__buttons">
          <button className="timer__start" type="button" onClick={startTimer}>
            <img src={play} alt="play-icon" />
          </button>
          <button className="timer__stop" type="button" onClick={stopTimer}>
            <img src={pause} alt="pause-icon" />
          </button>
        </div>

        <div className="timer__display">
          <span>
            {Math.floor(time / 60)
              .toString()
              .padStart(2, 0)}
          </span>
          <span>:</span>
          <span>{(time % 60).toString().padStart(2, 0)}</span>
        </div>
      </div>
    );
  }
}
