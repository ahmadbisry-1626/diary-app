"use client"

import { useSession } from "next-auth/react"


export const NavLink = () => {
    const { data: session } = useSession()

    const navbarItem = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Diary Post",
            path: "/diarypost"
        },
        {
            name: 'Profile',
            path: `/profile/${session?.user.id}`
        }
    ]

    return navbarItem
}