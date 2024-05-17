"use client"

import { Session } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { FaImage } from 'react-icons/fa'
import { Textarea } from '../ui/textarea'
import { DatePicker } from './DatePicker'
import PronounsSelect from './PronounsSelect'
import { AiFillInstagram } from "react-icons/ai";
import { TbBrandFacebookFilled } from 'react-icons/tb'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Skeleton } from '../ui/skeleton'

const ProfileDetails = ({ session }: { session: Session }) => {
    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Skeleton className='w-full h-[500px]'/>
        )
    }


    const isDark = resolvedTheme === 'dark'


    return (
        <div className={`flex flex-col gap-6 w-full h-max p-12 !py-6 rounded-[12px] ${isDark && '!bg-gradient-to-r !from-zinc-900 !to-zinc-800'}`}>
            <div className='flex items-center gap-6 relative'>
                <div className={`bg-gradient-to-r max-md:hidden from-rose-400 to-pink-400 flex items-center justify-center p-10 py-8 rounded-full ${isDark && '!bg-gradient-to-l !from-zinc-900 !to-zinc-800 border-2 border-gray-50'}`}>
                    <span className='text-4xl text-gray-50 select-none'>{session.user.firstName.charAt(0)}</span>

                    <div className='absolute rounded-[12px] top-0 bg-gray-50 p-1 px-3 left-0 flex items-center gap-2 shadow-md translate-y-[85px] -translate-x-3'>
                        <FaImage className={`w-5 h-5 text-pink-400 ${isDark && '!text-black'}`} />
                        <span className='text-[14px] font-medium text-black'>Add</span>
                    </div>
                </div>

                <div className='flex flex-col md:items-center w-full gap-4'>
                <span className='font-medium text-[16px] max-md:flex hidden'>Profile</span>
                    <div className='flex max-md:flex-col flex-row items-center gap-4 w-full'>
                        <Input className='border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-100 rounded-[12px] h-[50px] text-[16px] text-black' placeholder={session.user.firstName} defaultValue={session.user.firstName}/>
                        <Input className='border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-100 rounded-[12px] h-[50px] text-[16px] text-black' defaultValue={session.user.lastName} />
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <span className='w-full max-w-[105px] text-[16px] font-medium md:flex hidden'>Public Email:</span>
                        <Input className='border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-200 rounded-[12px] h-[50px] text-[16px] text-black' defaultValue={session.user.email} disabled/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <span className='font-medium text-[16px]'>Bio</span>
                <Textarea className='border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible: ring-offset-0 bg-gray-100 rounded-[12px] h-[100px] text-[16px] text-black' placeholder='Tell us a little bit about yourself' />
            </div>

            <div className='flex items-center gap-4 max-md:flex-wrap'>
                <div className='flex flex-col gap-2 max-md:w-full'>
                    <span className='font-medium text-[16px]'>Birthday</span>
                    <DatePicker />
                </div>
                <div className='flex flex-col gap-2 max-md:w-full'>
                    <span className='font-medium text-[16px]'>Pronouns</span>
                    <PronounsSelect />
                </div>
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <span className='font-medium text-[16px]'>Sosial Media</span>
                <div className='w-full flex items-center gap-4'>
                    <div className='bg-gray-100 rounded-[12px] h-[50px] flex items-center w-full px-4'>
                        <AiFillInstagram className='w-6 h-6 text-gray-500'/>
                        <Input className='border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-[16px] text-black' placeholder='https://www.instagram.com/ahmadbirsy'/>
                    </div>
                    <div className='bg-gray-100 rounded-[12px] h-[50px] flex items-center w-full px-4'>
                        <TbBrandFacebookFilled className='w-6 h-6 text-gray-500'/>
                        <Input className='border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-[16px] text-black' placeholder='https://www.facebook.com/profile.php?id=1000065421'/>
                    </div>
                </div>
            </div>

            <div className='w-full flex items-center md:justify-end'>
                <Button size={"lg"} className={`bg-pink-400 hover:bg-pink-600 rounded-[12px] ${isDark && '!bg-transparent border-2 border-gray-50 text-gray-50 hover:!bg-gray-50 hover:text-black'} max-md:w-full`}>Update Profile</Button>
            </div>
        </div>
    )
}

export default ProfileDetails