import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "./DetailedSearch.css";

export default function DetailedSearch() {
  const { videoJobId } = useParams();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  const videoRef = useRef(null);

  // Get the video details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/jobs/${videoJobId}/detailed`);
        const data = await res.json();
        if (res.ok) {
          setResults(data.segments || []);
          setVideoUrl(data.urls?.file || "");
          console.log("Fetched video details:", data);
          console.log("ejemplo", data.segments[0]);
        } else {
          setError(data.error || "Failed to load video details");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [videoJobId]);

  // Filtrar resultados según el texto de búsqueda
  const filteredResults = results.filter(seg =>
    seg.text.toLowerCase().includes(search.toLowerCase())
  );

  const parseTimeToSeconds = (timeStr) => {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      // HH:MM:SS
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // MM:SS
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  };

  // Función para saltar a un tiempo en el video
  const goToTime = (time) => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const timeInSeconds = typeof time === "string" ? parseTimeToSeconds(time) : time;

    console.log("Seeking to time (seconds):", timeInSeconds);

    const seek = () => {
      video.currentTime = timeInSeconds;
      console.log("Video currentTime after assignment:", video.currentTime);
      video.play();
    };

    if (video.readyState >= 1) {
      seek();
    } else {
      video.addEventListener("loadedmetadata", seek);
    }
  };

  return (
    <div className="dsearch-root">
      <Navbar />
      <main className="dsearch-main">
        <div className="dsearch-searchbar" style={{marginBottom: '0.75rem', width: '100%'}}>
          <label className="dsearch-search-label">
            <div className="dsearch-search-box">
              <span className="dsearch-search-icon">{/* Icono */}</span>
              <input
                className="dsearch-search-input"
                type="text"
                placeholder="Buscar un término o frase"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button 
                className="dsearch-clear-btn"
                onClick={() => setSearch("")} // Limpiar búsqueda
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </label>
        </div>

        {/* Contenedor de 2 columnas */}
        <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Columna izquierda: video */}
        <div style={{ flex: 2 }}>
        {videoUrl && (
          <div className="dsearch-video-player" style={{ marginBottom: '2rem', width: '100%' }}>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              style={{ width: "100%", borderRadius: "8px" }}
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        )}
        </div>

        {/* Columna derecha: marcas de tiempo */}
        <div style={{ flex: 1, maxHeight: '70vh', overflowY: 'auto' }}>
        <h2 className="dsearch-results-title">Marcas de tiempo</h2>
        <div className="dsearch-results-list">
          {filteredResults.length > 0 ? (
            filteredResults.map((seg, idx) => (
              <div
                className="dsearch-result-item"
                key={idx}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  goToTime(seg.start);
                }}
              >
                <div className="dsearch-result-info">
                  <p className="dsearch-result-text">{seg.text}</p>
                  <p className="dsearch-result-time">
                    {seg.start} - {seg.end}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </div>
        </div>
      </div>
      </main>
    </div>
  );
}
