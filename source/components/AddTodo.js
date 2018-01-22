import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
//import { mapStateToProps, mapDispatchToProps} from './stateToProps';
import store from '../redux/store/store';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';


class AddTodo extends React.Component{
	constructor(props){
		super(props);

        const btnFunc = this.addItem
	}
  
//   addItem = () => {
// 	    const todo = this._inputElement.value;
// 	    fetch(this.state.url,{
//             method: 'POST',
//             body: JSON.stringify({todo}),
//             headers: {"Content-Type": "application/json"}
//         })
//             .then((res) => res.json())
//             .then((todo) => {
//                 this.setState({
//                     todos: [...this.state.todos, todo]
//                 });
//             }).catch(console.error);
// 	    this._inputElement.value ="";
//   }

//   editMode = (_id) => {
// 	    const it = this.state.todos.filter((item)=> {
//             return (item._id === _id);
//         })[0];
// 	    this._inputElement.value=it.todo;
//         this.setState({
//             editMode : this.editItem,
//             editId : _id
//         })
//   }

//   editItem = ()=> {
// 	    event.preventDefault();
//         fetch(this.state.url+this.state.editId,{
//             method: 'PUT',
//             body: JSON.stringify({
//                 todo: this._inputElement.value
//             }),
//             headers: {"Content-Type": "application/json"}
//         })
//             .then((res) => res.json())
//             .then((todo) => {
//                 const updated = this.state.todos.map((item)=> {
//                     if(item._id == todo._id) {
//                         item.todo = todo.todo;
//                     }
//                     return item;
//                 });
//                 this.setState({
//                     todos: updated,
//                     editMode : this.addItem
//                 })
//             }).catch(console.error);
//   }

//   deleteItem = (_id)=> {
// 	    fetch(this.state.url+_id, {
//             method: 'delete'
//         })
//             .then((res) => res.json())
//             .then((todo) => {
//                 const updated = this.state.todos.filter((item)=> {
//                     return item._id !== todo._id;
//                 });
//                 this.setState({
//                     todos: updated
//                 })
//             }).catch(console.error);

//   }
  render() {
      console.log(this.props, 'aaaa')
	    return (
	        <div className="addtodo">
                <input key="addtodo" placeholder="enter task" ref={(a) => this._inputElement = a}>
                </input>
                <button type="submit" ref={(a) => this.buttonElem = a}>add</button>
                <List />
            </div>
        );

	}
}

import { addTodo, deleteTodo, editTodo, getTodos } from '../redux/reducers/todoReducer';

function mapStateToProps(state) {
    comsole.log(state);
    return {
      todos: state.todos,
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
      addTodo: () => dispatch(addTodo()),
      deleteTodo: () => dispatch(deleteTodo()),
      editTodo: () => dispatch(editTodo()),
      getTodos: () => dispatch(getTodos()),
    };
  };

connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTodo)

ReactDOM.render(<Provider store={store}><AddTodo/></Provider>, document.getElementById('app'));


