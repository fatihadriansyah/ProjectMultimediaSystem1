import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Headphones, Play, Pause, MapPin, Calendar } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Mock Data untuk Detail Destinasi (Fokus ke ID 1: Fushimi Inari sebagai contoh)
const detailData = {
  "1": {
    name: "Fushimi Inari Taisha",
    category: "Kuil Shinto",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200",
    desc: "Kuil Shinto yang terkenal dengan ribuan gerbang Torii berwarna merah yang membentang ke atas gunung suci Inari. Tempat ini didedikasikan untuk Inari, dewa padi dan pertanian dalam kepercayaan Shinto.",
    history: "Didirikan pada tahun 711 Masehi, jauh sebelum Kyoto menjadi ibu kota Jepang. Rubah (kitsune) dianggap sebagai utusan suci dewa Inari, sehingga Anda akan melihat banyak patung rubah di seluruh area kuil ini.",
    // Audio dummy (Nanti bisa diganti dengan narasi suara Fatih-sama file .mp3 lokal)
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  }
};

export default function DestinationDetail() {
  const { id } = useParams();
  // Ambil data berdasarkan ID dari URL, jika tidak ada fallback ke ID 1
  const destination = detailData[id] || detailData["1"]; 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Kembali */}
        <Link to="/map" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 transition mb-6 font-medium">
          <ArrowLeft size={20} /> Kembali ke Peta
        </Link>

        {/* Elemen Gambar Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-8"
        >
          <img src={destination.img} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="text-red-400 font-bold tracking-wider text-sm mb-2 uppercase">{destination.category}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span className="flex items-center gap-1"><MapPin size={16}/> Kyoto, Jepang</span>
              <span className="flex items-center gap-1"><Calendar size={16}/> Est. 711 M</span>
            </div>
          </div>
        </motion.div>

        {/* Grid Konten Detail & Audio Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kolom Kiri: Teks Deskripsi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Destinasi</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              {destination.desc}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sejarah Singkat</h3>
            <p className="text-gray-600 leading-relaxed">
              {destination.history}
            </p>
          </motion.div>

          {/* Kolom Kanan: Multimedia Synchronization (Audio Guide) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit"
          >
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <Headphones size={24} />
              <h3 className="text-xl font-bold text-gray-900">Audio Guide</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Dengarkan narasi sejarah tempat ini untuk pengalaman yang lebih interaktif.
            </p>

            {/* Elemen HTML5 Audio Tersembunyi */}
            <audio 
              ref={audioRef} 
              src={destination.audioUrl} 
              onEnded={() => setIsPlaying(false)}
            />

            {/* Custom UI Button untuk memutar Audio */}
            <button 
              onClick={toggleAudio}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg'}`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Jeda Audio Guide' : 'Putar Audio Guide'}
            </button>
            
            {isPlaying && (
              <div className="mt-4 flex justify-center">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="ml-2 text-xs text-red-500 font-medium">Sedang memutar narasi...</span>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}