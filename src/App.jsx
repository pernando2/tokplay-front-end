import "./App.css";
import { allVideos } from "./service.js";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./Home.jsx";
import DetailPage from "./Detailpage.jsx";

allVideos();

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tokplay-front-end/detail/:id/:youtubeId" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
