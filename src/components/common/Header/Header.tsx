import React from 'react'
import Logo from '../Logo';
import LogOutBtn from '../logout/LogOutBtn';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import UserInterface from '@/types/userType';
import LoginRegisterBtns from './LoginRegisterBtns';
import CreatePostBtn from './CreatePostBtn';

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
                    <CreatePostBtn />
                ) : (
                    // login / register btns
                    <LoginRegisterBtns />
                )}

            </div>
        </div>

    )
}

export default Header