import { useState } from 'react'
import { create } from '../../api/commentApi'
import Button from '../Inputs/Button'
import Block from '../../layout/Block'

export default props => {
    const [content, setContent] = useState('')

    const handleSubmitComment = () => {
        if(content) {
            create(props.postId, content).then(() => location.reload())
        }
    }

    return (
        <Block>
            <h2 className='font-bold text-xl'>Оставить комментарий</h2>
            <div className='flex gap-3'>
                <textarea
                    type='text'
                    className='
                    border border-stone-300 rounded-md
                    p-1.5 w-full h-32
                    shadow-xs
                    placeholder:font-light
                    focus:text-black
                    focus:outline-none
                    focus:shadow-sm resize-none
                    focus:shadow-slate-300
                    focus:border-slate-500'
                    onChange={e => setContent(e.target.value)}
                    value={content}
                    maxLength={450}
                    placeholder='Напишите, что думаете...'
                />
                <p className='w-20 text-right'>
                    {content.length + ' / 450'}
                </p>
            </div>

            <Button onClickHandler={handleSubmitComment}>Отправить</Button>
        </Block>
    )
}