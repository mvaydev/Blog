import { useState } from 'react'
import { create } from '../api/PostApi'
import Block from '../layout/Block'
import Button from '../components/Button'

export default () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handlePublish = () => {
        if(title && content) create(title, content)
    }

    return (
        <div className='w-full flex justify-center mt-8'>
            <Block>
                <h1 className='text-xl font-bold'>Написать пост</h1>
                <div className='flex gap-3 items-center'>
                    <input 
                        type='text' 
                        className='
                            border 
                            border-stone-300 
                            rounded-md 
                            p-1.5 w-full
                            shadow-xs
                            placeholder:font-light
                            focus:text-black  
                            focus:outline-none 
                            focus:shadow-sm 
                            focus:shadow-slate-300 
                            focus:border-slate-500'
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        placeholder='Название вашего поста'
                        maxLength={250}
                    />
                    <p className='w-20 text-right'>
                        {title.length + ' / 250'} 
                    </p>
                </div>

                <textarea className='
                     border 
                    border-stone-300 
                    rounded-md 
                    p-1.5 w-full
                    shadow-xs
                    placeholder:font-light
                    focus:text-black  
                    focus:outline-none 
                    focus:shadow-sm 
                    focus:shadow-slate-300 
                    focus:border-slate-500'
                    placeholder='Поделитесь мыслями с миром...'
                    onChange={e => setContent(e.target.value)}
                    value={content}
                ></textarea>
                <Button onClickHandler={handlePublish}>Опубликовать</Button>
            </Block>
        </div>
    )
}
