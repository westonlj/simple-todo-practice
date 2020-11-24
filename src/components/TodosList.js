import React from 'react'
import { connect } from 'react-redux'
import TodoItem from './TodoItem'

function TodosList(props) {

    // Issue: switches an uncontrolled input to controlled for EDIT

    // const mapstate2props = state => {
    //     // console.log(state)
    //     return {
    //         todos : state.todos
    //     }
    // }

    return (
        <div className="todo-list">
            {/* creates our list of todos */}
            {props.todos && props.todos.length ? props.todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    handleChangeProps={props.handleChangeProps}
                    deleteTodoProps={props.deleteTodoProps}
                    editTodoProps={props.editTodoProps}
                />
            ))
            : "No todos" // needs to be centered in screen still
            }
        </div>
    )
    
}

export default TodosList
// export default connect(mapstate2props)(TodosList)