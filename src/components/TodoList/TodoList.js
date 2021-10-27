import {Button, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
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
    checked
  } = props;
  
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleToggle(todo.id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(todo.id) !== -1}
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
  } = props;
  
  const [checked, setChecked] = useState([]);
  
  useEffect(() => {
    getTodos()
  }, [getTodos])
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    
    setChecked(newChecked);
  };
  
  return (
    <div className="todo__list">
      <FormInput addTodo={addTodo} />
      {todos.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          handleToggle={handleToggle}
          checked={checked}
        />
      ))}
    </div>
  );
}
