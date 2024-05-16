import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteNoteProps {
    handleDelete: (noteId: string) => void,
    noteId: string
}

const DeleteNote = ({ noteId, handleDelete }: DeleteNoteProps) => {

    const resolvedTheme = localStorage.getItem('theme')

    const isDark = resolvedTheme === 'dark'

    return (
        <AlertDialog>
            <AlertDialogTrigger className='text-red-600 hover:text-red-800'>
                Delete note
            </AlertDialogTrigger>
            <AlertDialogContent className={`${isDark && 'border-none'}`}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <button className='' onClick={() => handleDelete(noteId)}>Delete</button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteNote