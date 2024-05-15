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
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Separator } from './ui/separator'



const DropdownProfile = ({ id }: { id: string }) => {
    return (
        <>
            {/* <DropdownMenu>
                <DropdownMenuTrigger className='group'>
                    
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
            </DropdownMenu> */}

            <Popover>
                <PopoverTrigger>
                    <LuSettings className="w-6 h-6 text-gray-500 group-hover:text-gray-400 transition duration-300" />
                    </PopoverTrigger>
                <PopoverContent>
                    <div className='flex flex-col bg-gray-50 shadow-md translate-x-16'>
                        <Link href={`/profile/${id}`} className='text-gray-700 font-medium hover:bg-gray-100 p-4 py-2'>Profile</Link>
                        <Link href="/api/auth/signout" className='text-red-500 font-medium hover:bg-gray-100 p-4 py-2'>Sign out</Link>
                    </div>
                </PopoverContent>
            </Popover>


        </>

    )
}

export default DropdownProfile