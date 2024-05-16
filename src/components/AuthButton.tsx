"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import DropdownProfile from "./DropdownProfile"
import SingupForm from './SingupForm';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AuthButton = () => {
    const { data: session } = useSession()
    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return null; // Atau Anda bisa menampilkan loading state di sini
    }


    const isDark = resolvedTheme === 'dark'

    return (
        <>
            {session && session.user ? (
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`bg-pink-400 p-2 px-4 rounded-full ${isDark && "!bg-black"}`}>
                            <span className="text-xl text-gray-50 select-none">{session.user.firstName.charAt(0)}</span>
                        </div>

                        <div className="flex items-start flex-col gap-1">
                            <h1 className={`text-[16px] font-medium translate-y-[3px] select-none ${isDark && 'text-black'}`}>{session.user.firstName} {session.user.lastName}</h1>
                            <p className="text-[14px] text-gray-500 -translate-y-[3px] select-none">{session.user.email}</p>
                        </div>
                    </div>

                    <DropdownProfile id={session.user.id} />
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href="/api/auth/signin" className={`px-4 py-2 rounded-[4px] hover:bg-gray-100 ${isDark && 'text-black'}`}>Sign In</Link>
                    <SingupForm />
                </div>
            )}

        </>
    )
}

export default AuthButton