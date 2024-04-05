import markdownit from 'markdown-it'
import mdClass from 'markdown-it-class'

export default props => {
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