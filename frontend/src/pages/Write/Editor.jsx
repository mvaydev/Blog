export default props => {
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