import React, { useEffect, useState } from 'react';
import api from '../axios';
import Layout from '../components/Layout';

const DashboardCleaner = () => {
  const token = localStorage.getItem("token");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/cleaner", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(
      `/bookings/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Status updated!");
  };

  return (
    <Layout>
      <h2>Your Bookings</h2>

      <div style={styles.grid}>
        {bookings.map(b => (
          <div key={b.booking_id} style={styles.card}>
            <h3>{b.service_name}</h3>
            <p>Customer: {b.customer_first} {b.customer_last}</p>
            <p>Date: {b.booking_date}</p>
            <p>Time: {b.booking_time}</p>
            <p>Status: <b>{b.status}</b></p>

            <button style={styles.btnPrimary} onClick={() => updateStatus(b.booking_id, "in_progress")}>Start</button>
            <button style={styles.btn} onClick={() => updateStatus(b.booking_id, "completed")}>Complete</button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const styles = {
  grid: { display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" },
  card: {
    padding: "20px", background: "white", borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  btnPrimary: {
    padding: "10px", width: "100%", background: "#4a6cf7", color: "white",
    border: "none", borderRadius: "10px", marginBottom: "10px"
  },
  btn: {
    padding: "10px", width: "100%", background: "#ff69b4", color: "white",
    border: "none", borderRadius: "10px"
  }
};

export default DashboardCleaner;
