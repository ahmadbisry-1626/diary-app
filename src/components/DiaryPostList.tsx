"use client"

import React, { useEffect, useState } from 'react'
import { FaCircle, FaRegCalendarAlt, FaRegStickyNote } from 'react-icons/fa'
import EditDiaryModal from './EditDiaryModal'
import DeleteDiaryModal from './DeleteDiaryModal'
import { deletePost, fetchPosts } from '../actions/post';
import { Note, Post } from '@/interface'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import { fetchNotes } from '@/actions/note'
import { useTheme } from 'next-themes'

const DiaryPostList = () => {
    const { data: session } = useSession()

    const [post, setPost] = useState<Post[]>([]);
    const [postDelete, setPostDelete] = useState(post)
    const [note, setIsNote] = useState<Note[]>([])

    useEffect(() => {
        const fetchNoteList = async () => {
            const noteData = await fetchNotes()
            setIsNote(noteData)
        }

        fetchNoteList()
    }, [])

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
        window.location.reload()
    }

    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                {[0, 1, 2].map((index) => (
                    <Skeleton key={index} className="bg-gray-200 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full mt-[18px]">
                        <Skeleton className="w-30 h-6 bg-gray-100" />
                        <Skeleton className="w-30 h-10 bg-gray-100" />

                        <div className="flex items-center gap-6 pt-6">
                            <Skeleton className="w-40 h-6 bg-gray-100" />
                            <Skeleton className="w-30 h-6 bg-gray-100" />
                            <Skeleton className="w-20 h-6 bg-gray-100" />
                            <Skeleton className="w-20 h-6 bg-gray-100" />
                        </div>
                    </Skeleton>
                ))}
            </>
        )
    }


    const isDark = resolvedTheme === 'dark'

    return (
        <div className='flex flex-col gap-4'>
            {post.length > 0 ? (
                <>
                    {post.filter((post) => session?.user.id === post.userId).map((post) => {
                        const date = new Date(post.createdAt);
                        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                        const formattedDate = date.toLocaleDateString('id-ID', options);

                        return (
                            <div className={`bg-gray-50 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full hover:shadow-md transition-all duration-300 ${isDark && 'bg-gradient-to-l from-zinc-900 to-zinc-800'}`} key={post.id}>
                                <Link href={`/post/${post.id}`} className="md:text-xl text-lg font-medium">
                                    {post.title}
                                </Link>
                                <p className={`${isDark && 'text-gray-400'}`}>{post.postBody}</p>

                                <div className="flex md:items-center items-end md:justify-between gap-6 pt-6">
                                    <div className='flex items-center gap-6 flex-wrap'>
                                        <div className="flex items-center gap-2">
                                            <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                                            <span className="text-gray-500">
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                                            <span className="text-gray-500">
                                                {note.filter((note) => note.postId === post.id).length} Note(s)
                                            </span>
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
                            </div>
                        )
                    })}
                </>
            ) : (
                <>
                    {[0, 1, 2].map((index) => (
                        <Skeleton key={index} className="bg-gray-200 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full">
                            <Skeleton className="w-30 h-6 bg-gray-100" />
                            <Skeleton className="w-30 h-10 bg-gray-100" />

                            <div className="flex items-center gap-6 pt-6">
                                <Skeleton className="w-40 h-6 bg-gray-100" />
                                <Skeleton className="w-30 h-6 bg-gray-100" />
                                <Skeleton className="w-20 h-6 bg-gray-100" />
                                <Skeleton className="w-20 h-6 bg-gray-100" />
                            </div>
                        </Skeleton>
                    ))}
                </>
            )}

            {/* {post.filter((post) => post.userId === session?.user.id).length === 0 && (
                <div className='flex items-center justify-center h-60 rounded-[12px] gap-4 bg-gray-200'>
                    <h1 className='text-3xl font-semibold'>No post found</h1>
                </div>
            )} */}

        </div>
    )
}

export default DiaryPostList