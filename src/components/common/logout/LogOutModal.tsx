import { useLogOutModal } from '@/contexts/LogOutModalContext'
import React from 'react'
import Cover from '../Cover'
import { useRouter } from 'next/router'

function LogOutModal() {

    const { isModalOpen, hideLogOutModal } = useLogOutModal()

    const route = useRouter()

    const logOut = async () => {
        const res = await fetch('/api/users/logout')
        const data = await res.json()

        console.log(res);
        console.log(data);

        if (res.status == 200) route.reload()
    }

    return (
        <div className={`${isModalOpen && '!flex'} hidden fixed top-0 left-0 bottom-0 right-0  w-screen h-screen flex-col items-center justify-center`}>
            <div className="w-52  dark:bg-bgdark bg-bglight p-3 border-2 z-[200000] rounded-md border-black">
                <span className='mb-3 block'>LogOut ?</span>
                <div className='flex items-center justify-between w-full gap-3'>
                    <button onClick={hideLogOutModal} className='w-full bg-gray-300 dark:bg-gray-600 transition-all rounded-md py-1 px-4 hover:bg-gray-700'>cancel</button>
                    <button onClick={logOut} className='w-full bg-red-600 transition-all rounded-md py-1 px-4 hover:bg-red-700 '>yes</button>
                </div>
            </div>
            <Cover onClick={hideLogOutModal} />
        </div>
    )
}

export default LogOutModal