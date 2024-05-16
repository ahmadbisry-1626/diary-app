"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Backend_URL } from '@/lib/constants'
import { toast } from 'sonner'
import { Note } from '@/interface'
import { deleteNote, fetchNotes } from '@/actions/note'
import { FaRegCalendarAlt, FaRegStickyNote } from 'react-icons/fa'
import DeleteNote from './DeleteNote'
import { useTheme } from 'next-themes'

interface CreateNoteProps {
    noteVisible: boolean
    postId: string
    userId: string
}

type FormInput = {
    noteBody: string;
    userId: string;
    postId: string
}

const CreateNoteForm = ({ noteVisible, postId, userId }: CreateNoteProps) => {
    const [note, setIsNote] = useState<Note[]>([])
    const [deletedNote, isDeleteNote] = useState(note)

    useEffect(() => {
        const fetchNoteList = async () => {
            const noteData = await fetchNotes()
            setIsNote(noteData)
        }

        fetchNoteList()
    }, [])

    const handleDelete = async (id: string) => {
        await deleteNote(id)
        isDeleteNote(deletedNote.filter((note) => note.id !== id));
        toast.success('Note deleted successfully')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        window.location.href = `/post/${postId}`
    }

    const createNote = async () => {
        if (!data.current.noteBody) {
            return toast.error('Note body cannot be empty')
        }

        if(data.current.noteBody.length < 5) {
            return toast.error('Note body must be at least 5 characters')
        }

        try {
            const res = await fetch(Backend_URL + "/note", {
                method: "POST",
                body: JSON.stringify({
                    noteBody: data.current.noteBody,
                    userId: userId,
                    postId: postId
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            if (!res.ok) {
                alert('Failed to create note')
                return
            }

            const response = await res.json()
            toast.success('Note created successfully')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            window.location.reload()
        } catch (err: unknown) {
            console.error(err)
        }
    }

    const data = useRef<FormInput>({
        noteBody: "",
        userId: "",
        postId: ""
    })

    const [mounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return null; // Atau Anda bisa menampilkan loading state di sini
    }


    const isDark = resolvedTheme === 'dark'

    return (
        <>
            <div className='flex flex-col items-end gap-2'>
                <Textarea
                    placeholder='Type note...'
                    className={`h-36 focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[12px] border-gray-400 border-2 ${noteVisible ? 'opacity-100 mb-0' : 'opacity-0 h-0 -mb-20'} transition-all duration-300 focus-within:border-pink-500 ${isDark && 'border-none bg-gray-50 text-black placeholder:text-gray-500'}`}
                    onChange={(e) => (data.current.noteBody = e.target.value)} />
                <Button className={`w-max rounded-[12px] bg-pink-400 hover:bg-pink-600 z-30 ${noteVisible ? 'opacity-100 mb-10' : 'opacity-0'} ${isDark && '!bg-gray-50 hover:!bg-gray-400'}`} onClick={createNote}>
                    Add note
                </Button>
            </div>
            <div className='flex flex-col gap-2 -mt-10 z-20'>
                <span className='text-[18px] font-semibold'>All {note.filter((note) => note.postId === postId).length} note(s)</span>

                <div className='flex flex-col gap-4'>
                    {note.filter((note) => note.postId === postId).map((note) => {
                        const date = new Date(note.createdAt);
                        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                        const formattedDate = date.toLocaleDateString('id-ID', options);
                        return (

                            <div key={note.id} className={`bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 rounded-[12px] p-4 flex flex-col gap-6 ${isDark && '!bg-gradient-to-r !from-zinc-900 !to-zinc-800'}`}>
                                <div className='flex items-start gap-4'>
                                    <FaRegStickyNote className={`w-6 h-6 text-gray-700 ${isDark && '!text-gray-50'}`} />
                                    <h2 className={`text-gray-700 w-full ${isDark && '!text-gray-50'}`}>{note.noteBody}</h2>
                                </div>

                                <div className="flex items-center md:gap-6 gap-4 ml-10 flex-wrap">
                                    <div className='flex items-center gap-[6px]'>
                                        <span className='text-gray-400'>Added at  </span>
                                        <span className="text-gray-400">
                                            {formattedDate}
                                        </span>
                                    </div>

                                    <DeleteNote handleDelete={handleDelete} noteId={note.id}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CreateNoteForm