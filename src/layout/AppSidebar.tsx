import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Icons (You can update these as needed) 
import {
  GridIcon,
  BoxCubeIcon,
  UserCircleIcon,
  ListIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { HorizontaLDots } from "../icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Products",
    path: "/products",
  },
  {
    icon: <ListIcon />,
    name: "Orders",
    path: "/orders",
  },
  {
    icon: <UserCircleIcon />,
    name: "Customers",
    path: "/customers",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Inventory",
    path: "/inventory",
  },
  {
    icon: <UserCircleIcon />,
    name: "Suppliers",
    path: "/suppliers",
  },
  {
    icon: <ListIcon />,
    name: "Reports",
    path: "/reports",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/shreeramlogo.png"
                alt="Shreeram Stationery"
                width={180}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/shreeramlogo.png"
                alt="Shreeram Stationery"
                width={180}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/shreeramlogo.png"
              alt="Shreeram Stationery"
              width={40}
              height={40}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path ?? "/"}
                      className={`menu-item group ${
                        isActive(item.path ?? "/")
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span
                        className={`menu-item-icon-size ${
                          isActive(item.path ?? "/")
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{item.name}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

       
      </div>
    </aside>
  );
};

export default AppSidebar;
