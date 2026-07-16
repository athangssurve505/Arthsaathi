import InputField from "../../../shared/Components/InputField";
import Button from "../../../shared/Components/Button"

import { useForm } from "react-hook-form";
import { loginSchema } from "../authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({resolver:zodResolver(loginSchema)})

  function onSubmit(data) {
    console.log(data);
  } 

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField label={"Email Address:"} icon={"RiMailLine"} placeholder={"Enter your email"} {...register("email")} error={errors.email?.message} />
        <InputField label={"Password:"} icon={"RiLockLine"} placeholder={"Create a password"} type={"password"} {...register("password")} error={errors.password?.message}/>
        
         <Button type={"submit"} text={"Login"} className={"p-3 tracking-wider"}/>
       
    </form>
  )
}
