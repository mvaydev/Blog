import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from '../api/PostApi'
import Block from '../layout/Block'
import Button from '../components/Button'
import markdownit from 'markdown-it'
import mdClass from 'markdown-it-class'

function Editor(props) {
    return (
        <>
            <div className='flex gap-3 items-center'>
                <input
                    type='text'
                    className='
                    border border-stone-300 rounded-md
                    p-1.5 w-full h-max
                    shadow-xs
                    placeholder:font-light
                    focus:text-black
                    focus:outline-none
                    focus:shadow-sm
                    focus:shadow-slate-300
                    focus:border-slate-500'
                    onChange={e => props.setTitle(e.target.value)}
                    value={props.title}
                    placeholder='Название вашего поста'
                    maxLength={250}
                />
                <p className='w-20 text-right'>
                    {props.title.length + ' / 250'}
                </p>
            </div>

            <div className='flex gap-3'>
                <textarea
                    type='text'
                    className='
                    border border-stone-300 rounded-md
                    p-1.5 w-full h-max
                    shadow-xs
                    placeholder:font-light
                    focus:text-black
                    focus:outline-none
                    focus:shadow-sm
                    focus:shadow-slate-300
                    focus:border-slate-500'
                    onChange={e => props.setIntroduction(e.target.value)}
                    value={props.introduction}
                    placeholder='Вступление'
                    maxLength={450}
                />
                <p className='w-20 text-right'>
                    {props.introduction.length + ' / 450'}
                </p>
            </div>

            <p className='text-sm text-stone-600'>Для форматирования используйте синтксис Markdown</p>
            <textarea className='
                border border-stone-300 rounded-md
                p-1.5 w-full min-h-32
                shadow-xs
                placeholder:font-light
                focus:text-black
                focus:outline-none
                focus:shadow-sm
                focus:shadow-slate-300
                focus:border-slate-500
                font-mono leading-tight'
                placeholder='Основной текст'
                onChange={e => props.setContent(e.target.value)}
                value={props.content}
            ></textarea>
        </>
    )
}

function Preview(props) {
    const mapping = {
        h1: 'md-h1',
        h2: 'md-h2',
        h3: 'md-h3',
        h4: 'md-h4',
        h5: 'md-h5',
        h6: 'md-h6',
        a: 'md-link',
        img: 'md-img',
        hr: 'md-hr'
    }

    const md = markdownit( {
        html: false,
        typographer: true,
        linkify: true,
        breaks: true
    }).use(mdClass, mapping)

    const html = md.render(props.content)

    return (
        <>
            <h1 className='text-xl font-bold'>{props.title}</h1>
            {props.introduction}
            <div
                dangerouslySetInnerHTML={{__html: html}}
                className='flex flex-col gap-2'
            >
            </div>
        </>
    )
}

function ChangeMode(props) {
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

export default () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [isEditorMode, setIsEditorMode] = useState(true)
    const navigate = useNavigate()

    const handlePublish = () => {
        if(title && content)
            create(title, content, introduction).then(() => navigate('/'))
    }

    return (
        <div className='w-full flex justify-center my-4'>

            <Block>
                <h1 className='text-xl font-bold'>Написать пост</h1>

                <ChangeMode setIsEditorMode={setIsEditorMode} />

                {
                    isEditorMode
                    ?
                    <Editor {...{
                        title, setTitle,
                        content, setContent,
                        introduction, setIntroduction
                    }} />
                    :
                    <Preview {...{
                        title,
                        content,
                        introduction
                    }} />
                }

                <Button onClickHandler={handlePublish}>Опубликовать</Button>
            </Block>
        </div>
    )
}
