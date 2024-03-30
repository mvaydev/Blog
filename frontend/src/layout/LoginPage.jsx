import React from 'react'
import Logo from '../assets/img/logo.svg'

export default (props) => {
    return (
        <div className='w-full h-screen bg-stone-100 flex justify-center items-center fixed top-0'>
            <div className='p-4 rounded-md bg-white shadow-lg flex justify-center flex-col gap-5'>
                <div className='flex justify-center'>
                    <img src={Logo} />
                </div>
                <h1 className='text-2xl font-bold text-center'>{props.header}</h1>

                {props.children}

            </div>
        </div>
    )
}