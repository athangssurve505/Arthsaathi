import Modal from "../../../../shared/Components/Modal/Modal";
import ModalFooter from "../../../../shared/Components/Modal/ModalFooter";
import ModalHeader from "../../../../shared/Components/Modal/ModalHeader";
import Button from "../../../../shared/Components/Button"
import InputField from "../../../../shared/Components/InputField"


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {changePasswordSchema} from "../../../../features/auth/authSchema"
import { changeUserPassword } from "../../../../services/user.service";
import toast from "react-hot-toast";

export default function ChangePasswordModal({isOpen , onClose}) {
     const {
        register,
        handleSubmit,
        formState:{errors}
      } = useForm({resolver:zodResolver(changePasswordSchema)})


   async function onSubmit(data) {
  const res = await toast.promise(changeUserPassword(data), {
      loading: "Changing Password...",
      success: "Password Changed Successfully!",
      error: (err) => err.response?.data?.message || "Something went wrong",
    });
    
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Modal>
    {/* Header */}
   <ModalHeader
  icon="RiLockLine"
  title="Change Password"
  description="Update your password to keep your account secure."
  onClose={onClose}
/>

{/* Main Part */}
<form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-5">
    {/* Current Passoword */}
<InputField label={"Current Password: "} icon={"RiLockLine"} placeholder={"Enter your current password"}{...register("currentPassword")} error={errors.currentPassword?.message} type={"password"}/>

    {/*New Password */}
<InputField label={"New Password: "} icon={"RiLockLine"} placeholder={"Enter your new password"}{...register("newPassword")} error={errors.newPassword?.message} type={"password"}/>

    {/*Confirm New Password */}
<InputField label={"Confirm New Password: "} icon={"RiLockLine"} placeholder={"Confirm your new password"}{...register("confirmNewPassword")} error={errors.confirmNewPassword?.message} type={"password"}/>
    

     {/* Footer */}
<ModalFooter>
     <Button text={"Change Password"} className="px-4 py-2" type={"submit"}/>
</ModalFooter>

</form>



    </Modal>
  )
}
