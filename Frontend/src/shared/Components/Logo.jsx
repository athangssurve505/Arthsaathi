
import logoIcon from "../../assets/images/logo.webp";

export default function Logo({className,logoClassName,subpara, isOpen , secondText}) {
  return (
    <div className={`flex items-center gap-2 select-none ${className} justify-center `}>
      <img
        src={logoIcon}
        alt="ArthSathi Logo"
        className="w-10 h-10 object-contain"
      />

      {isOpen && <div className="leading-none">
        <h1
          className="text-[1.5rem] font-bold tracking-wider"
         > 
          <span className={`${logoClassName}`}>Arth</span>
          <span className={`${secondText} text-[#1E7D5A]`}>Saathi</span>
        </h1>

        <p
          className={`mt-1 text-[0.72rem] tracking-wide ${subpara}`}
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Your AI Financial Companion
        </p>
      </div>}
    </div>
  );
}