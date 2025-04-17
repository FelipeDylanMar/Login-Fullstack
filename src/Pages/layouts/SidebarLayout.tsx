import { Outlet, useNavigate } from "react-router-dom";
import { HomeIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline";

const SidebarLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#dcdcdc] text-indigo-900">
      <aside className="group bg-[#e1e1e1] p-4 flex flex-col items-start shadow-lg transition-width duration-300 hover:w-48">
        <h1 className="text-2xl font-bold text-black group-hover:block hidden">
          ManageFlow
        </h1>
        <nav className="flex flex-col gap-4 text-gray-600 mt-6">
          <button
            onClick={() => navigate("/home/dashboard")}
            className="flex items-center gap-2 group-hover:text-black font-medium transition"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="hidden group-hover:inline">Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/home/users")}
            className="flex items-center gap-2 group-hover:text-black font-medium transition"
          >
            <UserIcon className="w-5 h-5" />
            <span className="hidden group-hover:inline">Users</span>
          </button>
          <button
            onClick={() => navigate("/home/settings")}
            className="flex items-center gap-2 group-hover:text-black font-medium transition"
          >
            <CogIcon className="w-5 h-5" />
            <span className="hidden group-hover:inline">Settings</span>
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
        <footer className="p-4 bg-gray-300 text-center text-sm text-gray-600">
          <p>&copy; 2024 UserManager. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SidebarLayout;
