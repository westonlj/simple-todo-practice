import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';

// need data to be saved by browser so we don't lose our todos

class TodoContainer extends React.Component {
    
    // we don't want these defaults, we want them to be dynamic or saved by browser
    state = {
        todos: [
            {
                id: uuidv4(),
                title: "Placeholder task",
                completed: false
            },

        ]
    };

    // enable communication between the components:
    // receiving id and allowing for checkbox to be checked
    handleChange = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };
    // With the filter() method, we are saying that for each
    // of the todos data that we are looping through, we
    // want to retain the once whose id is not equal to the id passed in.
    deleteTodo = (id) => {
        this.setState({
            // filter() create a new array
            todos : [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        });
    };
    // TODO: EDIT ENTRY
    // needs to open an input window to allow for new entry
    editTodo =(id, title) => {
        // this.setState({})
        const editTitle = {
            id : id,
            title : title
        }
        // needs to replace the todo
        this.setState({
            todos : [...this.state.todos, editTitle]
        })
            console.log("Edited todo -> " ,{title});
        
    }

    // add a new item with a unique ID and title passed up from
    // InputTodo.
    addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        };
        // update the state
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    };

    render () {
        return (
            <div className="container">
                <Header />
                <InputTodo addTodoProps={this.addTodoItem} />
                {/* Passing the todos data to Todoslist 
                    and passing handleChangeProps to allow for the changing state
                    - updates the list after/ if a new item is added
                */}
                <TodosList 
                    todos={this.state.todos} 
                    handleChangeProps={this.handleChange}
                    deleteTodoProps={this.deleteTodo}
                    editTodoProps={this.editTodo}
                />
            </div>
        );
    }
}

export default TodoContainer