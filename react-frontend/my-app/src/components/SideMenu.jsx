import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menu = [
  {
    field: "Tasks",
    image: "",
    status: true,
  },
  {
    field: "Projects",
    image: "",
    status: true,
  },
  {
    field: "Reports",
    image: "",
    status: false,
  },
  {
    field: "Logout",
    image: "",
    status: true,
  },
];

const SideMenu = ({ onMenuSelect }) => {
  const [activeItem, setActiveItem] = useState("Tasks");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const switchMenu = (item) => {
    setActiveItem(item);
    if (item === "Logout") {
      setShowLogoutConfirm(true);
    } else {
      onMenuSelect?.(item);
      setActiveItem(item);
    }
  };
  const handleLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem("auth");
    navigate("login");
  };
  return (
    <nav>
      <h2 className="text-xl font-semibold mb-6">📋 Menu</h2>
      <ul className="mb-6 pl-0">
        {menu.map((item, index) =>
          item.status ? (
            <li
              onClick={() => switchMenu(item.field)}
              key={index}
              className={`p-2 mb-3 rounded-md font-semibold cursor-pointer hover:bg-gray-600 ${
                activeItem === item.field ? "bg-gray-600 text-white" : ""
              }`}
            >
              {item.field}
            </li>
          ) : null
        )}
      </ul>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SideMenu;
