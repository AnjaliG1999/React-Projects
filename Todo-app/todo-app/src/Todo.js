import { List, ListItem, ListItemAvatar, ListItemText, Modal, Button } from '@material-ui/core'
import React, { useState } from 'react';
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })
        
        setOpen(false);
    }

    return (
        <>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
        <div className={classes.paper}>
            <h1>this is a modal</h1>
            <form>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button type="submit" onClick={updateTodo}>Update Todo</Button>
            </form>
        </div>
        
        </Modal>

        <List className="todo_list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline ⏰" />
            </ListItem>
            <button onClick={() => setOpen(true)}>Edit me</button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
        </List>
        </>
    )
}

export default Todo
