import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, Todo } from './features/TodoSlice';
import TodoList from './components/TodoList';
import {
  Button,
  TextField,
  Container,
  Paper,
  makeStyles,
  Typography,
  CssBaseline,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#FF4081',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FF5173',
    },
  },
  errorText: {
    color: '#FF4081',
    marginTop: theme.spacing(1),
  },
  todoList: {
    marginTop: theme.spacing(3),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [error, setError] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') {
      setError('Todo text cannot be empty.');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      textColor: '#000',
    };
    dispatch(addTodo(newTodo));
    setNewTodoText('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
    setError('');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h1" gutterBottom>
            Todo List
          </Typography>
          <TextField
            label="Add Todo"
            variant="outlined"
            value={newTodoText}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
            className={classes.button}
          >
            Add
          </Button>
          <div className={classes.todoList}>
            <TodoList />
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default App;
