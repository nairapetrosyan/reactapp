import React from 'react';
import ReactDOM from 'react-dom';
import todoModel from '../models/todos';
import mongoose from 'mongoose';
import List from './List'

class AddTodo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items : []
		}

	}
  componentDidMount =() => {
  return fetch('/api/todos').then((res) => res.json())
        .then((items) => {
        this.setState({items})});
  }
	addItem = (event) => {
  event.preventDefault();
     return fetch('/api/todos',{
    method: 'POST',
    body: JSON.stringify({
      todo: this._inputElement.value,
      _id : Date.now()
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then((res) => res.json())
  .then(items=>{
    this.setState = {items};
  });
  
		
	}
  deleteItem = (_id)=> {
    /*var filteredItems = this.state.items.filter(function (item) {
      return (item._id !== _id);
    });
    this.setState({
      items: filteredItems
    });*/
    fetch(`/api/todos/${_id}`, {
            method: 'delete',
            headers: {
                'Content-type' : 'application/json'
            }
        })
            .then((res) => res.json())
            .then(items=>{
                this.setState = {items};
      });
    
  }

  editItem = (_id)=> {
    /*const it = this.state.items.filter((item)=> {
      return (item.key === key);
    })[0];
    this._inputElement.value=it.todo;
    const updatedItems = this.state.items.map(item=>{
      if(item._id === key)
        item.todo =  this._inputElement.value;
      return item;
    });*/

      event.preventDefault();
      return fetch(`/api/todos/${_id}`,{
        method: 'PUT',
        body: JSON.stringify({
          todo: this._inputElement.value,
          _id : _id
        }),
        headers: {"Content-Type": "application/json"}
        })
        .then((res) => res.json())
        .then(items=>{
            this.setState = {items};
        });
  }
	render() {
      return (
        <div className="addtodo">
            <form onSubmit = {this.addItem}>
              <input placeholder="enter task" ref={(a) => this._inputElement = a}>
              </input>
              <button type="submit">add</button>
            </form>
          <List todos={this.state.items} delete={this.deleteItem} edit={this.editItem}/>
        </div>
      );
    }
};


ReactDOM.render(
  <div>
    <Addtodo/>
  </div>,
  document.getElementById('app')
);