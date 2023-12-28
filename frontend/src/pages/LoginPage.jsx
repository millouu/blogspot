import { useState } from 'react';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin =async (e) => {
    e.preventDefault()
    try {
      const res=await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
      })
      if(!res.ok) throw res
      else alert('Logged in Successfully')
    }
    catch(err){
      console.log(err)
    }

  }
  return (
      <form action='' className="flex flex-col w-3/4 mx-auto" onSubmit={handleLogin}>
          <h1 className="mb-5">👋Login</h1>
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
