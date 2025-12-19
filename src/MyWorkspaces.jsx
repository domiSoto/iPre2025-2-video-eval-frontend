import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./MyWorkspaces.css";
import { useNavigate } from "react-router-dom";

export default function MyWorkspaces() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);

  // Get all the workspaces
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await fetch("http://localhost:3000/workspaces");
        const data = await res.json();
        if (res.ok) {
          setWorkspaces(data.workspaces || []);
          console.log("Fetched workspaces:", data.workspaces);
        } else {
          setError(data.error || "Failed to load workspaces");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="myworkspaces-root">
      <div className="myworkspaces-layout-container">
        <Navbar />
        <div className="myworkspaces-content-wrapper">
          <div className="myworkspaces-content-container">
            <div className="myworkspaces-title-row">
              <p className="myworkspaces-title">My Workspaces</p>
              <button className="myworkspaces-new-btn" onClick={() => navigate('/create-workspace')}>
                <span className="truncate">New Workspace</span>
              </button>
            </div>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <div className="myworkspaces-list">
              {workspaces.length === 0 && (
                <p>No workspaces found. Create one!</p>
              )}

              {workspaces.map((ws) => (
                <div
                  key={ws.id || ws.name}
                  className="myworkspaces-item"
                  onClick={() =>
                    navigate(`/workspace/${ws.id}/videos`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="myworkspaces-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z" />
                    </svg>
                  </div>
                  <div className="myworkspaces-info">
                    <p className="myworkspaces-name">{ws.name}</p>
                    <p className="myworkspaces-desc">
                      {ws.description || "No description"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
