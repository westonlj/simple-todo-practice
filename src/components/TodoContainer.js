import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';


// need data to be saved by browser so we don't lose our todos

class TodoContainer extends React.Component {
    
    // TODO : DYNAMIC/ SAVED TODOS IN BROWSER
    // https://www.robinwieruch.de/local-storage-react
    // we don't want defaults
    state = {
        todos: [],
        // JSON.parse(localStorage.getItem("todos"))
        open : false,
        value : '',
        currentId : '',
        currentTitle : '',
        // pagination props
        currentPage : 1,
    };

    // Usea passed in id to check a checkbox
    handleChange = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
        let todos = this.state.todos;
        localStorage.setItem("todos", JSON.stringify(todos))
    };
    // ERROR IN THIS FUNCTION
    // Uses id to delete from array of todos and update the localStorage
    // BUG:
    // Currently delete doesn't seem to work. LocalStorage doesn't delete the item
    // sometimes this.setState doesn't remove it either
    deleteTodo = (id) => {
        console.log("deleting todo: " + id)
        // create a clone of the array and apply splice to it
        // applying splice is not good for states because it mutates arrays
        let todosClone = JSON.parse(localStorage.getItem('todos'));
        todosClone.splice(id, 1)

        // Error in this function
        this.setState({
            // filter() creates a new array
            todos : [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        });
        localStorage.setItem('todos', JSON.stringify(todosClone))
        console.log(this.state.todos)
    };

    // Add a new item with a unique id and title passed up from
    // InputTodo.
    addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        // check if a todos key in localStorage exists
        // if null then create one by adding the newTodo object above
        // if it does exist: retrieve from storage and update
        if(localStorage.getItem('todos') === null) {
            const todos = []
            todos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            const todos = JSON.parse(localStorage.getItem('todos'))
            todos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(todos))
        }

        // update the state
        this.setState({
            // todos: [...this.state.todos, newTodo]
            todos:JSON.parse(localStorage.getItem('todos'))
        });
    };
    // On submit takes what is in the text field and replaces the title
    // of the todo. 
    // TODO: Update the localStorage title
    editTodo = () => {
        // const todos = JSON.parse(localStorage.getItem('todos'))

        let todos = this.state.todos;
        for(let todo of todos) {
            if(todo.id === this.state.currentId) {
                todo.title = this.state.value
                // update localStorage
                localStorage.setItem("todos", JSON.stringify(todos))
            } 
        }

        this.setState({
            todos: JSON.parse(JSON.stringify(todos)),
            open: false,
            value: '',
            currentId: '',
            currentTitle: ''
        })
        
    }
    // handle edits in the textfield of the dialog box
    handleEdit = (e) => {
        this.setState({ value: e.target.value });
    }
    // Handles dialog box cancel
    handleClose = () => {
        this.setState({ 
            open: false,
            value: ''
        });
    };
    // Opens dialog box for edits
    handleClickOpen = (id, title) => {
        this.setState({ 
            open: true,
            currentId: id,
            currentTitle: title,
        });

        // console.log(args);
        // this.setState({
        //     tempId: id,
        // });
    };

    render () {
        const itemsPerPage = 10;
        const numPages = Math.ceil(this.state.todos.length/itemsPerPage);
        return (
            <div className="container">
                <Header/>

                {/* Display the saved todos immediately */}

                <InputTodo addTodoProps={this.addTodoItem} />
                {/* Passing the todos data to Todoslist 
                    and passing handleChangeProps to allow for the changing state
                    - updates the list after/ if a new item is added
                */}
                <TodosList 
                    todos={this.state.todos} 
                    handleChangeProps={this.handleChange}
                    deleteTodoProps={this.deleteTodo}
                    editTodoProps={this.handleClickOpen}
                />
                {/* Dialog box for edit function */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit This To-do</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Displays the current todo
                            </DialogContentText>
                            <TextField 
                                autoFocus
                                id="title"
                                label="Edit your todo"
                                placeholder={this.state.currentTitle}
                                type="text"
                                // below added to handle an edit
                                value={this.state.value}
                                onChange={this.handleEdit}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            {/* submit click will trigger editTodo and take the new title.
                                Currently we reach the maximum update depth if we attempt
                                to pass anything in parenthesis

                                Maybe on button press trigger a new functional component?
                            */}
                            <Button onClick={this.editTodo} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                </Dialog>
                
                <Box component="span">
                    <Pagination 
                        count={numPages} 
                        size='medium'
                        className="pagination-container"
                        defaultPage={1}
                        page={this.state.currentPage}
                        // onChange={handlePageChange} sets value of page
                    />
                </Box>
            </div>
        );
    }
}

/*
    NOTES FOR PAGINATION:
    for pages we need to take the total number of entries in the array:

    todos.slice((page-1) * itemsPerPage, page * itemsPerPage)
    todos.map???
*/


export default TodoContainer