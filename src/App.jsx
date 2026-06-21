import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExploreMap from './pages/ExploreMap';
import GallerySearch from './pages/GallerySearch';
import VirtualTour from './pages/VirtualTour';
import DestinationDetail from './pages/DestinationDetail'; // CUKUP SATU KALI SAJA DI SINI YA ✨

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<ExploreMap />} />
        <Route path="/gallery" element={<GallerySearch />} />
        <Route path="/tour" element={<VirtualTour />} />
        <Route path="/detail" element={<DestinationDetail />} />
      </Routes>
    </Router>
  );
}