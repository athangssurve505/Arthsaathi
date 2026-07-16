import Icon from "./Icon";

export default function InputField({
  label,
  type = "text",
  className = "",
  icon,
  id,
  error,
  ...rest
}) {
  const styles = {
    container: "flex flex-col gap-2 ",

    label: "text-md font-bold text-black max-sm:text-sm",

    wrapper: "relative flex items-center",

    input:
      "w-full h-12 rounded-lg font-bold border-2 border-gray-300 px-4 text-md outline-none transition-all duration-200 focus:border-black max-sm:text-sm",

    inputWithIcon: "pl-11",

    icon:
      "absolute left-3 flex items-center justify-center  pointer-events-none text-yellow",
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.wrapper}>
        {icon && <Icon name={icon} className={`${styles.icon} text-[#0E8B5D] max-sm:w-5  max-sm:h-5 `}/>}

        <input
          id={id}
          type={type}
          className={`${styles.input} ${
            icon ? styles.inputWithIcon : ""
          } ${className}`}
          {...rest}
        />
        
      </div>
      {error && <p className="text-red-500 text-md font-bold">{`* ${error}`}</p>}
    </div>
  );
}