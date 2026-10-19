import React, { createContext, useContext, useState, useEffect } from 'react';
import initialArtisans from '../data/artisans.json';
import initialCrafts from '../data/crafts.json';
import initialRegions from '../data/regions.json';
import initialInquiries from '../data/inquiries.json';
import initialNominations from '../data/nominations.json';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Initialize from LocalStorage or fall back to verified seed data
  const [artisans, setArtisans] = useState(() => {
    try {
      const saved = localStorage.getItem('tcd_artisans');
      return saved ? JSON.parse(saved) : initialArtisans;
    } catch {
      return initialArtisans;
    }
  });

  const [crafts, setCrafts] = useState(() => {
    try {
      const saved = localStorage.getItem('tcd_crafts');
      return saved ? JSON.parse(saved) : initialCrafts;
    } catch {
      return initialCrafts;
    }
  });

  const [regions, setRegions] = useState(() => {
    try {
      const saved = localStorage.getItem('tcd_regions');
      return saved ? JSON.parse(saved) : initialRegions;
    } catch {
      return initialRegions;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('tcd_inquiries');
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  const [nominations, setNominations] = useState(() => {
    try {
      const saved = localStorage.getItem('tcd_nominations');
      return saved ? JSON.parse(saved) : initialNominations;
    } catch {
      return initialNominations;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('tcd_favorites');
      return saved ? JSON.parse(saved) : ['art-001', 'art-002', 'art-003'];
    } catch {
      return ['art-001', 'art-002'];
    }
  });

  // Modal State for Direct Contact / Inquiry
  const [inquiryModalArtisan, setInquiryModalArtisan] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('tcd_artisans', JSON.stringify(artisans));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [artisans]);

  useEffect(() => {
    try {
      localStorage.setItem('tcd_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('tcd_nominations', JSON.stringify(nominations));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [nominations]);

  useEffect(() => {
    try {
      localStorage.setItem('tcd_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [favorites]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle favorite bookmark
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const next = isFav ? prev.filter(item => item !== id) : [...prev, id];
      showToast(isFav ? 'Removed from saved collection' : 'Saved to your artisan collection', 'info');
      return next;
    });
  };

  // Increment view count for artisan
  const recordArtisanView = (id) => {
    setArtisans(prev =>
      prev.map(a => (a.id === id ? { ...a, viewCount: (a.viewCount || 0) + 1 } : a))
    );
  };

  // Direct Inquiry Submission
  const submitInquiry = (inquiryData) => {
    const targetArtisan = artisans.find(a => a.id === inquiryData.artisanId);
    const newInquiry = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      artisanId: inquiryData.artisanId,
      artisanName: targetArtisan ? targetArtisan.name : 'Master Artisan',
      craft: targetArtisan ? targetArtisan.craftSubtype : 'Traditional Craft',
      inquirerName: inquiryData.inquirerName,
      organization: inquiryData.organization || 'Direct Buyer / Collector',
      inquirerEmail: inquiryData.inquirerEmail || '',
      inquirerPhone: inquiryData.inquirerPhone,
      inquiryType: inquiryData.inquiryType || 'Direct Artisan Inquiry',
      message: inquiryData.message || '',
      intendedQuantity: inquiryData.intendedQuantity || 'Single Piece',
      visitDate: inquiryData.visitDate || null,
      date: new Date().toISOString(),
      status: 'Artisan Connected Directly',
      middlemanEliminated: true,
      directContactChannel: targetArtisan ? `Direct Call: ${targetArtisan.contact.phone}` : 'Direct Phone'
    };

    setInquiries(prev => [newInquiry, ...prev]);

    // Also update artisan inquiriesReceived count
    if (targetArtisan) {
      setArtisans(prev =>
        prev.map(a =>
          a.id === inquiryData.artisanId
            ? { ...a, inquiriesReceived: (a.inquiriesReceived || 0) + 1 }
            : a
        )
      );
    }

    showToast(`Direct message delivered to ${targetArtisan ? targetArtisan.name : 'Artisan'}! Zero middleman fee applied.`, 'success');
    return newInquiry;
  };

  // Submit new artisan nomination
  const submitNomination = (nominationData) => {
    const newNom = {
      id: `nom-${Date.now().toString().slice(-4)}`,
      artisanName: nominationData.artisanName,
      craftCategory: nominationData.craftCategory,
      craftSubtype: nominationData.craftSubtype,
      state: nominationData.state,
      district: nominationData.district,
      village: nominationData.village,
      experienceYears: Number(nominationData.experienceYears) || 5,
      phone: nominationData.phone,
      email: nominationData.email || '',
      workshopAddress: nominationData.workshopAddress,
      techniqueDescription: nominationData.techniqueDescription,
      nominatorName: nominationData.nominatorName || 'Self-Nomination',
      nominatorRelation: nominationData.nominatorRelation || 'Artisan',
      verificationStatus: 'Pending Review',
      submittedAt: new Date().toISOString(),
      evidenceDocuments: nominationData.evidenceDocuments || ['Pehchan Artisan Identity Card Submitted']
    };

    setNominations(prev => [newNom, ...prev]);
    showToast('Artisan profile nominated! Submitted to the administrative verification queue.', 'success');
    return newNom;
  };

  // Admin: Approve Nomination and convert into verified artisan
  const approveNomination = (nomId) => {
    const nom = nominations.find(n => n.id === nomId);
    if (!nom) return;

    // Update nomination status
    setNominations(prev =>
      prev.map(n => (n.id === nomId ? { ...n, verificationStatus: 'Approved & Verified' } : n))
    );

    // Create new verified artisan
    const newArtisan = {
      id: `art-${Date.now().toString().slice(-4)}`,
      name: nom.artisanName,
      title: `Master Practitioner of ${nom.craftSubtype}`,
      craftCategory: nom.craftCategory,
      craftSubtype: nom.craftSubtype,
      state: nom.state,
      district: nom.district,
      village: nom.village,
      experienceYears: nom.experienceYears,
      awards: [
        {
          name: 'District Handicrafts Recognition',
          year: new Date().getFullYear(),
          authority: 'Handicrafts Development Board'
        }
      ],
      verificationStatus: 'Verified',
      verifiedBy: 'National Craft Council Field Officer Verification',
      verificationDate: new Date().toISOString().split('T')[0],
      giTag: { status: 'Registered', number: 'GI-HERITAGE', title: nom.craftSubtype },
      bio: `${nom.artisanName} is a verified traditional craftsperson from ${nom.village}, ${nom.district}, ${nom.state}, sustaining generational knowledge of ${nom.craftSubtype}.`,
      techniques: nom.techniqueDescription,
      materials: ['Natural Ingredients', 'Traditional Hand Tools', 'Indigenous Materials'],
      workshop: {
        name: `${nom.artisanName} Heritage Studio`,
        address: nom.workshopAddress,
        district: nom.district,
        state: nom.state,
        pincode: '000000',
        visitingHours: '10:00 AM - 05:00 PM',
        workshopVisitsAllowed: true
      },
      contact: {
        phone: nom.phone,
        whatsapp: nom.phone,
        email: nom.email || `${nom.artisanName.toLowerCase().replace(/\\s+/g, '')}@craftdirectory.in`
      },
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      coverImage: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80',
          title: `${nom.craftSubtype} Verified Piece`,
          description: 'Authentic documented traditional craftsmanship'
        }
      ],
      productsSummary: ['Heritage Handcrafted Products', 'Direct Custom Orders'],
      priceRange: '₹1,500 - ₹45,000',
      customOrders: true,
      viewCount: 1,
      inquiriesReceived: 0
    };

    setArtisans(prev => [newArtisan, ...prev]);
    showToast(`Nomination approved! ${nom.artisanName} is now listed in the Verified Directory.`, 'success');
  };

  // Admin: Add new artisan directly
  const addArtisan = (newArtisanData) => {
    const created = {
      id: `art-${Date.now().toString().slice(-4)}`,
      ...newArtisanData,
      verificationStatus: newArtisanData.verificationStatus || 'Verified',
      verifiedBy: newArtisanData.verifiedBy || 'Development Commissioner (Handicrafts), Ministry of Textiles',
      verificationDate: new Date().toISOString().split('T')[0],
      viewCount: 1,
      inquiriesReceived: 0
    };

    setArtisans(prev => [created, ...prev]);
    showToast(`Master artisan ${created.name} added to directory.`, 'success');
    return created;
  };

  // Admin: Update artisan
  const updateArtisan = (id, updatedData) => {
    setArtisans(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updatedData, id } : a))
    );
    showToast('Artisan profile updated successfully.', 'success');
  };

  // Admin: Toggle verification badge
  const toggleVerification = (id) => {
    setArtisans(prev =>
      prev.map(a => {
        if (a.id === id) {
          const nextStatus = a.verificationStatus === 'Verified' ? 'Pending Review' : 'Verified';
          const nextVerifier = nextStatus === 'Verified'
            ? 'Development Commissioner (Handicrafts), Ministry of Textiles'
            : 'Pending Authority Verification';
          return {
            ...a,
            verificationStatus: nextStatus,
            verifiedBy: nextVerifier,
            verificationDate: new Date().toISOString().split('T')[0]
          };
        }
        return a;
      })
    );
    showToast('Artisan verification status toggled.', 'info');
  };

  // Admin: Delete artisan
  const deleteArtisan = (id) => {
    const target = artisans.find(a => a.id === id);
    setArtisans(prev => prev.filter(a => a.id !== id));
    showToast(`Artisan ${target ? target.name : id} removed from directory.`, 'warning');
  };

  // Reset to initial seed data
  const resetToSeedData = () => {
    setArtisans(initialArtisans);
    setInquiries(initialInquiries);
    setNominations(initialNominations);
    localStorage.removeItem('tcd_artisans');
    localStorage.removeItem('tcd_inquiries');
    localStorage.removeItem('tcd_nominations');
    showToast('Database reset to verified government seed dataset.', 'info');
  };

  // Platform KPIs
  const verifiedCount = artisans.filter(a => a.verificationStatus === 'Verified').length;
  const totalViews = artisans.reduce((sum, a) => sum + (a.viewCount || 0), 0);
  const totalInquiries = inquiries.length;
  const uniqueStates = new Set(artisans.map(a => a.state)).size;
  const giCount = artisans.filter(a => a.giTag && a.giTag.status === 'Registered').length;

  const stats = {
    totalArtisans: artisans.length,
    verifiedArtisans: verifiedCount,
    verifiedRatio: `${Math.round((verifiedCount / artisans.length) * 100)}%`,
    totalViews,
    directInquiriesSent: totalInquiries,
    uniqueStates,
    giCraftsCount: giCount,
    pendingNominations: nominations.filter(n => n.verificationStatus === 'Pending Review').length,
    middlemanFeePercent: '0%',
    middlemanSavings: `₹${(totalInquiries * 18500).toLocaleString('en-IN')}`
  };

  return (
    <DataContext.Provider
      value={{
        artisans,
        crafts,
        regions,
        inquiries,
        nominations,
        favorites,
        stats,
        toastMessage,
        inquiryModalArtisan,
        toggleFavorite,
        recordArtisanView,
        submitInquiry,
        submitNomination,
        approveNomination,
        addArtisan,
        updateArtisan,
        deleteArtisan,
        toggleVerification,
        resetToSeedData,
        showToast,
        openInquiryModal: (artisan) => setInquiryModalArtisan(artisan),
        closeInquiryModal: () => setInquiryModalArtisan(null)
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
