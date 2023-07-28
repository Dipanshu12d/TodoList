import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, Todo, editTodo, deleteTodo } from '../features/TodoSlice';
import {
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  makeStyles,
  Card,
  Slide,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    background: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
    color: '#fff',
    display: 'flex', 
    alignItems: 'center', 
  },
  completedText: {
    textDecoration: 'line-through',
    color: '#9e9e9e',
  },
  actions: {
    marginLeft: 'auto',
    display: 'flex', 
    alignItems: 'center', 
  },
  listItemText: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
}));

interface TodoProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim() === '') {
        setEditText(todo.text);
        setIsEditing(false);
        return;
      }
      dispatch(editTodo({ id: todo.id, text: editText }));
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Card className={classes.card}>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onClick={handleToggle}
          disableRipple
          style={{ color: '#fff' , marginLeft : "5px" }}
        />
        {isEditing ? (
          <TextField
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            fullWidth
            variant="standard"
            onBlur={handleEdit}
            InputProps={{
              style: {
                color: '#fff',
              },
            }}
          />
        ) : (
          <ListItemText
            primary={todo.text}
            className={todo.completed ? classes.completedText : ''}
          />
        )}
        <div className={classes.actions}>
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    </Slide>
  );
};

export default TodoItem;
