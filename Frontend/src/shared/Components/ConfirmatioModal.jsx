import { XCircle } from "lucide-react";
import Button from "./Button";
import useAuthStore from "../../store/auth.store";

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmText = "OK",
  onConfirm,
}) {
  if (!isOpen) return null;

console.log("Modal Shown")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center px-8 py-8">

          {/* Icon */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-9 w-9 text-red-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-3 text-center  leading-relaxed">
            {description}
          </p>

          {/* Button */}
          <Button text={"Login"} className="px-4 py-2 mt-5" onClick={onConfirm}/>
        </div>
      </div>
    </div>
  );
}