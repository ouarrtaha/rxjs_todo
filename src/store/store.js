import { createStore, combineReducers, applyMiddleware } from "redux";
import { ofType, combineEpics, createEpicMiddleware } from "redux-observable";
import {map, mergeMap} from "rxjs/operators";
import * as Api from "../api";
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  COMPLETE_TODO,
  COMPLETE_TODO_SUCCESS,
  getTodosSuccess,
  addTodoSuccess,
  completeTodoSuccess
} from "./actions";


function todos(state = [], action) {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return action.payload;
    case ADD_TODO_SUCCESS:
      return [...state, action.payload];
    case COMPLETE_TODO_SUCCESS:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: action.payload.completed };
        }
        return todo;
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({ todos });


const getTodosEpic = action$ =>
  action$.pipe(
    ofType(GET_TODOS),//filter(action => action.type === GET_TODOS'),
    mergeMap(() => Api.getTodos()),
    map(({ todos }) => getTodosSuccess(todos))
  );

const addTodoEpic = action$ =>
  action$.pipe(
    ofType(ADD_TODO),
    mergeMap(action => Api.addTodo(action.payload)),
    map(todo => addTodoSuccess(todo))
  );

const completeTodoEpic = action$ =>
  action$.pipe(
    ofType(COMPLETE_TODO),
    mergeMap(action => Api.completeTodo(action.payload)),
    map(todo => completeTodoSuccess(todo))
  );

const rootEpic = combineEpics(
  getTodosEpic,
  addTodoEpic,
  completeTodoEpic
);

const epicMiddleware = createEpicMiddleware();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
