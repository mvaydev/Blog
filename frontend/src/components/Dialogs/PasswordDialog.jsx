import { useState } from 'react'
import Button from '../Inputs/Button'
import TextInput from '../Inputs/TextInput'

export default props => {
    const [oldPassword, setOldPassword] = useState('')

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

                <Button onClickHandler={() => props.handlePassword(oldPassword)} isFullWidth>Подтвердить</Button>
                <Button onClickHandler={handleCancel} isFullWidth isSecondary>Отмена</Button>
            </div>
        </div>
    )
}