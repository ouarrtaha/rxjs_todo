import {ListItem, ListItemText} from "@mui/material";
import {concatAll, concatMap, delay, interval, of, take, tap} from "rxjs";
import {useEffect, useState} from "react";
import {map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";

const source = ['user 1', 'user 2', 'user 3'];

// const names$ = of(...source);

/*const names$ = of(...source).pipe(
  concatMap(x => of(x).pipe(delay(1000))),
);*/

const api = `https://randomuser.me/api/?results=5&seed=rx-react&nat=us&inc=name&noinfo`;
const names$ = ajax.getJSON(api)
  .pipe(
    map(({ results }) => results.map(user => `${user.name.first} ${user.name.last}`)),
    concatAll(),
  );

export default function UserList() {
  const [names, setNames] = useState([]);
  
  useEffect(() => {
    const subscription = names$.subscribe(val => setNames(prevNames => [
      ...prevNames,
      val
    ]));
    
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
