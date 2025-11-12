import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Workspace.css";

export default function WorkspaceForm({ mode = "create", workspace = {} }) {
  const isCreateMode = mode === "create";
  const location = useLocation();
  const navigate = useNavigate();
  // If in view mode, get workspace from location.state
  const workspaceData = isCreateMode ? workspace : (location.state?.workspace || workspace);
  const [name, setName] = useState(workspaceData.name || "");
  const [description, setDescription] = useState(workspaceData.description || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // POST a new workspace (for create mode)
  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          owner: null,
          metadata: {},
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create workspace");

      // Si todo va bien, redirigir
      navigate("/my-workspaces");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <div className="content-container">
            <div className="page-title-container">
              <p className="page-title">
                {isCreateMode ? "Create a new workspace" : "Workspace details"}
              </p>
            </div>

            {/* Campo nombre */}
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Workspace Name</p>
                <input
                  placeholder="Enter workspace name"
                  className="text-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isCreateMode}
                />
              </label>
            </div>

            {/* Campo descripción */}
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Description</p>
                <textarea
                  placeholder="Enter a brief description of the workspace"
                  className="textarea-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  readOnly={!isCreateMode}
                ></textarea>
              </label>
            </div>

            {/* Mensaje de error */}
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}

            {/* Botón solo en modo crear */}
            {isCreateMode && (
              <div className="save-section">
                <button
                  className="uploadvideo-upload-btn"
                  onClick={handleCreate}
                  disabled={loading}
                >
                  <span className="button-text">
                    {loading ? "Creating..." : "Create"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}