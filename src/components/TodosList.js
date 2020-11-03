import React from 'react'
import TodoItem from './TodoItem'

function TodosList(props) {

    // Issue: switches an uncontrolled input to controlled for EDIT

    return (
        <div className="todo-list">
            {/* creates our list of todos */}
            {props.todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    handleChangeProps={props.handleChangeProps}
                    deleteTodoProps={props.deleteTodoProps}
                    editTodoProps={props.editTodoProps}
                />
            ))}
        </div>
    )
    
}

export default TodosList