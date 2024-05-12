import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Button } from './ui/button'
import { RiSearch2Line } from 'react-icons/ri'
import { Input } from './ui/input'

const Navbar = () => {
    return (
        <nav className='fixed z-[99] bg-violet-600 w-full shadow-sm'>
            <div className='wrapper'>
                <div className='flex items-center justify-between bg-gray-50 transform -skew-x-12 rounded-[8px] py-2 px-6 shadow-[inset_2px_4px_4px_1px_#00000024]'>
                    <div className='flex items-start flex-col'>
                        <h1 className='font-bold text-[26px] tracking-normal'>Kanabagi <span className='bg-gradient-to-r from-violet-600 to-purple-700 text-gray-50 rounded-[4px] px-1'>Diary</span></h1>

                        <div className='flex items-center gap-1'>
                            <span className='text-violet-600 font-medium text-[14px]'>Home</span>
                            <IoIosArrowForward className='w-5 h-5 ' />
                            <span className='font-medium text-[14px]'>Diary Post</span>

                        </div>
                    </div>

                    <div className='flex items-center py-1 px-3 rounded-[8px] border-2 border-gray-300 bg-ray-100 focus-within:border-violet-600 w-full max-w-sm'>
                        <RiSearch2Line className='w-6 h-6 text-violet-700' />
                        <Input placeholder='Search...' className='bg-transparent border-none focus-visible:ring-transparent rounded-full focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'/>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button size="lg" variant="ghost" >Sign In</Button>
                        <Button size="lg" className='bg-violet-600 hover:bg-violet-800'>Sign Up</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar