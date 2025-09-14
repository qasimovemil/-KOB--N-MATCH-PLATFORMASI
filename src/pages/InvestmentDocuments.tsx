// src/pages/InvestmentDocuments.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  downloadCount: number;
  tags: string[];
  fileSize: string;
  type: 'pdf' | 'doc' | 'excel' | 'link';
}

const InvestmentDocuments = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Nümunə sənədlər
  const documents: Document[] = [
    {
      id: '1',
      title: 'Dövlət İnvestisiya Dəstəyi Proqramları',
      category: 'dövlət-dəstəyi',
      description: 'Azərbaycan Respublikasında kiçik və orta biznes üçün mövcud dövlət dəstəyi proqramları.',
      lastUpdated: '2024-01-15',
      downloadCount: 1250,
      tags: ['dövlət', 'maliyyə', 'dəstək'],
      fileSize: '2.5 MB',
      type: 'pdf'
    },
    {
      id: '2',
      title: 'Vergi Güzəştləri və Imtiyazlar',
      category: 'vergi-güzəştləri',
      description: 'KOB sahəsində fəaliyyət göstərən müəssisələr üçün vergi güzəştləri və imtiyazlar.',
      lastUpdated: '2024-01-20',
      downloadCount: 980,
      tags: ['vergi', 'güzəştlər', 'KOB'],
      fileSize: '1.8 MB',
      type: 'pdf'
    },
    {
      id: '3',
      title: 'Biznes Fəaliyyəti Licenziyaları',
      category: 'icazələr',
      description: 'Müxtəlif sahələrdə biznes fəaliyyəti üçün tələb olunan licenziya və icazələr.',
      lastUpdated: '2024-01-18',
      downloadCount: 756,
      tags: ['lisenziya', 'icazə', 'qanunvericilik'],
      fileSize: '3.2 MB',
      type: 'pdf'
    },
    {
      id: '4',
      title: 'İnvestisiya Layihələri üçün Biznes Plan Şablonu',
      category: 'şablonlar',
      description: 'İnvestisiya cəlb etmək üçün professional biznes plan şablonu.',
      lastUpdated: '2024-01-22',
      downloadCount: 2100,
      tags: ['biznes-plan', 'şablon', 'investisiya'],
      fileSize: '450 KB',
      type: 'doc'
    },
    {
      id: '5',
      title: 'Maliyyə Risklərinin Qiymətləndirilməsi',
      category: 'risk-analizi',
      description: 'İnvestisiya layihələrində maliyyə risklərinin qiymətləndirilməsi metodikası.',
      lastUpdated: '2024-01-25',
      downloadCount: 1400,
      tags: ['risk', 'maliyyə', 'analiz'],
      fileSize: '1.9 MB',
      type: 'excel'
    },
    {
      id: '6',
      title: 'ASAN Xidmət Mərkəzləri',
      category: 'xidmətlər',
      description: 'Biznes qeydiyyatı və sənədləşmə üçün ASAN xidmət mərkəzləri.',
      lastUpdated: '2024-01-20',
      downloadCount: 850,
      tags: ['ASAN', 'qeydiyyat', 'xidmət'],
      fileSize: 'Online',
      type: 'link'
    }
  ];

  const categories = [
    { id: 'all', name: 'Hamısı', icon: '📂' },
    { id: 'dövlət-dəstəyi', name: 'Dövlət Dəstəyi', icon: '🏛️' },
    { id: 'vergi-güzəştləri', name: 'Vergi Güzəştləri', icon: '💰' },
    { id: 'icazələr', name: 'İcazələr', icon: '📋' },
    { id: 'şablonlar', name: 'Şablonlar', icon: '📄' },
    { id: 'risk-analizi', name: 'Risk Analizi', icon: '📊' },
    { id: 'xidmətlər', name: 'Xidmətlər', icon: '🛠️' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'excel': return '📊';
      case 'link': return '🔗';
      default: return '📁';
    }
  };

  const handleDownload = (doc: Document) => {
    // Simulated download
    console.log(`Downloading: ${doc.title}`);
    // Real implementation would handle actual file download
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">📚 İnvestisiya Sənədləri</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dövlət dəstəkləri, vergi güzəştləri, icazələr və investisiya prosesi üçün lazım olan bütün sənədlər
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Sənəd və ya açar söz axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-primary/20 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary/10 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-gray-600">Ümumi Sənəd</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">15k+</div>
            <div className="text-gray-600">Endirilmə</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
            <div className="text-gray-600">Kateqoriya</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Əlçatan</div>
          </div>
        </motion.div>

        {/* Documents Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{getFileIcon(doc.type)}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{doc.fileSize}</div>
                    <div className="text-xs text-gray-400">{doc.downloadCount} endirilmə</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                  {doc.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {doc.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Yeniləndi: {new Date(doc.lastUpdated).toLocaleDateString('az-AZ')}
                  </span>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {doc.type === 'link' ? 'Baxış' : 'Endir'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Help Section */}
        <motion.div
          className="mt-16 bg-primary/5 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-primary mb-4">Kömək Lazımdır?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            İnvestisiya prosesi və sənədləşmə ilə bağlı suallarınız varsa, mütəxəssislərimizlə əlaqə saxlayın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+994012123456"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span className="mr-2">📞</span>
              Dəstək Xətti
            </a>
            <a
              href="mailto:support@platform.gov.az"
              className="inline-flex items-center px-6 py-3 bg-white text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              <span className="mr-2">✉️</span>
              E-mail Dəstəyi
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentDocuments;