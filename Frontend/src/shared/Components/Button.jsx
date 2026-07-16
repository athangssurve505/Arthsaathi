
export default function Button({
  text,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        w-full
        rounded-md
        bg-[#238B57]
        px-6
        text-base
        font-bold
        cursor-pointer
        text-white
        transition-all
        duration-300
        hover:bg-[#1D754A]
        active:scale-[0.98]
        ${className}
      `}
      {...props}
    >
    
{text}
     
    </button>
  );
}