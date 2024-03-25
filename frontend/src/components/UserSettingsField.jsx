import { useState } from "react"

export default (props) => {
    const [isFieldToChange, setIsFieldToChange] = useState(false)

    const handleChangeField = () => {
        setIsFieldToChange(true)
    }

    const cancelChangeField = () => {
        setIsFieldToChange(false)
    }

    return (
        <div className='flex w-full gap-4 justify-between'>
                <p className='align-center'>{props.label}:</p>
                <div className='text-stone-500 w-full'>{
                    isFieldToChange ?
                    props.children :
                    props.valueToDisplay
                }
            </div>
            <button 
                onClick={!isFieldToChange ? handleChangeField : cancelChangeField} 
                className='text-rose-500 flex'>
                {
                    !isFieldToChange ? 'Изменить' : 'Отмена'
                }
            </button>
         </div>
    )
}