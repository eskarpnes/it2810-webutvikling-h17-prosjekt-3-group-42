import React from 'react';
import {Component} from "react/cjs/react.production.min";
import Calendar from 'react-calendar/build/entry.nostyle';

class CalendarContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  // Makes a specific date green.
  // Shows which event this is on hover.
  addEventOnDay(date, eventHover) {
    const buttons = document.getElementsByClassName(
      "react-calendar__month-view__days__day");
    const currentMonth = new Date().getMonth();
    for (let i = 0; i < buttons.length; i++) {
      let btn = buttons[i]
      const btnDate = new Date(
        btn.firstChild.attributes.item(0).textContent);
      if (btnDate.getDate() === date.getDate() &&
          btnDate.getMonth() === date.getMonth() &&
          btnDate.getMonth() === currentMonth) {
        btn.style.background = "#2ecc71";
        btn.style.color = "black";
        btn.title = eventHover;
        btn.className += " tile-has-event"
      }
    }
  }
  
  // Makes all the days transparent.
  // Set the text color to white on weekdays and green on weekend.
  deleteEvents() {
    const buttons = document.getElementsByClassName(
      "react-calendar__month-view__days__day");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "transparent";
      const date = new Date(
        buttons[i].firstChild.attributes.item(0).textContent);
      // If saturday or sunday, make text emerald
      if (date.getDay() === 6 || date.getDay() === 0) {
        buttons[i].style.color = "#2ecc71";
      }
      // Else make text white
      else {
        buttons[i].style.color = "white";
      }
    }
  }
  
  // Runs every time the EventContainer updates
  // Deleting makes all the days transparent before it goes through
  // the events and makes any day having an event green.
  componentWillUpdate() {
    this.deleteEvents();
    JSON.parse(localStorage.getItem('events')).map((event)=>{
      let eventHover = `${event['title']}: ${event['text']}`
      this.addEventOnDay(new Date(Date.parse(event['eventAt'])), eventHover);
    })
  }
  
  render() {
    return (
      <Calendar showNavigation={false}/>
    )
  }
}

export default CalendarContainer;
