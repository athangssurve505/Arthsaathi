import Icon from "../../../../shared/Components/Icon"

function SecurityRow({
  icon,
  title,
  description,
  action,
  danger = false,
  onAction
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-3 py-3 last:border-b-0">

      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            danger ? "bg-red-50" : "bg-blue-50"
          }`}
        >
          <Icon
            name={icon}
            className={danger ? "text-red-500" : "text-blue-600"}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {title}
          </h3>

          <p className="mt-1 text-[12px] text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <button
      onClick={onAction}
        className={`flex items-center gap-2 text-[13px] font-semibold cursor-pointer ${
          danger
            ? "text-red-600 hover:text-red-700"
            : "text-green-700 hover:text-green-800"
        }`}
      >
        {action}
        <Icon name="RiArrowRightSLine" size={14} />
      </button>
    </div>
  );
}

export default SecurityRow;