import {connect} from "react-redux";
import {addTodo, completeTodo, getTodos} from "../../store/actions";
import {TodoList} from "./TodoList";

const mapStateToProps = (state) => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos()),
  completeTodo: id => dispatch(completeTodo(id)),
  addTodo: text => dispatch(addTodo(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
