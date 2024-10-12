import Link from 'next/link'
import React from 'react'

function LoginRegisterBtns() {
    return (
        <div>
            <Link href={'/signin'} className=' inline-block transition-all hover:scale-105 hover:-translate-x-0.5 font-bold bg-gray-300 dark:bg-gray-700 rounded-l-md p-2 mr-0.5'>sign in</Link>
            <Link href={'/signup'} className=' inline-block transition-all hover:scale-105 hover:translate-x-0.5 font-bold bg-gray-300 dark:bg-gray-700 rounded-r-md p-2'>sign up</Link>
        </div>)
}

export default LoginRegisterBtns