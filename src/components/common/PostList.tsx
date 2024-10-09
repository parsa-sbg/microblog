import React from 'react'
import PostBox from './PostBox/PostBox'
import { useMobileMenu } from '@/contexts/MobileMenuContext'

function PostList() {

    const { isMobileMenuOpen } = useMobileMenu()


    return (
        <div className={`grid grid-cols-12 pr-2 -mr-2 gap-4 overflow-x-scroll custom-scrollbar ${isMobileMenuOpen && 'translate-x-[180px]'} transition-all md:!translate-x-0 col-span-12 h-full row-span-2 md:col-span-9 xl:col-span-10 rounded-md`}>

            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>
            <div className="col-span-12 sm:col-span-6"><PostBox /></div>

        </div>)
}

export default PostList