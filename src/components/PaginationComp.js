import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

class PaginationComp extends React.Component { 
    // constructor(props, context) {
    //     super(props, context)
    //     console.log("Constructor: ", this.props)
    // }

    state = {
        currentPage: 1
    }

    handlePages = (numPages) => {
        console.log(numPages)
        return numPages
    }
    // gives the page number that needs to be displayed
    onPageChange = (event, newPage) => {
        this.setState({currentPage : newPage})
        // return the page
        this.props.handlePageChange({newPage})
    }

    render () {
        return (
            <Pagination 
                count={this.handlePages(this.props.numPage)} 
                size='medium'
                className="pagination-container"
                defaultPage={1}
                value = {this.state.currentPage}
                page={this.state.currentPage}
                onChange={this.onPageChange} // sets value of page
            />
        )
    }
}

export default PaginationComp