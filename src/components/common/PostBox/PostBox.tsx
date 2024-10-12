import UserInterface from '@/types/userType'
import React from 'react'
import { FaRegUser } from 'react-icons/fa'

type postBoxProps = {
    title?: string,
    body: string,
    user: UserInterface
}

function PostBox({ body, user }: postBoxProps) {
    

    return (
        <div className='flex flex-col p-3 gap-2 border-secondary border rounded-md h-full min-h-20 max-h-52'>
            <div>
                <div className='flex items-center gap-2'>
                    <div className='bg-gray-300 p-2 rounded-full w-fit dark:bg-gray-700'>
                        <FaRegUser />
                    </div>
                    <span className='font-bold text-gray-300 '>{user?.username}</span>
                </div>
            </div>
            <div className=' w-full text-sm sm:text-base line-clamp-3 lg:line-clamp-4'>
                {body}
            </div>
        </div>
    )
}

export default PostBox