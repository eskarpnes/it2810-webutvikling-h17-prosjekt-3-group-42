import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import {
  removeId,
  timestampAt
} from '../../helper';

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      text: props.text,
      titleFocused: false,
      textFocused: false,
      lastChanged: props.lastChanged,
      timestamp: null,
      saved: false,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // this.titleRef.focus()
    this.setState({
      timestamp: timestampAt(new Date())
    })
    // update the time every 10 seconds
    this.timer = setInterval(()=>this.tick(),10000)
  }

  componentWillUnMount() {
    clearInterval(this.timer)
  }

  tick() {
    let editedTime = this.state.lastChanged
    this.setState({
      lastChanged: editedTime,
      date: timestampAt(new Date())
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
      titleFocused: true,
      textFocused: false})
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
      titleFocused: false,
      textFocused: true})
  }

  handleSubmit(e) {
    console.log("submitted");
    let editedAt = this.state.timestamp.props['time']
    e.preventDefault()
    if (this.state.textFocused){
      this.contentRef.blur()
    }
    if (this.state.titleFocused){
      this.contentRef.focus()
    }
    let newNote = {
      'text': this.contentRef.value,
      'title': this.titleRef.value,
      'id': this.titleRef.value,
      'time': editedAt
    }
    let LS = JSON.parse(
      localStorage.getItem('notes'))
    LS = removeId(LS, this.titleRef.value)
    LS.push(newNote)
    localStorage.setItem('notes',
      JSON.stringify(LS))
    this.setState({ lastChanged: editedAt, saved: true })
  }


  render() {
    return (
      <div className='note'>
        <form className='note-form'
          onSubmit={this.handleSubmit}>
          <div className='group'>
            <input
              id='tittelid'
              type='text'
              required
              name='title'
              ref={ref => this.titleRef = ref}
              placeholder="Title"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
            <input id="submitid" type='submit' value='submit'/>
            <span className='bar'></span>
          </div>
          <div className='group'>
            <input
              id='tekstid'
              type='text'
              required
              name='content'
              ref={ref => this.contentRef = ref}
              placeholder="Content"
              onChange={this.handleTextChange}
              value={this.state.text}
            />
            <span className='bar'></span>
          </div>
        </form>
        <div id='created-at'>
          {this.state.saved?(
            timestampAt(this.state.lastChanged)
          ):(
            this.state.lastChanged
          )}
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  titleFocused: PropTypes.bool,
  textFocused: PropTypes.bool,
  lastChanged: PropTypes.string,
  timestamp: PropTypes.string,
}

export default Note
