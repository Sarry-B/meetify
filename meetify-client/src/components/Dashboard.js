import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Appointments from "./Appointments";
import ThemeToggle from "./ThemeToggle"; // ← זה השילוב החשוב

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative px-4 py-8">
      <ThemeToggle /> {/* ← כאן בדיוק תכניס אותו */}
      
      <h2 className="text-3xl font-bold text-center mb-2">
        Welcome{ name ? `, ${name}` : "" }!
      </h2>
      <p className="text-center mb-4">You are successfully logged in.</p>
      <div className="text-center mb-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <Appointments /> {/* קומפוננטת הפגישות */}
    </div>
  );
}

export default Dashboard;