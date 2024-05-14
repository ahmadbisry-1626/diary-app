import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RiEdit2Line } from 'react-icons/ri'



const EditDiaryModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-2 text-violet-600 hover:text-violet-800 transition duration-300 group">
                    <RiEdit2Line className="w-5 h-5 group-hover:-translate-x-1 transition duration-300" />
                    <span className=''>Edit</span>
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

export default EditDiaryModal