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
import { RiDeleteBin6Line } from 'react-icons/ri'

interface DeleteProps {
    handleDelete: (postId: string) => void,
    postId: string
}

const DeleteDiaryModal = ({ handleDelete, postId }: DeleteProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="flex items-center gap-2 group text-red-600 hover:text-red-800 transition duration-300">
                    <RiDeleteBin6Line className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
                    <span className=''>Delete</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
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
                        <button className='text-red-600' onClick={() => handleDelete(postId)}>Delete</button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteDiaryModal