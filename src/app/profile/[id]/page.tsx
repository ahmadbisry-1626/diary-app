import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfileDetails from '@/components/Profile/ProfileDetails'
import SideMenu from '@/components/Profile/SideMenu'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

interface ProfileProps {
    params: {
        id: string
    }
}

const page = async ({ params }: ProfileProps) => {
    const { id } = params
    const session = await getServerSession(authOptions)

    return (
        <div className='flex justify-center pt-[140px] min-h-screen wrapper'>
            {session?.user.id === id ? (
                <>
                    {session && session.user ? (
                        <div className='flex w-full lg:gap-20'>
                            <div className='lg:flex hidden flex-col gap-3 p-4 h-max w-full max-w-xs'>
                                <SideMenu id={id}/>
                            </div>


                            <ProfileDetails session={session}/>
                        </div>
                    ) : (
                        notFound()
                    )}
                </>
            ) : (
                notFound()
            )}


        </div>
    )
}

export default page