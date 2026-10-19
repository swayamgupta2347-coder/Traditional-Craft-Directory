import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Data File Paths
const ARTISANS_FILE = path.join(__dirname, 'data', 'artisans.json');
const CRAFTS_FILE = path.join(__dirname, 'data', 'crafts.json');
const REGIONS_FILE = path.join(__dirname, 'data', 'regions.json');
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');
const NOMINATIONS_FILE = path.join(__dirname, 'data', 'nominations.json');

// File Read/Write Utilities
const readData = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

// -------------------------------------------------------------
// 1. ARTISAN ENDPOINTS
// -------------------------------------------------------------

// GET /api/artisans (Faceted Search & Filter)
app.get('/api/artisans', (req, res) => {
  let artisans = readData(ARTISANS_FILE);
  const { q, state, category, giOnly, verifiedOnly, sort } = req.query;

  // Text search
  if (q && q.trim()) {
    const query = q.toLowerCase().trim();
    artisans = artisans.filter(a =>
      a.name.toLowerCase().includes(query) ||
      a.craftCategory.toLowerCase().includes(query) ||
      a.craftSubtype.toLowerCase().includes(query) ||
      a.state.toLowerCase().includes(query) ||
      a.district.toLowerCase().includes(query) ||
      a.village.toLowerCase().includes(query) ||
      a.bio.toLowerCase().includes(query) ||
      (a.materials && a.materials.some(m => m.toLowerCase().includes(query)))
    );
  }

  // State filter
  if (state && state !== 'All') {
    artisans = artisans.filter(a => a.state.toLowerCase() === state.toLowerCase());
  }

  // Category filter
  if (category && category !== 'All') {
    artisans = artisans.filter(a => a.craftCategory.toLowerCase() === category.toLowerCase());
  }

  // GI Tag filter
  if (giOnly === 'true') {
    artisans = artisans.filter(a => a.giTag && a.giTag.status === 'Registered');
  }

  // Verified only filter
  if (verifiedOnly === 'true') {
    artisans = artisans.filter(a => a.verificationStatus === 'Verified');
  }

  // Sorting
  if (sort === 'experience-desc') {
    artisans.sort((a, b) => b.experienceYears - a.experienceYears);
  } else if (sort === 'views-desc') {
    artisans.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  } else if (sort === 'name-asc') {
    artisans.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default: verified first, then highest views
    artisans.sort((a, b) => {
      if (a.verificationStatus === 'Verified' && b.verificationStatus !== 'Verified') return -1;
      if (a.verificationStatus !== 'Verified' && b.verificationStatus === 'Verified') return 1;
      return (b.viewCount || 0) - (a.viewCount || 0);
    });
  }

  res.json({
    success: true,
    count: artisans.length,
    data: artisans
  });
});

// GET /api/artisans/:id
app.get('/api/artisans/:id', (req, res) => {
  const artisans = readData(ARTISANS_FILE);
  const index = artisans.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Artisan not found' });
  }

  // Increment view count
  artisans[index].viewCount = (artisans[index].viewCount || 0) + 1;
  writeData(ARTISANS_FILE, artisans);

  // Also find related artisans (same category or state)
  const current = artisans[index];
  const related = artisans
    .filter(a => a.id !== current.id && (a.craftCategory === current.craftCategory || a.state === current.state))
    .slice(0, 3);

  res.json({
    success: true,
    data: current,
    related
  });
});

