"use client"

import { useSession } from "next-auth/react"
import { FaUserAlt } from "react-icons/fa"
import { IoExit, IoSettings } from "react-icons/io5";
import { MdPrivacyTip } from "react-icons/md";


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

export const profileLinks = [
    {
        name: "Profile",
        path: "/profile/profilePublic",
        icon: FaUserAlt
    },
    {
        name: "Security & Privacy",
        path: '/profile/security',
        icon: MdPrivacyTip
    },
    {
        name: "Settings",
        path: "/profile/settings",
        icon: IoSettings
    },
    {
        name: "Logout",
        path: "/api/auth/signout",
        icon: IoExit
    }
]