import React from 'react';
import ReactDOM from 'react-dom';
import List from './List'

class AddTodo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todos : [],
            editMode : this.addItem,
            editId: "",
            url: "http://localhost:3000/api/todos/"
		}

	}
  getData = () => {
    fetch(this.state.url).then((res) => res.json())
        .then((data) => {
          this.setState({
            todos: data
          })
          }).catch(console.error);
  }
  addItem = () => {
	    const todo = this._inputElement.value;
	    fetch(this.state.url,{
            method: 'POST',
            body: JSON.stringify({todo}),
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => res.json())
            .then((todo) => {
                this.setState({
                    todos: [...this.state.todos, todo]
                });
            }).catch(console.error);
	    this._inputElement.value ="";
  }

  editMode = (_id) => {
	    const it = this.state.todos.filter((item)=> {
            return (item._id === _id);
        })[0];
	    this._inputElement.value=it.todo;
        this.setState({
            editMode : this.editItem,
            editId : _id
        })
  }

  editItem = ()=> {
	    event.preventDefault();
        fetch(this.state.url+this.state.editId,{
            method: 'PUT',
            body: JSON.stringify({
                todo: this._inputElement.value
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => res.json())
            .then((todo) => {
                const updated = this.state.todos.map((item)=> {
                    if(item._id == todo._id) {
                        item.todo = todo.todo;
                    }
                    return item;
                });
                this.setState({
                    todos: updated,
                    editMode : this.addItem
                })
            }).catch(console.error);
  }

  deleteItem = (_id)=> {
	    fetch(this.state.url+_id, {
            method: 'delete'
        })
            .then((res) => res.json())
            .then((todo) => {
                const updated = this.state.todos.filter((item)=> {
                    return item._id !== todo._id;
                });
                this.setState({
                    todos: updated
                })
            }).catch(console.error);

  }
  render() {
	    return (
	        <div className="addtodo">
                <input key="addtodo" placeholder="enter task" ref={(a) => this._inputElement = a}>
                </input>
                <button type="submit" ref={(a) => this.buttonElem = a} onClick={this.state.editMode}>add</button>
                <List todos={this.state.todos} edit={this.editMode} delete={this.deleteItem} input={this._inputElement} addbutton={this.buttonElem}/>
            </div>
        );

	}
}


ReactDOM.render(<div><AddTodo/></div>, document.getElementById('app'));