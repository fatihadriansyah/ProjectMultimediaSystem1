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

// Data 15 Titik Wisata Kyoto
const kyotoDestinations = [
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
  { id: 15, name: "Kuil Heian", lat: 35.0159, lng: 135.7825, img: "https://images.unsplash.com/photo-1616235889759-53e3ef93c5d6?w=600", desc: "Replika sebagian Istana Kekaisaran Kyoto dengan Torii raksasa." }
];

export default function ExploreMap() {
  // State untuk menyimpan destinasi yang sedang diklik user
  const [activeSpot, setActiveSpot] = useState(null);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 px-6 pb-12">
      
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Peta Interaktif <span className="text-red-600">Kyoto</span></h2>
        <p className="text-gray-600">Temukan 15 titik magis yang menantimu di jantung kota sejarah Jepang.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Peta Leaflet */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 relative z-0 h-[600px]">
          <MapContainer 
            center={[35.0116, 135.7681]} 
            zoom={12} 
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
              // Tampilan awal sebelum user mengklik marker
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