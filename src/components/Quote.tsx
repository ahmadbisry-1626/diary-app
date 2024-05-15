import React from 'react'
import { BsFillChatSquareQuoteFill } from 'react-icons/bs'
import { IoMdQuote } from 'react-icons/io'

const Quote = () => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-xs pt-2">
            <BsFillChatSquareQuoteFill className="w-12 h-12 text-pink-400" />
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 flex flex-col gap-2 justify-center shadow-sm p-6 w-full max-w-xs rounded-[12px]">
                <p className="text-gray-50 font-medium">
                Dalam pelukan cinta sesama jenis, kita menemukan rumah. Rumah di mana kita bisa menjadi diri sendiri, dicintai, dan mencintai sepenuhnya.
                </p>
            </div>
        </div>
    )
}

export default Quote