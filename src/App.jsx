import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExploreMap from './pages/ExploreMap';
import DestinationDetail from './pages/DestinationDetail';
import GallerySearch from './pages/GallerySearch';
import VirtualTour from './pages/VirtualTour';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<ExploreMap />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/gallery" element={<GallerySearch />} />
          <Route path="/tour" element={<VirtualTour />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;