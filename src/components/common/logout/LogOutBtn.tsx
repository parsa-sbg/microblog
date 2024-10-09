import { useLogOutModal } from '@/contexts/LogOutModalContext'
import React from 'react'
import { BiLogOut } from 'react-icons/bi'

function LogOutBtn() {

    const { showLogOutModal } = useLogOutModal()

    return (
        <div className='z-50'>
            <button onClick={showLogOutModal} className='hidden md:flex items-center gap-2 bg-gray-300 dark:bg-gray-700 rounded-md p-2'>
                <BiLogOut />
                log out
            </button>
        </div>
    )
}

export default LogOutBtn