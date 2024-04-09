import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='h-9 w-9 flex justify-center items-center rounded-full hover:bg-stone-200'>
                <FontAwesomeIcon icon='fa-solid fa-ellipsis-vertical' className='text-xl text-stone-500 hover:text-stone-700'/>
            </button>
            {
                isOpen &&
                <div className='absolute flex flex-col gap-2 w-max bg-white p-2 shadow-sm border'>
                    {props.children}
                </div>
            }
        </div>
    )
}
