import React, {Component} from 'react'
import { Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import Modal from 'react-native-modal';
import Event from "./Event";
import { styles } from '../../styles.js';
import DatePicker from "react-native-datepicker";

class EventContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      modalVisible: false,
      title: '',
      text: '',
      date: '',
      count: 0
    };
  }

  toggleModal() {
    this.setState((prevState) => {
      return {modalVisible: !prevState.modalVisible};
    });
  }

  submitEvent() {
    if (this.state.title !== '') {
      this.newEvent(this.state.title, this.state.text, this.state.date);
    }
    this.setState({title: '', text: ''});
    this.toggleModal()
  }

  removeEvent(id) {
    let arr = this.state.events;
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].props.id === id) {
        index = i;
      }
    }
    if (index !== -1) {
      arr.splice(index, 1);
    }
    this.setState({events: arr});
  }

  newEvent(title='',text='', date){
    let event =
      <Event
        id={this.state.count}
        title={title}
        text={text}
        date={date}
      />;
    this.setState((prevState) => {
      return {count: prevState.count + 1}
    });
    let arr = this.state.events;
    arr.push(event);
    this.setState({ events: arr })
  }

  //Not used. Expo kept crashing when I tried implementing sorting based on date of the event
  //Key was the unix time of the event
  /*  sortEvents(){
    let events = [...this.state.events];
    events.sort((a,b) => a.key - b.key);
    this.setState({events: events});
  }*/

  allEvents() {
    return(
      this.state.events.map((n,idx) =>
        <View style={styles.row_box} key={idx}>
          <View style={[styles.container, styles.emerald_border]}>
            {n}
          </View>
          <TouchableNativeFeedback
            onPress={() => { this.removeEvent(n.props.id)}}
          >
            <View style={styles.delete_container}>
              <View style={[styles.delete_border, styles.emerald_border]}>
                <Text style={[styles.delete_text, styles.emerald]}>
                  x
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      ));
  }

  render(){
    return(
      <View style={styles.box}>
        <View style={[styles.box_header, styles.emerald_border]}>
          <Text style={[styles.title, styles.emerald]}>
            Your Events
          </Text>
        </View>
        <View style={[styles.box_body, styles.emerald_border]}>
          {this.allEvents()}
        </View>
        <TouchableNativeFeedback
          onPress={() => { this.toggleModal()}}>
          <View style={[styles.box_button, styles.emerald_background]}>
            <Text style={styles.wet_asphalt}>
              New event
            </Text>
          </View>
        </TouchableNativeFeedback>

        <Modal
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          transparent={true}
          isVisible={this.state.modalVisible}
          backDropColor="white"
          onBackdropPress={() => {this.toggleModal()}}
          onBackButtonPress={() => {this.toggleModal()}}
        >
          <View style={styles.box}>
            <View style={[styles.box_header, styles.emerald_border]}>
              <Text style={[styles.title, styles.emerald]}>
                New event
              </Text>
            </View>
            <View style={[styles.box_body, styles.emerald_border]}>
              <TextInput
                style={{height: 60, color: '#2ecc71'}}
                placeholder="Title"
                onChangeText={(text) => this.setState({title: text})}
              />
              <TextInput
                style={{height: 60, color: '#2ecc71'}}
                placeholder="Text"
                onChangeText={(text) => this.setState({text: text})}
              />
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="datetime"
                placeholder="select date"
                format="DD-MM HH:mm"
                minuteInterval={10}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  },
                  dateText: {
                    color: '#2ecc71'
                  }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />
            </View>
            <TouchableNativeFeedback
              onPress={() => {this.submitEvent()}}>
              <View style={[styles.box_button, styles.emerald_background]}>
                <Text style={styles.wet_asphalt}>
                  Confirm
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </Modal>
      </View>

    )
  }
}

export default EventContainer

