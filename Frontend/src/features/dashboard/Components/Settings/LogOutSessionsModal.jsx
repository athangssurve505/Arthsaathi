import { useEffect, useState } from "react";
import { getActiveSessions } from "../../../../services/user.service";
import Modal from "../../../../shared/Components/Modal/Modal";
import ModalHeader from "../../../../shared/Components/Modal/ModalHeader";
import ModalFooter from "../../../../shared/Components/Modal/ModalFooter";
import Button from "../../../../shared/Components/Button";

import Icon from "../../../../shared/Components/Icon";

export default function LogOutSessionsModal({isOpen , onClose}) {


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
      icon="RiLogoutBoxRLine"
      title="Log out of all devices?"
      description="This will sign you out of all active sessions expect this device"
      onClose={onClose}
      iconClassName={"text-red-500"}
    />

    {/* Main Part */}

<div className="flex items-center gap-3 px-3 py-2">
  {/* Icon */}
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
    <Icon
      name="RiComputerLine"
      className="h-5 w-5 text-gray-600"
    />
  </div>

  {/* Text */}
  <div className="min-w-0 my-5">
    <p className="text-sm text-gray-700">
      You will be signed out from{" "}
      <span className="font-medium text-red-500">
        {sessions.length} other device(s)
      </span>
    </p>

    <p className="mt-0.5 text-xs text-gray-500">
      Including phones, tablets and computers
    </p>
  </div>
</div>

<div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white px-3 sm:px-4">

  <h3 className="py-3 text-sm font-semibold text-gray-800">
    Other active sessions
  </h3>

  {sessions.map((session) => (
    <div
      key={session.id}
      className="flex items-center gap-3 border-t border-gray-100 py-3 sm:gap-4"
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
        <Icon
          name="RiMapPinLine"
          className="h-3.5 w-3.5"
        />
        <span>{session.city}, {session.country}</span>
      </div>

    </div>
  ))}

</div>

<ModalFooter>
    <Button text={"Log out of all devices"} className="px-4 py-2 bg-red-500" type={"submit"}/>
</ModalFooter>
    </Modal>
  )
}
