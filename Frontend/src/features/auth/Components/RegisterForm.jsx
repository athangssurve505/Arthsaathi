import InputField from "../../../shared/Components/InputField";
import Button from "../../../shared/Components/Button"


import { registerSchema } from "../authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function RegisterForm() {

  const {
    register,
    formState:{errors},
    handleSubmit
  } = useForm({resolver:zodResolver(registerSchema)})

  function onSubmit(data) {
    console.log(data);
  } 

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField label={"Full Name:"} icon={"RiUserLine"} placeholder={"Enter your full name"} {...register("fullName")} error={errors.fullName?.message} />
        <InputField label={"Email Address:"} icon={"RiMailLine"} placeholder={"Enter your email"} {...register("email")}  error={errors.email?.message}/>
        <InputField label={"Password:"} icon={"RiLockLine"} placeholder={"Create a password"} type={"password"} {...register("password")} error={errors.password?.message} />
         <InputField label={"Confirm Password:"} icon={"RiLockLine"} placeholder={"Confirm your password"} type={"password"} {...register("confirmPassword")} error={errors.confirmPassword?.message} />
         <Button type={"submit"} text={"Create Account"} className={"p-3 tracking-wider"}/>
    </form>
  )
}
