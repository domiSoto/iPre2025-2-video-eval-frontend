import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const { workspaceId } = useParams();
  const [data, setData] = React.useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/workspaces/${workspaceId}/dashboard`);
        const data = await res.json();
        console.log("Fetched dashboard data:", data);
        setData(data);
      } catch (e) {
        console.error("Failed to fetch dashboard data:", e);
      }
    };

    fetchDashboardData();
  }, [workspaceId]);

  return (
    <div className="dashboard-root">
      <div className="dashboard-layout-container">
        <Navbar />
        <div className="dashboard-content-wrapper">
          <div className="dashboard-content-container">
            <div className="dashboard-summary-row">
              <div className="dashboard-summary-title-group">
                <p className="dashboard-summary-title">Panel de Control del Espacio de Trabajo</p>
                <p className="dashboard-summary-desc">Resumen de evaluaciones y progreso</p>
              </div>
            </div>
            <div className="dashboard-summary-cards-row">
              <div className="dashboard-summary-card">
                <p className="dashboard-summary-card-title">Evaluaciones Completadas</p>
                <p className="dashboard-summary-card-value">{data?.totalEvaluations}</p>
              </div>
              <div className="dashboard-summary-card">
                <p className="dashboard-summary-card-title">Puntuación Promedio</p>
                <p className="dashboard-summary-card-value">{data?.averageScore}</p>
              </div>
              <div className="dashboard-summary-card">
                <p className="dashboard-summary-card-title">Puntuación promedio por criterio</p>
                <p className="dashboard-summary-card-value">{data?.criteriaAverages}</p>
              </div>
            </div>
            <h2 className="dashboard-section-title">Distribución de Puntaje</h2>
            <div className="dashboard-distribution-row">
              <div className="dashboard-distribution-card">
                <p className="dashboard-distribution-card-title">Distribución de Puntaje Total (redondeados)</p>
                <div className="dashboard-distribution-bar-group-flex">
                  {Object.entries(data?.scoreDistribution || {}).map(([score, count], i, arr) => {
                    const max = Math.max(...Object.values(data.scoreDistribution));
                    const percent = (count / max) * 100;
                    return (
                      <div key={i} className="dashboard-distribution-bar-flex">
                        <div className="dashboard-distribution-bar" style={{height: `${percent}%`}}></div>
                        <span className="dashboard-distribution-label">{score}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="dashboard-distribution-card">
                <p className="dashboard-distribution-card-title">Distribución de Puntaje por Criterio de la Rúbrica</p>
                <div className="dashboard-distribution-bar-group-flex">
                  {Object.entries(data?.criteriaDistributions || {}).map(([criterion, dist], i) => {
                    // Tomamos el valor total o el máximo del criterio
                    const total = Object.values(dist).reduce((a, b) => a + b, 0);
                    const max = Math.max(...Object.values(data.criteriaDistributions).map(d => Object.values(d).reduce((a,b)=>a+b,0)));
                    const percent = (total / max) * 100;

                    return (
                      <div key={i} className="dashboard-distribution-bar-flex">
                        <div
                          className="dashboard-distribution-bar"
                          style={{ height: `${percent}%` }}
                        ></div>
                        <span
                          className="dashboard-distribution-label-2"
                          style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}
                        >
                          {criterion}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <h2 className="dashboard-section-title">Evaluaciones Recientes</h2>
            <div className="dashboard-recent-evals-wrapper">
              <div className="dashboard-recent-evals-table-container">
                <table className="dashboard-recent-evals-table">
                  <thead>
                    <tr>
                      <th className="dashboard-table-col-title">Título del Video</th>
                      <th className="dashboard-table-col-score">Puntuación</th>
                      <th className="dashboard-table-col-date">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.recentEvaluations?.length > 0 ? (
                      data.recentEvaluations.map((eval_, index) => (
                        <tr key={index}>
                          <td className="dashboard-table-col-title">{eval_.videoTitle}</td>
                          {/* Cambia si tienes info del evaluador */}
                          <td className="dashboard-table-col-score">
                            <button className="dashboard-score-btn">
                              <span>{eval_.totalScore}</span>
                            </button>
                          </td>
                          <td className="dashboard-table-col-date">
                            {new Date(eval_.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          No hay evaluaciones recientes
                        </td>
                      </tr>
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
