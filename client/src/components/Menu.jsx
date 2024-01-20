import React from 'react'

const Menu = () => {
  return (
    <div className='group relative'>
    <button className='dropbtn bg-green-500 text-white px-4 py-3 rounded'>Dropdown</button>
    <div className="hidden group-hover:block absolute top-full left-0 bg-gray-100 border border-gray-300 py-2">
      <a className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300" href="#">Link 1</a>
      <a className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300" href="#">Link 2</a>
      <a className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300" href="#">Link 3</a>
    </div>
  </div> 
  )
}

export default Menu