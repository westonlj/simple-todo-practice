import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';
import SearchBar from './SearchBar';
import PaginationComp from './PaginationComp';

import { addNewTodo, checkTodo } from '../../src/redux/actions/index';
// make sure to print when you're lost/confused

const mapstate2props = state => {
    console.log(state)
    return {
        todos : state.todos
    }
}

const mapdispatch2props = dispatch => {
    return {
        addNewTodo : (payload, callback) => dispatch(addNewTodo(payload, callback)),
        checkTodo : (payload) => dispatch(checkTodo(payload))
    }
}

function TodoContainerFunctional(props) {

    const [todos, setTodos] = useState([{id: '', title: '', completed: false}]);
    const [currentTodos, setCurrentTodos] = useState([]);
    // edit states
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3); // need to add ability to choose number of items displayed
    // const [numPages, setNumPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        // code here get executed when a component is loaded
        if(localStorage.getItem('todos')) {
            setTodos(JSON.parse(localStorage.getItem('todos')))
            setCurrentTodos(JSON.parse(localStorage.getItem('todos')))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const addTodoItem = (title) => {
        const addTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        let newTodo = []

        // ACTION CALL FOR ADDING A NEW TODO
        // here we make a call to addNewTodo action and pass in title
        props.addNewTodo( addTodo )


        if(localStorage.getItem("todos") === null) {
            newTodo.push(addTodo);
            localStorage.setItem("todos", JSON.stringify(newTodo));
        } else {
            newTodo = JSON.parse(localStorage.getItem('todos'))
            newTodo.push(addTodo);
            localStorage.setItem("todos", JSON.stringify(newTodo))
        }
        // add to the todos list
        setTodos(JSON.parse(localStorage.getItem('todos')))
        setCurrentTodos(JSON.parse(localStorage.getItem('todos')))
    }
    // Display certain number of items per page
    const handlePagination = (todos, page_number) => {
        // console.log(todos);
        return todos.slice((page_number - 1) * itemsPerPage, page_number * itemsPerPage);
    }
    // Change checkbox to true or false when clicked
    const handleChange = (id) => {
        //
        // redux action call
        props.checkTodo(id)

        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        }))
        let editTodo = todos;
        localStorage.setItem("todos", JSON.stringify(editTodo))
    }
    // this function is broken!
    const deleteTodo = (id) => {
        // Error in this function
        setTodos(
                ...todos.filter(todo => {
                    return todo.id !== id;
                })
        );
    }

    const handleClickOpen = (id, title) => {
        setOpen(true)
        setCurrentId(id)
        setCurrentTitle(title)
    }

    const handleClose = () => {
        setOpen(false)
        setEditValue('')
    }

    const handleEdit = (e) => {
        setEditValue(e.target.value)
    }

    const pageChange = (page) => {
        console.log("pageChange: ", page.newPage)
        setCurrentPage(page.newPage)
        // console.log(currentPage)
    }

    const editTodo = () => {
        
        for (let todo of todos) {
            if(todo.id === currentId) {
                todo.title = editValue
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        }
        let editTodo = todos;
        setTodos(JSON.parse(JSON.stringify(editTodo)))
        setOpen(false)
        setEditValue('')
        setCurrentId('')
        setCurrentTitle('')
    }

    const handleNumPages = () => {
        console.log("handleNumPage: " , (Math.ceil((currentTodos.length/ itemsPerPage))))
        return(Math.ceil((currentTodos.length/ itemsPerPage)))
    }

    const onSearch = (searchTodo) => {
        console.log("In useEffect", searchTodo);

        let arr = [];
        if(searchTodo && searchTodo.search) {
            for(let todo of todos) {
                if(todo.title.indexOf(searchTodo.search) >= 0) {
                    arr.push(todo)
                }
            }
            setTodos(todos)
            setCurrentTodos(arr)
        } else {
            setTodos(todos)
            setCurrentTodos(todos)
        }


        setSearchTerm(searchTodo)
    }

    return(
        <div className="container">
            <Header />

            <div className= "form-container">
                <SearchBar 
                    searchBoxName={"TodoSearch"}
                    onSearchTermChange={onSearch}
                />
            </div>

            <InputTodo addTodoProps= {addTodoItem} />
            {/* todosList */}
            <TodosList 
                todos={handlePagination(currentTodos, currentPage)}
                handleChangeProps={handleChange}
                deleteTodoProps={deleteTodo}
                editTodoProps={handleClickOpen}
            />

            {/* Dialog */}
            <Dialog
                    open={open}
                    onClose={handleClose}
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
                                placeholder={currentTitle}
                                type="text"
                                value={editValue}
                                onChange={handleEdit}
                                
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>

                            <Button onClick={editTodo} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                </Dialog>
            
            <Box>
                <PaginationComp 
                    handlePageChange={pageChange}
                    numPage={handleNumPages()}
                    getDataSet = {handleEdit}
                />
            </Box>
        </div>
    )
}
// mapstate2props and mapdispatch2props in connect()
export default connect(mapstate2props,mapdispatch2props)(TodoContainerFunctional)