import { useState } from "react"

export default (props) => {
    const [value, setValue] = useState(props.defaultValue)

    return (
        <div className='flex flex-col gap-1.5 w-fit'>
            <input 
                type={props.inputType} 
                className='border border-stone-400 rounded-md text-base p-1 w-fit'
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder={props.placeholder}
            />

            <button 
                className='bg-rose-500 py-1 px-4 w-full rounded-md text-white hover:bg-rose-600'
                onClick={() => props.clickHandler(value)}
            >
                Изменить
            </button>
        </div>
    )
}