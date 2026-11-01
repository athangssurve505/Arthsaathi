import { NavLink } from "react-router-dom";
import Icon from "../../../shared/Components/Icon";

const sideBarItems = [
  {
    name: "Home",
    icon: "RiHome4Line",
    path: "/dashboard",
  },
  {
    name: "AI Coach",
    icon: "RiRobot2Line",
    path: "/ai-coach",
  },
  {
    name: "Goals",
    icon: "RiTargetLine",
    path: "/goals",
  },
  {
    name: "Expenses",
    icon: "RiWallet3Line",
    path: "/expenses",
  },
  {
    name: "Investments",
    icon: "RiBarChartGroupedFill",
    path: "/investments",
  },
  {
    name: "Learning Hub",
    icon: "RiBookOpenFill",
    path: "/learning",
  },
  {
    name: "Scam Check",
    icon: "RiShieldCheckFill",
    path: "/scam-check",
  },
  {
    name: "Settings",
    icon: "RiSettings3Line",
    path: "/dashboard/settings",
  },
];

export default function SideBarList({ isOpen }) {
  return (
    <div className="flex flex-col gap-2 w-full pr-2 font-bold">
      {sideBarItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-colors
            ${
              isActive
                ? "bg-emerald-50 text-emerald-600"
                : "text-gray-700 hover:bg-gray-200"
            }
            ${!isOpen ? "justify-center" : ""}`
          }
        >
          <Icon
            name={item.icon}
            className="w-6 h-6 shrink-0"
          />

          {isOpen && <span>{item.name}</span>}
        </NavLink>
      ))}
    </div>
  );
}