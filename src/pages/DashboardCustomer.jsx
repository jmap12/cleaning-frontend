import React, { useEffect, useState } from 'react';
import api from '../axios';
import Layout from '../components/Layout';

const DashboardCustomer = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/services")
      .then(res => setServices(res.data))
      .catch(() => {});
  }, []);

  const book = async (service_id) => {
    const date = prompt("Enter date (YYYY-MM-DD):");
    const time = prompt("Enter time (HH:MM):");

    await api.post(
      "/bookings",
      { service_id, booking_date: date, booking_time: time },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Booked!");
  };

  return (
    <Layout>
      <h2>Available Services</h2>

      <div style={styles.grid}>
        {services.map(s => (
          <div key={s.service_id} style={styles.card}>
            <h3>{s.service_name}</h3>
            <p>{s.description}</p>
            <p><b>KES {s.base_price}</b></p>

            <button style={styles.button} onClick={() => book(s.service_id)}>
              Book Service
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const styles = {
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    marginTop: "20px"
  },
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  button: {
    padding: "10px",
    width: "100%",
    background: "#4a6cf7",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

export default DashboardCustomer;
