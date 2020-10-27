import React from 'react';

class TodoItem extends React.Component {
    render() {
      
      const completedStyle ={
        fontStyle: "italic",
        color: "#d35e0f",
        opacity: 0.4,
        textDecoration: "line-through",
      }
      
      const { completed, id, title } = this.props.todo

        return (
          <li className="todo-item">
            <input 
              type='checkbox'
              checked={ completed }
              onChange={() => this.props.handleChangeProps(id)}
            />

            {/* display a date and time that is transparent for CompletedDate and CreatedDate */}

            <button className="btn-spacing" onClick={() => this.props.deleteTodoProps(id)}>
              Delete
            </button>

            <button className="btn-spacing" onClick={() => this.props.editTodoProps(id, title)}>
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