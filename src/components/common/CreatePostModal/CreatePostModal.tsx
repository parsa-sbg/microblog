import React from 'react'
import Cover from '../Cover'
import { useCreatePostModal } from '@/contexts/CreatePostModalContext'
import LoginRegisterBtns from '../Header/LoginRegisterBtns'

type CreatePostModalProps = {
    userId: string | null | undefined
}

function CreatePostModal({ userId }: CreatePostModalProps) {

    const { isModalOpen, hideCreatePostModal } = useCreatePostModal()


    return (
        <div className={`${isModalOpen && '!flex'} hidden fixed top-0 bottom-0 left-0 right-0 items-center justify-center`}>

            <div className='bg-bglight dark:bg-bgdark flex flex-col justify-between w-full h-full md:max-w-96 md:h-fit md:gap-5 md:border border-secondarydark md:rounded-md p-3 z-50'>

                {userId
                    ? (
                        <>
                            <h1 className='text-2xl mb-20 md:mb-0'>create new post</h1>

                            <form className='flex flex-col gap-2 h-full'>
                                <input className='w-full bg-transparent border border-main transition-all focus:border-mainlight rounded-md py-2 px-3 outline-none' placeholder='title (optional)' type="text" />
                                <textarea className='w-full bg-transparent border border-main transition-all focus:border-mainlight rounded-md py-2 px-3 outline-none min-h-40' placeholder='body' />
                            </form>

                            <div className='flex items-center justify-center gap-3'>
                                <button onClick={hideCreatePostModal} className='max-w-52 w-full py-2 px-5 text-xl bg-gray-300 text-textcolordark rounded-md bg-opacity-70 dark:bg-opacity-30'>cancel</button>
                                <button className='max-w-52 w-full py-2 px-5 text-xl bg-mainlight rounded-md'>create</button>
                            </div>
                        </>
                    )
                    : <div>
                        <span className='mb-3'>You are not logged in yet.</span>
                        <LoginRegisterBtns />
                    </div>
                }

            </div>

            <Cover onClick={hideCreatePostModal}></Cover>
        </div>
    )
}

export default CreatePostModal