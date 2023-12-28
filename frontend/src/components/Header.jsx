import { useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  //we have to check if we are logged in or not
  const {setUserInfo,userInfo}=useContext(UserContext);
  const username=userInfo?.username;
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
        credentials: "include",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch user information');
        }
        return res.json();
    })
    .then(userInfo => {
        setUserInfo(userInfo);
    })
    .catch(error => {
        console.error('Error fetching user information:', error);
        // Handle error, e.g., redirect to login page or show a message
    });
}, []);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST"
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user information');
      }
      setUserInfo(null);
    }
    catch (error) {
      console.error('Error fetching user information:', error);
    }
  }

  return (
    <header className='flex justify-between mb-10'>
      <Link to='/' className='logo text-xl'>
        Blogspot
      </Link>
      <nav className='flex gap-5 text-xl'>
        {username && (
          <>
            <Link to='/create'>Create Post</Link>
            <Link onClick={logout}>🥰{username} (Logout)</Link>
          </>
        )}

        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        
        )}
      </nav>
    </header>
  );
};

export default Header;
