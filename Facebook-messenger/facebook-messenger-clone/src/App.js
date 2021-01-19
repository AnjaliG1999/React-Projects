import { useState, useEffect } from 'react';
import { FormControl, Input, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
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
    db.collection('messages').orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
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
      <img src='https://blueprint-api-production.s3.amazonaws.com/uploads/story/thumbnail/120380/1d104deb-1dc0-4633-b09b-1c43ba85ac3c.jpg'
        alt="logo" width="200px" padding-top="10px"/>
      <h1>Hello Clever Programmers 🚀!!</h1>
      <h2>Welcome {username || 'Anonymous'}</h2>

      <form className="app_form">
        <FormControl className="app_formControl">
          <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton> 
        </FormControl>     
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => {
            return <Message key={id} username={username} message={message}/>
          })
        }
      </FlipMove>
    </div>
  );
}

export default App;
