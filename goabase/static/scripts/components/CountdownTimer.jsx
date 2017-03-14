/* eslint-disable react/require-default-props */
import moment from 'moment';
import React from 'react';

const gettext = text => text;

const propTypes = {
  initialTimeRemaining: React.PropTypes.number.isRequired,
  interval: React.PropTypes.number,
};

const defaultProps = {
  interval: 1000,
};

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: this.props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null,
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.tick();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    this.setState({ prevTime: null, timeRemaining: newProps.initialTimeRemaining });
  }

  componentDidUpdate() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.mounted) {
      this.tick();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.state.timeoutId);
  }

  getDays(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).asDays());
  }

  getHours(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).hours());
  }

  getMinutes(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).minutes());
  }

  getSeconds(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).seconds());
  }

  tick() {
    const currentTime = moment.now();
    const dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
    const interval = this.props.interval;

    // Correct for small variations in actual timeout time
    const timeRemainingInInterval = (interval - (dt % interval));
    let timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    const timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    const countdownComplete = (this.state.prevTime && timeRemaining <= 0);

    if (this.mounted) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId);
      }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick.bind(this), timeout),
        prevTime: currentTime,
        timeRemaining,
      });
    }
  }

  render() {
    return (
      <ul className="countdown-inner list-group list-group-horizontal">
        <li className="countdown-label list-group-item">{gettext('Time left to event:')}</li>
        <li className="countdown-days list-group-item">
          <em>{this.getDays()}</em>
          {gettext('Days')}
        </li>
        <li className="countdown-hours list-group-item">
          <em>{this.getHours()}</em>
          {gettext('Hours')}
        </li>
        <li className="countdown-minutes list-group-item">
          <em>{this.getMinutes()}</em>
          {gettext('Minutes')}
        </li>
        <li className="countdown-seconds list-group-item">
          <em>{this.getSeconds()}</em>
          {gettext('Seconds')}
        </li>
      </ul>
    );
  }
}

CountdownTimer.propTypes = propTypes;
CountdownTimer.defaultProps = defaultProps;

export default CountdownTimer;
