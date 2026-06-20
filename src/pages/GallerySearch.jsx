import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Image as ImageIcon, Video, FileText, Tag, Clock, Maximize, User, Calendar, Database } from 'lucide-react';

// Simulasi Database Multimedia (Memenuhi syarat minimal 8 Metadata)
const mediaDatabase = [
  {
    id: 'M001',
    title: 'Kuil Kinkaku-ji di Musim Gugur',
    creator: 'Akira Tanaka',
    dateCreated: '2023-11-15',
    fileFormat: 'JPEG',
    resolution: '3840x2160 (4K)',
    keywords: ['kuil', 'musim gugur', 'emas', 'alam'],
    description: 'Potret Paviliun Emas (Kinkaku-ji) yang dikelilingi daun momiji.',
    category: 'Gambar',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600'
  },
  {
    id: 'M002',
    title: 'Dokumenter Festival Gion Matsuri',
    creator: 'Kyoto Cultural Board',
    dateCreated: '2023-07-17',
    fileFormat: 'MP4 (H.264)',
    duration: '15:30',
    keywords: ['festival', 'budaya', 'parade', 'musim panas'],
    description: 'Video dokumenter kemeriahan parade Yamaboko Junko di Kyoto.',
    category: 'Video',
    accessRights: 'Mahasiswa/Dosen',
    thumbnail: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=600'
  },
  {
    id: 'M003',
    title: 'Sejarah Distrik Gion',
    creator: 'Prof. Kenji Sato',
    dateCreated: '2024-01-10',
    fileFormat: 'PDF',
    size: '2.4 MB',
    keywords: ['sejarah', 'geisha', 'arsitektur', 'gion'],
    description: 'Artikel jurnal mendalam tentang pelestarian arsitektur machiya di Gion.',
    category: 'Dokumen',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1613539246066-78db6ec4aff9?w=600'
  },
  {
    id: 'M004',
    title: 'Suasana Hutan Bambu Arashiyama',
    creator: 'Yuki Yamada',
    dateCreated: '2023-05-20',
    fileFormat: 'MP4 (H.265)',
    duration: '03:45',
    keywords: ['alam', 'bambu', 'arashiyama', 'relaksasi'],
    description: 'Video sinematik menyusuri jalan setapak di hutan bambu Arashiyama.',
    category: 'Video',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600'
  }
];

export default function GallerySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Alur Retrieval: Menyaring data berdasarkan Keyword dan Kategori
  const filteredMedia = mediaDatabase.filter((media) => {
    const matchCategory = selectedCategory === 'Semua' || media.category === selectedCategory;
    const matchSearch = 
      media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
      media.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchCategory && matchSearch;
  });

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Gambar': return <ImageIcon size={18} />;
      case 'Video': return <Video size={18} />;
      case 'Dokumen': return <FileText size={18} />;
      default: return <Database size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Tempat Wisata <span className="text-red-600">Kyoto</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Cari dan temukan aset digital Kyoto. Sistem ini mengindeks file berdasarkan metadata seperti judul, kreator, format file, hingga kata kunci.
          </motion.p>
        </div>

        {/* Search & Filter Section (Interaktif) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl shadow-lg mb-12 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Masukkan query pencarian (ex: kuil, MP4, sejarah)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-lg"
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {['Semua', 'Gambar', 'Video', 'Dokumen'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl whitespace-nowrap transition-all font-semibold ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat !== 'Semua' && getCategoryIcon(cat)}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Section (Grid Metadata) */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="text-red-600" /> Hasil Pencarian
          </h2>
          <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm font-bold">
            {filteredMedia.length} Dokumen Ditemukan
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredMedia.length > 0 ? (
              filteredMedia.map((media) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={media.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Thumbnail Area */}
                    <div className="sm:w-2/5 relative overflow-hidden bg-gray-200">
                      <img 
                        src={media.thumbnail} 
                        alt={media.title} 
                        className="w-full h-48 sm:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        {getCategoryIcon(media.category)} {media.category}
                      </div>
                    </div>

                    {/* Metadata Area */}
                    <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                            {media.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{media.description}</p>
                        
                        {/* 8+ Metadata Display */}
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-600 mb-4">
                          <div className="flex items-center gap-1.5"><User size={14} className="text-red-500"/> {media.creator}</div>
                          <div className="flex items-center gap-1.5"><Calendar size={14} className="text-red-500"/> {media.dateCreated}</div>
                          <div className="flex items-center gap-1.5"><FileText size={14} className="text-red-500"/> {media.fileFormat}</div>
                          {media.duration ? (
                            <div className="flex items-center gap-1.5"><Clock size={14} className="text-red-500"/> {media.duration}</div>
                          ) : (
                            <div className="flex items-center gap-1.5"><Maximize size={14} className="text-red-500"/> {media.resolution || media.size}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {media.keywords.map((kw, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-gray-200">
                              <Tag size={10} /> {kw}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <span className="text-xs font-semibold text-gray-400">ID: {media.id}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${media.accessRights === 'Publik' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            Hak Akses: {media.accessRights}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-gray-500"
              >
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl font-medium">Data multimedia tidak ditemukan.</p>
                <p>Coba gunakan kata kunci lain.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}