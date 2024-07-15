import React from 'react'
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
     const navigate = useNavigate();

     const handleLogout = () => {
       //  clear rememberMe state
       localStorage.removeItem('rememberMe');
   
       // Redirect to the login or home page
       navigate('/login');
     };
   
  return (
    <>
    <button onClick={handleLogout}>Log Out</button>
    </>
  
  )
}

export default LogoutButton