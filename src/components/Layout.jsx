import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      {/* ========== SIDEBAR ========== */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Cleanify</h2>

        <div style={styles.userBox}>
          <p style={styles.userName}>
            {user.first_name} {user.last_name}
          </p>
          <span style={styles.userRole}>{user.user_type?.toUpperCase()}</span>
        </div>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* ========== CONTENT AREA ========== */}
      <div style={styles.content}>
        {children}
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6ff",
    fontFamily: "Poppins"
  },

  sidebar: {
    width: "250px",
    background: "white",
    borderRight: "1px solid #dde3ff",
    padding: "20px",
    boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "sticky",
    top: 0
  },

  logo: {
    fontSize: "26px",
    marginBottom: "30px",
    color: "#4a6cf7",
    textAlign: "center",
    fontWeight: "600"
  },

  userBox: {
    background: "#f7f2ff",
    borderRadius: "15px",
    padding: "15px",
    textAlign: "center",
    marginBottom: "20px",
    border: "1px solid #e2d9ff"
  },

  userName: {
    fontSize: "18px",
    margin: 0,
    fontWeight: "600"
  },

  userRole: {
    fontSize: "12px",
    color: "#4a6cf7",
    fontWeight: "600"
  },

  logoutBtn: {
    background: "#ff69b4",
    color: "white",
    padding: "12px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500"
  },

  content: {
    flex: 1,
    padding: "30px"
  }
};

export default Layout;
