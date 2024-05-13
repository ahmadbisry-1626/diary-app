"use client"

import { fetchUsers } from '@/actions/user'
import { User } from '@/interface'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const DataFetching = () => {
    const { data: session } = useSession();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);
        };

        fetchData();
    }, []);

    return (
        <div className='flex flex-col gap-2 min-h-screen items-center justify-center pt-20'>
            {session && session.user ? (
                <>
                    {users.filter((user) => session.user.id === user.id)
                        .map((user) => (
                            <div key={user.id} className='flex text-[20px]'>
                                <h1>{user.firstName} {user.lastName}</h1> - <span>{user.email}</span>
                            </div>
                        ))}
                </>
            ) : (
                <h1 className='text-[20px]'>Please sign in to view users</h1>
            )}
        </div>
    )
}

export default DataFetching