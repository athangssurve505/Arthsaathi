import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    borderRadius: "10px",
                },
                success: {
                    iconTheme: {
                        primary: "#22c55e",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#fff",
                    },
                },
            }}
        />
    );
};

export default ToastProvider;