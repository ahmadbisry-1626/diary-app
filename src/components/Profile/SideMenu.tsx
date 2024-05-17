"use client"

import { profileLinks } from '@/constants'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton';

const SideMenu = ({ id }: { id: string }) => {

    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                {[0, 1, 2, 3].map((index) => (
                    <div className='flex flex-col gap-4' key={index}>
                        <Skeleton className='w-[320px] h-[60px]' />
                    </div>
                ))}
            </>
        )
    }


    const isDark = resolvedTheme === 'dark'

    return (
        <>
            {profileLinks.map((profLinks) => {
                const isActive = profLinks.name === 'Profile'

                return (
                    <div className={`flex items-center gap-3 ${isActive && 'bg-gradient-to-r from-pink-400 to-rose-400 !text-gray-50 hover:!text-gray-50'} p-4 rounded-[12px] text-gray-500 transition duration-300 ${isDark && 'bg-gradient-to-r from-zinc-900 to-zinc-800'} select-none`} key={profLinks.name}>
                        <profLinks.icon className='w-7 h-7' />
                        <span className='font-medium cursor-not-allowed'>
                            {profLinks.name}
                        </span>
                    </div>
                )
            })}
        </>
    )
}

export default SideMenu