import React from 'react';

class List extends React.Component{	
	constructor(props) {
		super(props)
		this.state = {
			items : props.todos
		};
	}
	edit = (key) => {
		this.props.edit(key);
	}
	delete=(key)=>{
		this.props.delete(key);
	}
	render(){
		return (<div>
			<ul>
          		this.state.items.map((item) => <li key={item._id}>{item}
      				<button onClick={this.edit(item._id)}>Edit</button>
      				<button onClick={this.delete(item._id)}>Delete</button>
      			</li>)
  			</ul>
  		</div>)
  
	}
}
export default List;