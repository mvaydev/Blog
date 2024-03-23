import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Block from '../components/Block'
import { Context } from '../main';

export default observer(() => {
    const [code, setCode] = useState('')
    const {userStore} = useContext(Context)

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
                onClick={() => {
                    userStore.verify(code)
                    navigate('/')
                }} 
            >
                Подтвердить
            </button>

            <span className='text-center text-sm'>
                Нет аккаунта? 
                {' '}
                <Link to="/registration" className='text-rose-500'>Зарегистрироваться</Link>
            </span>
        </Block>
    )
})