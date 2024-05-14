import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { ImPencil } from 'react-icons/im'


const CreateDiaryModal = () => {
    return (
        <Dialog>
            <DialogTrigger className='w-full max-w-xs'>
                <div className='flex items-center gap-2 border-2 border-gray-400 rounded-full px-4 h-[54px] focus-within:border-violet-700'>
                    <ImPencil className='w-7 h-7 text-violet-700 -mr-1'/>
                    <Input
                        className='border-none bg-transparent focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Write something...' />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateDiaryModal