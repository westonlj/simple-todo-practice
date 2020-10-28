import React from 'react';
import Button from '@material-ui/core/Button'

// using ES6 arrow function same as:
    // function Header() {}
const Header = () => {

    const headerStyle = {
        padding: "20px 0",
        lineHeight: "2em",
        textAlign: "center"
    }

    function handleLogout(){
        sessionStorage.clear();
        window.location.reload();
    }

    // edit the below return to be a top bar with the header and logout button
    return (
        <header style={headerStyle}>
            <h1 style={{ fontSize: "25px", marginBottom: "15px", }}>
                Simple To-Do App
            </h1>
            <Button onClick={handleLogout}> 
            Logout
            </Button>
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