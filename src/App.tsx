import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./Pages/layouts/SidebarLayout";
import Users from "./Pages/Users";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<SidebarLayout />}>
              <Route path="dashboard" element={<Home />} />
              <Route path="users" element={<Users />} />
              {/* <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
