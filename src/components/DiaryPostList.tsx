"use client"

import React, { useEffect, useState } from 'react'
import { FaRegCalendarAlt, FaRegStickyNote } from 'react-icons/fa'
import EditDiaryModal from './EditDiaryModal'
import DeleteDiaryModal from './DeleteDiaryModal'
import { deletePost, fetchPosts } from '../actions/post';
import { Post } from '@/interface'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'

const DiaryPostList = () => {
    const { data: session } = useSession()

    const [post, setPost] = useState<Post[]>([]);
    const [postDelete, setPostDelete] = useState(post)

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
        await new Promise((resolve) => setTimeout(resolve, 1500))
        window.location.reload()
    }

    return (
        <div className='flex flex-col gap-4'>
            {post.length > 0 ? (
                <>
                    {post.filter((post) => session?.user.id === post.userId).map((post) => (
                        <div className="bg-gray-100 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full" key={post.id}>
                            <Link href={`/post/${post.id}`} className="text-xl font-medium">{post.title}</Link>
                            <p>{post.postBody}</p>

                            <div className="flex items-center gap-6 pt-6">
                                <div className="flex items-center gap-2">
                                    <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-500">18 August 2024</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-500">12 Notes</span>
                                </div>

                                <EditDiaryModal />
                                <DeleteDiaryModal handleDelete={handleDelete} postId={post.id} />
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <Skeleton key={index} className="bg-gray-300 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full">
                            <Skeleton className="w-30 h-6 bg-gray-200" />
                            <Skeleton className="w-30 h-10 bg-gray-200" />

                            <div className="flex items-center gap-6 pt-6">
                                <Skeleton className="w-40 h-6 bg-gray-200" />
                                <Skeleton className="w-30 h-6 bg-gray-200" />
                                <Skeleton className="w-20 h-6 bg-gray-200" />
                                <Skeleton className="w-20 h-6 bg-gray-200" />
                            </div>
                        </Skeleton>
                    ))}
                </>
            )}

        </div>
    )
}

export default DiaryPostList