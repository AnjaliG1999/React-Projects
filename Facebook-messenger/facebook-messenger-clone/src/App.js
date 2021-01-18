import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  
  // console.log(input);
  // console.log(messages);

  // listener within a listener
  // useEffect runs when page loads, onSnapshot runs every time db changes
  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    });
  }, [] )

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])
  // empty [] (dependency) -> runs exactly once, no conditions

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello Clever Programmers 🚀!!</h1>
      <h2>Welcome {username}</h2>

      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>  
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>Send Message</Button>     
      </form>

      {
        messages.map(message => {
          return <Message username={username} message={message}/>
        })
      }
    </div>
  );
}

export default App;
