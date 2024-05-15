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
        <nav className='fixed z-30 bg-gradient-to-r from-pink-400 to-rose-400 w-full shadow-sm'>
            <div className='wrapper !py-4 flex items-center justify-end w-full relative'>
                <div className='flex items-center gap-40 w-full translate-x-36 max-w-4xl bg-gray-50 transform -skew-x-[8deg] rounded-[8px] py-2 px-6 shadow-[inset_2px_4px_4px_1px_#00000024]'>
                    <div className='flex items-start flex-col gap-1'>
                        <h1 className='font-bold text-[24px] tracking-normal'>Kanabagi <span className='bg-gradient-to-b from-pink-400 to-rose-400 text-gray-50 rounded-[4px] px-1'>Diary</span></h1>

                        {session && session?.user ? (
                            <div className='flex items-center gap-1'>
                                {navbarItem.map((navItem, index) => {
                                    const isActive = pathname === navItem.path;
                                    const isLastItem = index === navbarItem.length - 1;

                                    return (
                                        <div key={navItem.name} className='flex'>
                                            <Link href={navItem.path} className={`${isActive && 'text-pink-600'} text-[14px] font-medium`}>
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
                                <Link href="/" className='text-[14px] text-pink-500 font-medium'>
                                    Home
                                </Link>
                                <IoIosArrowForward className='w-5 h-5 ' />
                                <span className='tracking-widest'>...</span>
                                <IoIosArrowForward className='w-5 h-5 ' />
                                <span className='tracking-widest'>...</span>

                            </div>
                        )}

                    </div>

                    <div className='flex items-center py-1 px-3 rounded-[8px] border-2 border-gray-300 bg-ray-100 focus-within:border-pink-400 w-full max-w-sm'>
                        <RiSearch2Line className='w-6 h-6 text-pink-600' />
                        <Input placeholder='Search...' className='bg-transparent border-none focus-visible:ring-transparent rounded-full focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0' />
                    </div>

                    {/* <div className='flex items-center gap-2'>
                        <AuthButton />
                    </div> */}
                </div>

                <div className='flex items-center -translate-x-[250px] justify-end gap-40 w-full max-w-xl bg-gray-50 transform -skew-x-[8deg] rounded-[8px] py-[14px] px-6 shadow-[inset_2px_4px_4px_1px_#00000024] absolute left-0'>
                    <AuthButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar