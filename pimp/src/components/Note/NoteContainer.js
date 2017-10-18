import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import Box from '../Box'
import Note from './Note'

class NoteContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: new Array(), // used to render all notes
    };
    this.newNote = this.newNote.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.allNotes = this.allNotes.bind(this);
  }

  componentDidMount(){
    let LS = JSON.parse(
      localStorage.getItem('notes'))
    let fromStorage = new Array();
    if (LS && LS.length > 1){
      LS.map((note)=>{
        if (note['text']){
          let storageNote =
            <Note
              title={note['title']}
              text={note['text']}
              lastChanged={note['time']}
            />;
          fromStorage.push(storageNote)
        }
      })
    }
    else {
      let defaultNote =
        <Note
          title='Default note'
          text='Type some stuff here!'
          lastChanged='2017-10-16T17:31:51.254Z'
        />;
      fromStorage.push(defaultNote)
      localStorage.setItem('notes',
        JSON.stringify(fromStorage))
    }
    this.setState({ notes: fromStorage })
  }

  newNote(title='',text=''){
    console.log("new note")
    let note =
        <Note
          title={title}
          text={text}
          lastChanged="Press enter to save"
        />;
    let arr = this.state.notes
    arr.push(note)
    this.setState({ notes: arr })
  }

  btnClick() {
    console.log("button clicked")
    this.newNote();
  }

  allNotes() {
    return(
      this.state.notes.map((n,idx) =>
        <div className='box-item'
          key={idx}>{n}</div>
      ));
  }

  render() {
    const noteBtn =
      <button onClick={this.btnClick}>New note</button>;

    return (
      <div className='container-item' id='Notes'>
        <Box
          color={this.props.borderColor}
          name='Your notes'
          obj={this.allNotes()}
          button={noteBtn}
        />
      </div>
    )
  }
}

NoteContainer.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  createdAt: PropTypes.string,
  borderColor: PropTypes.string
};

export default NoteContainer;
