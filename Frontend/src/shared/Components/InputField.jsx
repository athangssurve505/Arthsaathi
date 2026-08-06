import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const styles = {
    container: "flex flex-col gap-2",

    label: "text-md font-bold text-black max-sm:text-sm",

    wrapper: "relative flex items-center",

    input:
      "w-full h-12 rounded-lg font-bold border-2 border-gray-300 px-4 text-md outline-none transition-all duration-200 focus:border-black transition-all duration-200 max-sm:text-sm",

    inputWithLeftIcon: "pl-11",

    inputWithRightIcon: "pr-11",

    leftIcon:
      "absolute left-3 flex items-center justify-center pointer-events-none text-[#0E8B5D]",

    rightIcon:
      "absolute right-3 flex items-center justify-center cursor-pointer text-gray-500 hover:text-black transition-colors",
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.wrapper}>
        {icon && (
          <Icon
            name={icon}
            className={`${styles.leftIcon} max-sm:w-5 max-sm:h-5`}
          />
        )}

        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          className={`
            ${styles.input}
            ${icon ? styles.inputWithLeftIcon : ""}
            ${isPassword ? styles.inputWithRightIcon : ""}
            ${className}
          `}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.rightIcon}
            tabIndex={-1}
          >
            <Icon
              name={showPassword ? "RiEyeOffLine" : "RiEyeLine"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-md font-bold wrap-break-word">
          * {error}
        </p>
      )}
    </div>
  );
}