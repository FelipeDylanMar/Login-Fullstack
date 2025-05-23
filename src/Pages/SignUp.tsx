import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/fetchs";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("As senhas não coincidem!");
      return;
    }

    if (!agreeToTerms) {
      console.error("Você precisa concordar com os Termos de Uso.");
      return;
    }

    try {
      const message = await signUp({ email, password, name });
      console.log(message);
      navigate("/home/dashboard");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/src/assets/techIcons.svg')] bg-cover bg-center">
      <div className="w-3/4 max-w-2xl space-x-0">
        {/* Sign Up Section */}
        <div className="w-full p-10 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border-[1px] border-black rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border-[1px] border-black rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
              />
            </div>

            {/* Terms of Service Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the <span className="text-blue-600">Terms of Service</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="inline">Already have an account? </p>
            <button
              type="button"
              onClick={() => navigate("/home/dashboard")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
