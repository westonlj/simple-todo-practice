import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

class PaginationComp extends React.Component { 
    
    state = {
        currentPage : 1,
        itemsPerPage : 10,
        maxPage : null,
        filter : "",
        currentData : []
    }

    // handle page change method

    // need to make sure data is displayed properly
    // 10 items taken from array and put into a var that is used as the current todos
    // something like componentDidMount() but instead of displaying the entire list
    // displays the smaller array and clicking next or previous loads the 10 needed
    componentDidMount() {
        this.filterArray(this.props.todos);
    }
    
    filterArray = (props) => {
        const itemsPerPage = this.state;
        let todoList = this.props.todos
        const startIndex = (this.state.currentPage - 1) * itemsPerPage
        const endIndex = (this.state.currentPage * itemsPerPage)

        //todoList = todoList.slice(startIndex, endIndex);

        console.log("printing todoList: " + todoList)

        this.setState({
            // todoList,
            currentPage: 1,
            maxPage : todoList.length === 0 ? 1 : todoList.length
        })
    }
    
    render () {
        const numPages = Math.ceil(this.props.todos.length/this.state.itemsPerPage);
        return (
            <Pagination 
                count={numPages} 
                size='medium'
                className="pagination-container"
                defaultPage={1}
                page={this.state.currentPage}
                // onChange={handlePageChange} // sets value of page
            />
        )
    }
    
}

export default PaginationComp