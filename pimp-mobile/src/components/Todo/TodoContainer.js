import React, {Component} from 'react'
import { Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import Modal from 'react-native-modal';
import Todo from "./Todo";
import { styles } from '../../styles.js';

class TodoContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      modalVisible: false,
      text: '',
      count: 0
    };
  }

  componentDidMount() {
    this.newTodo('Press new todo to make a new todo');
  }

  toggleModal() {
    this.setState((prevState) => {
      return {modalVisible: !prevState.modalVisible};
    });
  }

  submitTodo() {
    if (this.state.text !== '') {
      this.newTodo(this.state.text);
    }
    this.setState({text: ''});
    this.toggleModal()
  }

  removeTodo(id) {
    let arr = this.state.todos;
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].props.id === id) {
        index = i;
      }
    }
    if (index !== -1) {
      arr.splice(index, 1);
    }
    this.setState({todos: arr});
  }

  newTodo(text=''){
    let todo =
      <Todo
        id={this.state.count}
        text={text}
      />;
    this.setState((prevState) => {
      return {count: prevState.count + 1}
    });
    let arr = this.state.todos;
    arr.push(todo);
    this.setState({ todos: arr })
  }

  allTodos() {
    return(
      this.state.todos.map((n,idx) =>
        <View style={styles.row_box} key={idx}>
          <View style={[styles.container, styles.turquoise_border]}>
            {n}
          </View>
          <TouchableNativeFeedback
            onPress={() => { this.removeTodo(n.props.id)}}
          >
            <View style={styles.delete_container}>
              <View style={[styles.delete_border, styles.turquoise_border]}>
                <Text style={[styles.delete_text, styles.turquoise]}>
                  ✓
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
        <View style={[styles.box_header, styles.turquoise_border]}>
          <Text style={[styles.title, styles.turquoise]}>
            Your Todos
          </Text>
        </View>
        <View style={[styles.box_body, styles.turquoise_border]}>
          {this.allTodos()}
        </View>
        <TouchableNativeFeedback
          onPress={() => { this.toggleModal()}}>
          <View style={[styles.box_button, styles.turquoise_background]}>
            <Text style={styles.wet_asphalt}>
              New todo
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
            <View style={[styles.box_header, styles.turquoise_border]}>
              <Text style={[styles.title, styles.turquoise]}>
                New todo
              </Text>
            </View>
            <View style={[styles.box_body, styles.turquoise_border]}>
              <TextInput
                style={{height: 60, color: '#1abc9c'}}
                placeholder="Text"
                onChangeText={(text) => this.setState({text: text})}
              />
            </View>
            <TouchableNativeFeedback
              onPress={() => {this.submitTodo()}}>
              <View style={[styles.box_button, styles.turquoise_background]}>
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

export default TodoContainer

