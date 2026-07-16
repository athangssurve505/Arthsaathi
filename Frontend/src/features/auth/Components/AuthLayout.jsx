import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { useState } from "react";


export default function AuthLayout() {
  const [login, setlogin] = useState(true)

  function switchForm(){
    setlogin(prev=>!prev);

  }
  return (
    <div className="bg-white border border-gray-500 rounded-xl p-5 min-w-100 
    max-sm:min-w-80 ">
        <h1 className="font-bold text-3xl mb-3 max-sm:text-2xl">{login ? "Welcome Back " : "Create Account"}</h1>
        <p className="font-bold text-gray-500 text-md mb-8 max-sm:text-sm">Fill in the details to get started</p>

    {login?<LoginForm/>:<RegisterForm/>}
    <p className="font-bold w-full text-center mt-5">  {login ? "Don't have an account? " : "Already have an account? "} 
      <span className="text-[#0E8B5D] cursor-pointer" onClick={switchForm}> {login ? "Register" : "Login"}</span></p>
    </div>
  )
}
