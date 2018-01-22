import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps} from './stateToProps';



class List extends React.Component{
    render(){
		console.log(this.props)
		return (<div>
			<ul>
          		{
          		    this.props.todos.map((item) => {
          		        return (<li key={item._id}>{item.todo}
          		        <button onClick={()=>{this.props.editTodo}}>Edit</button>
                            <button onClick={()=>{this.props.deleteTodo(item._id)}}>Delete</button>
                        </li>)
          		    })
          		}
  			</ul>
  		</div>)
  
	}
}
export default List;
