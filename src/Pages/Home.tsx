import { HomeIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import MenuHamburguer from "./components/MenuHamburguer";
import UserTable from "./components/UserTable";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#dcdcdc] text-indigo-900">
      <aside className="group bg-[#e1e1e1] p-4 flex flex-col items-start shadow-lg transition-width duration-300 hover:w-48">
        <h1 className="text-2xl font-bold text-black group-hover:block hidden">
          ManageFlow
        </h1>
        <nav className="flex flex-col gap-4 text-gray-600 mt-6">
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 group-hover:block w-9 group-hover:text-black font-medium transition"
            >
              <HomeIcon />
              <span className="hidden group-hover:inline">Dashboard</span>
            </button>
          </div>
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group-hover:block w-9 group-hover:text-black font-medium transition"
            >
              <UserIcon className="text-xl" />
              <span className="hidden group-hover:inline">Users</span>
            </button>
          </div>
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group-hover:block w-9 group-hover:text-black font-medium transition"
            >
              <CogIcon className="text-xl" />
              <span className="hidden group-hover:inline">Settings</span>
            </button>
          </div>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-200 shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="mt-auto">
            <MenuHamburguer />
          </div>
        </header>
        <main className="p-8 flex-1 bg-white">
          <h1 className="text-3xl font-bold mb-4 text-gray-700">
            Welcome back Dylan!
          </h1>
          <p className="mb-8 text-gray-700">
            Manage your users and settings below.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#b0b0c5] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-black mb-2">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-indigo-600">120</p>
            </div>
            <div className="bg-[#b0b0c5] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-black mb-2">
                Active Sessions
              </h3>
              <p className="text-3xl font-bold text-indigo-600">35</p>
            </div>
            <div className="bg-[#b0b0c5] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-black mb-2">
                Pending Approvals
              </h3>
              <p className="text-3xl font-bold text-indigo-600">8</p>
            </div>
            <div className="col-span-full">
              <div className="rounded-xl overflow-hidden">
                <UserTable />
              </div>
            </div>
          </div>
        </main>
        <footer className="p-4 bg-gray-300 text-center text-sm text-gray-600">
          <p>&copy; 2024 UserManager. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
