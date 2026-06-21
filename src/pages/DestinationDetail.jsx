import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Headphones, Clock, Calendar, Star, Info } from 'lucide-react';

export default function DestinationDetail() {
  const location = useLocation();
  
  // Menerima data dari halaman peta. 
  // Jika Fatih-sama mengakses langsung via URL /detail tanpa lewat peta, 
  // maka Fushimi Inari akan menjadi data cadangan (fallback) agar tidak error.
  const destination = location.state?.destination || {
    name: "Fushimi Inari Taisha",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80",
    desc: "Kuil Shinto terpenting yang didedikasikan untuk Inari, dewa padi, agrikultur, dan bisnis Shinto."
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Tombol Kembali */}
      <div className="absolute top-24 left-6 z-30">
        <Link 
          to="/map" 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md text-gray-800 px-5 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 hover:text-white transition-all"
        >
          <ArrowLeft size={20} /> Kembali ke Peta
        </Link>
      </div>

      {/* HERO IMAGE SECTION (Dinamis) */}
      <section className="relative h-[60vh] w-full bg-slate-900 overflow-hidden">
        <motion.img
          key={destination.name} // Memaksa animasi ulang setiap data berubah
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={destination.img}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="max-w-5xl mx-auto px-6 -mt-32 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
        >
          {/* Header Konten (Dinamis) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-red-600 font-bold mb-3 uppercase tracking-wider text-sm">
                <MapPin size={18} /> Kyoto, Jepang
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1"><Star size={14}/> Top Destinasi</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1"><Clock size={14}/> Jam Operasional Berlaku</span>
              </div>
            </div>
          </div>

          {/* PEMUTAR AUDIO */}
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="bg-red-600 p-5 rounded-full shadow-lg shadow-red-600/30 shrink-0">
                <Headphones size={40} className="text-white" />
              </div>
              <div className="flex-1 w-full text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Panduan Audio Eksklusif (MP3)</h3>
                <p className="text-gray-400 mb-4 text-sm">Dengarkan panduan sejarah dan informasi singkat mengenai {destination.name} langsung dari perangkat Anda.</p>
                
                <audio 
                  controls 
                  className="w-full h-12 rounded-lg outline-none"
                  controlsList="nodownload"
                >
                  {/* Gunakan file mp3 lokal untuk presentasi yang aman */}
                  <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mpeg" />
                  Browser Anda tidak mendukung elemen audio.
                </audio>
              </div>
            </div>
          </div>

          {/* Teks Penjelasan (Dinamis + Teks Filler) */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="font-bold text-2xl text-gray-800 mb-6 border-l-4 border-red-600 pl-4">
              {destination.desc}
            </p>
            
            <div className="bg-blue-50 p-6 rounded-2xl text-blue-800 mb-6 flex items-start gap-4">
              <Info className="shrink-0 mt-1" />
              <p className="m-0 text-sm">
                <strong>Catatan Prototipe:</strong> Ini adalah simulasi dari Sistem Multimedia Digital. Pada lingkungan produksi nyata, teks di bawah ini akan dihubungkan ke Database Retrieval untuk menampilkan sejarah lengkap spesifik dari masing-masing 35 destinasi wisata.
              </p>
            </div>

            <p>
              Kyoto merupakan perwujudan dari sejarah panjang dan budaya tradisional Jepang yang terus hidup berdampingan dengan era modern. Setiap destinasi di kota ini dirancang dengan filosofi yang mendalam, menonjolkan harmoni antara elemen alam seperti batu, air, dan pepohonan dengan mahakarya arsitektur kayu yang tahan terhadap gempa.
            </p>
            <p>
              Mengunjungi situs bersejarah ini bukan sekadar liburan, melainkan sebuah perjalanan spiritual untuk memahami konsep <em>Zen</em>, <em>Wabi-sabi</em> (menemukan keindahan dalam ketidaksempurnaan), dan pelestarian identitas luhur yang tidak tergerus oleh waktu. Pastikan Anda memanfaatkan fitur Panduan Audio di atas agar pengalaman berkeliling Anda terasa seperti ditemani pemandu wisata pribadi.
            </p>
          </div>

        </motion.div>
      </section>
    </div>
  );
}