import {
  Cog6ToothIcon,
  CursorArrowRaysIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import meetTheTeam from "../assets/meetTheTeam.svg";
import nextTask from "../assets/nextTasks.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/src/assets/techIcons.svg')] bg-cover bg-center">
      <div className="flex w-4/5 max-w-6xl space-x-0">
        {/* ManageFlow Section */}
        <div className="w-1/2 p-10 bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome to ManageFlow
          </h2>
          <div className="space-y-4 mt-6">
            <div className="flex items-center space-x-2">
              <Cog6ToothIcon className="w-6 h-6 text-blue-500" />
              <p className="text-base text-gray-600">
                Manage user accounts, workflows, and perform seamless login and
                registration.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CursorArrowRaysIcon className="w-6 h-6 text-blue-500" />
              <p className="text-base text-gray-600">
                Built as a full-stack project integrating login, user
                management, and more.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CubeIcon className="w-6 h-6 text-blue-500" />
              <p className="text-base text-gray-600">
                Utilizing technologies like TypeScript, JavaScript, Node.js,
                React, and MongoDB Atlas.
              </p>
            </div>
          </div>
          <img src={meetTheTeam} alt="Meet The team!" className="mt-6 w-full" />
        </div>

        {/* Login Section */}
        <div className="w-1/2 p-10 bg-white shadow-md rounded-lg ml-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Log In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border-[1px] border-black rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border-[1px] border-black rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="inline">Don't have an account? </p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <img src={nextTask} alt="Next Task!" className="w-72" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
