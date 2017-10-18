import React, {Component} from 'react'
import { Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import Modal from 'react-native-modal';
import Note from "./Note";
import { styles } from '../../styles.js';

class NoteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      modalVisible: false,
      title: '',
      text: '',
      count: 0
    };
  }

  componentDidMount() {
    this.newNote('Example', 'Press new note to make a new note');
  }

  toggleModal() {
    this.setState((prevState) => {
      return {modalVisible: !prevState.modalVisible};
    });
  }

  submitNote() {
    if (this.state.title !== '') {
      this.newNote(this.state.title, this.state.text);
    }
    this.setState({title: '', text: ''});
    this.toggleModal()
  }

  removeNote(id) {
    let arr = this.state.notes;
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].props.id === id) {
        index = i;
      }
    }
    if (index !== -1) {
      arr.splice(index, 1);
    }
    this.setState({notes: arr});
  }

  newNote(title='',text=''){
    let note =
      <Note
        id={this.state.count}
        title={title}
        text={text}
      />;
    this.setState((prevState) => {
      return {count: prevState.count + 1}
    });
    let arr = this.state.notes;
    arr.push(note);
    this.setState({ notes: arr })
  }

  allNotes() {
    return(
      this.state.notes.map((n,idx) =>
        <View style={styles.row_box} key={idx}>
          <View style={[styles.container, styles.carrot_border]}>
            {n}
          </View>
          <TouchableNativeFeedback
            onPress={() => { this.removeNote(n.props.id)}}
          >
            <View style={styles.delete_container}>
              <View style={[styles.delete_border, styles.carrot_border]}>
                <Text style={[styles.delete_text, styles.carrot]}>
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
        <View style={[styles.box_header, styles.carrot_border]}>
          <Text style={[styles.title, styles.carrot]}>
            Your Notes
          </Text>
        </View>
        <View style={[styles.box_body, styles.carrot_border]}>
          {this.allNotes()}
        </View>
        <TouchableNativeFeedback
          onPress={() => { this.toggleModal()}}>
          <View style={[styles.box_button, styles.carrot_background]}>
            <Text style={styles.wet_asphalt}>
              New note
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
            <View style={[styles.box_header, styles.carrot_border]}>
              <Text style={[styles.title, styles.carrot]}>
                New note
              </Text>
            </View>
            <View style={[styles.box_body, styles.carrot_border]}>
              <TextInput
                style={{height: 60, color: '#e67e22'}}
                placeholder="Title"
                onChangeText={(text) => this.setState({title: text})}
              />
              <TextInput
                style={{height: 60, color: '#e67e22'}}
                placeholder="Text"
                onChangeText={(text) => this.setState({text: text})}
              />
            </View>
            <TouchableNativeFeedback
              onPress={() => {this.submitNote()}}>
              <View style={[styles.box_button, styles.carrot_background]}>
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

export default NoteContainer

