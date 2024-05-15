"use client"

import React, { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { ImPencil } from 'react-icons/im'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Backend_URL } from '@/lib/constants'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

type FormInput = {
    title: string;
    postBody: string;
    userId: string;
}

const CreateDiaryModal = () => {
    const { data: session } = useSession()

    const createPost = async () => {

        if (!data.current.title || !data.current.postBody) {
            return toast.error('Please fill in all fields')
        }

        if (data.current.title.length < 3 ) {
            return toast.error('Title must be at least 3 characters')
        }
        
        if(data.current.postBody.length < 10) {
            return toast.error('Content must be at least 10 characters')
        }

        try {
            const res = await fetch(Backend_URL + "/post", {
                method: "POST",
                body: JSON.stringify({
                    title: data.current.title,
                    postBody: data.current.postBody,
                    userId: session?.user.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok) {
                alert('Failed to create post')

                return
            }

            const response = await res.json()
            toast.success('Post created successfully')
            await new Promise((resolve) => setTimeout(resolve, 1500))
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const data = useRef<FormInput>({
        title: '',
        postBody: '',
        userId: ''
    })

    return (
        <Dialog>
            <DialogTrigger className='w-full max-w-xs'>
                <div className='flex items-center gap-2 border-2 border-gray-300 rounded-full px-4 h-[54px] focus-within:border-pink-500'>
                    <ImPencil className='w-7 h-7 text-pink-500 -mr-1' />
                    <Input
                        className='border-none bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Write something...' />
                </div>
            </DialogTrigger>
            <DialogContent className='!w-full max-w-[550px]'>
                <DialogHeader>
                    <DialogTitle>Create a Diary</DialogTitle>
                    <div className='flex flex-col items-center justify-center gap-8 w-full'>
                        <h1 className='font-semibold text-3xl mt-4'>Create Your <span className='text-pink-500'>Diary</span></h1>

                        <div className='flex flex-col gap-3 w-full'>
                            <Input
                                name='title'
                                placeholder='Title'
                                className="border-2 border-gray-400 rounded-[12px] h-[50px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:border-pink-500"
                                onChange={(e) => (data.current.title = e.target.value)}
                            />
                            <Textarea
                                name='firstName'
                                placeholder='Write something...'
                                className='border-2 border-gray-400 rounded-[12px] h-[200px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:border-pink-500'
                                onChange={(e) => (data.current.postBody = e.target.value)}
                            />
                            <Button className='bg-pink-500 hover:bg-pink-700 rounded-[12px]' onClick={createPost}>
                                Create Diary
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateDiaryModal