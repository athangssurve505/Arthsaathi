import { useEffect, useState } from "react";
import { replace, useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth.service";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("Verifying your email...");

  const token = searchParams.get("token");

  useEffect(() => {
    handleVerifyEmail();
    // eslint-disable-next-line
  }, []);

  const handleVerifyEmail = async () => {
    try {
        const response = await verifyEmail(token);

      setVerified(true);
      setMessage(response.data.message || "Email verified successfully!");

      toast.success("Email verified successfully!");

      setTimeout(() => {
        navigate("/auth");
      }, 3000);
      
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err.message ||
        "Verification failed.";

      setVerified(false);
      setMessage(errorMessage);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Verifying Email
            </h2>

            <p className="mt-2 text-center text-slate-400">
              Please wait while we verify your account.
            </p>
          </div>
        )}

        {/* Success */}
        {!loading && verified && (
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <span className="text-5xl text-green-500">✓</span>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              Email Verified
            </h2>

            <p className="mt-3 text-slate-400">
              {message}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Redirecting to login...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && !verified && (
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
              <span className="text-5xl text-red-500">✕</span>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              Verification Failed
            </h2>

            <p className="mt-3 text-slate-400">
              {message}
            </p>

            <button
              onClick={() => navigate("/auth", { replace: true })}
              className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;