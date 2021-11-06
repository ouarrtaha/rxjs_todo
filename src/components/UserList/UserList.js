import {ListItem, ListItemText} from "@mui/material";
import {interval, take, tap} from "rxjs";
import {useEffect, useState} from "react";
import {map} from "rxjs/operators";

const source = ['user 1', 'user 2', 'user 3'];
const names$ = interval(1000).pipe(
  take(source.length),
  tap(v => console.log(v)),
  map(i => source.slice(0, i + 1))
);

export default function UserList() {
  const [names, setNames] = useState([]);
  
  useEffect(() => {
    const subscription = names$.subscribe(setNames);
    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <div>
      {names.map((name, i) => (
        <ListItem disablePadding key={i}>
          <ListItemText id={i} primary={name}/>
        </ListItem>
      ))}
    </div>
  )
}
