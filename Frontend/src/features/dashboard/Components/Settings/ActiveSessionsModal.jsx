import { useEffect, useState } from "react";
import { getActiveSessions } from "../../../../services/user.service";
import Modal from "../../../../shared/Components/Modal/Modal";
import ModalHeader from "../../../../shared/Components/Modal/ModalHeader";

import Icon from "../../../../shared/Components/Icon";
import Button from "../../../../shared/Components/Button";

export default function ActiveSessionsModal({isOpen , onClose}) {

  const [sessions, setsessions] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  
  

 async function showActiveSessions(){
    try{
     setisLoading(true);
     const res = await getActiveSessions();
     setsessions(res.data.sessions);
    }catch(e){
     console.log(e.message)
    }
    finally{
     setisLoading(false);
    }
 }
 
 function getDeviceIcon(device) {
   if (device === "Desktop") {
     return "RiComputerLine";
   }
 
   if (device === "iPhone") {
     return "RiSmartphoneLine";
   }
 
   if (device === "iPad") {
     return "RiTabletLine";
   }
 
   return "RiDeviceLine";
 }
 
 useEffect(() => {
   if(!isOpen) return ;
 
   showActiveSessions();
 
   
 }, [isOpen])
 
 
 if(!isOpen) return null;
  
  return (
   <Modal>
    <ModalHeader
      icon="RiGroupLine"
      title="Active Sessions"
      description="This are devices and location your account is currently signed in"
      onClose={onClose}
    //   iconClassName={"text-green-500"}
    />

    <div className="current-device-part p-4 " >
      <p className=" text-sm mt-3 mb-2 font-bold">All Active Sessions</p>
       {sessions.map((session) => (
          <div
            key={session.id}
            className={`flex items-center gap-3 border border-gray-100 py-3 sm:gap-4 rounded-lg p-2 ${session.isCurrent?`bg-emerald-50`:` `}`}
          >
      
            {/* Device Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <Icon
                name={getDeviceIcon(session.device)}
                className="h-5 w-5 text-purple-600"
              />
            </div>
      
            {/* Main information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                {session.os}
                <span className="mx-1 text-gray-400">•</span>
                {session.browser}
              </p>
      
              <p className="mt-0.5 truncate text-[10px] text-gray-500 sm:text-xs">
                {session.location?.city}
                <span className="mx-1 text-gray-400">•</span>
                {session.lastUsed}
              </p>
            </div>
      
            {/* Right location */}
            <div className="hidden shrink-0 items-center gap-1 text-[10px] text-gray-500 sm:flex sm:text-xs">
              {session.isCurrent?<p className="text-emerald-500">Active Now</p>:
              <Button text={"Sign Out"} type={"submit"} className="bg-transparent border border-red-500 hover:bg-red-500 hover:text-black"/>}
              <span>{session.city}, {session.country}</span>
            </div>
      
          </div>
        ))}
      
    </div>



   </Modal>
  )
}

