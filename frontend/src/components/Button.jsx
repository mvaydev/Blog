export default (props) => {
    return (
    <button 
        className={
            'bg-rose-500 py-1.5 px-4 w-fit rounded-md text-white hover:bg-rose-600'
            + ( props.isFullWidth ? ' w-full' : '')
            + ( props.isSecondary ? ' bg-stone-500 hover:bg-stone-600' : '')
        }
        onClick={() => props.onClickHandler(props.value)}
    >
        {props.children}
    </button>
    )
}
