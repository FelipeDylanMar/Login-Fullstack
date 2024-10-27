import { HomeIcon, UserIcon, CogIcon, QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { useAuth } from "../hooks/AuthContext";
import { useState } from "react";
import ArrowLeftStartOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftStartOnRectangleIcon";

const Home = () => {
  const { logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#191970] text-indigo-200">
      <header className="flex justify-between items-center p-4 bg-indigo-800 shadow-md">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        <button className="text-white text-3xl" onClick={toggleMenu}>
          ☰
        </button>
      </header>
      <div
        className={`absolute right-4 top-16 bg-indigo-900 p-4 rounded-md shadow-lg transition-all duration-300 ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
        }`}
      >
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          Home
        </a>
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <UserIcon className="w-5 h-5" />
          Profile
        </a>
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <CogIcon className="w-5 h-5" />
          Settings
        </a>
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          Help
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 py-2 text-red-400 hover:text-red-500"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          Log Out
        </button>
      </div>
      <main className="flex flex-col items-center justify-center flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
        <p className="text-lg mb-8">This is the main page of your application.</p>
      </main>
      <footer className="p-4 bg-indigo-800 text-center">
        <p>&copy; 2024 Your Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
