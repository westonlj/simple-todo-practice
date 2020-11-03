import React from 'react';

function TodoItem(props) {
    
  const completedStyle ={
    fontStyle: "italic",
    color: "#d35e0f",
    opacity: 0.4,
    textDecoration: "line-through",
  }
  
  const { completed, id, title } = props.todo

    return (
      <li className="todo-item">
        <input 
          type='checkbox'
          checked={ completed }
          onChange={() => props.handleChangeProps(id)}
        />

        <button className="btn-spacing" onClick={() => props.deleteTodoProps(id)}>
          Delete
        </button>

        <button className="btn-spacing" onClick={() => props.editTodoProps(id, title)}>
          Edit
        </button>

        <span style={completed ? completedStyle :null}>
          {title}
        </span>
      </li>
    )
  }

export default TodoItem