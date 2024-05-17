import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import React from 'react'

const PronounsSelect = () => {
    return (
        <Select>
            <SelectTrigger className="h-[50px] md:w-[200px] w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-100 text-gray-500 rounded-[12px] text-[16px]">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                <SelectItem value="light">Dont specify</SelectItem>
                <SelectItem value="dark">He/him</SelectItem>
                <SelectItem value="she">She/her</SelectItem>
                <SelectItem value="they">They/them</SelectItem>
                <SelectItem value="bala">Bala-bala jagung</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default PronounsSelect