"use client"

import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RiSearch2Line } from 'react-icons/ri'
import { Input } from './ui/input'
import AuthButton from './AuthButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { NavLink } from '@/constants'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'
import { Skeleton } from './ui/skeleton'

const Navbar = () => {
    const pathname = usePathname()
    const { data: session } = useSession()
    const navbarItem = NavLink()
    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    
    const isDark = resolvedTheme === 'dark'

    if (!mounted) {
        return (
            <Skeleton className={`fixed z-30 p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 h-[100px] rounded-none w-full shadow-sm`} />
        )
    }

    return (
        <nav className={`fixed z-30 bg-gradient-to-r from-pink-400 to-rose-400 w-full shadow-sm ${isDark && '!bg-gradient-to-r !from-zinc-900 !to-zinc-800'}`}>
            <div className='wrapper !py-4 flex items-center justify-end w-full relative'>
                <div className={`flex items-center gap-40 w-full xl:translate-x-36 max-w-4xl bg-gray-50 transform -skew-x-[8deg] rounded-[8px] py-2 px-6 shadow-[inset_2px_4px_4px_1px_#00000024]`}>
                    <div className='flex items-start flex-col gap-1'>
                        <h1 className={`font-bold sm:text-[24px] text-[18px] tracking-normal ${isDark && 'text-black'}`}>Kanabagi <span className={`bg-gradient-to-b from-pink-400 to-rose-400 text-gray-50 rounded-[4px] px-1 ${isDark && '!bg-gradient-to-r !from-zinc-900 !to-zinc-800'}`}>Diary</span></h1>

                        {session && session?.user ? (
                            <div className='flex items-center gap-1'>
                                {navbarItem.map((navItem, index) => {
                                    const isActive = pathname === navItem.path;
                                    const isLastItem = index === navbarItem.length - 1;

                                    return (
                                        <div key={navItem.name} className='flex'>
                                            <Link href={navItem.path} className={`${isActive && 'text-pink-500'} sm:text-[14px] text-[12px] font-medium ${isActive && isDark && '!text-black font-semibold'} ${isDark && 'text-gray-700'}`}>
                                                {navItem.name}
                                            </Link>
                                            {!isLastItem &&
                                                <IoIosArrowForward className={`w-5 h-5 ${isDark && 'text-black'}`} />
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className='flex items-center gap-1'>
                                <Link href="/" className={`sm:text-[14px] text-[12px] text-pink-500 font-medium ${isDark && '!text-black font-semibold'}`}>
                                    Home
                                </Link>
                                <IoIosArrowForward className='w-5 h-5 text-black' />
                                <span className='tracking-widest text-black'>...</span>
                                <IoIosArrowForward className='w-5 h-5 text-black' />
                                <span className='tracking-widest text-black'>...</span>

                            </div>
                        )}

                    </div>

                    <div className={`flex max-lg:hidden items-center py-1 px-3 rounded-[8px] border-2 border-gray-300 bg-ray-100 focus-within:border-pink-400 w-full max-w-sm ${isDark && 'focus-within:!border-black border-gray-900'}`}>
                        <RiSearch2Line className={`w-6 h-6 text-pink-500 ${isDark && '!text-black'}`} />
                        <Input placeholder='Search...' className={`bg-transparent border-none focus-visible:ring-transparent rounded-full focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${isDark && 'placeholder:text-gray-700 text-black'}`} />
                    </div>

                    {/* <div className='flex items-center gap-2'>
                        <AuthButton />
                    </div> */}

                    <ThemeSwitch />
                </div>

                <div className='xl:flex items-center -translate-x-[250px] justify-end gap-40 w-full max-w-xl bg-gray-50 transform -skew-x-[8deg] rounded-[8px] py-[14px] px-6 shadow-[inset_2px_4px_4px_1px_#00000024] absolute left-0 hidden'>
                    <AuthButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar