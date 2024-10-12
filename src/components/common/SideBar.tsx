import { useLogOutModal } from '@/contexts/LogOutModalContext';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import UserInterface from '@/types/userType';
import Link from 'next/link';
import React from 'react'
import { FaRegUser } from "react-icons/fa";


type SideBarProps = {
    user: UserInterface | null
}

function SideBar({ user }: SideBarProps) {

    const { isMobileMenuOpen } = useMobileMenu()
    const { showLogOutModal } = useLogOutModal()

    return (
        <div className={`${isMobileMenuOpen && 'translate-x-0 h-full'} absolute py-4 md:p-0 transition-all -translate-x-80 md:static md:!translate-x-0 rounded-md col-span-3 xl:col-span-2`}>
            <aside className={`border-r-2 md:border-2 border-secondarydark rounded-md h-full p-4 min-w-44`}>
                <div className='border-b-2 pb-2 mb-2 flex items-center gap-2'>
                    <div className='bg-gray-300 p-2 rounded-full w-fit dark:bg-gray-700'>
                        <FaRegUser />
                    </div>
                    <span className='font-bold text-gray-300 '>{user ? user.username : 'guest'}</span>
                </div>

                <div className='flex flex-col gap-2 pb-2 mb-2 border-b-2'>
                    <Link href={'/'} className='bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-md transition-all py-1 px-4 hover:bg-gray-400'>home</Link>
                    <Link href={'/userposts'} className='bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-md transition-all py-1 px-4 hover:bg-gray-400'>my posts</Link>
                </div>

                <button onClick={showLogOutModal} className={`${!user && '!hidden'} md:hidden w-full text-left bg-gray-300 dark:bg-gray-700 rounded-md transition-all py-1 px-4 hover:bg-gray-400`}>logout</button>

            </aside>
        </div>

    )
}

export default SideBar