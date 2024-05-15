"use client"


import { deletePost, fetchPosts } from '@/actions/post'
import DeleteDiaryModal from '@/components/DeleteDiaryModal'
import EditDiaryModal from '@/components/EditDiaryModal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Post } from '@/interface'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { FaCircle, FaRegCalendarAlt, FaRegStickyNote } from 'react-icons/fa'
import { toast } from 'sonner'

interface PostProps {
    params: {
        id: string
    }
}

const page = ({ params }: PostProps) => {
    const { data: session } = useSession()
    const { id } = params
    const [post, setPost] = useState<Post[]>([]);
    const [postDelete, setPostDelete] = useState(post)
    const [noteVisible, setIsNoteVisible] = useState(false)

    useEffect(() => {
        const fetchPostList = async () => {
            const postData = await fetchPosts()
            setPost(postData)
        }

        fetchPostList()
    }, [])

    const handleDelete = async (id: string) => {
        await deletePost(id)
        setPostDelete(postDelete.filter((post) => post.id !== id));
        toast.success('Post deleted successfully')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        window.location.href = '/'
    }

    return (
        <div className='min-h-screen flex justify-center items-center wrapper pt-36'>
            {post.length > 0 ? (
                <>
                    {session && session.user ? (
                        <>
                            {post.filter((post) => post.id === id).map((post) => {
                                const date = new Date(post.createdAt);
                                const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                                const formattedDate = date.toLocaleDateString('id-ID', options);

                                return (
                                    <div key={post.id} className='max-w-2xl'>
                                        {post.userId === session.user.id ? (
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex flex-col gap-2'>
                                                    <h1 className='text-xl font-medium'>{post.title}</h1>
                                                    <p className='text-gray-500'>{post.postBody}</p>
                                                </div>

                                                <div className='flex items-center justify-between mt-4'>
                                                    <div className='flex items-center gap-6'>
                                                        <div className="flex items-center gap-2">
                                                            <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                                                            <span className="text-gray-500">
                                                                {formattedDate}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                                                            <span className="text-gray-500">12 Notes</span>
                                                        </div>

                                                        <EditDiaryModal postTitle={post.title} postBody={post.postBody} postId={post.id} />
                                                        <DeleteDiaryModal handleDelete={handleDelete} postId={post.id} />
                                                    </div>

                                                    {post.updatedAt !== post.createdAt && (
                                                        <div className='flex items-center gap-2'>
                                                            <span className='text-gray-500'>Edited</span>
                                                            <FaCircle className='w-2 h-2 text-gray-400' />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Separator className='bg-gray-400' />
                                                    <button className='w-max z-20 font-medium hover:text-gray-500 transition duration-300' onClick={() => {
                                                        if (!noteVisible) {
                                                            setIsNoteVisible(true)
                                                        } else {
                                                            setIsNoteVisible(false)
                                                        }
                                                    }}>
                                                        Add some notes?
                                                    </button>
                                                    <div className='flex flex-col items-end gap-2'>
                                                        <Textarea placeholder='Type note...' className={`h-36 focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[12px] border-gray-400 border-2 ${noteVisible ? 'opacity-100 mb-0' : 'opacity-0 h-0 -mb-20'} transition-all duration-300 focus-within:border-violet-600 `} />
                                                        <Button className={`w-max rounded-[12px] ${noteVisible ? 'opacity-100' : 'opacity-0'}`}>Add note</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <h1 className='text-4xl'>Not found</h1>
                                        )}
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        null
                    )}
                </>
            ) : (
                <h1 className='text-2xl'>Loading...</h1>
            )}


        </div>
    )
}

export default page