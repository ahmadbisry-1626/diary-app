import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoMdSunny } from 'react-icons/io';
import { TbMoonFilled } from "react-icons/tb";

function ThemeSwitch() {
    const [mounted, setIsMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setIsMounted(true), [])

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            alt=''
            height={36}
            width={36}
            sizes='36x36'
            priority={false}
            title='loading Light/Dark Toggle' />
    )

    if (resolvedTheme === 'dark') {
        return (
            <div className='p-[6px] bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-full cursor-pointer absolute right-0 -translate-x-[70px] max-xl:-translate-x-[20px]'>
                <IoMdSunny onClick={() => setTheme('light')} className='sm:w-6 sm:h-6 h-4 w-4 text-gray-50' />
            </div>
        )
    }

    if (resolvedTheme === 'light') {
        return (
            <div className='p-[6px] bg-gradient-to-r from-pink-400 to-rose-400 rounded-full cursor-pointer absolute right-0 -translate-x-[70px] max-xl:-translate-x-[20px]'>
                <TbMoonFilled onClick={() => setTheme('dark')} className='sm:w-6 sm:h-6 h-4 w-4 text-gray-50' />
            </div>
        )
    }


}

export default ThemeSwitch