
const CustomButton = ({title, onClick, className}) => {
    return (
        <button className={ `bg-blue-500 hover:bg-blue-700 mt-[-10px] text-white font-700 rounded ${className} onClick={onClick} w-[100px] h-[30px]`} >
            {title}
        </button>
    )
}

export default CustomButton;