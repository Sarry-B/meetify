import { useState, useEffect } from "react";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ title: "", date: "" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/appointments", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments([...appointments, res.data]);
      setForm({ title: "", date: "" });
      setMessage("Appointment added successfully!");
    } catch (err) {
      setMessage("Failed to add appointment.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.filter((a) => a._id !== id));
      setMessage("Appointment deleted.");
    } catch (err) {
      setMessage("Failed to delete appointment.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Your Appointments</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600 font-medium transition-opacity duration-500">
            {message}
          </div>
        )}

        <form onSubmit={handleAdd} className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Appointment Title"
            required
            className="col-span-1 sm:col-span-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="col-span-1 sm:col-span-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="col-span-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="bg-indigo-50 px-4 py-3 rounded-lg flex justify-between items-center shadow-md transition duration-300 hover:bg-indigo-100"
            >
              <div>
                <p className="font-medium text-indigo-800">{appt.title}</p>
                <p className="text-sm text-gray-600">{new Date(appt.date).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(appt._id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Appointments;