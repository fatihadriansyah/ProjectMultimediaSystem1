import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, MapPin, Info, ExternalLink, RefreshCw } from 'lucide-react';

// Import video lokal secara langsung dari folder assets sesuai nama di screenshot
import kyotoVideo from '../assets/kyoto-tour.mp4.mp4';

// Data Sinkronisasi disesuaikan untuk rentang waktu 5 menit (300 detik)
const syncData = [
  {
    startTime: 0,
    endTime: 45, // 0 - 45 Detik
    title: "Memulai Perjalanan",
    description: "Selamat datang di Tur Virtual Kyoto. Bersiaplah untuk menembus ruang dan waktu menyusuri keindahan warisan budaya Jepang.",
    location: "Pusat Kota Kyoto",
    showAction: false
  },
  {
    startTime: 45,
    endTime: 120, // 45 Detik - 2 Menit
    title: "Arsitektur Klasik Machiya",
    description: "Perhatikan struktur kayu tradisional di sisi jalan. Bangunan ini disebut Machiya, rumah sekaligus tempat usaha para pedagang Kyoto di masa lampau.",
    location: "Distrik Gion",
    showAction: true,
    actionText: "Pelajari Machiya"
  },
  {
    startTime: 120,
    endTime: 210, // 2 Menit - 3.5 Menit
    title: "Harmoni Alam dan Kuil",
    description: "Kuil-kuil di Kyoto selalu dirancang menyatu dengan alam. Pepohonan, air, dan batu disusun sedemikian rupa untuk menciptakan ketenangan batin.",
    location: "Kiyomizu-dera",
    showAction: false
  },
  {
    startTime: 210,
    endTime: 310, // 3.5 Menit - Akhir (Diberi buffer ekstra)
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
  const [isMuted, setIsMuted] = useState(false); // Dibuat false agar suara langsung nyala jika diputar manual
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // Default 5 menit
  const [activeSync, setActiveSync] = useState(syncData[0]);

  // Fungsi utilitas untuk memformat detik menjadi MM:SS
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);

      const currentData = syncData.find(
        (data) => time >= data.startTime && time < data.endTime
      );

      if (currentData && currentData.title !== activeSync.title) {
        setActiveSync(currentData);
      }
    }
  };

  // Mengambil durasi total video saat metadata berhasil diload
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
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
          
          <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden shadow-2xl relative group border border-gray-800">
            {/* Menggunakan variabel kyotoVideo yang sudah di-import dari folder assets */}
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnd}
              className="w-full h-[400px] md:h-[500px] object-cover bg-gray-900"
              src={kyotoVideo} 
              playsInline
              preload="auto"
              muted={isMuted}
            />

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              
              {/* Progress Bar Dinamis menggunakan persentase durasi */}
              <div className="w-full bg-gray-700 h-1.5 rounded-full mb-4 overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-300 ease-linear"
                  style={{ width: `${(currentTime / duration) * 100}%` }} 
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
                  {/* Timer yang mendukung format menit MM:SS */}
                  <div className="text-white font-mono text-sm tracking-wide">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  <MapPin size={14} className="text-red-500" />
                  <span className="text-white text-xs font-semibold">{activeSync.location}</span>
                </div>
              </div>
            </div>

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

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 h-full relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-2 mb-8 border-b border-slate-700 pb-4">
              <Info className="text-red-500" size={24} />
              <h2 className="text-xl font-bold text-white tracking-wide">Konteks Media</h2>
            </div>

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
                  {formatTime(currentTime)} — Mendeteksi Objek
                </div>
                
                <h3 className="text-3xl font-bold text-white leading-tight">
                  {activeSync.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed text-lg">
                  {activeSync.description}
                </p>

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