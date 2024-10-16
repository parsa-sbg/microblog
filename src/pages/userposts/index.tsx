import Header from '@/components/common/Header/Header'
import SideBar from '@/components/common/SideBar'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import jwt, { JwtPayload } from 'jsonwebtoken'
import LogOutModal from '@/components/common/logout/LogOutModal'
import UserInterface from '@/types/userType'
import { userModel } from '@/models/userModel'
import PostList from '@/components/common/PostList'
import { postModel } from '@/models/postModel'
import PostInterface from '@/types/postType'
import { useMobileMenu } from '@/contexts/MobileMenuContext'
import LoginRegisterBtns from '@/components/common/Header/LoginRegisterBtns'
import CreatePostModal from '@/components/common/CreatePostModal/CreatePostModal'
import { connectToDataBase } from '@/utils/db'

type userPostsProps = {
    user: UserInterface | null,
    userPosts: PostInterface[]
}

export default function UserPosts({ user, userPosts }: userPostsProps) {

    const { isMobileMenuOpen } = useMobileMenu()
    const [posts, setPosts] = useState(userPosts)


    const getUserPosts = async () => {
        const res = await fetch('/api/posts/userposts')
        const data = await res.json()
        setPosts(data.posts)
    }

    return (
        <div className="h-screen pt-[56.96px] md:pt-[60.96px] container">

            <Header user={user} />

            <div className="h-full py-4 gap-4 grid grid-cols-12 grid-rows-1 relative">

                <SideBar user={user} />

                {user
                    ? <PostList getPosts={getUserPosts} pageTitle='your posts' noPostMessage='you have no posts ! create one .' posts={posts} />
                    : <div className={`flex flex-col items-center justify-center ${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 xl:col-span-10`}>
                        <span className='mb-2'>You are not logged in yet.</span>
                        <LoginRegisterBtns />
                    </div>
                }

            </div>
            <LogOutModal />
            <CreatePostModal getPosts={getUserPosts} />

        </div>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {


    const { token } = context.req.cookies
    if (!token) return { props: { user: null } }


    const secretkey = process.env.PRIVATEKEY
    if (!secretkey) throw new Error('privete key is not defined')

    try {

        connectToDataBase()
        const decoded = jwt.verify(token, secretkey) as JwtPayload
        const user = await userModel.findOne({ username: decoded.username })

        // get user posts
        const userPosts = await postModel.find({ user: user?._id }).populate('user').sort({ createdAt: -1 })

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                userPosts: JSON.parse(JSON.stringify(userPosts))
            }
        }
    } catch {
        return {
            props: {
                user: null
            }
        }
    }
}