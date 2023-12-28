import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw res;
      else alert("Registered Successfully");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <form
      action=''
      className='flex flex-col w-3/4 mx-auto'
      onSubmit={handleRegister}>
      <h1 className='mb-5'>🐧Register</h1>

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
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
