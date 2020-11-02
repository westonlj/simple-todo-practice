import React from 'react'
import TodoItem from './TodoItem'

class TodosList extends React.Component {

    render() {
        return (
            <div className="todo-list">
                {this.props.todos.map(todo => (
                    // <li key={todo.id}>{todo.title}</li>
                    // calling TodoItem to return items from the 
                    // passing the handleChange method to TodoItem
                    <TodoItem 
                        key={todo.id} 
                        todo={todo}
                        handleChangeProps={this.props.handleChangeProps}
                        deleteTodoProps={this.props.deleteTodoProps}
                        editTodoProps={this.props.editTodoProps}
                    />
                ))}
            </div>
        )
    }
}

export default TodosList