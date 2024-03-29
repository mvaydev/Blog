import { useState } from 'react'
import TextInput from './TextInput'
import Button from './Button'

export default (props) => {
    const [value, setValue] = useState(props.defaultValue)

    return (
        <div className='flex gap-1.5 w-full justify-between'>
            <TextInput 
                type={props.inputType}
                placeholder={props.placeholder}
                value={value}
                onChangeHandler={setValue}
            />

            <Button value={value} onClickHandler={props.onClickHandler}>Изменить</Button>
        </div>
    )
}