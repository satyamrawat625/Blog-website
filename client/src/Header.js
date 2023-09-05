import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);

  useEffect(() => {
    // fetch profile data including cookies , http auth info
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
      {/* if user is logged in show profile */}
        {username && (
          <>
            <Link className="btn btn-dark new-post" to="/create">Create new post</Link>
            <a className="a-logout" onClick={logout}>Logout ({username})</a>
          </>
        )}
        {/* else show user name */}
        {!username && (
          <>
            <Link to="/login" className="btn btn-primary login-button">Login</Link>
            <Link to="/register" className="btn btn-primary register-button">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
