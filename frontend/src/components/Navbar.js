import React from 'react'
import {Button} from 'react-bootstrap'



function Navbar() {
    const logout = () => {
        
      localStorage.removeItem('token');
        // redirect user to the landing page
        window.location.href = "/login";
      }
  return (
    <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
    <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  </nav>
  )
}

export default Navbar