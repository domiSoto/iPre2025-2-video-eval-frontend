import "./Navbar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { workspaceId } = useParams(); // <-- Captura el ID del workspace si está en la ruta

  // Saber si estamos dentro de un workspace
  const inWorkspace = location.pathname.startsWith("/workspace/")  && workspaceId;

  return (
    <header className="header">
      <div
        className="header-logo"
        onClick={() => navigate("/my-workspaces")}
        style={{ cursor: "pointer" }}
      >
        <div className="logo-icon">
          {/* Tu SVG del logo */}
        </div>
        <h2 className="logo-text">VideoEval</h2>
      </div>

      <div className="header-nav-container">
        <div className="nav-links">
          {/* Siempre visible */}
          <button className="nav-link" onClick={() => navigate("/my-workspaces")}>
            Workspaces
          </button>

          {/* Solo visible cuando estás dentro de un workspace */}
          {inWorkspace && (
            <>
              <button
                className="nav-link"
                onClick={() => navigate(`/workspace/${workspaceId}/create-rubric`)}
              >
                Rubric
              </button>
              <button
                className="nav-link"
                onClick={() => navigate(`/workspace/${workspaceId}/videos`)}
              >
                Videos
              </button>
              <button
                className="nav-link"
                onClick={() => navigate(`/workspace/${workspaceId}/upload-video`)}
              >
                Upload Video
              </button>
              <button
                className="nav-link"
                onClick={() => navigate(`/workspace/${workspaceId}/dashboard`)}
              >
                Dashboard
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
