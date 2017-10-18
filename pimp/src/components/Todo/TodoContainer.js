import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Box from '../Box'
import { TodoList } from './Todo'
import {
  getLocalStorageCounter,
  initLocalStorageCounter,
  removeId
} from '../../helper'


class TodoContainer extends Component {
  constructor(props) {
    super(props)

    const defaultData = [
      {
        id: -1,
        value: 'Add new todos and come ' +
        'back any time later, I will save them for you!'
      }
    ]

    const localStorageData = localStorage.todos
      && JSON.parse(localStorage.todos)

    this.state = {
      data: localStorageData || defaultData,
      value: ''
    }

    this.newTodo = this.newTodo.bind(this)
    this.remove = this.remove.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.input.value !== '') {
      this.newTodo(this.input.value)
      this.setState({
        value: ''
      })
      this.input.placeholder = 'Add new todos here!'
    }
  }

  updateLocalData() {
    if (typeof(Storage) !== 'undefined')
      localStorage.todos = JSON.stringify(this.state.data)
  }

  newTodo(value) {
    const todo = {
      value: value,
      id: getLocalStorageCounter()
    }

    this.state.data.push(todo)
    this.setState({
      data: this.state.data
    }, () => {
      this.updateLocalData()
    })
  }

  remove(id) {
    this.setState({
      data: removeId(this.state.data, id)
    }, () => {
      this.updateLocalData()
    })
  }

  componentDidMount() {
    if(!localStorage.todos) {
      localStorage.todos = JSON.stringify(this.state.data)
    }
    initLocalStorageCounter()
  }

  render() {
    const todoForm =
      <div className='Todo'>
        <div className = 'group'>
          <form onSubmit={this.handleSubmit}>
            <input className='todo-input input'
              type='text'
              required
              name='title'
              ref={node => {
                this.input = node
              }}
              value={this.state.value}
              placeholder='Add a new todo here!'
              autoComplete='off'
              onChange={this.handleChange}/>
            <span className='bar'></span>
            <input type='submit' value=''/>
          </form>
        </div>
        <div className='group'>
          <TodoList todos={this.state.data}
            remove={this.remove} />
        </div>
      </div>


    const addNewTodoButton = <button>
      Add a new Todo
    </button>
    // add 'button={addNewTodoButton}' in return to show the button

    return (
      <div className='container-item' id ='Todo'>
        <Box
          color = {this.props.borderColor}
          name = 'Todos'
          obj = {[todoForm]}
          button = {addNewTodoButton}
        />
      </div>
    )
  }

}

TodoContainer.propTypes = {
  borderColor: PropTypes.string
}


export default TodoContainer