// POST /api/artisans (Admin Create Artisan)
app.post('/api/artisans', (req, res) => {
  const artisans = readData(ARTISANS_FILE);
  const newArtisan = {
    id: `art-${Date.now().toString().slice(-4)}`,
    name: req.body.name,
    title: req.body.title || `${req.body.craftSubtype || 'Traditional'} Craftsperson`,
    craftCategory: req.body.craftCategory,
    craftSubtype: req.body.craftSubtype,
    state: req.body.state,
    district: req.body.district || 'Heritage Cluster',
    village: req.body.village || 'Artisan Hamlet',
    experienceYears: Number(req.body.experienceYears) || 10,
    awards: req.body.awards || [],
    verificationStatus: req.body.verificationStatus || 'Verified',
    verifiedBy: req.body.verifiedBy || 'Development Commissioner (Handicrafts), Ministry of Textiles',
    verificationDate: new Date().toISOString().split('T')[0],
    giTag: req.body.giTag || { status: 'Under Review', number: 'GI-PENDING', title: req.body.craftSubtype },
    bio: req.body.bio || '',
    techniques: req.body.techniques || '',
    materials: req.body.materials || ['Natural Pigments', 'Handloom Cotton', 'Wood/Clay'],
    workshop: req.body.workshop || {
      name: `${req.body.name} Studio`,
      address: req.body.district ? `${req.body.district}, ${req.body.state}` : req.body.state,
      visitingHours: '10:00 AM - 06:00 PM',
      workshopVisitsAllowed: true
    },
    contact: req.body.contact || {
      phone: req.body.phone || '+91 98000 00000',
      whatsapp: req.body.whatsapp || req.body.phone || '+91 98000 00000',
      email: req.body.email || 'artisan@craftdirectory.gov.in'
    },
    profileImage: req.body.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1200&q=80',
    gallery: req.body.gallery || [
      {
        url: req.body.coverImage || 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80',
        title: `${req.body.craftSubtype} Sample Piece`,
        description: 'Authentic handmade traditional craft item'
      }
    ],
    productsSummary: req.body.productsSummary || ['Handmade Craft Works', 'Custom Commissions'],
    priceRange: req.body.priceRange || '₹1,000 - ₹50,000',
    customOrders: true,
    viewCount: 1,
    inquiriesReceived: 0
  };

  artisans.unshift(newArtisan);
  writeData(ARTISANS_FILE, artisans);

  res.status(201).json({
    success: true,
    message: 'Artisan profile created and added to directory',
    data: newArtisan
  });
});

// PUT /api/artisans/:id (Admin Edit)
app.put('/api/artisans/:id', (req, res) => {
  const artisans = readData(ARTISANS_FILE);
  const index = artisans.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Artisan not found' });
  }

  artisans[index] = {
    ...artisans[index],
    ...req.body,
    id: req.params.id // Prevent ID overwrite
  };

  writeData(ARTISANS_FILE, artisans);
  res.json({
    success: true,
    message: 'Artisan profile updated successfully',
    data: artisans[index]
  });
});

// PATCH /api/artisans/:id/verify (Admin Toggle Verification)
app.patch('/api/artisans/:id/verify', (req, res) => {
  const artisans = readData(ARTISANS_FILE);
  const index = artisans.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Artisan not found' });
  }

  const currentStatus = artisans[index].verificationStatus;
  const newStatus = req.body.status || (currentStatus === 'Verified' ? 'Pending Review' : 'Verified');

  artisans[index].verificationStatus = newStatus;
  artisans[index].verifiedBy = newStatus === 'Verified' ? 'Ministry of Textiles & Handicrafts Board' : 'Pending Authority Verification';
  artisans[index].verificationDate = new Date().toISOString().split('T')[0];

  writeData(ARTISANS_FILE, artisans);
  res.json({
    success: true,
    message: `Artisan verification updated to ${newStatus}`,
    data: artisans[index]
  });
});

// DELETE /api/artisans/:id (Admin Delete)
app.delete('/api/artisans/:id', (req, res) => {
  let artisans = readData(ARTISANS_FILE);
  const exists = artisans.some(a => a.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ success: false, message: 'Artisan not found' });
  }

  artisans = artisans.filter(a => a.id !== req.params.id);
  writeData(ARTISANS_FILE, artisans);

  res.json({
    success: true,
    message: 'Artisan removed from directory'
  });
});

// -------------------------------------------------------------
// 2. CRAFTS ENCYCLOPEDIA ENDPOINTS
// -------------------------------------------------------------

app.get('/api/crafts', (req, res) => {
  const crafts = readData(CRAFTS_FILE);
  const artisans = readData(ARTISANS_FILE);

  // Attach artisan counts to each craft
  const enrichedCrafts = crafts.map(c => {
    const matchingArtisans = artisans.filter(a =>
      a.craftSubtype.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]) ||
      c.name.toLowerCase().includes(a.craftSubtype.toLowerCase().split(' ')[0])
    );
    return {
      ...c,
      artisanCount: matchingArtisans.length,
      sampleArtisans: matchingArtisans.slice(0, 2).map(a => ({ id: a.id, name: a.name, village: a.village }))
    };
  });

  res.json({ success: true, count: enrichedCrafts.length, data: enrichedCrafts });
});

