import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DirectInquiryModal from './components/DirectInquiryModal';
import ToastNotification from './components/ToastNotification';
import ArtisanCompareModal from './components/ArtisanCompareModal';
import SoundscapePlayer from './components/SoundscapePlayer';

import HomePage from './pages/HomePage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanDetailPage from './pages/ArtisanDetailPage';
import CraftsPage from './pages/CraftsPage';
import AtlasPage from './pages/AtlasPage';
import InquiriesPage from './pages/InquiriesPage';
import OnboardPage from './pages/OnboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PRDDocPage from './pages/PRDDocPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E232A] selection:bg-[#C85A32] selection:text-white font-sans">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/artisans" element={<ArtisansPage />} />
              <Route path="/artisans/:id" element={<ArtisanDetailPage />} />
              <Route path="/crafts" element={<CraftsPage />} />
              <Route path="/atlas" element={<AtlasPage />} />
              <Route path="/inquiries" element={<InquiriesPage />} />
              <Route path="/onboard" element={<OnboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/prd" element={<PRDDocPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
          <DirectInquiryModal />
          <ArtisanCompareModal />
          <SoundscapePlayer />
          <ToastNotification />
        </div>
      </HashRouter>
    </DataProvider>
  );
}
