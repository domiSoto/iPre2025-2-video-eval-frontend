import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "./CreateRubric.css";

export default function CreateRubric() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [existingRubric, setExistingRubric] = useState(false);
  const [aspects, setAspects] = useState([]);
  const [currentAspect, setCurrentAspect] = useState({
    name: "",
    description: "",
    weight: "",
    maxScore: 1
  });
  const [rubricName, setRubricName] = useState("");
  const [rubricDescription, setRubricDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRubric = async () => {
      try {
        const res = await fetch(`http://localhost:3000/workspaces/${workspaceId}/rubric`);
        if (!res.ok) {
          // No existe, dejamos los inputs como están
          return;
        }
        const data = await res.json();
        console.log("Fetched rubric:", data);
        if (data.rubric) {
          setExistingRubric(true);
          setRubricName(data.rubric.name || "");
          setRubricDescription(data.rubric.description || "");
          // Mapear criterios existentes a aspectos
          if (Array.isArray(data.criteria)) {
            const mappedAspects = data.criteria.map(c => ({
              id: c.id,
              name: c.title || "",
              description: c.description || "",
              weight: c.weight || "" , 
              maxScore: c.max_score || 1
            }));
            setAspects(mappedAspects);
          }
        }
      } catch (e) {
        console.error("Failed to fetch rubric:", e);
      }
    };

    fetchRubric();
  }, [workspaceId]);

  const handleInputChange = (field, value) => {
    setCurrentAspect(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAspect = () => {
    if (currentAspect.name.trim()) {
      setAspects(prev => [...prev, { ...currentAspect, id: Date.now() }]);
      setCurrentAspect({
        name: "",
        description: "",
        weight: "",
        maxScore: 1
      });
    }
  };

  const handleRemoveAspect = (id) => {
    setAspects(prev => prev.filter(aspect => aspect.id !== id));
  };

  const handleSaveRubric = async () => {
    if (!rubricName.trim()) {
      setError("Rubric name is required");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Preparamos los criterios en el formato que espera el backend
      const criteria = aspects.map((a, i) => ({
        idx: i,
        title: a.name,
        description: a.description,
        weight: Number(a.weight) || 0,
        max_score: Number(a.maxScore) || 1
      }));

      const body = {
        name: rubricName,
        description: rubricDescription,
        config: [], // puedes poner la configuración adicional si la necesitas
        criteria
      };

      const res = await fetch(`http://localhost:3000/workspaces/${workspaceId}/rubrics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Rubric created successfully!");
        console.log("Created rubric:", data);
      } else {
        setError(data.error || "Failed to create rubric");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
      // Si todo va bien, redirigir
      navigate(`/workspace/${workspaceId}/videos`);
    }
  };

  return (
    <div className="page-container">
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <div className="content-container">
            <div className="page-title-container">
              <p className="page-title">Rubric</p>
            </div>
            
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Rubric Name</p>
                <input
                  className="text-input"
                  value={rubricName}
                  onChange={(e) => setRubricName(e.target.value)}
                  placeholder="Enter rubric name"
                />
              </label>
            </div>
            
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Description</p>
                <input
                  className="text-input"
                  value={rubricDescription}
                  onChange={(e) => setRubricDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </label>
            </div>
            
            <h2 className="section-title">Evaluation Criteria</h2>
            
            {/* Show added aspects */}
            {aspects.length > 0 && (
              <div className="added-aspects-list">
                {aspects.map((aspect) => (
                  <div key={aspect.id} className="aspect-row">
                    <div className="aspect-info">
                      <div className="aspect-name">{aspect.name}</div>
                      <div className="aspect-details">
                        <span className="aspect-detail">{aspect.description}</span>
                        <span className="aspect-detail">Weight: {aspect.weight}%</span>
                        <span className="aspect-detail">Max Score: {aspect.maxScore}</span>
                      </div>
                    </div>
                    {!existingRubric && (
                    <button 
                      className="remove-aspect-button"
                      onClick={() => handleRemoveAspect(aspect.id)}
                    >
                      ×
                    </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {!existingRubric && (
            <>
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Aspect Name</p>
                <input
                  placeholder="Enter aspect name"
                  className="text-input"
                  value={currentAspect.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </label>
            </div>
            
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Description</p>
                <input
                  placeholder="Enter description"
                  className="text-input"
                  value={currentAspect.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </label>
            </div>
            
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Weight (%)</p>
                <input
                  placeholder="Enter weight"
                  className="text-input"
                  value={currentAspect.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </label>
            </div>
            
            <div className="form-field">
              <label className="label-container">
                <p className="field-label">Max Score</p>
                <input
                  type="number"
                  placeholder="Enter max score"
                  className="text-input"
                  value={currentAspect.maxScore}
                  onChange={(e) => handleInputChange('maxScore', e.target.value)}
                  min={1}
                />
              </label>
            </div>
            
            <div className="criteria-button-container">
              <button className="add-button" onClick={handleAddAspect}>
                <span className="button-text">Add Aspect</span>
              </button>
            </div>
            </>
            )}
          </div>
        </div>
        
        {/* Save button positioned at the bottom as main action */}
        {!existingRubric && (
        <div className="save-section">
          <button
            className="save-button"
            onClick={handleSaveRubric}
            disabled={saving}
          >
            <span className="button-text">{saving ? "Saving..." : "Save Rubric"}</span>
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
