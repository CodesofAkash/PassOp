import React from 'react'

const Navbar = () => {
  return (
    <div className="mycontainer2 w-full">
      <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span className="ml-3 text-2xl text-black font-bold"><span className="text-blue-700 text-2xl">&lt;</span>Pass</span>
      <span className="text-blue-700 text-2xl font-bold">OP/&gt;</span>
    </a>
    <img className='m-2 h-10 w-10' src="/favicon.ico" alt="icon" />
    <nav className="md:ml-auto flex flex-wrap items-center text-base gap-4 mr-4 justify-center">
      <a className="mr-5 hover:text-gray-900">Home</a>
      <a className="mr-5 hover:text-gray-900">About</a>
      <a className="mr-5 hover:text-gray-900">Contact</a>
      <a href='https://github.com/codesofakash' target='_blank' className="flex gap-1">
      <img src="/icons/github.svg" alt="github icon"/>
      <span className='font-bold'>Github</span>
    </a>
    </nav>
    
  </div>
</header>
<hr/>
    </div>
  )
}

export default Navbar
