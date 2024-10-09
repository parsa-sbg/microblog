import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import jwt, { JwtPayload } from 'jsonwebtoken'

type inputsValuesType = {
    name: string,
    username: string,
    password: string
}

type inputsErrorsType = {
    name: boolean,
    username: boolean,
    password: boolean
}

function SignUp() {


    const [inputsValues, setInputsValues] = useState<inputsValuesType>({ name: '', username: '', password: '' })
    const [inputsErrors, setInputsErrors] = useState<inputsErrorsType>({ name: false, username: false, password: false })
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter()


    const inputsChangeHandler = (value: string, slug: 'username' | 'password' | 'name') => {
        setInputsValues(prev => ({ ...prev, [slug]: value }))
        setInputsErrors(prev => ({ ...prev, [slug]: false }))
    }

    const btnClickHandler = async () => {
        let isAnyError = false


        if (!inputsValues.name.trim() || inputsValues.name.length < 3) {
            setInputsErrors(prev => ({ ...prev, name: true }))
            isAnyError = true
        }
        if (!inputsValues.username.trim() || /\s/.test(inputsValues.username.trim())) {
            setInputsErrors(prev => ({ ...prev, username: true }))
            isAnyError = true
        }
        if (!inputsValues.password.trim() || /\s/.test(inputsValues.password.trim())) {
            setInputsErrors(prev => ({ ...prev, password: true }))
            isAnyError = true
        }


        if (isAnyError) return
        setIsLoading(true)



        const res = await fetch('/api/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputsValues.name.trim(),
                username: inputsValues.username.trim(),
                password: inputsValues.password.trim(),
            })
        })

        setIsLoading(false)


        const data = await res.json()

        console.log('res => ', res);
        console.log('data => ', data);

        if (res.status == 422) {
            setInputsErrors(prev => ({ ...prev, [data.targetError]: true }))
        } else if (res.status == 201) {
            router.replace('/')
        }

    }


    return (
        <div className='min-h-screen grid grid-cols-8'>

            <div className='hidden md:flex h-full col-span-5 items-center z-20 '>
                <div className='relative'>
                    <h2 className='pb-10 dark:text-gray-300 text-8xl border-b-2 border-gray-300 border-dashed border-opacity-30'>Roll the Carpet.!</h2>
                    <Link href={'/'} className='group absolute -bottom-5 left-0 dark:bg-bgdark border-[3px] py-2 px-4 dark:border-gray-300 flex items-center gap-2'>
                        <FaArrowLeft className='group-hover:animate-wiggle' />
                        back to home page
                    </Link>
                </div>
            </div>

            <div className='relative m-auto col-span-8 md:col-span-3 h-full w-full max-h-[500px] max-w-96'>
                <div className='flex absolute top-0 bottom-0 right-0 left-0 backdrop-blur-md bg-white dark:bg-transparent !bg-opacity-40 z-20 flex-col justify-center gap-4 h-full border border-opacity-30 rounded-md border-gray-800 dark:border-gray-300 px-5 py-10'>
                    <div className=''>
                        <h1 className='text-2xl'>Register</h1>
                        <span className='text-sm block'>Just some details to get you in.!</span>
                    </div>

                    <input value={inputsValues.name} onChange={(e) => { inputsChangeHandler(e.target.value, 'name') }} className={`${inputsErrors.name && '!border-red-800'} bg-transparent border outline-none focus:border-mainlight transition-all dark:border-gray-300 w-full rounded-md min-h-10 py-1 px-3`} placeholder='name' type="text" />
                    <input value={inputsValues.username} onChange={(e) => { inputsChangeHandler(e.target.value, "username") }} className={`${inputsErrors.username && '!border-red-800'} bg-transparent border outline-none focus:border-mainlight transition-all dark:border-gray-300 w-full rounded-md min-h-10 py-1 px-3`} placeholder='Username' type="text" />
                    <input value={inputsValues.password} onChange={(e) => { inputsChangeHandler(e.target.value, 'password') }} className={`${inputsErrors.password && '!border-red-800'} bg-transparent border outline-none focus:border-mainlight transition-all dark:border-gray-300 w-full rounded-md min-h-10 py-1 px-3`} placeholder='Password' type="text" />

                    <button onClick={btnClickHandler} className='w-full flex justify-center items-center rounded-md bg-main min-h-10'>
                        {isLoading
                            ? (<div className='animate-spin w-3 h-3 rounded-full border-r-2 border-white'></div>)
                            : 'Register'
                        }
                    </button>

                    <p>Already Registered? <Link className='font-semibold' href={'/signin'}>Login</Link></p>

                </div>

                <div className='w-52 h-52 absolute -top-10 -left-20 z-10 bg-main rounded-full'></div>
                <div className='w-40 h-40 absolute -bottom-10 -right-20 bg-main z-10 rounded-full'></div>
            </div>

            <Link href={'/'} className='fixed top-2 left-2 rounded-full p-3 md:hidden z-30 dark:bg-bgdark border-[1px] dark:border-gray-300 flex items-center gap-2'>
                <FaArrowLeft size={20} />
            </Link>
        </div>
    )
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { token } = context.req.cookies
    if (!token) return { props: {} }

    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')


    try {
        jwt.verify(token, secretkey) as JwtPayload

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } catch {
        return {
            props: {}
        }
    }
}