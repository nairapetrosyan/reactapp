import React from 'react';
import ReactDOM from 'react-dom';
import List from './List'

class AddTodo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todos : [],
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
	addItem = (event) => {
  event.preventDefault();
     fetch(this.state.url,{
    method: 'POST',
    body: JSON.stringify({
      todo: this._inputElement.value,
      _id : Date.now()
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(()=>{
    this.getData();
  }).catch(console.error);
  
		
	}
  deleteItem = (_id)=> {
    /*var filteredItems = this.state.todos.filter(function (item) {
      return (item._id !== _id);
    });
    this.setState({
      todos: filteredItems
    });*/
    fetch(this.state.url+_id, {
            method: 'delete'
        })
            .then(()=>{
    this.getData();
  }).catch(console.error);
    
  }

  editItem = (_id)=> {
    const it = this.state.items.filter((item)=> {
      return (item._id === _id);
    })[0];
    this._inputElement.value=it.todo;
    

      event.preventDefault();
      fetch(this.state.url+_id,{
        method: 'PUT',
        body: JSON.stringify({
          todo: this._inputElement.value,
          _id : _id
        }),
        headers: {"Content-Type": "application/json"}
        })
        .then(()=>{
    this.getData();
  }).catch(console.error);
  }
	render() {
      return (
        <div className="addtodo">
            <form onSubmit = {this.addItem}>
              <input key="addtodo" placeholder="enter task" ref={(a) => this._inputElement = a}>
              </input>
              <button type="submit">add</button>
            </form>
          <List todos={this.state.todos} delete={this.deleteItem} edit={this.editItem}/>
        </div>
      );
    }
};


ReactDOM.render(
  <div>
    <AddTodo/>
  </div>,
  document.getElementById('app')
);