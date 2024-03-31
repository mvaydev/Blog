import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from '../api/PostApi'
import Block from '../layout/Block'
import Button from '../components/Button'

export default () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const handlePublish = () => {
        // TODO: Add redirect to user's posts section
        if(title && content) create(title, content).then(() => navigate('/'))
    }

    return (
        <div className='w-full flex justify-center mt-4 mb-8 max-h-screen'>
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
