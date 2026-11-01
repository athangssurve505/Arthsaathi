export default function Modal({
 
  children,
  maxWidth = "max-w-2xl",

}) {
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">

      <div
        className={`
          w-full
          ${maxWidth}
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-xl
          p-2
        `}
      >
        {children}
      </div>

    </div>
  );
}