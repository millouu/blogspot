import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // this is to redirect the user to the home page after login
  const {setUserInfo}=useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    const res=await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is to allow cookies to be sent with the request
    });
    if (res.ok)
    {
      res.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }
    else alert("Invalid Credentials")
  };
  if(redirect)
  {
    return <Navigate to="/"/>
  }
  return (
    <form
      action=''
      className='flex flex-col w-3/4 mx-auto gap-5'
      onSubmit={handleLogin}>
      <h1 className='mb-5'>👋Login</h1>
      <input
        type='text'
        name='username'
        id='username'
        placeholder='Enter Your Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type='password'
        name='password'
        id='password'
        placeholder='Enter Your Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type='submit'
        className='rounded-sm p-3 bg-slate-950 text-white ;'>
        Login
      </button>
    </form>
  );
};

export default LoginPage;
