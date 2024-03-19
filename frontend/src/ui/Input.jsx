import React from 'react'

export default function Input(props) {
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-stone-800'>{props.label}</label>
            <input type={props.type} className='border border-stone-400 rounded-md text-base p-1'/>
        </div>
    )
}
