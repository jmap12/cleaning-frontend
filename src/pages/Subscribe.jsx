import React, { useState } from 'react';
import api from '../axios';

const Subscribe = () => {
  const [phone, setPhone] = useState("");

  const subscribe = async () => {
    try {
      const res = await api.post("/payments/subscribe", { phone }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("STK Push sent! Complete payment on your phone.");
    } catch (err) {
      alert("Subscription payment error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Subscription Required</h3>
        <p>Please pay <b>KES 100</b> to access the platform.</p>

        <input
          placeholder="Enter MPesa Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <button onClick={subscribe} style={styles.button}>Pay with Mpesa</button>

        <p><a href="/login">Back to Login</a></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#eaf2ff"
  },
  card: {
    width: "350px", background: "white", borderRadius: "12px", padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center"
  },
  input: {
    padding: "10px", width: "100%", borderRadius: "10px", border: "1px solid #ccc", marginBottom: "15px"
  },
  button: {
    background: "#4a6cf7", color: "white", width: "100%", padding: "10px",
    borderRadius: "10px", border: "none"
  }
};

export default Subscribe;
