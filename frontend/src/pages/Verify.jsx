import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../main';
import Block from '../components/Block'

export default observer(() => {
    const {userStore} = useContext(Context)
    const {state} = useLocation()
    const navigate = useNavigate()
    const [code, setCode] = useState('')

    useEffect(() => {
        if(!state || !state.callbackName || !state.callbackParams) 
            navigate(-1)
    }, [])

    const handleVerification = () => {
        userStore.verify(code).then(() => {
            userStore[state.callbackName](...state.callbackParams)
        })

        navigate('/')
    }

    return (
        <Block header='Подтверждение'>
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
        </Block>
    )
})