import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';

// functions are state-less
// that is why we have classes or "Componenets"
class TodoContainer extends React.Component {
    // This is the parent component to all of our components
    state = {
        todos: [
            {
                id: uuidv4(),
                title: "Setup development environment",
                completed: true
            },
            
            {
                id: uuidv4(),
                title: "Develop website and add content",
                completed: false
            },
            
            {
                id: uuidv4(),
                title: "Deploy to live server",
                completed: false
            },

        ]
    };

    // enable communication between the components:
    // receiving id and allowing for checkbox
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
                {/* looped through the array "todos" and output each todo
                {this.state.todos.map(todo => (
                    <li>{todo.title}</li>
                ))} */}

                <InputTodo addTodoProps={this.addTodoItem} />

                {/* Passing the todos data to Todoslist 
                    and passing handleChangeProps to allow for the changing state
                */}
                <TodosList 
                    todos={this.state.todos} 
                    handleChangeProps={this.handleChange}
                    deleteTodoProps={this.deleteTodo}
                />
            </div>
        );
    }
}

export default TodoContainer