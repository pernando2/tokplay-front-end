import './App.css';
import { allVideos } from './service.js'
import { Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import DetailPage from './Detailpage.jsx'

allVideos();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id/:youtubeId" element={<DetailPage />} />
    </Routes>
  );
}

export default App;