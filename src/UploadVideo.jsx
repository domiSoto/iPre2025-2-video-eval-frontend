import React, { useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "./UploadVideo.css";

export default function UploadVideo() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [audioVideoFileName, setAudioVideoFileName] = useState("");
  const [audioVideoFileSize, setAudioVideoFileSize] = useState("");
  const [presentationFileName, setPresentationFileName] = useState("");
  const [presentationFileSize, setPresentationFileSize] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const audioVideoInputRef = useRef();
  const presentationInputRef = useRef();

  const [audioFile, setAudioFile] = useState(null);
  const [presentationFile, setPresentationFile] = useState(null);

  // Función para manejar el cambio de archivo de audio/video
  const handleAudioVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("audio/") && !file.type.startsWith("video/")) {
        alert("Only audio or video files are allowed (e.g., MP3, MP4).");
        return;
      }
      setAudioFile(file);
      setAudioVideoFileName(file.name);
      setAudioVideoFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    }
  };

  // Función para manejar el cambio de archivo de presentación
  const handlePresentationFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf" && file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
        alert("Only PDF and PPTX files are allowed for presentations.");
        return;
      }
      setPresentationFile(file);
      setPresentationFileName(file.name);
      setPresentationFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    }
  };

  // Función para subir los archivos
  const handleUpload = async () => {
    if (!audioFile || !presentationFile) {
      alert("Please select both audio/video and presentation files.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("presentation", presentationFile);
    formData.append("workspaceId", workspaceId);

    setUploading(true);

    try {
      // Realizamos la petición al endpoint /automate
      const response = await fetch("http://localhost:3000/automate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        alert(`Error uploading files: ${errorData.error || response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading files.");
    } finally {
      setUploading(false);
      // Si todo va bien, redirigir
      navigate(`/workspace/${workspaceId}/videos`);
    }
  };

  // Función para abrir los inputs de archivo
  const handleSelectAudioVideoFile = () => {
    audioVideoInputRef.current.click();
  };

  const handleSelectPresentationFile = () => {
    presentationInputRef.current.click();
  };

  return (
    <div className="uploadvideo-root">
        <div className="uploadvideo-layout-container">
        <Navbar />
        <div className="uploadvideo-content-wrapper">
          <div className="uploadvideo-content-container">
            <div className="uploadvideo-title-row">
              <p className="uploadvideo-title-main">Upload Files</p>
            </div>
            <div className="uploadvideo-upload-area">
              <div className="uploadvideo-upload-box">
                <div className="uploadvideo-upload-texts">
                  <p className="uploadvideo-upload-title">Drag and drop an audio/video file here</p>
                  <p className="uploadvideo-upload-desc">Or select a file from your computer</p>
                </div>
                <button className="uploadvideo-select-btn" onClick={handleSelectAudioVideoFile}>
                  <span className="truncate">Select Audio/Video File</span>
                </button>
                <input
                  type="file"
                  ref={audioVideoInputRef}
                  style={{ display: "none" }}
                  onChange={handleAudioVideoFileChange}
                  accept="audio/mpeg,video/mp4"
                />
              </div>
            </div>
            <div className="uploadvideo-file-row">
              <label className="uploadvideo-file-label">
                <p className="uploadvideo-file-label-title">Audio/Video File Name</p>
                <input
                  className="uploadvideo-file-input"
                  value={audioVideoFileName}
                  readOnly
                  placeholder="No file selected"
                />
              </label>
            </div>
            <div className="uploadvideo-file-row">
              <label className="uploadvideo-file-label">
                <p className="uploadvideo-file-label-title">Audio/Video File Size</p>
                <input
                  className="uploadvideo-file-input"
                  value={audioVideoFileSize}
                  readOnly
                  placeholder="-"
                />
              </label>
            </div>

            {/* Sección para subir archivo de presentación */}
            <div className="uploadvideo-upload-area">
              <div className="uploadvideo-upload-box">
                <div className="uploadvideo-upload-texts">
                  <p className="uploadvideo-upload-title">Drag and drop a presentation file here</p>
                  <p className="uploadvideo-upload-desc">Or select a file from your computer</p>
                </div>
                <button className="uploadvideo-select-btn" onClick={handleSelectPresentationFile}>
                  <span className="truncate">Select Presentation File</span>
                </button>
                <input
                  type="file"
                  ref={presentationInputRef}
                  style={{ display: "none" }}
                  onChange={handlePresentationFileChange}
                  accept="application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                />
              </div>
            </div>
            <div className="uploadvideo-file-row">
              <label className="uploadvideo-file-label">
                <p className="uploadvideo-file-label-title">Presentation File Name</p>
                <input
                  className="uploadvideo-file-input"
                  value={presentationFileName}
                  readOnly
                  placeholder="No file selected"
                />
              </label>
            </div>
            <div className="uploadvideo-file-row">
              <label className="uploadvideo-file-label">
                <p className="uploadvideo-file-label-title">Presentation File Size</p>
                <input
                  className="uploadvideo-file-input"
                  value={presentationFileSize}
                  readOnly
                  placeholder="-"
                />
              </label>
            </div>

            {/* Mostrar progreso de subida */}
            {/*
            {uploading && (
              <div>
                <div className="uploadvideo-progress-row">
                  <div className="uploadvideo-progress-info">
                    <p className="uploadvideo-progress-label">Uploading...</p>
                    <p className="uploadvideo-progress-percent">{progress}%</p>
                  </div>
                  <div className="uploadvideo-progress-bar-bg">
                    <div className="uploadvideo-progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
            */}

            {/* Botón para finalizar la subida */}
            <div className="save-section">
              <button className="uploadvideo-upload-btn" onClick={handleUpload} disabled={uploading}>
                <span className="button-text">Upload to Workspace</span>
              </button>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
