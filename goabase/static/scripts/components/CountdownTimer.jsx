// @flow
import moment from 'moment';
import React from 'react';
import { renderReact } from 'hypernova-react';
import i18n from '../i18n';

declare class CountdownTimerPropTypes {
  initialTimeRemaining: number,
  interval: number,
}

const defaultProps = {
  interval: 1000,
};

class CountdownTimer extends React.Component {
  props: CountdownTimerPropTypes;
  static defaultProps: {
    interval: number,
  };
  state: {
    timeRemaining: number,
    timeoutId: ?number,
    prevTime: ?number,
  };
  mounted: boolean;

  /**
   * @param {CountdownTimerPropTypes} props
   */
  constructor(props: CountdownTimerPropTypes) {
    super(props);
    this.state = {
      timeRemaining: this.props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null,
    };
    this.mounted = false;
  }

  /**
   * Invoked immediately after a component is mounted.
   */
  componentDidMount(): void {
    this.mounted = true;
    this.tick();
  }

  /**
   * Invoked before a mounted component receives new props.
   * @param {CountdownTimerPropTypes} newProps
   */
  componentWillReceiveProps(newProps: CountdownTimerPropTypes): void {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    this.setState({ prevTime: null, timeRemaining: newProps.initialTimeRemaining });
  }

  /**
   * Invoked immediately after updating occurs.
   */
  componentDidUpdate(): void {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.mounted) {
      this.tick();
    }
  }

  /**
   * Invoked immediately before a component is unmounted and destroyed.
   */
  componentWillUnmount(): void {
    this.mounted = false;
    clearTimeout(this.state.timeoutId);
  }

  /**
   * Gets the number of remaining days.
   * @returns {number}
   */
  getDays(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).asDays());
  }

  /**
   * Gets the number of remaining hours.
   * @returns {number}
   */
  getHours(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).hours());
  }

  /**
   * Gets the number of remaining minutes.
   * @returns {number}
   */
  getMinutes(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).minutes());
  }

  /**
   * Gets the number of remaining seconds.
   * @returns {number}
   */
  getSeconds(): number {
    return Math.floor(moment.duration(this.state.timeRemaining).seconds());
  }

  /**
   * Tick, tock, tick, tock.
   */
  tick(): void {
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

  /**
   * @returns {React.Element<any>}
   */
  render(): React.Element<any> {
    return (
      <div className="countdown">
        <ul className="countdown-inner list-group list-group-horizontal">
          <li className="countdown-label list-group-item">{i18n.gettext('Time left to event:')}</li>
          <li className="countdown-days list-group-item">
            <em>{this.getDays()}</em>
            {i18n.ngettext('Day', 'Days', this.getDays())}
          </li>
          <li className="countdown-hours list-group-item">
            <em>{this.getHours()}</em>
            {i18n.ngettext('Hour', 'Hours', this.getHours())}
          </li>
          <li className="countdown-minutes list-group-item">
            <em>{this.getMinutes()}</em>
            {i18n.ngettext('Minute', 'Minutes', this.getMinutes())}
          </li>
          <li className="countdown-seconds list-group-item">
            <em>{this.getSeconds()}</em>
            {i18n.ngettext('Second', 'Seconds', this.getSeconds())}
          </li>
        </ul>
      </div>
    );
  }
}

CountdownTimer.defaultProps = defaultProps;

export default renderReact('CountdownTimer', CountdownTimer);
