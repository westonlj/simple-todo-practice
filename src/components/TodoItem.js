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

      // the <input type='checkbox'/> is an uncontrolled input 
      // it needs to be handled by the component state and not the DOM
        // add 'checked'
        return (
          <li className="todo-item">
            <input 
              type='checkbox'
              checked={ completed }
              // TodoItem cannot handle the onChange event
              // it handles checkboxes but the parent (TodoContainer)
              // holds state data
              onChange={() => this.props.handleChangeProps(id)}
              // so we are passing onChange upwards to TodosList
              // then upwards to TodoContainer
            />
            <button onClick={() => this.props.deleteTodoProps(id)}>
              Delete
            </button>
            <span style={completed ? completedStyle :null}>
              {title}
            </span>
          </li>
        )
      }
}

export default TodoItem