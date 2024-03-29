export default (props) => {
    return (
        <>
            {
                props.label && (
                    <label className='text-sm font-medium text-stone-600'>
                        {props.label}
                    </label>
                )
            }
            <input 
                type={props.type} 
                className='
                    border 
                    border-stone-300 
                    rounded-md 
                    p-1.5 w-fit
                    text-stone-600
                    shadow-xs
                    placeholder:font-light
                    focus:text-black  
                    focus:outline-none 
                    focus:shadow-sm 
                    focus:shadow-slate-300 
                    focus:border-slate-500'
                onChange={e => props.onChangeHandler(e.target.value)}
                value={props.value}
                placeholder={props.placeholder}
            />
        </>
    )
}
