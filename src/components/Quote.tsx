"use client"

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs'
import { Skeleton } from './ui/skeleton'

const Quote = () => {
    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex max-lg:hidden flex-col gap-4 w-full max-w-xs pt-2">
                <BsFillChatSquareQuoteFill className={`w-12 h-12 text-zinc-700`} />
                <Skeleton className={`bg-gray-300 flex flex-col h-[150px] gap-2 justify-center shadow-sm p-6 w-full max-w-xs rounded-[12px]`} />
            </div>
        )
    }


    const isDark = resolvedTheme === 'dark'

    return (
        <div className="flex max-lg:hidden flex-col gap-4 w-full max-w-xs pt-2">
            <BsFillChatSquareQuoteFill className={`w-12 h-12 text-pink-400 ${isDark && '!text-zinc-600'}`} />
            <div className={`bg-gradient-to-r from-pink-400 to-rose-400 flex flex-col gap-2 justify-center shadow-sm p-6 w-full max-w-xs rounded-[12px] ${isDark && 'bg-gradient-to-r from-zinc-900 to-zinc-800'}`}>
                <p className="text-gray-50 font-medium">
                    Dalam pelukan cinta sesama jenis, kita menemukan rumah. Rumah di mana kita bisa menjadi diri sendiri, dicintai, dan mencintai sepenuhnya.
                </p>
            </div>
        </div>
    )
}

export default Quote