import React from 'react';

class List extends React.Component{
    render(){
		return (<div>
			<ul>
          		{
          		    this.props.todos.map((item) => {
          		        return (<li key={item._id}>{item.todo}
          		        <button onClick={()=>{this.props.edit(item._id)}}>Edit</button>
                            <button onClick={()=>{this.props.delete(item._id)}}>Delete</button>
                        </li>)
          		    })
          		}
  			</ul>
  		</div>)
  
	}
}
export default List;