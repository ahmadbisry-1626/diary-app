"use client"


import { fetchNotes } from '@/actions/note'
import { deletePost, fetchPosts } from '@/actions/post'
import CreateNoteForm from '@/components/CreateNoteForm'
import DeleteDiaryModal from '@/components/DeleteDiaryModal'
import EditDiaryModal from '@/components/EditDiaryModal'
import { Separator } from '@/components/ui/separator'
import { Note, Post } from '@/interface'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
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
        window.location.href = '/'
    }

    const { resolvedTheme} = useTheme()

    const isDark = resolvedTheme === 'dark'

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
                                    <div key={post.id} className='max-w-2xl w-full'>
                                        {post.userId === session.user.id ? (
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex flex-col gap-2'>
                                                    <h1 className='text-xl font-medium'>{post.title}</h1>
                                                    <p className={`text-gray-500 ${isDark && '!text-gray-400'}`}>{post.postBody}</p>
                                                </div>

                                                <div className='flex md:items-center items-end md:justify-between mt-4'>
                                                    <div className='flex items-center gap-6 flex-wrap'>
                                                        <div className="flex items-center gap-2">
                                                            <FaRegCalendarAlt className={`w-5 h-5 text-gray-500 ${isDark && '!text-gray-400'}`} />
                                                            <span className={`text-gray-500 ${isDark && '!text-gray-400'}`}>
                                                                {formattedDate}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaRegStickyNote className={`w-5 h-5 text-gray-500 ${isDark && '!text-gray-400'}`} />
                                                            <span className={`text-gray-500 ${isDark && '!text-gray-400'}`}>
                                                                {note.filter((note) => note.postId === id).length} Note(s)
                                                            </span>
                                                        </div>

                                                        <EditDiaryModal postTitle={post.title} postBody={post.postBody} postId={post.id} />
                                                        <DeleteDiaryModal handleDelete={handleDelete} postId={post.id} />
                                                    </div>

                                                    {post.updatedAt !== post.createdAt && (
                                                        <div className='flex items-center gap-2'>
                                                            <span className={`text-gray-500 ${isDark && '!text-gray-400'}`}>Edited</span>
                                                            <FaCircle className={`w-2 h-2 text-gray-400 ${isDark && '!text-gray-400'}`} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Separator className={`bg-gray-400 ${isDark && '!text-gray-400'}`} />
                                                    <button className='w-max z-20 font-medium hover:text-gray-500 transition duration-300' onClick={() => {
                                                        if (!noteVisible) {
                                                            setIsNoteVisible(true)
                                                        } else {
                                                            setIsNoteVisible(false)
                                                        }
                                                    }}>
                                                        Add some notes?
                                                    </button>
                                                    <CreateNoteForm noteVisible={noteVisible} postId={id} userId={post.userId}/>
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