import React, { useEffect, useState } from 'react';
import api from '../axios';
import Layout from '../components/Layout';

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data.users));

    api.get("/admin/subscriptions/pending", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSubs(res.data.subscriptions));
  }, []);

  const verify = async (id) => {
    await api.post(`/admin/subscriptions/${id}/verify`, {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Subscription verified!");
  };

  return (
    <Layout>
      <h2>Admin Dashboard</h2>

      <h3>All Users</h3>
      <table style={styles.table}>
        <thead>
          <tr><th>Name</th><th>Type</th><th>Subscribed</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.user_id}>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.user_type}</td>
              <td>{u.subscribed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Pending Subscriptions</h3>
      <div style={styles.grid}>
        {subs.map(s => (
          <div key={s.subscription_id} style={styles.card}>
            <p>User ID: {s.user_id}</p>
            <p>Amount: {s.amount}</p>
            <button style={styles.btn} onClick={() => verify(s.subscription_id)}>
              Verify Payment
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const styles = {
  grid: { display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" },
  card: {
    padding: "20px", background: "white", borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  table: {
    width: "100%", background: "white", borderRadius: "12px",
    padding: "10px", marginBottom: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  btn: {
    padding: "10px", background: "#4a6cf7", color: "white",
    width: "100%", borderRadius: "10px", border: "none"
  }
};

export default AdminDashboard;
