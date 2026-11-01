import InputField from "../../../shared/Components/InputField";
import Button from "../../../shared/Components/Button"
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../services/auth.service";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { loginSchema } from "../authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../../../store/auth.store";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({resolver:zodResolver(loginSchema)})

  // Login store
  const login = useAuthStore((state) => state.login);
  const accessToken = useAuthStore((state =>state.accessToken));
  const navigate = useNavigate();


  // Form Submit (Login Logic)
  async function onSubmit(data) {
   const res = await toast.promise(loginUser(data), {
      loading: "Loggin In...",
      success: "Login successfully!",
      error: (err) => err.response?.data?.message || "Something went wrong",
    });

    // Set user details in store
    login( res.data.user,res.data.accessToken);

    // Navigate to Dashboard
    navigate("/dashboard", { replace: true });
    
  }


  // UI Part
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField label={"Email Address:"} icon={"RiMailLine"} placeholder={"Enter your email"} {...register("email")} error={errors.email?.message} />
        <InputField label={"Password:"} icon={"RiLockLine"} placeholder={"Enter your password"} type={"password"} {...register("password")} error={errors.password?.message}/>
        
         <Button type={"submit"} text={"Login"} className={"p-3 tracking-wider"}/>
       
    </form>
  )
}
