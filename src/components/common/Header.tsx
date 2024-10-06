import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import Logo from './Logo';
import LogOutBtn from './LogOutBtn';


function Header() {


    return (
        <div className='fixed left-0 right-0 top-0 md:rounded-md md:right-3 md:left-3 md:top-1 bg-main min-h-14'>
            <div className='container py-2 px-4 flex justify-between items-center gap-2'>

                <div className='flex items-center gap-2 md:gap-5'>

                    <div className=' w-7 h-7 md:hidden cursor-pointer flex flex-col gap-0.5 items-center justify-center'>
                        <div className='bg-black h-1 w-5 rounded-full'></div>
                        <div className='bg-black h-1 w-5 rounded-full'></div>
                        <div className='bg-black h-1 w-5 rounded-full'></div>
                    </div>

                    <LogOutBtn />

                    <Logo />

                </div>


                <button className='flex items-center gap-2 text-main font-bold bg-gray-300 rounded-full p-2'>
                    <CiCirclePlus strokeWidth={1} size={25} />
                    create
                </button>

            </div>
        </div>

    )
}

export default Header