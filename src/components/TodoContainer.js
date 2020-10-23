import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';
// import EditTodo from './EditTodo';


// need data to be saved by browser so we don't lose our todos

class TodoContainer extends React.Component {
    
    // TODO : DYNAMIC/ SAVED TODOS IN BROWSER
    // https://www.robinwieruch.de/local-storage-react
    // we don't want defaults
    state = {
        todos: [
            {
                id: uuidv4(),
                title: "Placeholder task",
                completed: false,
                // open : false
            }

        ],
        open : false,
        value : '',
        currentId : '',
        currentTitle : ''
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

    // add a new item with a unique ID and title passed up from
    // InputTodo.
    addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        // update the state
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    };
    // TODO: EDIT ENTRY
    // on submit takes what is in the text field and replaces the title of the todo
    editTodo = () => {
        console.log(this.state.value)

        let todos = this.state.todos;
        for(let todo of todos) {
            if(todo.id === this.state.currentId) {
                todo.title = this.state.value
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

    handleClose = () => {
        this.setState({ 
            open: false,
            value: ''
        });
    };
    // currently gets the id and title props of the todoItem we want to edit
    // somehow need to pass that to editTodoItem
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
            </div>
        );
    }
}

export default TodoContainer