"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import DropdownProfile from "./DropdownProfile"
import SingupForm from './SingupForm';

const AuthButton = () => {
    const { data: session } = useSession()

    return (
        <>
            {session && session.user ? (
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-pink-400 p-2 px-4 rounded-full">
                            <span className="text-xl text-gray-50">{session.user.firstName.charAt(0)}</span>
                        </div>

                        <div className="flex items-start flex-col gap-1">
                            <h1 className="text-[16px] font-medium translate-y-[3px]">{session.user.firstName} {session.user.lastName}</h1>
                            <p className="text-[14px] text-gray-500 -translate-y-[3px]">{session.user.email}</p>
                        </div>
                    </div>

                    <DropdownProfile id={session.user.id} />
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href="/api/auth/signin" className="px-4 py-2 rounded-[4px] hover:bg-gray-100">Sign In</Link>
                    <SingupForm />
                </div>
            )}

        </>
    )
}

export default AuthButton