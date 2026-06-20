import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, MapPin, Info, ExternalLink, RefreshCw } from 'lucide-react';

// Data Sinkronisasi: Elemen akan muncul berdasarkan waktu (detik) video diputar
const syncData = [
  {
    startTime: 0,
    endTime: 5,
    title: "Memulai Perjalanan",
    description: "Selamat datang di Tur Virtual Kyoto. Bersiaplah untuk menembus ruang dan waktu menyusuri keindahan warisan budaya Jepang.",
    location: "Stasiun Kyoto",
    showAction: false
  },
  {
    startTime: 5,
    endTime: 12,
    title: "Arsitektur Klasik Machiya",
    description: "Perhatikan struktur kayu tradisional di sisi jalan. Bangunan ini disebut Machiya, rumah sekaligus tempat usaha para pedagang Kyoto di masa lampau.",
    location: "Distrik Gion",
    showAction: true,
    actionText: "Pelajari Machiya"
  },
  {
    startTime: 12,
    endTime: 20,
    title: "Harmoni Alam dan Kuil",
    description: "Kuil-kuil di Kyoto selalu dirancang menyatu dengan alam. Pepohonan, air, dan batu disusun sedemikian rupa untuk menciptakan ketenangan batin.",
    location: "Kiyomizu-dera",
    showAction: false
  },
  {
    startTime: 20,
    endTime: 30,
    title: "Musim Gugur yang Menawan",
    description: "Warna kemerahan daun Momiji menjadi daya tarik utama wisatawan. Waktu terbaik untuk berkunjung adalah pertengahan November.",
    location: "Arashiyama",
    showAction: true,
    actionText: "Lihat Galeri Musim Gugur"
  }
];

export default function VirtualTour() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSync, setActiveSync] = useState(syncData[0]);

  // Fungsi Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Fungsi Toggle Mute
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Update waktu dan sinkronisasi data
  const handleTimeUpdate = () => {
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Cari data yang sesuai dengan rentang waktu saat ini
    const currentData = syncData.find(
      (data) => time >= data.startTime && time < data.endTime
    );

    // Update state jika ada data baru yang cocok agar UI tersinkronisasi
    if (currentData && currentData.title !== activeSync.title) {
      setActiveSync(currentData);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const restartVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Tur Virtual <span className="text-red-500">Interaktif</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Demonstrasi sinkronisasi multimedia. Informasi di panel sebelah kanan akan beradaptasi secara otomatis sesuai dengan waktu video yang sedang diputar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* PLAYER MULTIMEDIA UTAMA (Kiri - 2 Kolom) */}
          <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden shadow-2xl relative group border border-gray-800">
            {/* Video Element */}
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              className="w-full h-[400px] md:h-[500px] object-cover"
              src="https://cdn.pixabay.com/video/2020/05/25/40141-424812061_large.mp4" 
              playsInline
            />

            {/* Custom Video Controls */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              
              {/* Progress Bar Simulasi */}
              <div className="w-full bg-gray-700 h-1.5 rounded-full mb-4 overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-300 ease-linear"
                  style={{ width: `${(currentTime / 30) * 100}%` }} // Asumsi video 30 detik untuk demo
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </button>
                  <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                  <button onClick={restartVideo} className="text-white hover:text-red-500 transition-colors">
                    <RefreshCw size={20} />
                  </button>
                  <div className="text-white font-mono text-sm">
                    00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:30
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  <MapPin size={14} className="text-red-500" />
                  <span className="text-white text-xs font-semibold">{activeSync.location}</span>
                </div>
              </div>
            </div>

            {/* Overlay Tombol Play Besar jika Pause */}
            {!isPlaying && currentTime === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <button 
                  onClick={togglePlay}
                  className="bg-red-600 text-white p-6 rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                >
                  <Play size={40} className="ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* PANEL SINKRONISASI INFORMASI (Kanan - 1 Kolom) */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 h-full relative overflow-hidden shadow-xl">
            {/* Dekorasi Background Panel */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-2 mb-8 border-b border-slate-700 pb-4">
              <Info className="text-red-500" size={24} />
              <h2 className="text-xl font-bold text-white tracking-wide">Konteks Media</h2>
            </div>

            {/* AnimatePresence untuk transisi pergantian konten yang mulus */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSync.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="inline-block bg-slate-900 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg w-fit border border-slate-700">
                  {Math.floor(currentTime)}s — Mendeteksi Objek
                </div>
                
                <h3 className="text-3xl font-bold text-white leading-tight">
                  {activeSync.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed text-lg">
                  {activeSync.description}
                </p>

                {/* Tombol Aksi yang tersinkronisasi (Muncul pada waktu tertentu) */}
                {activeSync.showAction && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-center justify-center gap-2 w-full bg-slate-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
                  >
                    {activeSync.actionText} <ExternalLink size={18} />
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}