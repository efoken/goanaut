import * as moment from 'moment';
import * as React from 'react';

declare const __: any;

export interface ICountdownTimerProps {
    initialTimeRemaining: number,
    interval?: number,
}

export interface ICountdownTimerState {
    prevTime?: number,
    timeoutId?: number,
    timeRemaining: number,
}

export class CountdownTimer extends React.Component<ICountdownTimerProps, ICountdownTimerState> {
    public static defaultProps: ICountdownTimerProps = {
        initialTimeRemaining: undefined,
        interval: 1000,
    };

    private mounted = false;

    constructor(props: ICountdownTimerProps) {
        super(props);
        this.state = {
            prevTime: null,
            timeoutId: null,
            timeRemaining: this.props.initialTimeRemaining,
        };
    }

    public componentDidMount(): void {
        this.mounted = true;
        this.tick();
    }

    public componentWillReceiveProps(newProps: ICountdownTimerProps): void {
        if (this.state.timeoutId) {
            clearTimeout(this.state.timeoutId);
        }
        this.setState({
            prevTime: null,
            timeRemaining: newProps.initialTimeRemaining,
        });
    }

    public componentDidUpdate(): void {
        if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.mounted) {
            this.tick();
        }
    }

    public componentWillUnmount(): void {
        this.mounted = false;
        clearTimeout(this.state.timeoutId);
    }

    private getDays(milliseconds: number): number {
        return Math.floor(moment.duration(milliseconds).asDays());
    }

    private getHours(milliseconds: number): number {
        return Math.floor(moment.duration(milliseconds).hours());
    }

    private getMinutes(milliseconds: number): number {
        return Math.floor(moment.duration(milliseconds).minutes());
    }

    private getSeconds(milliseconds: number): number {
        return Math.floor(moment.duration(milliseconds).seconds());
    }

    private tick(): void {
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
                prevTime: currentTime,
                timeoutId: countdownComplete ? null : setTimeout(this.tick.bind(this), timeout),
                timeRemaining: timeRemaining,
            });
        }
    }

    public render(): JSX.Element {
        return (
            <ul className="list-group list-group-horizontal countdown-inner">
                <li className="list-group-item countdown-label">{__('Time left to event:')}</li>
                <li className="list-group-item countdown-days">
                    <em>{this.getDays(this.state.timeRemaining)}</em>
                    {__('Days')}
                </li>
                <li className="list-group-item countdown-hours">
                    <em>{this.getHours(this.state.timeRemaining)}</em>
                    {__('Hours')}
                </li>
                <li className="list-group-item countdown-minutes">
                    <em>{this.getMinutes(this.state.timeRemaining)}</em>
                    {__('Minutes')}
                </li>
                <li className="list-group-item countdown-seconds">
                    <em>{this.getSeconds(this.state.timeRemaining)}</em>
                    {__('Seconds')}
                </li>
            </ul>
        );
    }
}
