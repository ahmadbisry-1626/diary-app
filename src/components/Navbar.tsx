"use client"

import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RiSearch2Line } from 'react-icons/ri'
import { Input } from './ui/input'
import AuthButton from './AuthButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { NavLink } from '@/constants'

const Navbar = () => {
    const pathname = usePathname()
    const { data: session } = useSession()
    const navbarItem = NavLink()

    return (
        <nav className='fixed z-30 bg-violet-600 w-full shadow-sm'>
            <div className='wrapper'>
                <div className='flex items-center justify-between bg-gray-50 transform -skew-x-[8deg] rounded-[8px] py-2 px-6 shadow-[inset_2px_4px_4px_1px_#00000024]'>
                    <div className='flex items-start flex-col gap-1'>
                        <h1 className='font-bold text-[26px] tracking-normal'>Kanabagi <span className='bg-gradient-to-r from-violet-600 to-purple-700 text-gray-50 rounded-[4px] px-1'>Diary</span></h1>

                        {session && session?.user ? (
                            <div className='flex items-center gap-1'>
                                {navbarItem.map((navItem, index) => {
                                    const isActive = pathname === navItem.path;
                                    const isLastItem = index === navbarItem.length - 1;

                                    return (
                                        <div key={navItem.name} className='flex'>
                                            <Link href={navItem.path} className={`${isActive && 'text-violet-600'} text-[14px] font-medium`}>
                                                {navItem.name}
                                            </Link>
                                            {!isLastItem &&
                                                <IoIosArrowForward className='w-5 h-5 ' />
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className='flex items-center gap-1'>
                                <Link href="/" className='text-[14px] text-violet-600 font-medium'>
                                    Home
                                </Link>
                                <IoIosArrowForward className='w-5 h-5 ' />
                                <span className='tracking-widest'>...</span>
                                <IoIosArrowForward className='w-5 h-5 ' />
                                <span className='tracking-widest'>...</span>

                            </div>
                        )}

                    </div>

                    <div className='flex items-center py-1 px-3 rounded-[8px] border-2 border-gray-300 bg-ray-100 focus-within:border-violet-600 w-full max-w-xs'>
                        <RiSearch2Line className='w-6 h-6 text-violet-700' />
                        <Input placeholder='Search...' className='bg-transparent border-none focus-visible:ring-transparent rounded-full focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
                    </div>

                    <div className='flex items-center gap-2'>
                        <AuthButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar