import ConfirmationModal from "../shared/Components/ConfirmatioModal"

export default function Dashboard() {
  return (
             <ConfirmationModal
    open={true}
    title="Session Expired"
    description="Your session has expired. Please login again to continue using ArthSaathi."
    confirmText="Login"
    // onConfirm={handleLogin}
/>
  )
}
