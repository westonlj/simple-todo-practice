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
// import Tooltip from '@material-ui/core/Tooltip';

import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';
import SearchBar from './SearchBar';
import PaginationComp from './PaginationComp';
// NOTES FOR FUTURE LIAM //
// This application is an extension of a tutorial you did in 2020.
// The original features included: add todo, check todo, delete todo.
// You want to add: Edit, a loginPage, logout button, dialog boxes, pagination,
// search bar, styling for mobile, date and time of creation/completion,
// and storage capabilities (localStorage and sessionStorage)
// limitations with the application: how it was originally designed did not plan for your
// additions. How some items are passed around and how most components are class based 
// caused some messy code and value to be passed around at random.

class TodoContainer extends React.Component {
    // executed once on page load
    // constructor(props, context) {
    //     super(props, context);
    //     if(localStorage.getItem('todos'))
    //         this.state.todos = JSON.parse(localStorage.getItem('todos'));
    // }

    // lifeCycle function
    componentDidMount() {
        if(localStorage.getItem('todos'))

            // this.state.todos = this.pageChange(1)
            this.setState ({
                todos : JSON.parse(localStorage.getItem('todos'))
            })
    }

    state = {
        todos: [],
        open : false,
        value : '',
        currentId : '',
        currentTitle : '',
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
        
        // create a clone of the array and apply splice to it
        // applying splice is not good for states because it mutates arrays
        let todosClone = JSON.parse(localStorage.getItem('todos'));
        todosClone.splice(id, 1)
        localStorage.setItem('todos', JSON.stringify(todosClone))
        // Error in this function
        this.setState({
            // filter() creates a new array
            todos : [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
            // todos:JSON.parse(localStorage.getItem('todos'))
        });
        // localStorage.setItem('todos', JSON.stringify(todosClone))
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
    editTodo = () => {

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
    };
    // Search through list of todos with an exact title match
    onSearch = (searchTodo) => {
        // search through the list of todos for one with an exact title match
        this.state.searchTerm = searchTodo;
        this.setState({ searchTerm: this.state.searchTerm})
    }
    // passes in todos list and the search object and populates an array with matches
    handleSearch = (todos, search) => {
        
        if(!search) return todos;
        if(!search.search) return todos;
        let arr = [];
        for(let todo of todos) {
            if(todo.title.indexOf(search.search) >= 0) {
                arr.push(todo)
            }
        }
        return arr
    }
    // page change handler:
    // on change display up to five items based on what page is current
    pageChange = (page) => {
        // itemsPerPage determines number of todos displayed on each page
        // !!!!! itemsPerPage must also be changed in PaginationComp line 17 !!!!!
        // find a way to pass this efficiently 
        const itemsPerPage = 3;
        let arr = [];

        if(page.newPage === 1) {
            arr.push(this.state.todos.slice(0, itemsPerPage));
        } 
        else {
            arr.push(this.state.todos.slice((page.newPage - 1) * itemsPerPage, page.newPage * itemsPerPage));
        }

        return arr;
        // localStorage.setItem("todos", JSON.stringify(arr))
        
        
    }

    render () {
        
        return (
            <div className="container">
                <Header/>

                <div className="form-container">
                    <SearchBar 
                        searchBoxName={"TodoSearch"}
                        onSearchTermChange={this.onSearch}    
                    />
                </div>
                
                {/* Display the saved todos immediately */}

                <InputTodo addTodoProps={this.addTodoItem} />

                <TodosList 
                    todos={this.handleSearch(this.state.todos, this.state.searchTerm)} 
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
                
                {/* Pagination */}
                <Box component="span">
                    <PaginationComp 
                        todos={this.state.todos} 
                        handlePageChange={this.pageChange}
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