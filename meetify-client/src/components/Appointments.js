import { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ title: "", date: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null); // מזהה את הפגישה שנערכת

  const token = localStorage.getItem("token");

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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/appointments/${editingId}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/appointments", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({ title: "", date: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Error saving appointment:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const handleEdit = (appt) => {
    setForm({ title: appt.title, date: appt.date.slice(0, 16) }); // format ל־datetime-local
    setEditingId(appt._id);
  };

  const filteredAppointments = appointments.filter((appt) =>
    appt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10 text-left">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Appointments</h3>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Appointment title"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          {editingId ? "Update Appointment" : "Add Appointment"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", date: "" });
            }}
            className="ml-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="space-y-3">
        {filteredAppointments.map((appt) => (
          <li
            key={appt._id}
            className="p-4 bg-gray-50 border rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <strong>{appt.title}</strong> –{" "}
              <span className="text-gray-500">
                {new Date(appt.date).toLocaleString()}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(appt)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(appt._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;