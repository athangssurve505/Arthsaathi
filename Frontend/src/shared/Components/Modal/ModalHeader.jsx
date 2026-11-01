import Icon from "../Icon";

export default function ModalHeader({
  icon,
  title,
  description,
  onClose,
  iconClassName = " text-emerald-600",
}) {
  return (
    <div className="flex items-start justify-between border-b border-gray-200 p-6">

      <div className="flex gap-4 p-2">

        <div
          className={`
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-full
            bg-emerald-50
            ${iconClassName}
          `}
        >
          <Icon name={icon}  />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>

      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-900"
      >
        <Icon name="RiCloseLine" className= {"cursor-pointer"} />
      </button>

    </div>
  );
}