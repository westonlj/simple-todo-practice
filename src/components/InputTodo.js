import React, {Component} from 'react';

class InputTodo extends Component {
    state = {
        title: ""
    };

    // make the value in input not read only
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    // passing up to the parent the newly entered value
    handleSubmit = e => {
        e.preventDefault();
        this.props.addTodoProps(this.state.title);
        this.setState({
            title: ""
        });
    };

    // add functionality for a clock to show specific times/ when the todo was created
    // on completion show a line-through and a completed time.
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-container">
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Add todo..." 
                    value={this.state.title}
                    name="title"
                    onChange={this.onChange}
                />
                <input type="submit" className="input-submit" value="Submit" />
            </form>
        )
    }
}

export default InputTodo