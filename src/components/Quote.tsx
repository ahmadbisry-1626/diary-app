import React from 'react'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs'
import { IoMdQuote } from 'react-icons/io'

const Quote = () => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-xs pt-2">
            <BsFillChatSquareQuoteFill className="w-12 h-12 text-violet-600" />
            <div className="bg-gradient-to-r from-violet-600 to-purple-700 flex flex-col gap-2 justify-center shadow-sm p-6 w-full max-w-xs rounded-[12px]">
                <p className="text-gray-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, sit laborum distinctio voluptates beatae harum accusantium? Necessitatibus deleniti ut eius.
                </p>
            </div>
        </div>
    )
}

export default Quote