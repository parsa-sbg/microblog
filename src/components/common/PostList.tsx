import React, { useState } from 'react'
import PostBox from './PostBox/PostBox'
import { useMobileMenu } from '@/contexts/MobileMenuContext'
import PostInterface from '@/types/postType'
import { LuRefreshCw } from "react-icons/lu";


type postListProps = {
    posts: PostInterface[],
    noPostMessage: string,
    pageTitle: string,
    getPosts: () => void
}

function PostList({ posts, noPostMessage, pageTitle, getPosts }: postListProps) {

    const { isMobileMenuOpen } = useMobileMenu()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const refreshClickHandler = () => {
        setIsRefreshing(true)
        getPosts()
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000);
    }

    return (
        <div className={`pr-2 -mr-2 overflow-x-scroll custom-scrollbar ${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 xl:col-span-10 rounded-md`}>

            <div className='max-h-fit row-span-1 col-span-12 mb-4 border-2 border-secondarydark p-3 rounded-md flex justify-between items-center'>
                <h1 className='font-bold text-xl'>{pageTitle}</h1>
                <div onClick={refreshClickHandler} className={`${isRefreshing && 'animate-spin'} cursor-pointer`}><LuRefreshCw size={25} /></div>
            </div>

            <div className='grid grid-cols-12 gap-4 row-span-11'>
                {posts.length

                    ? posts.map(post => (
                        <div key={String(post._id)} className="col-span-12 sm:col-span-6"><PostBox user={post.user} body={post.body} /></div>
                    ))

                    : <div className='h-full col-span-12 flex items-center justify-center'>{noPostMessage}</div>
                }
            </div>

        </div>
    )
}

export default PostList