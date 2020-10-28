import React from 'react';


class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state={todo:''};
      }
      onInputChange(todo){
        const name = this.props.searchBoxName || undefined
        this.setState({todo});
        if(this.props.onSearchTermChange){
          this.props.onSearchTermChange({name,todo})
        }
      }

    render() {
        const name = this.props.searchBoxName || undefined
        return (
            <div className="search-box">
                <input name={name} Y
                className="search-input" id="search" type="text" placeholder="Search" value={this.state.todo}
                onChange={event=>this.onInputChange(event.target.value)} onKeyPress={this.props.onKeyPress|| null}/>
            </div>
        );
    }
}

export default SearchBar