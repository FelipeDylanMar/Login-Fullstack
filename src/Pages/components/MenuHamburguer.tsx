import {
  HomeIcon,
  UserIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";

const MenuHamburguer: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para o menu

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <button className="text-white text-3xl font-bold" onClick={toggleMenu}>
        ☰
      </button>

      <div
        ref={dropdownRef}
        className={`absolute right-4 top-16 bg-gray-300 font-bold p-4 rounded-md shadow-lg transition-all duration-300 z-50 ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-2 py-2 text-gray-600 hover:text-gray-500"
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </a>
        <a
          href="#"
          className="flex items-center gap-2 py-2 text-gray-600 hover:text-gray-500"
        >
          <UserIcon className="w-5 h-5" />
          Profile
        </a>
        <a
          href="#"
          className="flex items-center gap-2 py-2 text-gray-600 hover:text-gray-500"
        >
          <CogIcon className="w-5 h-5" />
          Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-2 py-2 text-gray-600 hover:text-gray-500"
        >
          <QuestionMarkCircleIcon className="w-5 h-5" />
          Help
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 py-2 text-red-400 hover:text-red-500"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </>
  );
};

export default MenuHamburguer;
