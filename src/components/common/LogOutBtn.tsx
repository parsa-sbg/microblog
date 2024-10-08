import React from 'react'
import { BiLogOut } from 'react-icons/bi'

function LogOutBtn() {
    return (
        <button className='hidden md:flex items-center gap-2 bg-gray-300 dark:bg-gray-700 rounded-full p-2'>
            <BiLogOut />
            log out
        </button>
    )
}

export default LogOutBtn