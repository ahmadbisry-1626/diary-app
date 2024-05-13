import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuSettings } from 'react-icons/lu'
import Link from 'next/link'



const DropdownProfile = ({ id }: { id: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='group'>
                <LuSettings className="w-6 h-6 text-gray-500 group-hover:text-gray-400 transition duration-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='-translate-y-10 z-[99] -translate-x-24'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/profile/${id}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/api/auth/signout" className='text-red-500'>Sign out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropdownProfile