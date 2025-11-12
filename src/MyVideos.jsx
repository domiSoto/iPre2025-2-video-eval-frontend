import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./MyVideos.css";
import Navbar from "./Navbar";

const videos = [
  {
    preview:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAA9zAGtI1aemayEWMpkd5rHH8exA8wrD6wzgkzUKuL8_QYBoacX-eEf9kaGfh-eoPjrf0eRfDSaskm1kQdYIr7qw8SEn85pa0UHgNaHqshpg5faDQeO4ZYeMJ0_M2-FsCnk_jEKhHJ3fgoGHAdc0-Mb2nhjkXqsrosfSGyMk0DnLLUguda6XhfwdpFL3Io7sOqItj96nx5bT2et0ryLFpZ6QE4wPIQsWH2jEl6gpg8Poak0JPupVuvfAQRwJKdGyQ7XJaIALZo_Qw",
    status: "No evaluado",
  },
  {
    preview:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrVDVbAG-j2GXoXc_JyjbSEVw4S2Fe_ya12pmPY4kVW7sgZU8LuDHc47kzJ6iUdH1k5t5XHtPmOZ2Al11RNDKE8dwDtOG5eXHbV_1vbd9H2R5INHh9F73O_utupmygrTv2uQuRNl8V0z4GYgrx-TuqOVDqp_KqaxiHpyX8-2gVhMQOPoKuf1fWwVY6V-XKpEMmmGg9RlQ2hpGFjMkYUGCea3jjB_YzUbYZNWIc0Gdryo27_ddL_-LCq8a7V6dz6JkxCdfjeC9RmSs",
    status: "Evaluado",
  },
  {
    preview:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdYTNzqUj5ls3H91uQp9NrTbXxG3oZfB9U9S1LLrgecb9V7QYtO_WAMwmx1YevcRyd0-3rZpSbt9Lq4msUkuFTFZWLN6SuRmrPAELhoz5tG8wq-vceSQpZum0EU4iYFC302rlLxvNlCFSq-Vu-qVZHbhemUXLA40Io_e157mZF6T_rLoW1-ftomGDoyLsJfgeK8kc-x-PAW49EHjXRVpWJ85SLdlUyqJ7O8wUE0Ow2RRgUnwkDupLz1ldpZuQGm9p8KpxPheZMNC4",
    status: "No evaluado",
  },
  {
    preview:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsDFsxmD6Cw3Dwk7dC8FLjlQklp8BD5jmA56L9fM5SPyXpjF18VYFrO8MjxaybCwoMe-Go0MNB45fTrU9JZwEQafVBjOjVqaLPTp_6mc35715LnHUuGiKMGECjypZfrCnuGqtMcWWIo2Q4XLUK64dloqnV8qr0SC8vkqabjuVxK4CdsUpS8fAmH-ej_8Me0SSdLov0dGOo29vkvhd6YIA2tKD55NLJ7mW9N-UbAscgiBtLTZfM4UzPoiRJ6172guwWjQSu_k2oEy4",
    status: "Evaluado",
  },
  {
    preview:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAdbjQOIlCNJ6pMqxlgA57ropN30JWWJDRfkXddBqPgeZeahIrtnf2rxPUhJf05a_9ApvrXXR8kmyBQ8dDpZHFZF7NdJq8etW-ZzybURZDhxfSEa1sAsmt2MfOAZNEO_7u70EZj1FApLn64H4LLkKdIJPyU1f30RcJ9ZHcB5yLQKle041fn1HRIBO6sGDvjM7mGubezWSaPB1R-6O6f8z1thIfYHL9EGGM6W5oo4mNVW-frtPBC4TVKFwzbHGfjPTQUcOTr8oacEA",
    status: "No evaluado",
  },
];

export default function MyVideos() {
  const { id } = useParams();
  const navigate = useNavigate();

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
                    <th className="dashboard-table-col-evaluator">Estado</th>
                    <th className="dashboard-table-col-score">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video, idx) => (
                    <tr key={idx}>
                        <td className="dashboard-table-col-title">
                          <div
                            className="videos-preview-img"
                            style={{ backgroundImage: `url('${video.preview}')`, width: '120px', height: '70px', backgroundSize: 'cover', backgroundPosition: 'center', marginLeft: 0 }}
                          ></div>
                        </td>
                        <td className="dashboard-table-col-evaluator">{video.status}</td>
                        <td className="dashboard-table-col-score">
                          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <button className="dashboard-score-btn" onClick={() => navigate('/detailed-search')}>
                              <span>Ver Video</span>
                            </button>
                            <button className="dashboard-score-btn" onClick={() => navigate('/evaluate-video')}>
                              <span>Evaluar</span>
                            </button>
                          </div>
                        </td>
                    </tr>
                    ))}
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
