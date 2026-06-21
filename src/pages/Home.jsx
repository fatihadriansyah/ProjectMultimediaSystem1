import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Landmark, Map, ArrowRight } from 'lucide-react';

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-slate-50 font-sans">
      
      {/* SECTION 1: Hero Sinematik (Anti-Blokir dengan Efek Animasi Looping) */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        
        {/* Gambar Background dengan Animasi Zooming (Ken Burns Effect) */}
        <motion.img
          src="https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&w=1920&q=80" 
          alt="Pemandangan Kyoto Malam Hari"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          animate={{ scale: [1, 1.15, 1] }} // Bergerak membesar lalu mengecil
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} // Looping terus menerus
        />
        
        {/* Overlay Gelap agar Teks Terbaca Jelas */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight">
              Temukan Keajaiban <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Kyoto</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md font-light max-w-2xl mx-auto">
              Jelajahi perpaduan sempurna antara tradisi kuno Jepang dan keindahan alam yang memukau.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/map"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-4 px-10 rounded-full transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)]"
              >
                Mulai Menjelajah <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Sejarah Singkat Kyoto */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <div className="text-red-600 font-bold tracking-widest uppercase mb-2 text-sm">Warisan Budaya</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Jejak Langkah <span className="text-red-600">Seribu Tahun</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Sebelum Tokyo, Kyoto adalah jantung kekaisaran Jepang. Selama lebih dari 1.000 tahun, kota ini menjadi pusat mekarnya seni, budaya, serta agama Buddha dan Shinto yang membentuk identitas Jepang modern.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Hingga hari ini, Kyoto menyimpan keanggunan masa lalu yang berpadu harmonis dengan gemerlap kehidupan masa kini. Setiap sudut jalannya adalah museum hidup yang menanti untuk Anda telusuri.
            </p>
            <Link to="/tour" className="text-red-600 font-bold hover:text-red-800 transition flex items-center gap-2">
              Ikuti Virtual Tour Sejarah <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="relative h-[400px] md:h-[550px] w-full flex justify-center items-center">
            <motion.img 
              whileHover={{ scale: 1.05, rotate: 2, zIndex: 30 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-4 right-4 md:top-0 md:right-0 w-3/5 rounded-3xl shadow-2xl border-8 border-white cursor-pointer origin-bottom-right z-20" 
              src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800" 
              alt="Kinkakuji Temple" 
            />
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-4 left-4 md:bottom-10 md:left-0 w-3/5 rounded-3xl shadow-2xl border-8 border-white cursor-pointer origin-top-left z-10" 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" 
              alt="Arashiyama Bamboo" 
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: Statistik Interaktif */}
      <section className="py-24 bg-red-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600')] bg-cover bg-fixed bg-center mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 to-red-950"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Daya Tarik Tak Pernah Pudar</h2>
            <p className="text-red-200 text-lg md:text-xl max-w-2xl mx-auto">
              Statistik membuktikan mengapa Kyoto selalu menjadi destinasi impian para wisatawan dunia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <Users size={56} className="mx-auto mb-6 text-red-400" />
              <div className="text-6xl font-black mb-2 text-white">50M<span className="text-red-500">+</span></div>
              <p className="text-red-200 font-medium">Turis per Tahun</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <Landmark size={56} className="mx-auto mb-6 text-red-400" />
              <div className="text-6xl font-black mb-2 text-white">17</div>
              <p className="text-red-200 font-medium">Situs Warisan Dunia UNESCO</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <Map size={56} className="mx-auto mb-6 text-red-400" />
              <div className="text-6xl font-black mb-2 text-white">2000<span className="text-red-500">+</span></div>
              <p className="text-red-200 font-medium">Kuil Shinto & Kuil Buddha</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Call To Action (CTA) */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Siap Memulai Perjalanan Virtual Anda?</h2>
          <p className="text-gray-600 mb-10 text-xl leading-relaxed">
            Gunakan peta interaktif kami untuk merencanakan rute Anda, atau kunjungi galeri multimedia untuk melihat arsip digital Kyoto secara lebih dekat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/map" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-2xl transition shadow-lg hover:shadow-xl text-lg">
              Buka Peta Wisata
            </Link>
            <Link to="/gallery" className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-4 px-10 rounded-2xl transition shadow-sm text-lg">
              Eksplorasi Galeri
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}