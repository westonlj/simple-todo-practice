/**
 * Reducers produce the state of the application.
 * Reducers know when to change state is by sending a signal to the store.
 * The signal is an action. "Dispatching an action" is the process of sending out a signal.
 * 
 * Important thing to note is you dont change an existing state. You make a copy of that state with current plus new data.
 */

// import { combineReducers } from 'redux';
const initialState = {
    todos: [],
    currentTodos: [],
    open: false,
    editValue: '',
    currentId: '',
    currentTitle: '',
    currentPage: 1,
    itemsPerPage: 3
}
// sets the initial state
function reducer(state = initialState, action) {
    switch (action.type) {

        // need to add the actions

        // ADD_TODOS
        
        // EDIT_TODOS

        // DELETE_TODOS

        // CHECK_TODOS

        // PAGINATION

        default:
            return state;
    }
}

export default reducer;