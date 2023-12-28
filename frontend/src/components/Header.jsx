import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between mb-10'>
        <Link to='/' className='logo text-xl'>
          Blogspot
        </Link>
        <nav className='flex gap-5 text-xl'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
      </header>
  )
}

export default Header
