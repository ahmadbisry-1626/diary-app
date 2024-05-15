"use client"

import React, { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { LuPencilLine } from 'react-icons/lu';
import { Backend_URL } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

type FormInput = {
    title: string;
    postBody: string;
    userId: string;
}

interface EditPostProps {
    postTitle: string;
    postBody: string;
    postId: string;
}


const EditDiaryModal = ({ postTitle, postBody, postId }: EditPostProps) => {
    const { data: session } = useSession()

    const editPost = async () => {
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
            const res = await fetch(Backend_URL + `/post/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    title: data.current.title,
                    postBody: data.current.postBody,
                    userId: session?.user.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!res.ok) {
                alert('Failed to update post')
                return
            }

            const response = await res.json()
            toast.success('Post updated successfully')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            window.location.reload()
        } catch (err: unknown) {
            console.error(err)
        }
    }


    const data = useRef<FormInput>({
        title: `${postTitle}`,
        postBody: `${postBody}`,
        userId: ''
    })
    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-2 group text-pink-500 hover:text-pink-700 transition duration-300">
                    <LuPencilLine className="w-5 h-5 group-hover:-translate-x-1 transition duration-300" />
                    <span className=''>Edit</span>
                </div>
            </DialogTrigger>
            <DialogContent className='!w-full max-w-[550px]'>
                <DialogHeader>
                    <DialogTitle>Edit Diary</DialogTitle>
                    <div className='flex flex-col items-center justify-center gap-8 w-full'>
                        <h1 className='font-semibold text-3xl mt-4'>Edit Your <span className='text-pink-500'>Diary</span> Post</h1>

                        <div className='flex flex-col gap-3 w-full'>
                            <Input
                                name='title'
                                defaultValue={postTitle}
                                placeholder='Title'
                                className="border-2 border-gray-400 rounded-[12px] h-[50px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:border-pink-500"
                                onChange={(e) => (data.current.title = e.target.value)}
                            />
                            <Textarea
                                name='firstName'
                                defaultValue={postBody}
                                placeholder='Write something...'
                                className='border-2 border-gray-400 rounded-[12px] h-[200px] focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:border-pink-500'
                                onChange={(e) => (data.current.postBody = e.target.value)}
                            />
                            <Button className='bg-pink-500 hover:bg-pink-700 rounded-[12px]' onClick={editPost}>
                                Edit Diary
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default EditDiaryModal