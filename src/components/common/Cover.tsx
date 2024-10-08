import React from 'react'

type coverProps = {
    onClick: () => void,
}

function Cover({ onClick }: coverProps) {
    return (
        <div onClick={onClick} className='fixed bg-black bg-opacity-30 top-0 left-0 w-screen h-screen'>

        </div>
    )
}

export default Cover