app.get('/api/crafts/:id', (req, res) => {
  const crafts = readData(CRAFTS_FILE);
  const craft = crafts.find(c => c.id === req.params.id);

  if (!craft) {
    return res.status(404).json({ success: false, message: 'Craft not found' });
  }

  const artisans = readData(ARTISANS_FILE);
  const relatedArtisans = artisans.filter(a =>
    a.craftCategory.toLowerCase() === craft.category.toLowerCase() ||
    a.craftSubtype.toLowerCase().includes(craft.name.toLowerCase().split(' ')[0])
  );

  res.json({
    success: true,
    data: craft,
    artisans: relatedArtisans
  });
});

// -------------------------------------------------------------
// 3. REGIONS / ATLAS ENDPOINTS
// -------------------------------------------------------------

app.get('/api/regions', (req, res) => {
  const regions = readData(REGIONS_FILE);
  const artisans = readData(ARTISANS_FILE);

  const enrichedRegions = regions.map(r => {
    const stateArtisans = artisans.filter(a => a.state.toLowerCase() === r.state.toLowerCase());
    return {
      ...r,
      registeredMasters: stateArtisans.length,
      topArtisans: stateArtisans.slice(0, 3).map(a => ({ id: a.id, name: a.name, craft: a.craftSubtype }))
    };
  });

  res.json({ success: true, count: enrichedRegions.length, data: enrichedRegions });
});

// -------------------------------------------------------------
// 4. DIRECT INQUIRY & CONNECT ENDPOINTS (MIDDLEMAN-FREE)
// -------------------------------------------------------------

app.get('/api/inquiries', (req, res) => {
  const inquiries = readData(INQUIRIES_FILE);
  res.json({ success: true, count: inquiries.length, data: inquiries });
});

app.post('/api/inquiries', (req, res) => {
  const inquiries = readData(INQUIRIES_FILE);
  const artisans = readData(ARTISANS_FILE);

  const {
    artisanId,
    inquirerName,
    organization,
    inquirerEmail,
    inquirerPhone,
    inquiryType,
    message,
    intendedQuantity,
    visitDate
  } = req.body;

  if (!artisanId || !inquirerName || !inquirerPhone) {
    return res.status(400).json({ success: false, message: 'Missing required inquiry fields' });
  }

  const artisan = artisans.find(a => a.id === artisanId);
  const newInquiry = {
    id: `inq-${Date.now().toString().slice(-4)}`,
    artisanId,
    artisanName: artisan ? artisan.name : 'Master Artisan',
    craft: artisan ? artisan.craftSubtype : 'Traditional Craft',
    inquirerName,
    organization: organization || 'Direct Collector / Individual',
    inquirerEmail: inquirerEmail || '',
    inquirerPhone,
    inquiryType: inquiryType || 'Direct Artisan Connection',
    message: message || '',
    intendedQuantity: intendedQuantity || 'Single Piece',
    visitDate: visitDate || null,
    date: new Date().toISOString(),
    status: 'Artisan Connected Directly',
    middlemanEliminated: true,
    directContactChannel: artisan ? `Direct Call: ${artisan.contact.phone}` : 'Direct Phone'
  };

  inquiries.unshift(newInquiry);
  writeData(INQUIRIES_FILE, inquiries);

  // Increment inquiriesReceived on artisan
  if (artisan) {
    artisan.inquiriesReceived = (artisan.inquiriesReceived || 0) + 1;
    writeData(ARTISANS_FILE, artisans);
  }

  res.status(201).json({
    success: true,
    message: 'Direct inquiry sent directly to the artisan. Middleman fee: ₹0.00',
    data: newInquiry,
    directContact: artisan ? artisan.contact : null
  });
});

// -------------------------------------------------------------
// 5. ARTISAN NOMINATION / DIGITAL ONBOARDING
// -------------------------------------------------------------

app.get('/api/nominations', (req, res) => {
  const nominations = readData(NOMINATIONS_FILE);
  res.json({ success: true, count: nominations.length, data: nominations });
});

app.post('/api/nominations', (req, res) => {
  const nominations = readData(NOMINATIONS_FILE);
  const newNomination = {
    id: `nom-${Date.now().toString().slice(-4)}`,
    artisanName: req.body.artisanName,
    craftCategory: req.body.craftCategory,
    craftSubtype: req.body.craftSubtype,
    state: req.body.state,
    district: req.body.district,
    village: req.body.village,
    experienceYears: Number(req.body.experienceYears) || 5,
    phone: req.body.phone,
    email: req.body.email || '',
    workshopAddress: req.body.workshopAddress,
    techniqueDescription: req.body.techniqueDescription,
    nominatorName: req.body.nominatorName || 'Self-Nomination',
    nominatorRelation: req.body.nominatorRelation || 'Artisan',
    verificationStatus: 'Pending Review',
    submittedAt: new Date().toISOString(),
    evidenceDocuments: req.body.evidenceDocuments || ['Artisan ID / Workshop Photo Submitted']
  };

  nominations.unshift(newNomination);
  writeData(NOMINATIONS_FILE, nominations);

  res.status(201).json({
    success: true,
    message: 'Artisan nomination submitted successfully for verification review',
    data: newNomination
  });
});

