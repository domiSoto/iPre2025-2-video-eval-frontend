import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FiFile } from "react-icons/fi";
import "./MyVideos.css";
import Navbar from "./Navbar";

export default function MyVideos() {
  const { workspaceId } = useParams();
  console.log("Workspace ID in MyVideos:", workspaceId);
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workspaces/${workspaceId}/pairs`);
        if (!response.ok) {
          throw new Error(`Error al obtener videos (status ${response.status})`);
        }

        const data = await response.json();
        console.log(data);
        setVideos(data);
      } catch (err) {
        console.error("Error cargando videos:", err);
        setError("No se pudieron cargar los videos.");
      } finally {
        setLoading(false);
      }
    };

    // fetch inicial
    fetchVideos();
    // polling cada 10 segundos
    intervalId = setInterval(fetchVideos, 10000);
    // cleanup al cambiar workspace o desmontar componente
    return () => clearInterval(intervalId);
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="main-content">
          <p style={{ padding: "2rem" }}>Cargando videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="main-content">
          <p style={{ color: "red", padding: "2rem" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <div className="layout-content-container">
            <div className="videos-header">
              <div className="videos-header-title">
                <p className="videos-title">Videos del Workspace</p>
                <p className="videos-subtitle">Administra y evalúa videos dentro de este espacio de trabajo.</p>
              </div>
            </div>
            <div className="dashboard-recent-evals-wrapper">
              <div className="dashboard-recent-evals-table-container">
                <table className="dashboard-recent-evals-table">
                  <thead>
                    <tr>
                      <th className="dashboard-table-col-title">Vista previa</th>
                      <th className="dashboard-table-col-presentation">Presentación</th>
                      <th className="dashboard-table-col-evaluator">Estado</th>
                      <th className="dashboard-table-col-progress">Progreso</th>
                      <th className="dashboard-table-col-score">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
                          No hay videos en este workspace.
                        </td>
                      </tr>
                    ) : (
                      videos.map((video, idx) => (
                        <tr key={idx}>
                          <td className="dashboard-table-col-title">
                            <div
                              className="videos-preview-img"
                              style={{
                                backgroundImage: `url('${video.urls?.thumbnail || "/default-thumbnail.png"}')`,
                                width: "120px",
                                height: "70px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          </td>
                          <td className="col-presentation">
                            {video.urls?.presentation ? (
                              <a
                                href={video.urls.presentation}
                                download
                                className="file-icon"
                              >
                                <FiFile />
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="dashboard-table-col-evaluator">
                            {video.status || "Desconocido"}
                          </td>
                          <td style={{ width: "180px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <div
                                style={{
                                  background: "#eee",
                                  width: "100%",
                                  height: "10px",
                                  borderRadius: "4px",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    background: "#4CAF50",
                                    width: `${video.metadata?.progress || 0}%`,
                                    height: "100%",
                                    transition: "width 0.3s ease",
                                  }}
                                ></div>
                              </div>

                              <span style={{ fontSize: "12px", width: "32px", textAlign: "right" }}>
                                {video.metadata?.progress || 0}%
                              </span>
                            </div>
                          </td>
                          <td className="dashboard-table-col-score">
                            <div
                              style={{
                                display: "flex",
                                gap: "12px",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              <button
                                className="dashboard-score-btn"
                                onClick={() => navigate(`/detailed-search/${video.jobId}`)}
                              >
                                <span>Ver Video</span>
                              </button>
                              <button
                                className="dashboard-score-btn"
                                onClick={() => navigate(`/evaluate-video/${video.jobId}`)}
                              >
                                <span>Evaluar</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
