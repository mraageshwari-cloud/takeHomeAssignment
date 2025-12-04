import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://axtd0boogh.execute-api.us-east-1.amazonaws.com/prod";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch data
  const fetchData = () => {
    setRefreshing(true);
    setError(null);

    axios
      .get(API_URL)
      .then((response) => {
        const parsedData = JSON.parse(response.data.body);
        setData(parsedData);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: '30px',
    marginBottom: "1.5rem",
    color: "#333",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thStyle = {
    backgroundColor: "#749dc7",
    color: "white",
    padding: "12px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const refreshButtonContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  const refreshButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#749dc7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  if (loading && !refreshing) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>Error fetching data.</p>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Vanity Number Directory</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Caller Number</th>
            <th style={thStyle}>Vanity Numbers</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([caller, vanities]) => (
            <tr key={caller}>
              <td style={tdStyle}>{caller}</td>
              <td style={tdStyle}>
                {Array.isArray(vanities) ? vanities.join(", ") : vanities}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Centered Refresh Button */}
      <div style={refreshButtonContainer}>
        <button style={refreshButtonStyle} onClick={fetchData}>
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
}

export default App;
