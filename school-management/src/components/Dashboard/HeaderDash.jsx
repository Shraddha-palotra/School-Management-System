import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import collaps_btn from "../assets/icons/collaps_btn.svg";
import avatar from "../assets/icons/avatar.png";



function HeaderDash({isOpen, setIsOpen}) {
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)
 
  useEffect(() => {
    const userString = localStorage.getItem("user");
  
  if (userString) {
    try {
      const user = JSON.parse(userString);
      setLoggedUser(user);
      console.log(user);
    } catch (error) {
      console.error("error parsing user data: ",error)
    }
  } else {
    console.log("No user data found in localstorage");
  }
}, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  };

  const openCollapsedHandler = () => {
    setIsCollapsed(!isCollapsed)
  };

  const closeHandler = (e) => {
    if (!e.target.closest(".dropdown")){
      setIsCollapsed(false);
    }
  };


  useEffect( () => {
    document.addEventListener('mousedown', closeHandler);

    return () => {
      document.removeEventListener('mousedown', closeHandler);
    }
  },[])

  const logOut = () => {
    // window.localStorage.removeItem("isLoggIn");
    window.localStorage.removeItem("user");  
    setLoggedUser(null);
    // setIsLogIn(false);
  }

  return (
    <>
    
      <div>
        <nav className="header-nav">
          <div className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="row w-100">
                <div className="col-xxl-12 d-flex justify-content-between ">
                  <button type="button" className="collapse-btn" 
                  onClick={toggleSidebar}>
                    <img src={collaps_btn} alt="" />
                  </button>
                  <div className="avatar">
                    <div className="dropdown">
                    <span className="d-flex align-items-center cusProfileCir">
                      <button 
                        className={`dropdown-toggle ${isCollapsed ? "show" : ""}`}
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded={isCollapsed ? "true" : "false"}
                        onClick={openCollapsedHandler}
                      >
                        <img 
                      src={loggedUser?.profileImage ? `http://localhost:8080${loggedUser.profileImage}` :avatar}
                      alt="" />
                        <h6>
                        {/* {loggedUser ? loggedUser.name : " "} */}
                         {loggedUser?.name}
                         <span>Admin</span>
                        </h6>
                      </button>
                    </span>
                      <ul
                        className={`dropdown-menu ${isCollapsed ? "show" : ""}`}
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>                  
                          <Link to="/profile" className="dropdown-item">Profile</Link>
                        </li>
                        <li>
                        <Link to="/change-password" className="dropdown-item">Change Password</Link>
                        </li>
                        <li>
                        <Link to="/login" className="dropdown-item"
                        onClick={logOut}>Log Out</Link>
                        {/* <LogoutButton/> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default HeaderDash;