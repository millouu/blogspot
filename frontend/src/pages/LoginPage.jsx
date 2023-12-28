const LoginPage = () => {
  return (
      <form action='' className="flex flex-col w-3/4 mx-auto">
          <h1 className="mb-5">👋Login</h1>
      <input
        type='text'
        name='username'
        id='username'
        placeholder='Enter Your Username'
      />

      <input
        type='password'
        name='password'
        id='password'
        placeholder='Enter Your Password'
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
