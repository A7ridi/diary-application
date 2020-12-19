import React, { useState } from 'react';
import DiaryForm from './DiaryForm';
import Diary from './Diary';

const DiaryList = () => {
  const [notes, setNotes] =  useState([]);

  const addNote = note => {
    if(!note.text || /^\s*S/.test(note.text)) {
      return;
    }

    const newNotes = [note, ...notes]

    setNotes(newNotes);
    console.log(note, ...notes);
  }

  const updateNote = (noteId, newValue) => {
    if(!newValue.text || /^\s*S/.test(newValue.text)) {
      return;
    }

    setNotes(prev => prev.map(item => (item.id === noteId ? newValue : item)))
  }

  const removeNote = (id) => {
    const removeArr = [...notes].filter(note => note.id !== id);

    setNotes(removeArr);
  }

  const completeNote = id => {
    let updatedNotes = notes.map(note => {
      if(note.id === id) {
        note.isComplete = !note.isComplete;
      }

      return note;
    });

    setNotes(updatedNotes);
  }

  return (
    <div>
      <h1>What's the plan for Today?</h1>
      <DiaryForm onSubmit={addNote}/>   
      <Diary 
        notes={notes}
        completeNote={completeNote}
        removeNote={removeNote}
        updateNote={updateNote}
      /> 
    </div>
  )
}

export default DiaryList
