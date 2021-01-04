import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from "./firebase";
import firebase from 'firebase';

function App() {
  // React hooks: [variable, setVariable()] = setting the variable's state
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when app loads, listen to the database and fetch new todos as they are added/ removed
  useEffect(() => {
    // fired only once when app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo = (event) => {
    event.preventDefault();   // Stops refreshing the page after submit
    // console.log('🤩')
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setTodos([...todos, input]);   // spread: appends input value to the todos array
    setInput('');   // clear input field after submit
  }

  return (
    <div className="App">
      <h1>Hello World!! 🚀</h1>
      <form>        
        <FormControl>
          <InputLabel>✔️ Write a todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        
        {/* {} contains JSX */}
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
      </form>
    
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
