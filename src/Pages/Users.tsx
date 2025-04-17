import { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import { User } from "../types/types";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Gerenciamento de Usuários</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar usuário"
          className="border p-2 rounded-lg w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => console.log("Abrir modal de criação")}
          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
        >
          Criar Novo Usuário
        </button>
      </div>

      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
};

export default Users;
