import { useState } from "react";
import Icon from "../../../shared/Components/Icon";
import Logo from "../../../shared/Components/Logo";
import SideBarList from "../../../features/dashboard/Components/SideBarList";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="side-bar-wrapper border-r border-gray-300 w-fit min-h-screen  flex flex-col justify-between">
      <div className="sidebar-start-wrapper py-5 pl-2 ">
        <Logo
          logoClassName={"text-black"}
          className={"mb-5 "}
          subpara={"hidden"}
          isOpen={isOpen}
          secondText={"mr-5"}
        />
        <div>
          <SideBarList isOpen={isOpen} />
        </div>
      </div>
      <div className="control border-y border-gray-300 w-full p-4">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <div className="close-wrapper text-gray-600 flex  gap-2 hover:text-black cursor-pointer">
              <Icon name={"RiCloseLine"} />
              <p>Collapse</p>{" "}
            </div>
          ) : (
            <Icon name={"RiMenuLine"} />
          )}
        </button>
      </div>
    </div>
  );
}
