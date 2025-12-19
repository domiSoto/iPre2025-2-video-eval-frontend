import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "./EvaluateVideo.css";

export default function EvaluateVideo() {
  const { videoJobId } = useParams();
  const [results, setResults] = useState([]);
  const [video, setVideo] = useState({});
  const [error, setError] = useState("");

  // Estado editable para criterios
  const [criteriaData, setCriteriaData] = useState([]);
  const [generalComment, setGeneralComment] = useState("");

  // Get the video evaluation
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/video/${videoJobId}/evaluation`);
        const data = await res.json();
        if (res.ok) {
          setResults(data.evaluations || []);
          setVideo(data.video || {});
          console.log("Fetched video details:", data);
        } else {
          setError(data.error || "Failed to load video details");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [videoJobId]);

  // Inicializar criterios en estado editable
  useEffect(() => {
    if (results.length > 0) {
      const evaluation = results[0];
      const scores = evaluation.scores || {};
      const comments = evaluation.notes?.comments || {};
      const criteriaArray = Object.keys(scores).map((key) => ({
        key,
        name: key.replaceAll("_", " "),
        score: scores[key],
        comment: comments[key] || "",
      }));
      setCriteriaData(criteriaArray);
      setGeneralComment(evaluation.notes?.summary || "");
    }
  }, [results]);

  // Función para actualizar score o comment
  const handleChange = (key, field, value) => {
    setCriteriaData((prev) =>
      prev.map((c) => (c.key === key ? { ...c, [field]: value } : c))
    );
  };

  if (error) return <div>Error: {error}</div>;
  if (results.length === 0) return <div>Cargando evaluaciones...</div>;

  const handleSave = async () => {
    try {
      // Preparar scores y notes según el formato que espera el backend
      const scoresPayload = {};
      const commentsPayload = {};

      criteriaData.forEach(c => {
        scoresPayload[c.key] = c.score;
        commentsPayload[c.key] = c.comment;
      });

      const payload = {
        scores: scoresPayload,
        notes: {
          comments: commentsPayload,
          summary: generalComment,
        },
      };

      const res = await fetch(`http://localhost:3000/video/${videoJobId}/evaluation`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Evaluación guardada:', data.evaluation);
        alert('Evaluación guardada correctamente');
      } else {
        console.error('Error guardando evaluación:', data.error);
        alert('Error guardando evaluación: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error guardando evaluación: ' + err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <div className="video-content-container">
            <div className="page-title-container">
              <p className="page-title">Evaluar Video</p>
            </div>

            <div className="video-container">
              <div className="video-player">
                <video controls src={video.urls?.file } width="100%" />
              </div>
            </div>

            <h3 className="section-title">Detalles del Video</h3>
            <div className="details-grid">
              <div className="detail-row">
                <p className="detail-label">Nombre del Video</p>
                <p className="detail-value">{video.title || "Sin título"}</p>
              </div>
              <div className="detail-row">
                <p className="detail-label">Fecha de Subida</p>
                <p className="detail-value">
                  {new Date(video.created_at).toLocaleDateString() || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="sidebar-container">
            <h2 className="rubric-title">Rúbrica de Evaluación</h2>

            <div className="rubric-list" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "8px" }}>
              {criteriaData.map((c) => (
                <div key={c.key} className="rubric-item">
                  {/* Fila superior: info a la izquierda, score a la derecha */}
                  <div className="rubric-row">
                    <div className="rubric-info">
                      <p className="rubric-name">{c.name}</p>
                      <p className="rubric-description">Max: 7</p>
                    </div>

                    <div className="score-controls">
                      <button
                        type="button"
                        className="score-button"
                        onClick={() =>
                          handleChange(c.key, "score", Math.max(0, c.score - 1))
                        }
                      >
                        -
                      </button>
                      <input
                        className="score-input"
                        type="number"
                        value={c.score}
                        onChange={(e) =>
                          handleChange(c.key, "score", Number(e.target.value))
                        }
                      />
                      <button
                        type="button"
                        className="score-button"
                        onClick={() =>
                          handleChange(c.key, "score", Math.min(7, c.score + 1))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Comentario debajo */}
                  <div className="comment-field">
                    <label className="comment-label">
                      <textarea
                        placeholder="Añadir comentarios"
                        className="comment-textarea"
                        value={c.comment}
                        onChange={(e) =>
                          handleChange(c.key, "comment", e.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="general-comments-title">Comentarios Generales</h3>
            <div className="comment-field">
              <label className="comment-label">
                <textarea
                  placeholder="Añadir comentarios generales"
                  className="comment-textarea"
                  value={generalComment}
                  onChange={(e) => setGeneralComment(e.target.value)}
                />
              </label>
            </div>

            <div className="save-button-container">
              <button type="button" className="save-button" onClick={handleSave}>
                <span className="button-text">Guardar Evaluación</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
