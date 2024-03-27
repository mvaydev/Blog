import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Block from '../components/Widget'
import { changePassword } from '../api/userApi'

export default () => {
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const navigate = useNavigate()

    const handleChangePassword = () => {
        changePassword(oldPassword, newPassword)
        .then(() => navigate('/settings'))
    }

    return (
        <Block header='Вход'>
            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-stone-800'>Старый пароль</label>
                <input 
                    type='password' 
                    className='border border-stone-400 rounded-md text-base p-1'
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-stone-800'>Новый пароль</label>
                <input 
                    type='password' 
                    className='border border-stone-400 rounded-md text-base p-1'
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                />
            </div>

            <button 
                className='bg-rose-500 py-1.5 rounded-md text-white hover:bg-rose-600'
                onClick={handleChangePassword}  
            >
                Изменить
            </button>
        </Block>
    )
}