import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // מוחק את הטוקן
    navigate("/");                     // מחזיר לדף login
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>Welcome to the Dashboard</h2>
      <p>You are successfully logged in!</p>
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;