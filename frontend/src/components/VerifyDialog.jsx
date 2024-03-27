import { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'
import { verify } from '../api/userApi'

export default observer(params => {
    const [code, setCode] = useState('')
    const { userStore } = useContext(Context)

    const handleVerification = () => {
        verify(params.id, code).then(() => {
            userStore.isVerify = true
        })
    }

    return (
        <div className='w-full h-screen bg-black bg-opacity-60 flex justify-center items-center fixed top-0 left-0'>
            <div className='p-4 rounded-md bg-white shadow-lg flex justify-center flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-stone-800'>Код подтверждения</label>
                    <input 
                        type='number' 
                        className='border border-stone-400 rounded-md text-base p-1'
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                    />
                </div>

                <button 
                    className='bg-rose-500 py-1.5 rounded-md text-white hover:bg-rose-600'
                    onClick={handleVerification} 
                >
                    Подтвердить
                </button>
            </div>
        </div>
    )
})