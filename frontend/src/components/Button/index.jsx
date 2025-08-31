const CustomButton = ({ title, onClick, className }) => {
  return (
    <div className="w-[100px]  items-center grid grid-cols-3 sm:grid-cols-2   gap-4  sm-mt-[100px] ">
      <button
        onClick={onClick}
        className={`bg-blue-500  hover:bg-blue-700 mt-[-10px] text-white font-700 rounded ${className} onClick={onClick} w-[100px] h-[30px]`}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
