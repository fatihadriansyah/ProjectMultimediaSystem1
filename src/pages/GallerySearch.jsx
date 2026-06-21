import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, Video, FileText, Tag, Clock, Maximize, User, Calendar, Database, X, Download, UploadCloud, Link as LinkIcon } from 'lucide-react';

const initialMediaDatabase = [
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
  },
  {
    id: 'M005',
    title: 'Ribuan Gerbang Torii',
    creator: 'Hiroshi Nakamura',
    dateCreated: '2024-02-14',
    fileFormat: 'PNG',
    resolution: '1920x1080 (FHD)',
    keywords: ['kuil', 'torii', 'merah', 'fushimi inari'],
    description: 'Foto ikonik lorong gerbang torii di Kuil Fushimi Inari Taisha.',
    category: 'Gambar',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600'
  },
  {
    id: 'M006',
    title: 'Panduan Rute Transportasi Bus Kyoto',
    creator: 'Kyoto Tourism Bureau',
    dateCreated: '2024-03-01',
    fileFormat: 'PDF',
    size: '5.1 MB',
    keywords: ['transportasi', 'peta', 'bus', 'panduan'],
    description: 'Peta resmi rute bus kota Kyoto untuk wisatawan.',
    category: 'Dokumen',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600'
  },
  {
    id: 'M007',
    title: 'Vlog Kuliner di Pasar Nishiki',
    creator: 'Sakura Eats',
    dateCreated: '2023-09-12',
    fileFormat: 'MP4 (H.264)',
    duration: '12:05',
    keywords: ['makanan', 'pasar', 'kuliner', 'nishiki'],
    description: 'Vlog ulasan makanan jalanan terbaik di Dapur Kyoto, Pasar Nishiki.',
    category: 'Video',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1570146059632-15f60cd0fa47?w=600'
  },
  {
    id: 'M008',
    title: 'Pemandangan Malam Menara Kyoto',
    creator: 'Daiki Ito',
    dateCreated: '2023-12-25',
    fileFormat: 'JPEG',
    resolution: '2560x1440 (2K)',
    keywords: ['kota', 'malam', 'menara', 'modern'],
    description: 'Pemandangan Kyoto Tower yang menyala terang di tengah kota pada malam hari.',
    category: 'Gambar',
    accessRights: 'Mahasiswa/Dosen',
    thumbnail: 'https://images.unsplash.com/photo-1582650507271-e013eb19430c?w=600'
  },
  {
    id: 'M009',
    title: 'Arsitektur Kayu Kiyomizu-dera',
    creator: 'Taro Yamamoto',
    dateCreated: '2024-04-05',
    fileFormat: 'JPEG',
    resolution: '3840x2160 (4K)',
    keywords: ['kuil', 'arsitektur', 'kayu', 'kiyomizu-dera'],
    description: 'Detail struktur penyangga kayu ikonik dari panggung Kuil Kiyomizu-dera.',
    category: 'Gambar',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=600'
  },
  {
    id: 'M010',
    title: 'Simulasi Upacara Minum Teh (Chanoyu)',
    creator: 'Urasenke Tea School',
    dateCreated: '2023-10-20',
    fileFormat: 'MP4 (H.265)',
    duration: '25:10',
    keywords: ['budaya', 'teh', 'upacara', 'tradisi'],
    description: 'Video edukasi yang menunjukkan tata cara upacara minum teh tradisional.',
    category: 'Video',
    accessRights: 'Mahasiswa/Dosen',
    thumbnail: 'https://images.unsplash.com/photo-1582782787883-9b16eaab8749?w=600'
  },
  {
    id: 'M011',
    title: 'Denah Kompleks Kastil Nijo',
    creator: 'Japan Heritage Foundation',
    dateCreated: '2023-02-28',
    fileFormat: 'PDF',
    size: '8.2 MB',
    keywords: ['sejarah', 'kastil', 'denah', 'arsitektur'],
    description: 'Dokumen berisi denah lengkap Kastil Nijo termasuk Taman Ninomaru.',
    category: 'Dokumen',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1623883134909-0268ec3b2074?w=600'
  },
  {
    id: 'M012',
    title: 'Taman Batu Ryoan-ji',
    creator: 'Aoi Suzuki',
    dateCreated: '2024-01-15',
    fileFormat: 'JPEG',
    resolution: '1920x1080 (FHD)',
    keywords: ['taman', 'batu', 'zen', 'meditasi'],
    description: 'Taman karesansui (taman kering) terkenal di Ryoan-ji, tempat meditasi Zen.',
    category: 'Gambar',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1563200788-299f06798c8c?w=600'
  },
  {
    id: 'M013',
    title: 'Tur Virtual Kuil Heian',
    creator: 'JGU Media Production',
    dateCreated: '2024-05-10',
    fileFormat: 'MP4 (H.264)',
    duration: '08:45',
    keywords: ['kuil', 'virtual tour', 'heian', 'taman'],
    description: 'Video 360 derajat mengelilingi bangunan merah cerah dan taman Kuil Heian.',
    category: 'Video',
    accessRights: 'Mahasiswa/Dosen',
    thumbnail: 'https://images.unsplash.com/photo-1616235889759-53e3ef93c5d6?w=600'
  },
  {
    id: 'M014',
    title: 'Jalur Berjalan Kaki Philosopher\'s Path',
    creator: 'Kyoto Explorer',
    dateCreated: '2024-04-02',
    fileFormat: 'PNG',
    resolution: '2560x1440 (2K)',
    keywords: ['alam', 'sakura', 'kanal', 'jalan setapak'],
    description: 'Pemandangan bunga sakura yang mekar di sepanjang kanal Tetsugaku no Michi.',
    category: 'Gambar',
    accessRights: 'Publik',
    thumbnail: 'https://images.unsplash.com/photo-1521252178229-41804f3ce9de?w=600'
  },
  {
    id: 'M015',
    title: 'Daftar 1.001 Patung Kannon Sanjusangen-do',
    creator: 'Kyoto National Museum',
    dateCreated: '2023-08-30',
    fileFormat: 'PDF',
    size: '1.8 MB',
    keywords: ['sejarah', 'patung', 'buddha', 'seni'],
    description: 'Buku panduan digital yang menginventarisasi sejarah patung di Sanjusangen-do.',
    category: 'Dokumen',
    accessRights: 'Admin',
    thumbnail: 'https://images.unsplash.com/photo-1601007908920-5e36f977bdcc?w=600'
  }
];

