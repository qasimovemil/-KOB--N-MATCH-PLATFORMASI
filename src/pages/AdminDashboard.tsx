// src/pages/AdminDashboard.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalUsers: number;
  totalKOS: number;
  totalInvestors: number;
  activeMatches: number;
  totalTransactions: number;
  totalInvestmentAmount: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  successfulMatches: number;
  documentsDownloaded: number;
  riskAssessments: number;
  avgInvestmentSize: number;
}

interface RecentActivity {
  id: string;
  type: 'registration' | 'match' | 'document' | 'investment' | 'risk_assessment';
  user: string;
  action: string;
  timestamp: Date;
  details?: string;
}

interface RegionStats {
  region: string;
  kosCount: number;
  investorCount: number;
  matchCount: number;
  totalInvestment: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    totalKOS: 486,
    totalInvestors: 761,
    activeMatches: 127,
    totalTransactions: 89,
    totalInvestmentAmount: 24500000,
    newUsersToday: 18,
    newUsersThisWeek: 142,
    successfulMatches: 67,
    documentsDownloaded: 1580,
    riskAssessments: 324,
    avgInvestmentSize: 275000
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'registration',
      user: 'Azər Məmmədov',
      action: 'Yeni KOS qeydiyyatı',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      details: 'IT sahəsi'
    },
    {
      id: '2',
      type: 'match',
      user: 'İnvestor123',
      action: 'Yeni Match yaradıldı',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      details: '₼150,000 investisiya'
    },
    {
      id: '3',
      type: 'document',
      user: 'TechStart MMC',
      action: 'Biznes plan yükləndi',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      details: 'PDF, 2.4MB'
    },
    {
      id: '4',
      type: 'investment',
      user: 'VentureAZ',
      action: 'İnvestisiya təklifi verildi',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      details: '₼300,000'
    },
    {
      id: '5',
      type: 'risk_assessment',
      user: 'GreenTech Solutions',
      action: 'Risk qiymətləndirməsi tamamlandı',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      details: 'Bal: 75/100'
    }
  ]);

  const [regionStats, setRegionStats] = useState<RegionStats[]>([
    { region: 'Bakı', kosCount: 215, investorCount: 340, matchCount: 58, totalInvestment: 15200000 },
    { region: 'Gəncə-Qazax', kosCount: 98, investorCount: 156, matchCount: 28, totalInvestment: 4800000 },
    { region: 'Şəki-Zaqatala', kosCount: 67, investorCount: 89, matchCount: 18, totalInvestment: 2100000 },
    { region: 'Lənkəran', kosCount: 54, investorCount: 78, matchCount: 12, totalInvestment: 1600000 },
    { region: 'Şirvan-Salyan', kosCount: 52, investorCount: 98, matchCount: 11, totalInvestment: 800000 }
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('week');

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        newUsersToday: prev.newUsersToday + Math.floor(Math.random() * 2),
        activeMatches: prev.activeMatches + Math.floor(Math.random() * 2) - Math.floor(Math.random() * 1)
      }));
    }, 30000); // Her 30 saniyədə yenilənir

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'registration': return '👤';
      case 'match': return '🤝';
      case 'document': return '📄';
      case 'investment': return '💰';
      case 'risk_assessment': return '📊';
      default: return '📝';
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'registration': return 'bg-blue-100 text-blue-800';
      case 'match': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      case 'investment': return 'bg-yellow-100 text-yellow-800';
      case 'risk_assessment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dəqiqə əvvəl`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} saat əvvəl`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} gün əvvəl`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">🏛️ Admin Dashboard</h1>
          <p className="text-gray-600">Platform statistikaları və fəaliyyət monitorinqi</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex space-x-4">
              {['today', 'week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range as typeof selectedTimeRange)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedTimeRange === range
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range === 'today' ? 'Bu gün' : range === 'week' ? 'Bu həftə' : range === 'month' ? 'Bu ay' : 'Bu il'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ümumi İstifadəçi</p>
                <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{stats.newUsersToday} bu gün</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">KOS Sayı</p>
                <p className="text-3xl font-bold text-primary">{stats.totalKOS}</p>
                <p className="text-sm text-blue-600">Aktiv şirkətlər</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🏢</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">İnvestorlar</p>
                <p className="text-3xl font-bold text-primary">{stats.totalInvestors}</p>
                <p className="text-sm text-purple-600">Qeydiyyatlı</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktiv Matchlər</p>
                <p className="text-3xl font-bold text-primary">{stats.activeMatches}</p>
                <p className="text-sm text-orange-600">Davam edən</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-2xl">🤝</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-600">Uğurlu Matchlər</p>
            <p className="text-xl font-bold text-green-600">{stats.successfulMatches}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-600">Ümumi İnvestisiya</p>
            <p className="text-xl font-bold text-primary">₼{(stats.totalInvestmentAmount / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-600">Sənəd Yükləmələri</p>
            <p className="text-xl font-bold text-blue-600">{stats.documentsDownloaded}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-600">Risk Qiymətləndirmələri</p>
            <p className="text-xl font-bold text-orange-600">{stats.riskAssessments}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-600">Orta İnvestisiya</p>
            <p className="text-xl font-bold text-purple-600">₼{(stats.avgInvestmentSize / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-xs text-gray-600">Bu həftə yeni</p>
            <p className="text-xl font-bold text-teal-600">{stats.newUsersThisWeek}</p>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Regional Statistics */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">📍 Regional Statistika</h2>
            <div className="space-y-4">
              {regionStats.map((region, index) => (
                <motion.div
                  key={region.region}
                  className="border border-gray-200 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{region.region}</h3>
                    <span className="text-sm text-primary font-medium">
                      ₼{(region.totalInvestment / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">KOS: </span>
                      <span className="font-medium">{region.kosCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">İnvestor: </span>
                      <span className="font-medium">{region.investorCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Match: </span>
                      <span className="font-medium">{region.matchCount}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(region.totalInvestment / Math.max(...regionStats.map(r => r.totalInvestment))) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">📊 Son Fəaliyyətlər</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                    {activity.details && (
                      <p className="text-xs text-gray-500">{activity.details}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">📈 Performans Göstəriciləri</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {((stats.successfulMatches / stats.activeMatches) * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600">Match Uğur Dərəcəsi</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {(stats.documentsDownloaded / stats.totalUsers).toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">İstifadəçi başına Sənəd</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {(stats.riskAssessments / stats.totalKOS * 100).toFixed(0)}%
              </div>
              <p className="text-sm text-gray-600">Risk Qiymətləndirmə Faizi</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                ₼{(stats.totalInvestmentAmount / stats.totalTransactions / 1000).toFixed(0)}K
              </div>
              <p className="text-sm text-gray-600">Ortalama Əməliyyat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;