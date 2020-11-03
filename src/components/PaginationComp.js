import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

class PaginationComp extends React.Component { 
    
    // gives the page number that needs to be displayed
    onPageChange = (event, newPage) => {
        this.setState({currentPage : newPage})
        // return the page
        this.props.handlePageChange({newPage})
    }

    render () {
        
        return (
            <Pagination 
                count={this.props.numPages} 
                size='medium'
                className="pagination-container"
                defaultPage={1}
                value = {this.props.currentPage}
                page={this.props.currentPage}
                onChange={this.onPageChange} // sets value of page
            />
        )
    }
    
}
 // filterArray = (props) => {
    //     const itemsPerPage = this.state;
    //     let todoList = this.props.todos
    //     const startIndex = (this.state.currentPage - 1) * itemsPerPage
    //     const endIndex = (this.state.currentPage * itemsPerPage)

    //     //todoList = todoList.slice(startIndex, endIndex);

    //     console.log("printing todoList: " + todoList)

    //     this.setState({
    //         // todoList,
    //         currentPage: 1,
    //         maxPage : todoList.length === 0 ? 1 : todoList.length
    //     })
    // }
export default PaginationComp