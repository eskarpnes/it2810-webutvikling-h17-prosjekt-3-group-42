import React, {Component} from 'react';
import {Textfit} from 'react-textfit';
import PropTypes from 'prop-types'; // ES6

export class Clock extends Component {
  render() {
    const weekday = this.props.weekday;
    const month = this.props.month;
    const hours = this.props.hours;
    const minutes = this.props.minutes;
    const seconds = this.props.seconds;
    const day = this.props.day;
    return (
      <div id="clock">
        <Textfit mode="single">
          <p className="clock_element">{weekday}</p>
        </Textfit>
        <Textfit mode="single">
          <p className="clock_element">{day} {month}</p>
        </Textfit>
        <Textfit mode="single">
          <p className="clock_element">{hours}:{minutes}:{seconds}</p>
        </Textfit>
      </div>
    )
  }
}

Clock.propTypes = {
  weekday: PropTypes.string,
  month: PropTypes.string,
  hours: PropTypes.number,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  day: PropTypes.number,
}

export default Clock;
