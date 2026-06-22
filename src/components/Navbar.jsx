import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/60 backdrop-blur-md shadow-sm border-b border-white/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-700 tracking-widest">
          EXPLORE KYOTO<span className="text-gray-800">.</span>
        </Link>
        <div className="hidden md:flex gap-8 font-semibold text-gray-700">
          <Link to="/" className="hover:text-red-600 transition duration-300">Beranda</Link>
          <Link to="/map" className="hover:text-red-600 transition duration-300">Peta Wisata</Link>
          <Link to="/gallery" className="hover:text-red-600 transition duration-300">Galeri</Link>
          <Link to="/tour" className="hover:text-red-600 transition duration-300">Virtual Tour</Link>
        </div>
      </div>
    </nav>
  );
}