// Approve nomination and convert into verified artisan
app.patch('/api/nominations/:id/approve', (req, res) => {
  const nominations = readData(NOMINATIONS_FILE);
  const nomIndex = nominations.findIndex(n => n.id === req.params.id);

  if (nomIndex === -1) {
    return res.status(404).json({ success: false, message: 'Nomination not found' });
  }

  const nom = nominations[nomIndex];
  nom.verificationStatus = 'Approved & Verified';
  writeData(NOMINATIONS_FILE, nominations);

  // Add into Artisans directory
  const artisans = readData(ARTISANS_FILE);
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
    awards: [{ name: 'District Craft Recognition', year: new Date().getFullYear(), authority: 'Handicrafts Development Council' }],
    verificationStatus: 'Verified',
    verifiedBy: 'National Craft Council Field Officer Verification',
    verificationDate: new Date().toISOString().split('T')[0],
    giTag: { status: 'Registered', number: 'GI-HERITAGE', title: nom.craftSubtype },
    bio: `${nom.artisanName} is a verified master craftsperson from ${nom.village}, ${nom.district}, ${nom.state}, specializing in authentic ${nom.craftSubtype}.`,
    techniques: nom.techniqueDescription,
    materials: ['Natural Ingredients', 'Traditional Hand Tools', 'Indigenous Materials'],
    workshop: {
      name: `${nom.artisanName} Heritage Workshop`,
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
    productsSummary: ['Heritage Handcrafted Products', 'Direct Commissions'],
    priceRange: '₹1,500 - ₹50,000',
    customOrders: true,
    viewCount: 1,
    inquiriesReceived: 0
  };

  artisans.unshift(newArtisan);
  writeData(ARTISANS_FILE, artisans);

  res.json({
    success: true,
    message: 'Nomination approved! Artisan is now officially listed in the Verified Directory.',
    data: newArtisan
  });
});

// -------------------------------------------------------------
// 6. PLATFORM KPIS & STATS ENDPOINT
// -------------------------------------------------------------

app.get('/api/stats', (req, res) => {
  const artisans = readData(ARTISANS_FILE);
  const inquiries = readData(INQUIRIES_FILE);
  const crafts = readData(CRAFTS_FILE);
  const nominations = readData(NOMINATIONS_FILE);

  const totalArtisans = artisans.length;
  const verifiedArtisans = artisans.filter(a => a.verificationStatus === 'Verified').length;
  const totalViews = artisans.reduce((sum, a) => sum + (a.viewCount || 0), 0);
  const directInquiriesSent = inquiries.length;
  const uniqueStates = new Set(artisans.map(a => a.state)).size;
  const giCraftsCount = artisans.filter(a => a.giTag && a.giTag.status === 'Registered').length;

  // Category breakdown
  const categoryMap = {};
  artisans.forEach(a => {
    categoryMap[a.craftCategory] = (categoryMap[a.craftCategory] || 0) + 1;
  });

  // State breakdown
  const stateMap = {};
  artisans.forEach(a => {
    stateMap[a.state] = (stateMap[a.state] || 0) + 1;
  });

  res.json({
    success: true,
    data: {
      totalArtisans,
      verifiedArtisans,
      verifiedRatio: `${Math.round((verifiedArtisans / totalArtisans) * 100)}%`,
      totalViews,
      directInquiriesSent,
      uniqueStates,
      giCraftsCount,
      pendingNominations: nominations.filter(n => n.verificationStatus === 'Pending Review').length,
      middlemanFeePercent: '0% (Direct Connection Only)',
      estimatedMiddlemanSavings: `₹${(directInquiriesSent * 18500).toLocaleString('en-IN')}`,
      categoryDistribution: categoryMap,
      stateDistribution: stateMap
    }
  });
});

// Serve frontend in production
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(CLIENT_DIST, 'index.html'));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`The Traditional Craft Directory API running on port ${PORT}`);
});
