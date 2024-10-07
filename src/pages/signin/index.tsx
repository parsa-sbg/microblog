import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";


function SignIn() {
    return (
        <div className='min-h-screen grid grid-cols-8'>

            <div className='hidden md:flex h-full col-span-5 items-center z-20 '>
                <div className='relative'>
                    <h2 className='pb-10 dark:text-gray-300 text-8xl border-b-2 border-gray-300 border-dashed border-opacity-30'>Welcome Back .!</h2>
                    <Link href={'/'} className='group absolute -bottom-5 left-0 dark:bg-bgdark border-[3px] py-2 px-4 dark:border-gray-300 flex items-center gap-2'>
                        <FaArrowLeft className='group-hover:animate-wiggle' />
                        back to home page
                    </Link>
                </div>
            </div>

            <div className='relative m-auto col-span-8 md:col-span-3 h-full w-full max-h-[500px] max-w-96'>
                <div className='flex absolute top-0 bottom-0 right-0 left-0 backdrop-blur-md z-20 flex-col justify-center gap-4 h-full border border-opacity-30 rounded-md border-gray-300 px-5 py-10'>
                    <div className=''>
                        <h1 className='text-2xl'>Login</h1>
                        <span className='text-sm block'>Glad you’re back.!</span>
                    </div>

                    <input className='bg-transparent border outline-none focus:border-mainlight transition-all dark:border-gray-300 w-full rounded-md min-h-10 py-1 px-3' placeholder='Username' type="text" />
                    <input className='bg-transparent border outline-none focus:border-mainlight transition-all dark:border-gray-300 w-full rounded-md min-h-10 py-1 px-3' placeholder='Password' type="text" />

                    <button className='w-full rounded-md bg-gradient-to-r from-mainlight from-10% to-90% min-h-10 to-secondarydark'>Login</button>

                    <p>Don’t have an account ? <Link className='font-semibold' href={'/signup'}>Signup</Link></p>

                </div>

                <div className='w-52 h-52 absolute -top-10 -left-20 z-10 bg-gradient-to-t from-main to-secondarydark rounded-full'></div>
                <div className='w-40 h-40 absolute -bottom-10 -right-20 bg-gradient-to-tl from-main to-secondarydark z-10 rounded-full'></div>
            </div>

            <Link href={'/'} className='fixed top-2 left-2 rounded-full p-3 md:hidden z-30 dark:bg-bgdark border-[3px] dark:border-gray-300 flex items-center gap-2'>
                <FaArrowLeft size={20} />
            </Link>
        </div>
    )
}

export default SignIn