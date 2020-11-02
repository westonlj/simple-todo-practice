import React, {Component} from 'react';

class InputTodo extends Component {
    state = {
        title: ""
    };

    // make the value in input not read only
    // e is an event
    onChange = e => {
        // console.log(e.target, e.target.name, e);

        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    // passing up to the parent the newly entered value
    handleSubmit = e => {
        e.preventDefault();
        
        if(this.state.title === "") {
            alert("Cannot enter an empty todo")
        } else {
            this.props.addTodoProps(this.state.title);
            this.setState({
                title: ""
            });
        }
    };

    // add functionality for a clock to show specific times/ when the todo was created
    // on completion show a line-through and a completed time.
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-container">
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Add to-do..." 
                    value={this.state.title}
                    name="title"
                    onChange={this.onChange}
                    maxLength="100"
                />
                <input 
                    type="submit" 
                    className="input-submit" 
                    value="Submit"
                />
            </form>
        )
    }
}

export default InputTodo