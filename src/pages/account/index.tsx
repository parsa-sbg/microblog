import Header from '@/components/common/Header/Header'
import React from 'react'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserInterface from '@/types/userType'
import SideBar from '@/components/common/SideBar'
import LogOutModal from '@/components/common/logout/LogOutModal'
import CreatePostModal from '@/components/common/CreatePostModal/CreatePostModal'
import { connectToDataBase } from '@/utils/db'
import { GetServerSideProps } from 'next'
import { userModel } from '@/models/userModel'
import AccountDetails from '@/components/specific/account/AccountDetails'
import LoginRegisterBtns from '@/components/common/Header/LoginRegisterBtns'
import { useMobileMenu } from '@/contexts/MobileMenuContext'

type AccountProps = {
    user: UserInterface | null
}

function Account({ user }: AccountProps) {

    const { isMobileMenuOpen } = useMobileMenu()


    return (
        <div className="h-screen pt-[56.96px] md:pt-[60.96px] container">

            <Header user={user} />

            <div className="h-full py-4 gap-4 grid grid-cols-12 grid-rows-1 relative">

                <SideBar user={user} />

                {user
                    ? <AccountDetails user={user} />
                    : <div className={`flex flex-col items-center justify-center ${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 xl:col-span-10`}>
                        <span className='mb-2'>You are not logged in yet.</span>
                        <LoginRegisterBtns />
                    </div>
                }

            </div>
            <LogOutModal />
            <CreatePostModal />
        </div>
    )
}

export default Account


export const getServerSideProps: GetServerSideProps = async (context) => {
    connectToDataBase()


    const { token } = context.req.cookies
    if (!token) return { props: { user: null } }


    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')

    try {
        const decoded = jwt.verify(token, secretkey) as JwtPayload
        const user = await userModel.findOne({ username: decoded.username })


        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
            }
        }
    } catch {
        return {
            props: {
                user: null,
            }
        }
    }
}