import React from 'react'

const Navbar = () => {
    return (
        <nav className='fixed w-full z-[99] flex items-center justify-between bg-gray-50 border-b'>
            <div className='flex items-center flex-col gap-4'>
                <h1 className='font-semibold text-[20px]'>Kanabagi Diary</h1>

                <div className='flex items-center gap-2'>
                    <span className='text-blue-700'>Settings</span>
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar