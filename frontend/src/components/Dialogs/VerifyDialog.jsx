import { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import { verify } from '../../api/userApi'
import Button from '../Inputs/Button'
import TextInput from '../Inputs/TextInput'

export default observer(props => {
    const [code, setCode] = useState('')
    const { userStore } = useContext(Context)

    const handleVerification = () => {
        verify(props.id, code).then(() => {
            userStore.isVerify = true
        })
    }

    const handleCancel = () => {
        location.reload()
    }

    return (
        <div className='w-full h-screen bg-black bg-opacity-60 flex justify-center items-center fixed top-0 left-0 z-40'>
            <div className='p-4 rounded-md bg-white shadow-lg flex justify-center flex-col gap-5'>
                <TextInput
                    type='number'
                    value={code}
                    onChangeHandler={setCode}
                />

                <Button onClickHandler={handleVerification} isFullWidth>Подтвердить</Button>
                <Button onClickHandler={handleCancel} isFullWidth isSecondary>Отмена</Button>
            </div>
        </div>
    )
})