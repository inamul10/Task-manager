import React from 'react'

const Navbar = () => {
  return (
    <div className='w-100 p-3 bg-gray-300'>
        <div className='flex flex-row-reverse gap-3'>
            <button className='bg-neutral-400 p-2 rounded-md hover:bg-slate-500'>
                Logout
            </button>
            <button className='bg-neutral-400 p-2 rounded-md hover:bg-slate-500'>
                About us
            </button>
        </div>
     
    </div>
  )
}

export default Navbar