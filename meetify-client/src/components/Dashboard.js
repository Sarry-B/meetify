import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Appointments from './Appointments';

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome, {name}!</h2>
        <p className="text-gray-600 mb-6">You are successfully logged in to Meetify.</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Logout
        </button>

        <hr className="my-8" />

        <Appointments />
      </div>
    </div>
  );
}

export default Dashboard;