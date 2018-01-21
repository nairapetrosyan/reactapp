import React from 'react';

class List extends React.Component{	

	edit = (_id) => {
		this.props.edit(_id);
	}
	delete = (_id) => {
		this.props.delete(_id);
	}
	render(){
		return (<div>
			<ul>
          		{this.props.todos.map((item) => {
          			return (<li key={item._id}>{item}
      				<button onClick={this.edit(item._id)}>Edit</button>
      				<button onClick={this.delete(item._id)}>Delete</button>
      			</li>)
      		})}
  			</ul>
  		</div>)
  
	}
}
export default List;