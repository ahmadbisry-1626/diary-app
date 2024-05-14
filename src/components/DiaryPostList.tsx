import React from 'react'
import { FaRegCalendarAlt, FaRegStickyNote } from 'react-icons/fa'
import EditDiaryModal from './EditDiaryModal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DeleteDiaryModal from './DeleteDiaryModal'

const DiaryPostList = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="bg-gray-100 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full">
                <h3 className="text-xl font-medium">Aku suka balap serpong bersama teman-teman</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia perspiciatis ipsam est. Aspernatur nam sed, facilis minima accusamus consequatur beatae sunt ratione sequi, fugiat at amet aliquid rem doloribus ipsum distinctio repudiandae ullam recusandae voluptatibus inventore officiis minus earum. Possimus quia accusamus beatae. Tenetur, ipsum maiores sed possimus ratione eum.</p>

                <div className="flex items-center gap-6 pt-6">
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">18 August 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">12 Notes</span>
                    </div>

                    <EditDiaryModal />
                    <DeleteDiaryModal />
                </div>
            </div>
            <div className="bg-gray-100 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full">
                <h3 className="text-xl font-medium">Aku suka balap serpong bersama teman-teman</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia perspiciatis ipsam est. Aspernatur nam sed, facilis minima accusamus consequatur beatae sunt ratione sequi, fugiat at amet aliquid rem doloribus ipsum distinctio repudiandae ullam recusandae voluptatibus inventore officiis minus earum. Possimus quia accusamus beatae. Tenetur, ipsum maiores sed possimus ratione eum.</p>

                <div className="flex items-center gap-6 pt-6">
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">18 August 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">12 Notes</span>
                    </div>

                    <EditDiaryModal />
                    <DeleteDiaryModal />
                </div>
            </div>
            <div className="bg-gray-100 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full">
                <h3 className="text-xl font-medium">Aku suka balap serpong bersama teman-teman</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia perspiciatis ipsam est. Aspernatur nam sed, facilis minima accusamus consequatur beatae sunt ratione sequi, fugiat at amet aliquid rem doloribus ipsum distinctio repudiandae ullam recusandae voluptatibus inventore officiis minus earum. Possimus quia accusamus beatae. Tenetur, ipsum maiores sed possimus ratione eum.</p>

                <div className="flex items-center gap-6 pt-6">
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">18 August 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">12 Notes</span>
                    </div>

                    <EditDiaryModal />
                    <DeleteDiaryModal />
                </div>
            </div>
            <div className="bg-gray-100 flex flex-col gap-2 p-6 rounded-[12px] shadow-sm w-full">
                <h3 className="text-xl font-medium">Aku suka balap serpong bersama teman-teman</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia perspiciatis ipsam est. Aspernatur nam sed, facilis minima accusamus consequatur beatae sunt ratione sequi, fugiat at amet aliquid rem doloribus ipsum distinctio repudiandae ullam recusandae voluptatibus inventore officiis minus earum. Possimus quia accusamus beatae. Tenetur, ipsum maiores sed possimus ratione eum.</p>

                <div className="flex items-center gap-6 pt-6">
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">18 August 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRegStickyNote className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">12 Notes</span>
                    </div>

                    <EditDiaryModal />
                    <DeleteDiaryModal />
                </div>
            </div>
        </div>
    )
}

export default DiaryPostList