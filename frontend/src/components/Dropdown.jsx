import { useState } from 'react'
import Dots from '../assets/img/dots.svg'

export default props => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)}>
                <img src={Dots} />
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
