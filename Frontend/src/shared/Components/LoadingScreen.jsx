import { BounceLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071A1A]">
      <div className="flex flex-col items-center gap-5">
        <BounceLoader
          color="#2E8B57"
          size={70}
        />

        <div className="text-center">
          <h2 className="text-white text-xl font-semibold">
            ArthSaathi
          </h2>

          <p className="text-gray-400 text-sm mt-1">
           Loading...
          </p>
        </div>
      </div>
    </div>
  );
}