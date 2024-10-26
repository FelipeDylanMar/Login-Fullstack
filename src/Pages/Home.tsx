import { useAuth } from "../hooks/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  
    const handleLogout = () => {
      logout();
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page!</h1>
        <p className="text-lg text-gray-700 mb-8">
          This is the main page of your application.
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    );
    
  };
  
  export default Home;
  