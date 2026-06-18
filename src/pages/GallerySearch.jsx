import { useState } from 'react';
import { Search, Filter, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Database Multimedia dengan 8 Metadata Wajib
const multimediaDatabase = [
  {
    id: "M001",
    title: "Kuil Kinkaku-ji Musim Gugur", // 1. Title
    creator: "Fatih-sama",              // 2. Creator
    dateCreated: "2026-06-15",          // 3. Date Created
    fileFormat: "JPEG",                 // 4. File Format
    resolution: "1920x1080",            // 5. Resolution
    duration: "-",                      // 6. Duration (Kosong karena gambar)
    keywords: ["kuil", "emas", "kinkakuji", "musim gugur", "sejarah"], // 7. Keyword
    description: "Pemandangan indah Paviliun Emas saat daun berguguran.", // 8. Description
    category: "Sejarah",                // 9. Category
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800"
  },
  {
    id: "M002",
    title: "Suasana Malam Gion",
    creator: "Admin Pariwisata",
    dateCreated: "2026-05-20",
    fileFormat: "PNG",
    resolution: "1080x1080",
    duration: "-",
    keywords: ["gion", "malam", "lampion", "geisha", "jalan"],
    description: "Jalanan berbatu di distrik Gion yang diterangi lampion tradisional.",
    category: "Budaya",
    url: "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=800"
  },
  {
    id: "M003",
    title: "Hutan Bambu Arashiyama",
    creator: "Fatih-sama",
    dateCreated: "2026-06-10",
    fileFormat: "WebP",
    resolution: "4K",
    duration: "-",
    keywords: ["alam", "bambu", "arashiyama", "hijau", "pagi"],
    description: "Sinar matahari pagi menembus lebatnya hutan bambu Arashiyama.",
    category: "Alam",
    url: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800"
  },
  {
    id: "M004",
    title: "Kuliner Pasar Nishiki",
    creator: "Fatih-sama",
    dateCreated: "2026-06-12",
    fileFormat: "JPEG",
    resolution: "1920x1080",
    duration: "-",
    keywords: ["makanan", "pasar", "nishiki", "kuliner", "ramai"],
    description: "Berbagai macam jajanan khas Jepang yang dijual di Pasar Nishiki.",
    category: "Kuliner",
    url: "https://images.unsplash.com/photo-1570146059632-15f60cd0fa47?w=800"
  }
];

export default function GallerySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Logika Pencarian & Retrieval berdasarkan Keyword dan Kategori
  const filteredData = multimediaDatabase.filter((item) => {
    const matchCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Arsip <span className="text-red-600">Digital</span></h2>
          <p className="text-gray-600">Cari koleksi multimedia Kyoto melalui sistem metadata terstruktur.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan judul atau kata kunci (contoh: bambu, kuil)..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-red-500 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['Semua', 'Alam', 'Budaya', 'Sejarah', 'Kuliner'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap transition font-medium flex items-center gap-2 ${activeCategory === cat ? 'bg-red-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {cat === 'Semua' && <Filter size={16} />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Galeri Grid (Menampilkan Thumbnail & Sebagian Metadata) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-100 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-mono">
                    {item.fileFormat} • {item.resolution}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-red-600 font-semibold mb-1 uppercase tracking-wider">{item.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                  
                  {/* Metadata Ringkas */}
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-xs text-gray-400">
                    <span>Oleh: {item.creator}</span>
                    <span>{item.dateCreated}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center">
              <ImageIcon size={64} className="mb-4 opacity-20" />
              <p className="text-xl">Tidak ada media yang cocok dengan kata kunci tersebut.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}