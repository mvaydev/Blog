export default props => {
    return (
        <fieldset className='flex'>
            <div className='h-fit'>
                <input
                    type='radio'
                    id='edit'
                    className='peer/edit hidden'
                    name='isEditorMode'
                    onChange={() => props.setIsEditorMode(true)}
                    defaultChecked
                />

                <label
                    htmlFor='edit'
                    className='
                        bg-stone-100
                        block text-center
                        border border-r-0 rounded-l-md
                        px-4 py-1.5 w-full
                        hover:bg-white
                        peer-checked/edit:bg-white
                        peer-checked/edit:text-rose-500'
                >
                    Редактировать
                </label>
            </div>

            <div className='h-fit'>
                <input
                    type='radio'
                    id='preview'
                    className='peer/preview hidden'
                    name='isEditorMode'
                    onChange={() => props.setIsEditorMode(false)}
                />

                <label
                    htmlFor='preview'
                    className='
                        bg-stone-100
                        block text-center
                        border border-l-0 rounded-r-md
                        px-4 py-1.5 w-full
                        hover:bg-white
                        peer-checked/preview:bg-white
                        peer-checked/preview:text-rose-500'
                >
                    Предпросмотр
                </label>
            </div>
        </fieldset>
    )
}