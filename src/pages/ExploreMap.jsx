import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

// Custom Icon ala prototype HTML sebelumnya
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Data 35 Titik Wisata Kyoto (Diperluas secara masif)
const kyotoDestinations = [
  // 15 Data Original
  { id: 1, name: "Fushimi Inari Taisha", lat: 34.9671, lng: 135.7727, img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600", desc: "Kuil Shinto dengan ribuan gerbang Torii merah yang ikonis." },
  { id: 2, name: "Kinkaku-ji (Paviliun Emas)", lat: 35.0394, lng: 135.7292, img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600", desc: "Kuil Zen indah yang dua lantai teratasnya dilapisi daun emas." },
  { id: 3, name: "Kiyomizu-dera", lat: 34.9948, lng: 135.7850, img: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=600", desc: "Kuil kuno dengan panggung kayu besar tanpa paku." },
  { id: 4, name: "Hutan Bambu Arashiyama", lat: 35.0094, lng: 135.6668, img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=600", desc: "Jalan setapak yang diapit pohon bambu raksasa." },
  { id: 5, name: "Distrik Gion", lat: 35.0037, lng: 135.7736, img: "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=600", desc: "Distrik Geisha tradisional dengan jalanan berbatu." },
  { id: 6, name: "Kastil Nijo", lat: 35.0142, lng: 135.7482, img: "https://images.unsplash.com/photo-1623883134909-0268ec3b2074?w=600", desc: "Bekas kediaman Shogun Tokugawa yang megah." },
  { id: 7, name: "Kuil Yasaka", lat: 35.0036, lng: 135.7785, img: "https://images.unsplash.com/photo-1574340316335-5154eeaf83a2?w=600", desc: "Kuil utama yang terkenal dengan festival Gion Matsuri." },
  { id: 8, name: "Ginkaku-ji (Paviliun Perak)", lat: 35.0270, lng: 135.7982, img: "https://images.unsplash.com/photo-1596495392661-d70b5d92df9a?w=600", desc: "Kuil Zen yang terkenal dengan taman pasir klasiknya." },
  { id: 9, name: "Pasar Nishiki", lat: 35.0050, lng: 135.7649, img: "https://images.unsplash.com/photo-1570146059632-15f60cd0fa47?w=600", desc: "Dapur Kyoto yang dipenuhi ratusan kedai kuliner lokal." },
  { id: 10, name: "Kyoto Tower", lat: 34.9875, lng: 135.7593, img: "https://images.unsplash.com/photo-1582650507271-e013eb19430c?w=600", desc: "Menara observasi ikonik tepat di depan Stasiun Kyoto." },
  { id: 11, name: "Sanjusangen-do", lat: 34.9879, lng: 135.7717, img: "https://images.unsplash.com/photo-1601007908920-5e36f977bdcc?w=600", desc: "Menyimpan 1.001 patung dewi Kannon berukuran manusia." },
  { id: 12, name: "Philosopher's Path", lat: 35.0268, lng: 135.7944, img: "https://images.unsplash.com/photo-1521252178229-41804f3ce9de?w=600", desc: "Jalur batu indah di sepanjang kanal berlapis sakura." },
  { id: 13, name: "Ryoan-ji", lat: 35.0345, lng: 135.7182, img: "https://images.unsplash.com/photo-1563200788-299f06798c8c?w=600", desc: "Menyimpan taman batu Karesansui paling terkenal di Jepang." },
  { id: 14, name: "Tofuku-ji", lat: 34.9765, lng: 135.7741, img: "https://images.unsplash.com/photo-1509315629115-842ebfa4e99f?w=600", desc: "Spot spektakuler dengan jembatan kayu untuk menikmati musim gugur." },
  { id: 15, name: "Kuil Heian", lat: 35.0159, lng: 135.7825, img: "https://images.unsplash.com/photo-1616235889759-53e3ef93c5d6?w=600", desc: "Replika sebagian Istana Kekaisaran Kyoto dengan Torii raksasa." },
  
  // 20 Data Tambahan Baru
  { id: 16, name: "Istana Kekaisaran Kyoto", lat: 35.0254, lng: 135.7621, img: "https://images.unsplash.com/photo-1599573836371-3312c5890fae?w=600", desc: "Tempat kediaman keluarga Kekaisaran Jepang hingga tahun 1868." },
  { id: 17, name: "Kuil To-ji", lat: 34.9811, lng: 135.7476, img: "https://images.unsplash.com/photo-1590252985145-6677fbc56598?w=600", desc: "Situs Warisan Dunia dengan pagoda kayu tertinggi di Jepang." },
  { id: 18, name: "Kuil Byodo-in", lat: 34.8893, lng: 135.8077, img: "https://images.unsplash.com/photo-1578439297699-dd6e86ec16f2?w=600", desc: "Kuil spektakuler yang tergambar di koin 10 yen Jepang." },
  { id: 19, name: "Kuil Daigo-ji", lat: 34.9510, lng: 135.8197, img: "https://images.unsplash.com/photo-1617462002341-2a1e16fc01ab?w=600", desc: "Kompleks kuil besar yang sangat indah saat musim gugur." },
  { id: 20, name: "Eikan-do Zenrin-ji", lat: 35.0144, lng: 135.7955, img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=600", desc: "Sangat populer dengan daun musim gugurnya yang bercahaya di malam hari." },
  { id: 21, name: "Kuil Ninna-ji", lat: 35.0297, lng: 135.7138, img: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=600", desc: "Terkenal dengan kebun pohon sakura Omuro yang mekar terlambat." },
  { id: 22, name: "Kuil Tenryu-ji", lat: 35.0157, lng: 135.6737, img: "https://images.unsplash.com/photo-1505069792019-3dbba41b0722?w=600", desc: "Kuil utama Zen di Arashiyama dengan taman lanskap memukau." },
  { id: 23, name: "Kuil Shimogamo", lat: 35.0392, lng: 135.7730, img: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=600", desc: "Salah satu kuil Shinto tertua, terletak di hutan Tadasu no Mori." },
  { id: 24, name: "Kuil Kamigamo", lat: 35.0598, lng: 135.7518, img: "https://images.unsplash.com/photo-1627885906232-23fce23b827e?w=600", desc: "Situs warisan dunia dengan festival pacuan kuda kuno yang unik." },
  { id: 25, name: "Museum Nasional Kyoto", lat: 34.9900, lng: 135.7730, img: "https://images.unsplash.com/photo-1566418805626-d2ef5ed029e2?w=600", desc: "Museum yang menyimpan seni rupa dan artefak era pra-modern Jepang." },
  { id: 26, name: "Museum Kereta Api Kyoto", lat: 34.9866, lng: 135.7422, img: "https://images.unsplash.com/photo-1560961817-2ee0f331abec?w=600", desc: "Menampilkan koleksi lengkap sejarah kereta uap hingga Shinkansen." },
  { id: 27, name: "Pontocho Alley", lat: 35.0058, lng: 135.7708, img: "https://images.unsplash.com/photo-1565103688126-21804e13dcfa?w=600", desc: "Gang sempit di tepi sungai yang dipenuhi restoran dan lampion tradisional." },
  { id: 28, name: "Gion Shirakawa", lat: 35.0059, lng: 135.7733, img: "https://images.unsplash.com/photo-1582236371587-0b1a030d9ce6?w=600", desc: "Area pelestarian rumah kayu dengan aliran kanal yang syahdu." },
  { id: 29, name: "Taman Maruyama", lat: 35.0036, lng: 135.7801, img: "https://images.unsplash.com/photo-1521252178229-41804f3ce9de?w=600", desc: "Taman umum tertua di Kyoto, pusat keramaian saat melihat bunga Sakura (Hanami)." },
  { id: 30, name: "Kuil Kodai-ji", lat: 35.0006, lng: 135.7808, img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600", desc: "Kuil indah untuk mengenang Toyotomi Hideyoshi dengan iluminasi malam." },
  { id: 31, name: "Kuil Daitoku-ji", lat: 35.0435, lng: 135.7454, img: "https://images.unsplash.com/photo-1563200788-299f06798c8c?w=600", desc: "Kompleks besar kuil Zen yang sangat terkenal dengan upacara minum teh." },
  { id: 32, name: "Kuil Kennin-ji", lat: 35.0007, lng: 135.7736, img: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=600", desc: "Kuil Zen tertua di Kyoto dengan lukisan naga kembar di langit-langit." },
  { id: 33, name: "Kuil Nanzen-ji", lat: 35.0112, lng: 135.7930, img: "https://images.unsplash.com/photo-1596495392661-d70b5d92df9a?w=600", desc: "Kuil dengan gerbang Sanmon raksasa dan saluran air bata merah bergaya Roma." },
  { id: 34, name: "Katsura Imperial Villa", lat: 34.9839, lng: 135.6967, img: "https://images.unsplash.com/photo-1518331189447-97d8487b22cf?w=600", desc: "Mahakarya arsitektur Jepang dan puncak estetika desain taman tradisional." },
  { id: 35, name: "Arashiyama Monkey Park", lat: 35.0098, lng: 135.6763, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600", desc: "Mendaki gunung untuk berinteraksi dengan ratusan kera Jepang liar di habitatnya." }
];

export default function ExploreMap() {
  const [activeSpot, setActiveSpot] = useState(null);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 px-6 pb-12">
      
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Peta Interaktif <span className="text-red-600">Kyoto</span></h2>
        <p className="text-gray-600">Temukan 35 titik magis yang menantimu di jantung kota sejarah Jepang.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Peta Leaflet */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 relative z-0 h-[600px]">
          <MapContainer 
            center={[35.0116, 135.7681]} 
            zoom={13} 
            className="w-full h-full rounded-2xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            {kyotoDestinations.map((spot) => (
              <Marker 
                key={spot.id} 
                position={[spot.lat, spot.lng]} 
                icon={customIcon}
                eventHandlers={{
                  click: () => setActiveSpot(spot),
                }}
              >
                <Popup className="font-sans font-semibold">
                  {spot.name}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Kolom Kanan: Panel Info Interaktif */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeSpot ? (
              <motion.div
                key={activeSpot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <img 
                  src={activeSpot.img} 
                  alt={activeSpot.name} 
                  className="w-full h-56 object-cover rounded-xl mb-6 shadow-sm"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="text-red-500" size={24} />
                  {activeSpot.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {activeSpot.desc}
                </p>
                <div className="mt-auto">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2">
                    <Navigation size={18} />
                    Lihat Detail Penuh
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 p-8"
              >
                <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Klik salah satu pin merah pada peta untuk melihat detail tempat wisata.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}