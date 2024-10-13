import { useMobileMenu } from '@/contexts/MobileMenuContext'
import UserInterface from '@/types/userType'
import React, { useState } from 'react'
import { FaCheckCircle, FaRegUser } from 'react-icons/fa'
import { LuRefreshCw } from 'react-icons/lu'
import { RxCrossCircled } from 'react-icons/rx'


type AccountDetailsProps = {
    user: UserInterface,
    getMe: () => void,
    setIsChangePassModalOpen: (isOpen: boolean) => void
}

function AccountDetails({ user, getMe, setIsChangePassModalOpen }: AccountDetailsProps) {

    const [name, setName] = useState(user?.name)
    const [username, setUsername] = useState(user?.username)
    const [editInfoStatus, setEditInfoStatus] = useState<'notSent' | 'editmode' | 'loading' | 'success' | 'error'>('notSent')

    const { isMobileMenuOpen } = useMobileMenu()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const refreshClickHandler = () => {
        getMe()
        setIsRefreshing(true)
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000);
    }

    const activeEditMode = () => {
        setEditInfoStatus('editmode')
    }

    const cancelBtnClickHandler = () => {
        setEditInfoStatus('notSent')
        setName(user.name)
        setUsername(user.username)
    }

    const updateUser = async () => {
        setEditInfoStatus('loading')
        const res = await fetch('/api/users/update', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                name
            })
        })
        const data = await res.json()
        console.log(data);


        if (res.status == 200) {
            setEditInfoStatus('success')
        } else {
            setEditInfoStatus('error')
            setName(user.name)
            setUsername(user.username)
        }

        getMe()

        setTimeout(() => {
            setEditInfoStatus('notSent')
        }, 1000);

    }

    return (
        <div className={`overflow-x-scroll custom-scrollbar ${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 xl:col-span-10 rounded-md`}>

            <div className='max-h-fit row-span-1 col-span-12 mb-4 border-2 border-secondarydark p-3 rounded-md flex justify-between items-center'>
                <h1 className='font-bold text-xl'>your account</h1>
                <div className='flex items-center gap-5'>
                    <button onClick={() => {setIsChangePassModalOpen(true)}} className='bg-gray-300 dark:bg-gray-700 px-2 py-0.5 text-sm rounded-md hover:bg-gray-400 transition-all hover:!bg-opacity-50'>change password</button>
                    <div onClick={refreshClickHandler} className={`${isRefreshing && 'animate-spin'} cursor-pointer`}><LuRefreshCw size={25} /></div>
                </div>
            </div>

            <div className='flex flex-col gap-4'>

                <div className='mx-auto md:mx-0 bg-gray-300 p-10 rounded-full w-fit dark:bg-gray-700'>
                    <FaRegUser size={50} />
                </div>

                <div className='flex flex-col md:flex-row gap-5 items-center md:items-end flex-wrap'>

                    <div className='flex flex-col gap-1 max-w-60'>
                        <span className='font-semibold'>name</span>
                        <input className='bg-transparent border border-main py-2 px-4 rounded-md outline-none read-only:text-gray-500 read-only:cursor-not-allowed'
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                            readOnly={editInfoStatus !== 'editmode'}
                            type="text" />
                    </div>

                    <div className='flex flex-col gap-1 max-w-60'>
                        <span className='font-semibold'>username</span>
                        <input className='bg-transparent border border-main py-2 px-4 rounded-md outline-none read-only:text-gray-500 read-only:cursor-not-allowed'
                            value={username}
                            onChange={e => { setUsername(e.target.value) }}
                            readOnly={editInfoStatus !== 'editmode'}
                            type="text" />
                    </div>

                    <div className='flex gap-1 max-w-60'>
                        <button onClick={cancelBtnClickHandler} className={`${editInfoStatus !== 'notSent' && '!block'} hidden max-w-52 w-full py-1 px-2 bg-gray-300 text-textcolordark rounded-md bg-opacity-70 dark:bg-opacity-30`}>cancel</button>
                        <button
                            onClick={editInfoStatus == 'editmode' ? updateUser : activeEditMode}
                            className='bg-green-500 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-900 transition-colors min-h-10 py-2 px-4 rounded-md outline-none'>
                            {editInfoStatus == 'notSent'
                                ? 'change infos'
                                : editInfoStatus == 'editmode' ? 'submit'
                                    : editInfoStatus == 'loading' ? <div className='animate-spin w-3 h-3 rounded-full border-r-2 border-white'></div>
                                        : editInfoStatus == 'success' ? <FaCheckCircle className='text-green-600' />
                                            : editInfoStatus == 'error' && <RxCrossCircled className='text-red-600' />
                            }

                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AccountDetails