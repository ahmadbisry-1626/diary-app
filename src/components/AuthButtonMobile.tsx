"use client"

import React, { useEffect, useState } from 'react'
import SingupForm from './SingupForm'
import { useTheme } from 'next-themes';
import Link from 'next/link';

const AuthButtonMobile = () => {

    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    
    const isDark = resolvedTheme === 'dark'

    if (!mounted) {
        return null
    }

    return (
        <div className="max-xl:flex hidden gap-4">
            <Link href="/api/auth/signin" className={`px-4 py-2 rounded-[4px] hover:bg-gray-100 ${isDark && 'text-gray-50'}`}>Sign In</Link>
            <SingupForm />
        </div>
    )
}

export default AuthButtonMobile