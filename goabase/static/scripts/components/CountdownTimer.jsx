import moment from 'moment';
import React from 'react';

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

  tick() {
    const currentTime = Date.now();
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
        timeRemaining: timeRemaining,
      });
    }
  }

  getDays(milliseconds) {
    return Math.floor(moment.duration(milliseconds).asDays());
  }

  getHours(milliseconds) {
    return Math.floor(moment.duration(milliseconds).hours());
  }

  getMinutes(milliseconds) {
    return Math.floor(moment.duration(milliseconds).minutes());
  }

  getSeconds(milliseconds) {
    return Math.floor(moment.duration(milliseconds).seconds());
  }

  render() {
    const timeRemaining = this.state.timeRemaining;
    return (
      <ul className='list-group list-group-horizontal countdown-inner'>
        <li className='list-group-item countdown-label'>{gettext('Time left to event:')}</li>
        <li className='list-group-item countdown-days'>
          <em>{this.getDays(timeRemaining)}</em>
          {gettext('Days')}
        </li>
        <li className='list-group-item countdown-hours'>
          <em>{this.getHours(timeRemaining)}</em>
          {gettext('Hours')}
        </li>
        <li className='list-group-item countdown-minutes'>
          <em>{this.getMinutes(timeRemaining)}</em>
          {gettext('Minutes')}
        </li>
        <li className='list-group-item countdown-seconds'>
          <em>{this.getSeconds(timeRemaining)}</em>
          {gettext('Seconds')}
        </li>
      </ul>
    );
  }
}

CountdownTimer.propTypes = propTypes;
CountdownTimer.defaultProps = defaultProps;

export default CountdownTimer;
