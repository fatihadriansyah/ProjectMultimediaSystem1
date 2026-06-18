import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* 1. Elemen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        {/* Momo-chan menggunakan video placeholder bertema Jepang dari Pixabay. 
            Fatih-sama bisa menggantinya dengan video Kyoto lokal nanti. */}
        <source src="https://cdn.pixabay.com/video/2020/05/25/40141-424812061_large.mp4" type="video/mp4" />
        Browser Fatih-sama tidak mendukung tag video.
      </video>

      {/* 2. Overlay Gelap agar teks mudah dibaca */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* 3. Konten Utama dengan Animasi Framer Motion */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-white/20 backdrop-blur-lg border border-white/30 p-10 md:p-14 rounded-3xl shadow-2xl max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-wide">
            Temukan Keajaiban <br/>
            <span className="text-red-500">Kyoto</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-10 drop-shadow-md font-light">
            Jelajahi perpaduan sempurna antara tradisi kuno Jepang dan keindahan alam yang memukau. Rencanakan perjalanan tak terlupakanmu di sini.
          </p>
          
          {/* Elemen Interaksi: Tombol Navigasi */}
          <Link
            to="/map"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
          >
            Mulai Menjelajah
          </Link>
        </motion.div>
      </div>
      
    </div>
  );
}