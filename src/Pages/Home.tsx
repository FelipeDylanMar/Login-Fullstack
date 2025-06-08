import { useState, useEffect } from "react";
import MenuHamburguer from "./components/MenuHamburguer";
import UserTable from "./components/UserTable";
import { User } from "../types/types";
import { useAuth } from "../hooks/AuthContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithAuth } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await fetchWithAuth("http://localhost:5000/api/users");
        if (!resp.ok) throw new Error("Erro ao buscar usuários");
        const data = await resp.json();
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Meu App</title>
        <meta name="description" content="Gerencie seus usuários e configurações" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-white overflow-auto">
        <header className="bg-gray-200 shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <MenuHamburguer />
        </header>

        <main className="p-8 flex-1 overflow-y-auto bg-white">
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
              <p className="text-3xl font-bold text-indigo-600">
                {users.length}
              </p>
            </div>
          </div>

          <div className="col-span-full mt-8">
            <div className="rounded-xl overflow-auto">
              {loadingUsers ? (
                <p className="p-6 text-center">Carregando usuários...</p>
              ) : error ? (
                <p className="p-6 text-center text-red-500">Erro: {error}</p>
              ) : (
                <UserTable
                  users={users}
                  onEdit={() => {
                    throw new Error("Function not implemented.");
                  }}
                  onDelete={() => {
                    throw new Error("Function not implemented.");
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
