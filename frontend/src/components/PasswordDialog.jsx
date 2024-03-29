import { useState } from 'react'
import { changePassword } from '../api/userApi'
import Button from './Button'
import TextInput from './TextInput'

export default props => {
    const [oldPassword, setOldPassword] = useState('')

    const handleChangePassword = () => {
        if(oldPassword && props.newPassword) {
            changePassword(oldPassword, props.newPassword)
            location.reload()
        }
    }

    const handleCancel = () => {
        location.reload()
    }

    return (
        <div className='w-full h-screen bg-black bg-opacity-60 flex justify-center items-center fixed top-0 left-0'>
            <div className='p-4 rounded-md bg-white shadow-lg flex justify-center flex-col gap-5'>
                <h2 className='text-xl font-bold w-full text-center'>Подтвердите пароль</h2>

                <TextInput 
                    type='password'
                    value={oldPassword}
                    onChangeHandler={setOldPassword}
                />

                <Button onClickHandler={handleChangePassword} isFullWidth>Изменить пароль</Button>
                <Button onClickHandler={handleCancel} isFullWidth isSecondary>Отмена</Button>
            </div>
        </div>
    )
}