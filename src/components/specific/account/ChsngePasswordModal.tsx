import Cover from '@/components/common/Cover'
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'

type ChsngePasswordModalProps = {
    isModalOpen: boolean,
    setisModalOpen: (isOpen: boolean) => void
}

function ChsngePasswordModal({ isModalOpen, setisModalOpen }: ChsngePasswordModalProps) {

    const [changeStatus, setChangestatus] = useState<'loading' | 'notSent' | 'error' | 'created'>('notSent')
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const [errors, setErrors] = useState({ oldPass: false, newPass: false })

    const closeModal = () => {
        setOldPass('')
        setNewPass('')
        setChangestatus('notSent')
        setErrors({ oldPass: false, newPass: false })
        setisModalOpen(false)
    }

    const changeBtnClickHandler = async () => {
        setChangestatus('loading')
        const res = await fetch('/api/users/changepass', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newPassword: newPass,
                oldPassword: oldPass
            })
        })
        const data = await res.json()

        switch (res.status) {
            case 200: {
                setChangestatus('created')
                setTimeout(() => {
                    closeModal()
                }, 2000);
                break
            }
            case 422: {
                setChangestatus('error')
                setErrors(prev => ({ ...prev, oldPass: true }))
                setTimeout(() => {
                    setChangestatus('notSent')
                }, 1000);
                break
            }
            case 423: {
                setChangestatus('error')
                setErrors(prev => ({ ...prev, newPass: true }))
                setTimeout(() => {
                    setChangestatus('notSent')
                }, 1000);
                break
            }
            case 401: {
                setChangestatus('error')
                setErrors(prev => ({ ...prev, oldPass: true }))
                setTimeout(() => {
                    setChangestatus('notSent')
                }, 1000);
            }


        }
        console.log(res);
        console.log(data);

    }

    return (
        <div className={`${isModalOpen && '!flex'} hidden fixed top-0 bottom-0 left-0 right-0 items-center justify-center`}>

            <div className='bg-bglight dark:bg-bgdark flex flex-col justify-between w-full h-full md:max-w-96 md:h-fit md:gap-5 md:border border-secondarydark md:rounded-md p-3 z-50'>

                <h1 className='text-2xl mb-20 md:mb-0'>change password</h1>


                <form className='flex flex-col gap-2 h-full'>
                    <input value={oldPass} onChange={e => {
                        setOldPass(e.target.value)
                        setErrors(prev => ({ ...prev, oldPass: false }))
                    }} className={`${errors.oldPass && '!border-red-600'} w-full bg-transparent border border-main transition-all focus:border-mainlight rounded-md py-2 px-3 outline-none`} placeholder='old password' type="text" />
                    <input value={newPass} onChange={e => {
                        setNewPass(e.target.value)
                        setErrors(prev => ({ ...prev, newPass: false }))
                    }} className={`${errors.newPass && '!border-red-600'} w-full bg-transparent border border-main transition-all focus:border-mainlight rounded-md py-2 px-3 outline-none`} placeholder='new password' type="text" />
                </form>


                <div className='flex justify-center gap-3'>
                    <button onClick={closeModal} className='max-w-52 w-full py-2 px-5 text-xl bg-gray-300 text-textcolordark rounded-md bg-opacity-70 dark:bg-opacity-30'>cancel</button>
                    <button onClick={changeBtnClickHandler} className={`min-h-full flex justify-center items-center max-w-52 w-full py-2 px-5 text-xl bg-mainlight rounded-md`}>

                        {changeStatus == 'notSent' ? 'change'
                            : changeStatus == 'loading' ? <div className='animate-spin w-3 h-3 rounded-full border-r-2 border-white'></div>
                                : changeStatus == 'error' ? <RxCrossCircled className='text-red-600' />
                                    : changeStatus == 'created' && <FaCheckCircle className='text-green-600' />
                        }
                    </button>
                </div>

            </div>

            <Cover onClick={closeModal}></Cover>
        </div>
    )
}

export default ChsngePasswordModal