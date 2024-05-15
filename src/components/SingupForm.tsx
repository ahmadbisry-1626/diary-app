"use client"

import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { MdEmail } from 'react-icons/md'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { Button } from './ui/button'
import { Backend_URL } from '@/lib/constants'
import { toast } from "sonner"


type FormInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


  
const SingupForm = () => {
    const [isVisible, setIsVisibile] = useState(false);

    const register = async () => {

        // Validasi input tidak boleh kosong
        if (!data.current.firstName || !data.current.lastName || !data.current.email || !data.current.password) {
            return toast.error('Please fill in all fields')
        }

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.current.email)) {
            return toast.error('Please enter a valid email address')
        }

        // Validasi nama harus string
        if (typeof data.current.firstName !== 'string' || typeof data.current.lastName !== 'string') {
            return toast.error('First name and last name must be a string')
        }

        if (data.current.firstName.length < 3 || data.current.lastName.length < 3) {
            return toast.error('Name must be at least 3 characters')
        }


        try {
            const res = await fetch(Backend_URL + "/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    firstName: data.current.firstName,
                    lastName: data.current.lastName,
                    email: data.current.email,
                    password: data.current.password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) {
                alert('Failed to register')

                return
            }


            const response = await res.json()
            toast.success('Register success')
            await new Promise((resolve) => setTimeout(resolve, 1500))
            window.location.href = "/api/auth/signin";
        } catch (error) {
            console.error(error)
        }

    }

    const data = useRef<FormInput>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    return (
        <Dialog>
            <DialogTrigger className='px-4 py-2 rounded-[4px] hover:bg-violet-800 bg-violet-600 text-gray-50'>Sign up</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign up</DialogTitle>
                    <div className='flex flex-col items-center justify-center gap-10 w-full'>
                        <h1 className='font-semibold text-3xl mt-4'>Kanabagi <span className='text-violet-600'>Diary</span></h1>

                        <div className='flex flex-col gap-3 w-full'>
                            <div className='flex gap-3'>
                                <Input
                                    name='firstName'
                                    placeholder='First Name'
                                    className={`border-2 border-gray-400 rounded-[12px] h-[50px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 `}
                                    onChange={(e) => (data.current.firstName = e.target.value)}
                                />
                                <Input
                                    required
                                    name='lastName'
                                    placeholder='Last Name'
                                    className='border-2 border-gray-400 rounded-[12px] h-[50px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                                    onChange={(e) => (data.current.lastName = e.target.value)}
                                />
                            </div>
                            <div className='h-[50px] flex items-center px-4 border-2 border-gray-400 rounded-[12px]'>
                                <MdEmail className='w-7 h-7 text-violet-600' />

                                <Input
                                    required
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    className='border-none h-full focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                                    onChange={(e) => (data.current.email = e.target.value)}
                                />
                            </div>
                            <div className='h-[50px] flex justify-between px-4 border-2 border-gray-400 rounded-[12px]'>
                                <div className='flex items-center w-full'>
                                    <div className='w-7 h-7 flex items-center'>
                                        <FaLock className='w-6 h-6 text-violet-600' />
                                    </div>

                                    <Input
                                        required
                                        name='password'
                                        type={isVisible ? "text" : "password"}
                                        placeholder='Password'
                                        className='border-none h-full focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                                        onChange={(e) => (data.current.password = e.target.value)}
                                    />
                                </div>


                                {!isVisible ? (
                                    <button onClick={() => setIsVisibile(true)}>
                                        <FaEye className='w-6 h-6 text-gray-500' />
                                    </button>
                                ) : (
                                    <button onClick={() => setIsVisibile(false)}>
                                        <FaEyeSlash className='w-6 h-6 text-gray-500' />
                                    </button>
                                )}
                            </div>
                            <p className='text-[14px] text-gray-500 text-center'>
                                By signing up, you agree to our {" "}
                                <span className='text-blue-700 hover:cursor-pointer'>
                                    Terms & Privacy Policy.
                                </span>
                            </p>
                            <Button className='bg-violet-600 hover:bg-violet-800 rounded-[12px]' onClick={register}>
                                Sign up
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default SingupForm