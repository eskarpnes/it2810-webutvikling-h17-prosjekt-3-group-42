import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Event from './Event';
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
import CalendarContainer from "../Calendar/CalendarContainer";

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : "#34495e"
  }
};

class EventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      modalIsOpen: false,
      title: '',
      text: '',
      eventAt: moment()
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEventAtChange = this.handleEventAtChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFromLS = this.updateFromLS.bind(this);
  }

  componentDidMount() {
    this.updateFromLS();
  }

  updateFromLS() {
    let LS = JSON.parse(
      localStorage.getItem('events'));
    let fromStorage = [];
    if (LS && LS.length > 1){
      LS.map((event)=>{
        if (event['title']){
          let storageEvent =
            <Event
              id={event["id"]}
              key={
                moment(
                  event['eventAt']
                ).valueOf()}
              title={event['title']}
              text={event['text']}
              eventAt={
                moment(
                  event['eventAt']
                ).format("dddd, MMMM Do, HH:mm")}
              update={this.updateFromLS}
            />;
          fromStorage.push(storageEvent)
        }
      })
    }
    else {
      let storageEvent =
        <Event
          id={99999}
          key={moment("2017-10-19T10:00:05.000Z").valueOf()}
          title="Evaluate our website plz"
          text="😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 "
          eventAt={moment("2017-10-19T10:00:05.000Z").format("dddd, MMMM Do, HH:mm")}
          update={this.updateFromLS}
        />;
      fromStorage.push(storageEvent)
      localStorage.setItem('events', JSON.stringify(fromStorage))
    }
    this.setState({ events: fromStorage });
  }

  newEvent(event){
    this.setState(prevState => ({
      events: [...prevState.events,
        <Event
          id={event["id"]}
          key={event["eventAt"].valueOf()}
          title={event["title"]}
          text={event["text"]}
          eventAt={event["eventAt"].format("dddd, MMMM Do, HH:mm")}
          update={this.updateFromLS}
        />],
    }));
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleEventAtChange(date) {
    this.setState({
      eventAt: date,
    });
  }

  handleSubmit(e) {
    if (this.state.title === "") {
      alert("You must enter a title!");
      return
    }
    e.preventDefault();
    this.closeModal();
    let id = Number(localStorage.count);
    localStorage.count = Number(localStorage.count) + 1;
    let newEvent = {
      'id': id,
      'title': this.state.title,
      'text': this.state.text,
      'eventAt': this.state.eventAt
    };
    this.newEvent(
      newEvent
    );


    let LS = JSON.parse(
      localStorage.getItem('events'));
    LS.push(newEvent);
    localStorage.setItem('events',
      JSON.stringify(LS));

    this.setState({
      title: "",
      text: ""
    })
  }

  render() {
    const eventBtn =
      <button onClick={this.openModal}>New event</button>;

    const eventForm = <form>
      <div className="input-fields">
        <input
          className="event-input"
          type="text"
          placeholder="Title"
          onChange={this.handleTitleChange}
        />
        <input
          className="event-input"
          type="text"
          placeholder="Text"
          onChange={this.handleTextChange}
        />
      </div>
      <div className="datepicker">
        <DatePicker
          selected={this.state.eventAt}
          onChange={this.handleEventAtChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          inline
          minDate={moment()}
          locale="en-gb"
        />
      </div>
    </form>;

    const formButton =
      <button
        onClick={this.handleSubmit}>New event
      </button>;

    let events = [...this.state.events];
    events.sort((a,b) => a.key - b.key);

    return (
      <div className="container-item" id="Events">
        <Box
          color={this.props.borderColor}
          name="Your upcoming events"
          obj={events.map((n,idx) =>
            <div className='box-item'
              key={idx}>{n}</div>
          )}
          button={eventBtn}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="New note"
          style={modalStyles}
        >
          <Box
            color="emerald"
            name="New event"
            obj= {[eventForm]}
            button = {formButton}
          />
        </Modal>
        <CalendarContainer/>
      </div>
    )
  }
}

EventContainer.propTypes = {
  borderColor: PropTypes.string
};

export default EventContainer;
