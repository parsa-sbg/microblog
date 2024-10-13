import React, { useState } from 'react'
import Cover from '../Cover'
import { useCreatePostModal } from '@/contexts/CreatePostModalContext'
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

type CreatePostModalProps = {
    getPosts?: () => void
}

function CreatePostModal({ getPosts }: CreatePostModalProps) {

    const { isModalOpen, hideCreatePostModal } = useCreatePostModal()
    const [title, setTitlte] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(false)

    const [creationstatus, setCreationstatus] = useState<'loading' | 'notSent' | 'error' | 'created'>('notSent')


    const closeModal = () => {
        setCreationstatus('notSent')
        hideCreatePostModal()
        setBody('')
        setTitlte('')
        setError(false)
    }

    const craetePost = async () => {
        if (body.length < 2) {
            setError(true)
            return
        }
        setCreationstatus('loading')
        const res = await fetch('/api/posts/create', {
            method: "POST",
            body: JSON.stringify({
                title: title ? title : null,
                body,
            })
        })

        if (res.status == 201) {
            setCreationstatus('created')
            if (getPosts) getPosts()
            setTimeout(() => {
                closeModal()
            }, 1000);
        } else {
            setCreationstatus('error')
            setTimeout(() => {
                setCreationstatus('notSent')
            }, 1000);
        }

    }

    return (
        <div className={`${isModalOpen && '!flex'} hidden fixed top-0 bottom-0 left-0 right-0 items-center justify-center`}>

            <div className='bg-bglight dark:bg-bgdark flex flex-col justify-between w-full h-full md:max-w-96 md:h-fit md:gap-5 md:border border-secondarydark md:rounded-md p-3 z-50'>

                <h1 className='text-2xl mb-20 md:mb-0'>create new post</h1>

                <form className='flex flex-col gap-2 h-full'>
                    <input value={title} onChange={e => { setTitlte(e.target.value) }} className='w-full bg-transparent border border-main transition-all focus:border-mainlight rounded-md py-2 px-3 outline-none' placeholder='title (optional)' type="text" />
                    <textarea value={body} onChange={e => {
                        setBody(e.target.value)
                        setError(false)
                    }} className={`${error && '!border-red-600'} w-full bg-transparent border border-main transition-all focus:border-mainlight rounded-md py-2 px-3 outline-none min-h-40`} placeholder='body' />
                </form>

                <div className='flex justify-center gap-3'>
                    <button onClick={closeModal} className='max-w-52 w-full py-2 px-5 text-xl bg-gray-300 text-textcolordark rounded-md bg-opacity-70 dark:bg-opacity-30'>cancel</button>
                    <button onClick={creationstatus == 'notSent' ? craetePost : () => { }} className={`mini-h-full flex justify-center items-center max-w-52 w-full py-2 px-5 text-xl bg-mainlight rounded-md`}>

                        {creationstatus == 'notSent' ? 'create'
                            : creationstatus == 'loading' ? <div className='animate-spin w-3 h-3 rounded-full border-r-2 border-white'></div>
                                : creationstatus == 'error' ? <RxCrossCircled className='text-red-600' />
                                    : creationstatus == 'created' && <FaCheckCircle className='text-green-600' />
                        }



                    </button>
                </div>

            </div>

            <Cover onClick={closeModal}></Cover>
        </div>
    )
}

export default CreatePostModal