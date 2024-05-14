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
                <div className='flex items-center gap-2 border-2 border-gray-400 rounded-full px-4 h-[54px] focus-within:border-violet-700'>
                    <ImPencil className='w-7 h-7 text-violet-700 -mr-1' />
                    <Input
                        className='border-none bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Write something...' />
                </div>
            </DialogTrigger>
            <DialogContent className='!w-full max-w-[550px]'>
                <DialogHeader>
                    <DialogTitle>Create a Diary</DialogTitle>
                    <div className='flex flex-col items-center justify-center gap-8 w-full'>
                        <h1 className='font-semibold text-3xl mt-4'>Create Your <span className='text-violet-600'>Diary</span></h1>

                        <div className='flex flex-col gap-3 w-full'>
                            <Input
                                name='title'
                                placeholder='Title'
                                className="border-2 border-gray-400 rounded-[12px] h-[50px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:border-violet-700"
                                onChange={(e) => (data.current.title = e.target.value)}
                            />
                            <Textarea
                                name='firstName'
                                placeholder='Write something...'
                                className='border-2 border-gray-400 rounded-[12px] h-[200px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:border-violet-700'
                                onChange={(e) => (data.current.postBody = e.target.value)}
                            />
                            <Button className='bg-violet-600 hover:bg-violet-800 rounded-[12px]' onClick={createPost}>
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