export default function GallerySearch() {
  const [mediaList, setMediaList] = useState(initialMediaDatabase);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Form State menggunakan URL
  const [uploadForm, setUploadForm] = useState({
    title: '',
    creator: '',
    category: 'Gambar',
    fileFormat: '',
    keywords: '',
    description: '',
    accessRights: 'Publik',
    sourceUrl: '' // Menyimpan URL inputan
  });

  useEffect(() => {
    if (selectedMedia || isUploadOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMedia, isUploadOpen]);

  const filteredMedia = mediaList.filter((media) => {
    const matchCategory = selectedCategory === 'Semua' || media.category === selectedCategory;
    const matchSearch = 
      media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
      media.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchCategory && matchSearch;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    const newId = `M0${mediaList.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    let finalThumbnail = uploadForm.sourceUrl;

    // Logika Pintar: Jika URL adalah YouTube, ambil thumbnail otomatisnya
    if (uploadForm.category === 'Video' && (uploadForm.sourceUrl.includes('youtube.com') || uploadForm.sourceUrl.includes('youtu.be'))) {
      let videoId = '';
      if (uploadForm.sourceUrl.includes('v=')) {
        videoId = uploadForm.sourceUrl.split('v=')[1].split('&')[0];
      } else if (uploadForm.sourceUrl.includes('youtu.be/')) {
        videoId = uploadForm.sourceUrl.split('youtu.be/')[1].split('?')[0];
      }
      finalThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } 
    // Jika dokumen, gunakan gambar cover abstrak
    else if (uploadForm.category === 'Dokumen') {
      finalThumbnail = 'https://images.unsplash.com/photo-1613539246066-78db6ec4aff9?w=600';
    }
    
    const newMediaData = {
      id: newId,
      title: uploadForm.title || 'Dokumen Tanpa Judul',
      creator: uploadForm.creator || 'Anonim',
      dateCreated: today,
      fileFormat: uploadForm.fileFormat || 'URL',
      resolution: uploadForm.category === 'Gambar' ? 'Resolusi Kustom' : undefined,
      duration: uploadForm.category === 'Video' ? 'Durasi (Simulasi)' : undefined,
      size: uploadForm.category === 'Dokumen' ? 'Ukuran (Simulasi)' : undefined,
      keywords: uploadForm.keywords.split(',').map(kw => kw.trim()).filter(kw => kw !== ''),
      description: uploadForm.description || 'Tidak ada deskripsi yang disertakan.',
      category: uploadForm.category,
      accessRights: uploadForm.accessRights,
      thumbnail: finalThumbnail || 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=600',
      sourceUrl: uploadForm.sourceUrl // Data penting untuk Modal
    };

    setMediaList([newMediaData, ...mediaList]);
    setIsUploadOpen(false);
    setUploadForm({
      title: '', creator: '', category: 'Gambar', fileFormat: '', keywords: '', description: '', accessRights: 'Publik', sourceUrl: ''
    });
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Gambar': return <ImageIcon size={18} />;
      case 'Video': return <Video size={18} />;
      case 'Dokumen': return <FileText size={18} />;
      default: return <Database size={18} />;
    }
  };

  // Fungsi Render Video Pintar di Modal
  const renderVideo = (media) => {
    const url = media.sourceUrl;
    // Jika tidak ada URL custom, gunakan video default sebelumnya
    if (!url) {
      return <video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" controls autoPlay className="w-full max-h-[60vh] object-cover" />;
    }
    // Jika YouTube, ubah ke iFrame Embed
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
      else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
      
      return (
        <iframe 
          className="w-full h-[60vh]" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
          title={media.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      );
    }
    // Jika URL mp4 biasa
    return <video src={url} controls autoPlay className="w-full max-h-[60vh] object-cover" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans text-gray-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Destinasi di <span className="text-red-600">Kyoto</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Cari, temukan, dan unggah aset digital Kyoto. Sistem ini mengelola metadata kompleks untuk klasifikasi dokumen yang akurat.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl shadow-lg mb-12 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Cari (ex: kuil, MP4, sejarah)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-lg"
              />
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              {['Semua', 'Gambar', 'Video', 'Dokumen'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-5 py-4 rounded-2xl whitespace-nowrap transition-all font-semibold ${
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

            <button 
              onClick={() => setIsUploadOpen(true)}
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-md"
            >
              <UploadCloud size={20} />
              Unggah Tautan Media
            </button>
          </div>
        </motion.div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="text-red-600" /> Hasil Pencarian
          </h2>
          <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm font-bold">
            {filteredMedia.length} Dokumen
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
                  onClick={() => setSelectedMedia(media)}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:ring-4 hover:ring-red-500/20 transition-all border border-gray-100 group cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row h-full pointer-events-none">
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

                    <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                            {media.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{media.description}</p>
                        
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
                            Akses: {media.accessRights}
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

        {/* MODAL DETAIL MEDIA */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col relative"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                      {getCategoryIcon(selectedMedia.category)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedMedia.title}</h3>
                      <p className="text-sm text-gray-500 font-medium">{selectedMedia.category} • {selectedMedia.fileFormat}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedMedia(null)} className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto bg-gray-50 flex-1 flex flex-col items-center justify-center">
                  
                  {/* Tampilan Video Pintar */}
                  {selectedMedia.category === 'Video' && (
                    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black">
                      {renderVideo(selectedMedia)}
                    </div>
                  )}
                  
                  {/* Tampilan Gambar Pintar */}
                  {selectedMedia.category === 'Gambar' && (
                    <div className="w-full flex justify-center">
                      <img 
                        src={selectedMedia.sourceUrl || selectedMedia.thumbnail.replace('w=600', 'w=1200')} 
                        alt={selectedMedia.title} 
                        className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-lg border border-gray-200" 
                      />
                    </div>
                  )}

                  {/* Tampilan Dokumen Pintar */}
                  {selectedMedia.category === 'Dokumen' && (
                    <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-md border border-gray-200 text-left">
                      <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-100">
                        <div className="bg-red-50 p-4 rounded-2xl text-red-600"><FileText size={48} /></div>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h4>
                          <p className="text-gray-500 mb-1"><strong>Kreator:</strong> {selectedMedia.creator}</p>
                          <p className="text-gray-500 mb-1"><strong>Tanggal:</strong> {selectedMedia.dateCreated}</p>
                          <p className="text-gray-500"><strong>Ukuran:</strong> {selectedMedia.size || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="prose text-gray-700 mb-10 leading-relaxed text-lg">
                        <p className="font-semibold text-gray-900 mb-2">Abstrak Dokumen:</p>
                        <p>{selectedMedia.description}</p>
                      </div>
                      
                      {/* Tombol Download Dinamis */}
                      <a 
                        href={selectedMedia.sourceUrl || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 hover:shadow-lg transition-all w-full flex justify-center items-center gap-3 text-lg"
                      >
                        <Download size={20} /> Unduh / Buka Dokumen Eksternal
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL UPLOAD MEDIA BARU DENGAN URL */}
        <AnimatePresence>
          {isUploadOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-600 text-white rounded-xl">
                      <LinkIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Tambahkan Tautan Media</h3>
                      <p className="text-sm text-gray-500">Gunakan tautan gambar Google, YouTube, atau Dokumen.</p>
                    </div>
                  </div>
                  <button onClick={() => setIsUploadOpen(false)} className="p-2 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <form onSubmit={handleUploadSubmit} className="space-y-5">
                    
                    {/* Input URL Media */}
                    <div className="p-5 bg-red-50 border border-red-100 rounded-2xl">
                      <label className="block text-sm font-bold text-red-800 mb-2">Tautan URL Media (Wajib)</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400" size={20} />
                        <input 
                          type="url" 
                          required 
                          value={uploadForm.sourceUrl} 
                          onChange={e => setUploadForm({...uploadForm, sourceUrl: e.target.value})} 
                          className="w-full pl-12 pr-4 py-3 bg-white border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-red-900" 
                          placeholder="https://www.youtube.com/watch?v=... atau https://image..." 
                        />
                      </div>
                      <p className="text-xs text-red-600 mt-2 font-medium">*Sistem akan mengekstrak tampilan secara otomatis berdasarkan tautan ini.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Media</label>
                        <input type="text" required value={uploadForm.title} onChange={e => setUploadForm({...uploadForm, title: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Masukkan judul..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kreator / Sumber</label>
                        <input type="text" required value={uploadForm.creator} onChange={e => setUploadForm({...uploadForm, creator: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Nama kreator/sumber..." />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                        <select value={uploadForm.category} onChange={e => setUploadForm({...uploadForm, category: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none">
                          <option value="Gambar">Gambar</option>
                          <option value="Video">Video</option>
                          <option value="Dokumen">Dokumen</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Format</label>
                        <input type="text" required value={uploadForm.fileFormat} onChange={e => setUploadForm({...uploadForm, fileFormat: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: YouTube, JPEG, PDF" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Hak Akses</label>
                        <select value={uploadForm.accessRights} onChange={e => setUploadForm({...uploadForm, accessRights: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none">
                          <option value="Publik">Publik</option>
                          <option value="Mahasiswa/Dosen">Mahasiswa/Dosen</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Kata Kunci (Keywords)</label>
                      <input type="text" required value={uploadForm.keywords} onChange={e => setUploadForm({...uploadForm, keywords: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Pisahkan dengan koma (ex: kuil, youtube, alam)..." />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
                      <textarea required value={uploadForm.description} onChange={e => setUploadForm({...uploadForm, description: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 resize-none" placeholder="Tuliskan deskripsi tautan media ini..."></textarea>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button type="button" onClick={() => setIsUploadOpen(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors z-20 relative">Batal</button>
                      <button type="submit" className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-md z-20 relative">Simpan ke Database</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}