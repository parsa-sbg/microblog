import React from 'react'
import PostBox from './PostBox/PostBox'
import { useMobileMenu } from '@/contexts/MobileMenuContext'
import PostInterface from '@/types/postType'

type postListProps = {
    posts: PostInterface[],
    noPostMessage: string,
}

function PostList({ posts, noPostMessage }: postListProps) {

    const { isMobileMenuOpen } = useMobileMenu()


    return (
        <div className={`grid grid-cols-12 pr-2 -mr-2 gap-4 overflow-x-scroll custom-scrollbar ${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 xl:col-span-10 rounded-md`}>

            {posts.length

                ? posts.map(post => (
                    <div key={String(post._id)} className="col-span-12 sm:col-span-6"><PostBox user={post.user} body={post.body} /></div>
                ))

                : <div className='h-full col-span-12 flex items-center justify-center'>{noPostMessage}</div>
            }

        </div>
    )
}

export default PostList