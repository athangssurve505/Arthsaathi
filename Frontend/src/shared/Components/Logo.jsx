
import logoIcon from "../../assets/images/logo.webp";

export default function Logo({className}) {
  return (
    <div className={`flex items-center gap-2 select-none ${className} `}>
      <img
        src={logoIcon}
        alt="ArthSathi Logo"
        className="w-12 h-12 object-contain"
      />

      <div className="leading-none">
        <h1
          className="text-[2rem] font-bold tracking-wider"
         > 
          <span className="text-white">Arth</span>
          <span className="text-[#1E7D5A]">Sathi</span>
        </h1>

        <p
          className="mt-1 text-[0.72rem] tracking-wide text-white"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Your AI Financial Companion
        </p>
      </div>
    </div>
  );
}