import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import Logo from './Logo';
import LogOutBtn from './logout/LogOutBtn';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import UserInterface from '@/types/userType';
import Link from 'next/link';

type headerProps = {
    user: UserInterface | null
}

function Header({ user }: headerProps) {

    const { toggleMobileMenu, isMobileMenuOpen } = useMobileMenu()

    return (
        <div className='fixed left-0 right-0 top-0 md:rounded-md md:right-3 md:left-3 md:top-1 dark:bg-main min-h-14'>
            <div className='container py-2 px-4 flex justify-between items-center gap-2'>

                <div className='flex items-center gap-2 md:gap-5'>

                    <div
                        onClick={() => { toggleMobileMenu() }}
                        className=' w-7 h-7 md:hidden cursor-pointer flex flex-col gap-0.5 items-center justify-center'>
                        <div className={`${isMobileMenuOpen && 'translate-y-[6px] rotate-45'} transition-all bg-black h-1 w-5 rounded-full`}></div>
                        <div className={`${isMobileMenuOpen && 'opacity-0'} transition-all bg-black h-1 w-5 rounded-full`}></div>
                        <div className={`${isMobileMenuOpen && '-translate-y-[6px] -rotate-45'} transition-all bg-black h-1 w-5 rounded-full`}></div>
                    </div>

                    {user && <LogOutBtn />}

                    <Logo />

                </div>


                {user ? (
                    // create new post btn
                    <button className='flex items-center gap-2 dark:text-gray-300 text-main font-bold bg-gray-300 dark:bg-gray-700 rounded-md p-2'>
                        <CiCirclePlus strokeWidth={1} size={25} />
                        create
                    </button>
                ) : (
                    // login / register btns
                    <div>
                        <Link href={'/signin'} className=' inline-block transition-all hover:scale-105 hover:-translate-x-0.5 font-bold bg-gray-300 dark:bg-gray-700 rounded-l-md p-2 mr-0.5'>sign in</Link>
                        <Link href={'/signup'} className=' inline-block transition-all hover:scale-105 hover:translate-x-0.5 font-bold bg-gray-300 dark:bg-gray-700 rounded-r-md p-2'>sign up</Link>
                    </div>
                )}

            </div>
        </div>

    )
}

export default Header