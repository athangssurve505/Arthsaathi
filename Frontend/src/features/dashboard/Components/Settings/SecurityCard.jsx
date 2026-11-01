import Icon from "../../../../shared/Components/Icon"
import SecurityRow from "./SecurityRow";
import ChangePasswordModal from "./ChangePasswordModal";
import LogOutSessionsModal from "./LogOutSessionsModal";

import { useState } from "react";
import ActiveSessionsModal from "./ActiveSessionsModal";

export default function SecurityCard() {

  const [activeModal, setActiveModal] = useState(null);

  
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <Icon
            name={"RiShieldCheckFill"}
            className="text-blue-600 w-6 h-6"
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Security
          </h2>

          <p className="text-[11px] text-gray-500">
            Manage your account security.
          </p>
        </div>
      </div>

      {/* Rows */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <SecurityRow
          icon={"RiLockLine"}
          title="Change Password"
          description="Update your account password regularly."
          action="Change"
          onAction= {()=> {
            setActiveModal("changePassword")}
          }

        />

        <SecurityRow
           icon={"RiMacbookLine"}
          title="Active Sessions"
          description="View devices currently signed in to your account."
          action="Manage"
          onAction= {()=> {
            setActiveModal("activeSessions")}
          }
        />

        <SecurityRow
           icon={"RiLogoutBoxRLine"}
          title="Logout from all devices"
          description="Sign out of your account on every device."
          action="Logout All"
          onAction= {()=> {
            setActiveModal("logoutDevices")}
          }
          danger
        />
      </div>



       <ChangePasswordModal
        isOpen={activeModal === "changePassword"}
        onClose={() => setActiveModal(null)}
      />

          <LogOutSessionsModal
        isOpen={activeModal === "logoutDevices"}
        onClose={() => {setActiveModal(null); console.log(activeModal)}}
      />

      <ActiveSessionsModal
      isOpen={activeModal === "activeSessions"}
        onClose={() => {setActiveModal(null); console.log(activeModal)}}
      />
    </section>

    
  );
}