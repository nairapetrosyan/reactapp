import { addTodo, deleteTodo, editTodo, getTodos } from '../redux/reducers/todoReducer';

export function mapStateToProps(state) {
    comsole.log(state);
    return {
      todos: state,
    };
  }
  
export function mapDispatchToProps(dispatch) {
    return {
      addTodo: () => dispatch(addTodo()),
      deleteTodo: () => dispatch(deleteTodo()),
      editTodo: () => dispatch(editTodo()),
      getTodos: () => dispatch(getTodos()),
    };
  };