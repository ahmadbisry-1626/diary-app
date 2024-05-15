import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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
        <div className='flex items-center justify-center min-h-screen w-full'>
            {session?.user.id === id ? (
                <>
                    {session && session.user ? (
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-4xl'>{session?.user.firstName}</h1>
                            <p className='text-3xl'>{session?.user.email}</p>
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