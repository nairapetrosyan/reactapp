const INITIAL_STATE = {
    todos:[{id: "1230", todo: "to eat"}]
  }

const url = "http://localhost:3000/api/todos/";

export const ADD_TODO = 'add todo';
export const DELETE_TODO = 'delete todo';
export const EDIT_TODO = 'edit todo';
export const GET_TODOS = 'get todos';



export const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TODOS:
            return {
              ...state,
            }
        case ADD_TODO:
            return {
              ...state,
              todos: [...state.todos, payload.todo]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== payload.id)
            };
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => { 
                    if(todo.id !== payload.id)
                        todo.todo=payload.todo;
                    return todo;
                })
            }
  default:
         return state;
  }
  }


export function addTodo(todo) {
    console.log('Add Todo');
    return {
        type: ADD_TODO,
        payload: { todo }
    };
}
export function deleteTodo(id) {
    return {
        type: DELETE_TODO,
        payload: { id }
    };
}

export function editTodo(id, newTodo){
    return {
        type: EDIT_TODO,
        payload: {id, todo: newTodo}
    }
}

export function getTodos(){
    return {
        type: GET_TODOS
    }
}


function fetchGetTodos() {
    return function(dispatch) {
        fetch(url)
            .then((res) => res.json())
            .then(result => dispatch(getTodo()))
    }
}