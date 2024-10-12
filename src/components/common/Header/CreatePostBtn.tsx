import { useCreatePostModal } from '@/contexts/CreatePostModalContext'
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'

function CreatePostBtn() {
    const {showCreatePostModal} = useCreatePostModal()
    return (
        <button onClick={showCreatePostModal} className='flex items-center gap-2 dark:text-gray-300 text-main font-bold bg-gray-300 dark:bg-gray-700 rounded-md p-2'>
            <CiCirclePlus strokeWidth={1} size={25} />
            create
        </button>
    )
}

export default CreatePostBtn