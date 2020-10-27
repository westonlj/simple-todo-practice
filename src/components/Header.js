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

    return (
        <header style={headerStyle}>
            <h1 style={{ fontSize: "25px", marginBottom: "15px", }}>
                Simple To-Do App
            </h1>
            {/* add a logout button that changes isLoggedIn to false
                AND clear the sessionStorage
             */}
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