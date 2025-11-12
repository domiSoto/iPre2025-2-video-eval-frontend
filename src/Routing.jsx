import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import WorkspaceForm from './Workspace';
import CreateRubric from './CreateRubric';
import EvaluateVideo from './EvaluateVideo';
import DetailedSearch from './DetailedSearch';
import Dashboard from './Dashboard';
import UploadVideo from './UploadVideo';
import MyWorkspaces from './MyWorkspaces';
import MyVideos from './MyVideos';

function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App />}/>
                <Route path={"/my-workspaces"} element={<MyWorkspaces />}/>

                <Route path={"/create-workspace"} element={<WorkspaceForm mode="create" />}/>
                <Route path={"/workspace/:workspaceId"} element={<WorkspaceForm mode="view" />}/>

                <Route path={"/workspace/:workspaceId/create-rubric/"} element={<CreateRubric />}/>
                <Route path={"/workspace/:workspaceId/upload-video"} element={<UploadVideo />}/>
                <Route path={"/workspace/:workspaceId/videos"} element={<MyVideos />}/>
                <Route path={"/workspace/:workspaceId/dashboard"} element={<Dashboard />}/>

                <Route path={"/evaluate-video/:videoId"} element={<EvaluateVideo />}/>
                <Route path={"/detailed-search/:videoId"} element={<DetailedSearch />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;