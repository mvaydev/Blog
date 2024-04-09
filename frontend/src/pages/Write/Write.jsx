import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { create, fetchPost, edit } from '../../api/PostApi'

import Block from '../../layout/Block'
import Button from '../../components/Inputs/Button'

import ChangeMode from './ChangeMode'
import Editor from './Editor'
import Preview from './Preview'

export default () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [isEditorMode, setIsEditorMode] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()

    const handlePublish = () => {
        if(title && content && introduction)
            create(title, content, introduction).then(() => navigate('/'))
    }

    const handleEdit = () => {
        if(id && title && content && introduction)
            edit(id, title, content, introduction).then(() => navigate('/post/' + id))
    }

    useEffect(() => {
        if(id) {
            fetchPost(id).then(res => {
                setTitle(res.title)
                setIntroduction(res.introduction)
                setContent(res.contentMarkdown)
            })
        }
    }, [])

    return (
        <div className='w-full flex justify-center my-4'>

            <Block>
                <h1 className='text-xl font-bold'>
                    {
                        !id ? 'Написать ' : 'Изменить '
                    }
                    пост
                </h1>

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

                <Button onClickHandler={!id ? handlePublish : handleEdit}>
                    {
                        !id ? 'Опубликовать' : 'Изменить'
                    }
                </Button>
            </Block>
        </div>
    )
}
