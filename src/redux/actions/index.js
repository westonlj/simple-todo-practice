// Below are functions that act as the actions we must dispatch to the reducers to edit the state

export const addNewTodo = todoObj => ({ type: 'ADD_TODO', payload: todoObj })

export const checkTodo = id => ({ type: 'CHECK_TODO', payload: id})