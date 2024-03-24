import { useState } from "react"

export default () => {
    const [email, setEmail] = useState('')

    return (
        <div className='flex flex-col gap-1.5 w-fit'>
            <input 
                type='email' 
                className='border border-stone-400 rounded-md text-base p-1 w-fit'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                maxLength={256}
                placeholder='Новая почта'
            />

            <button className='bg-rose-500 py-1 px-4 w-full rounded-md text-white hover:bg-rose-600'>
                Изменить
            </button>
        </div>
    )
}