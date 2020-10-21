import React from 'react';

class TodoItem extends React.Component {
    render() {
      
      const completedStyle ={
        fontStyle: "italic",
        color: "#d35e0f",
        opacity: 0.4,
        textDecoration: "line-through",
      }
      // destructuring
      const { completed, id, title } = this.props.todo

      // Want to add functionality for lists in lists to have additional checkboxes
      // for complex todo items
        return (
          <li className="todo-item">
            <input 
              type='checkbox'
              checked={ completed }
              
              // handle checkboxes but TodoContainer
              // holds state data
              onChange={() => this.props.handleChangeProps(id)}
              // so we are passing onChange upwards to TodosList
              // then upwards to TodoContainer
            />

            {/* Delete Entry 
              Passed up to TodoContainer and gives the values to delteTodo
            */}
            <button onClick={() => this.props.deleteTodoProps(id)}>
              Delete
            </button>
            
            {/* TODO: EDIT ENTRY 
                Passed up to TodoContainer to be handled by editTodo
            */}
            <button className="btn-spacing" onClick={() => this.props.editTodoProps(id)}>
              Edit
            </button>

            <span style={completed ? completedStyle :null}>
              {title}
            </span>
          </li>
        )
      }
}

export default TodoItem