import React from 'react'
import PropTypes from 'prop-types'

// Component to implement pagination
// uses prop-types for type checking
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
// const range = (from, to, step = 1) => {
//   let i = from;
//   const range = [];

//   while (i <= to) {
//     range.push(i);
//     i += step;
//   }

//   return range;
// }
class PaginationComponent extends React.Component {
    constructor(props) {
        super(props)
        // totalTodos is the total number of entries to be paginated
        // PageLimit is total number of todos on a page
        // pageNeighbor show the previous and next page of the current page
        const {totalTodos = null, pageLimit = 10, pageNeighbor = 0} = props;

        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;
        this.totalTodos = typeof totalTodos === 'number' ? totalTodos : 0;

        this.pageNeighbor = typeof pageNeighbor === 'number'
         ? Math.max(0, Math.min(pageNeighbor, 2)) : 0;
        
        this.totalPages = Math.ceil(this.totalTodos / this.pageLimit)

        this.state = {currentPage : 1} 

        // error checking for types goes here
    }
}

export default PaginationComponent