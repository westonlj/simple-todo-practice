import React from 'react';

// using ES6 arrow function same as:
    // function Header() {}
const Header = () => {

    const headerStyle = {
        padding: "20px 0",
        lineHeight: "2em",
    }

    return (
        <header style={headerStyle}>
            <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>
                Simple To-do App
            </h1>
            <p style={{ fontSize: "19px" }}>
                Please add to-dos item(s) through the input field
            </p>
        </header>
    )
}

// function Header() {
//     return(
//         <header>
//             <h1>Simp</h1>
//             <p>pls simp</p>
//         </header>
//     )
// }

export default Header