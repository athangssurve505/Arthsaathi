import ProfilePic from "../../../shared/Components/ProfilePic";
import useAuthStore from "../../../store/auth.store";
import Button from "../../../shared/Components/Button"
import SecurityCard from "../../../features/dashboard/Components/Settings/SecurityCard";
export default function Settings() {
  const user = useAuthStore((state)=>state.user)
  return (
    <div className=" px-6 py-4 gap-5 h-full flex flex-col">

      {/* Top part naming the section */}
        <div className="top-part">
          
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-sm mt-1 text-gray-600">Manage your account, security and preferences</p>
        </div>

    {/* Profile Card */}
    <div className="profile-card border flex justify-between items-center w-full  border-gray-300 rounded-lg p-4 object-fit shadow-md ">
      
      {/* Left Part */}
      <div className="profile-name-wrapper flex items-center gap-5">
          <ProfilePic className={"h-fit w-20 rounded-full object-contain "}/>
          <div className="name-email">
            <p className="font-bold">{user?.fullName}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
      </div>
      {/* Right Part */}
    <Button text={"Edit Profile"} className="px-6 py-2 h-fit"/>
      </div>

    {/* Security Part (middle part) */}
 
    <SecurityCard/>
 





    </div>
  )
}
