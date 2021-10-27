import {
  Button,
  Checkbox,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import './style.scss'

function FormInput(props) {
  const {
    addTodo
  } = props;
  
  const [text, setText] = useState("");
  
  const handleInput = event => {
    setText(event.target.value)
  }
  
  const onSubmit = () => {
    addTodo(text);
    setText("")
  }
  
  return (
    <div className={"input-container"}>
      <TextField
        className={"input-container__text"}
        label="Task"
        variant="outlined"
        value={text}
        onChange={handleInput}
      />
      <Button
        disabled={text.trim() === ""}
        variant="contained"
        onClick={onSubmit}
      >
        Add
      </Button>
    </div>
  )
}

function TodoItem(props) {
  const {
    todo,
    handleToggle,
  } = props;
  
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleToggle(todo.id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{'aria-labelledby': todo.id}}
          />
        </ListItemIcon>
        <ListItemText id={todo.id} primary={todo.text}/>
      </ListItemButton>
    </ListItem>
  )
}

export function TodoList(props) {
  const {
    todos,
    getTodos,
    addTodo,
    completeTodo,
  } = props;
  
  useEffect(() => {
    getTodos()
  }, [getTodos])
  
  const handleToggle = (id) => () => {
    completeTodo(id)
  };
  
  return (
    <div className="todo__list">
      {/*<LinearProgress/>*/}
      <FormInput addTodo={addTodo} />
      {todos.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          handleToggle={handleToggle}
        />
      ))}
    </div>
  );
}
