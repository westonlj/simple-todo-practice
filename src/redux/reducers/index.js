/**
 * Reducers produce the state of the application.
 * Reducers know when to change state is by sending a signal to the store.
 * The signal is an action. "Dispatching an action" is the process of sending out a signal.
 * 
 * Important thing to note is you dont change an existing state. You make a copy of that state with current plus new data.
 */

// import { combineReducers } from 'redux';

// this is being mapped to the component property
const initialState = {
    todos: [],
    // currentTodos: [],
    // open: false,
    // editValue: '',
    // currentId: '',
    // currentTitle: '',
    // currentPage: 1,
    // itemsPerPage: 3
}
// Recall that for each reducer we want to expand (...) state so that we don't overwrite everything we have
console.log(initialState['todos'])
// state = initialState is a default value that can also be a passed in value
function rootReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'ADD_TODO': {
            
            // passed in the todo object : {id, title, completed}
            
            return console.log(JSON.stringify({
                ...state, // avoids overwritting the state when necessary
                todos: [...state.todos, action.payload],
            }))
        }
        
        // EDIT_TODOS

        // DELETE_TODOS
            // pass in the id of the todo to be deleted as the payload
            // todos: ...state.todos.filter(todo => {return todo.id !== action.payload})
            // return [...array.slice(0, action.id), ...array.slice(action.id + 1)]
        // Similar to handleChange function
        case 'CHECK_TODO': {
            console.log("CHECK_TODO: ", state.todos, action)
            return state.todos.map((todo) => {
                    if(todo.id === action.payload) {
                        console.log("I'm in here")
                        return {...todo, completed : !todo.completed};
                    }
                    console.log("inside CHECK_TODO: ", state.todos)
                    return todo
                })
        }
        // PAGINATION

        default:
            return state;
    }
}

export default rootReducer;