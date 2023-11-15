import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='bg-[#2d2daf] py-2 px-[5%] flex items-center justify-between'>
      <div className="text-[#fff] font-[900] text-[25px]">MYBLOG</div>
      <ul className='list-none flex items-center justify-between w-[20%]'>
        <li>
            <Link to='/' className='text-[#fff] font-medium'>Home</Link>
        </li>
        <li>
            <Link to='/add' className='text-[#fff] font-medium'>Add Blog</Link>
        </li>
        <li>
            <Link to='/about' className='text-[#fff] font-medium'>About</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
