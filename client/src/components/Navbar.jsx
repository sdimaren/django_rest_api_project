import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextComponent';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext)
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');  // Navigate to the root page after logout
  }

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <p><Link to="/" className="nav-link">All posts</Link></p>
        { isLoggedIn && <p><Link to="/new" className="nav-link">New post</Link></p> }
      </div>
      <div className="navbar-logout">
        { !isLoggedIn && 
          <p><Link to="auth/signup" className="nav-link">Sign up</Link></p>
        }
        { isLoggedIn && 
          <p><Link to={user ? `/users/${user.username}` : '#'} className="nav-link">Profile</Link></p>
        }
        { isLoggedIn
          ? <p className="logout-link" onClick={handleLogout}>Log Out</p>
          : <p className="logout-link"><Link to="/auth/signin" className="nav-link">Sign In</Link></p>
        }  
      </div>
    </nav>
  );
}

export default Navbar;