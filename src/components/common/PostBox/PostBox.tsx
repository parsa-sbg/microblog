import React from 'react'
import { FaRegUser } from 'react-icons/fa'

function PostBox() {
    return (
        <div className='flex flex-col p-3 gap-2 border-secondary border rounded-md'> 
            <div>
                <div className='flex items-center gap-2'>
                    <div className='bg-gray-300 p-2 rounded-full w-fit dark:bg-gray-700'>
                        <FaRegUser />
                    </div>
                    <span className='font-bold text-gray-300 '>parsa</span>
                </div>
            </div>
            <div className=' w-full text-sm sm:text-base line-clamp-3 lg:line-clamp-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, soluta.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, et exercitationem commodi vel laboriosam cumque quasi in quo repudiandae iure omnis eaque, fugiat dolore nobis blanditiis, eveniet sed dolorem.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, qui eos necessitatibus quo voluptas rem voluptate aspernatur maxime vel earum?
            </div>
        </div>
    )
}

export default PostBox