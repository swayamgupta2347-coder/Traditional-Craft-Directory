import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  Users, 
  Eye, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Sparkles, 
  X, 
  RefreshCw,
  FileCheck,
  ChevronRight,
  MapPin,
  Award
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { 
    artisans, 
    stats, 
    nominations, 
    inquiries, 
    toggleVerification, 
    deleteArtisan, 
    addArtisan, 
    updateArtisan, 
    approveNomination, 
    resetToSeedData 
  } = useData();

  const [activeTab, setActiveTab] = useState('artisans'); // 'artisans' | 'nominations' | 'inquiries'
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingArtisan, setEditingArtisan] = useState(null);

  // Add Artisan Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Textiles & Weaving');
  const [formSubtype, setFormSubtype] = useState('');
  const [formState, setFormState] = useState('Gujarat');
  const [formDistrict, setFormDistrict] = useState('');
  const [formVillage, setFormVillage] = useState('');
  const [formExp, setFormExp] = useState(20);
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formAward, setFormAward] = useState('National Master Craftsperson');
  const [formPriceRange, setFormPriceRange] = useState('₹2,000 - ₹50,000');

  const filteredArtisans = artisans.filter(a => {
    if (statusFilter !== 'All' && a.verificationStatus !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      return (
        a.name.toLowerCase().includes(q) ||
        a.craftSubtype.toLowerCase().includes(q) ||
        a.state.toLowerCase().includes(q) ||
        a.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateArtisan = (e) => {
    e.preventDefault();
    if (!formName || !formSubtype || !formPhone) {
      alert('Name, Craft Subtype, and Phone are required.');
      return;
    }

    addArtisan({
      name: formName,
      craftCategory: formCategory,
      craftSubtype: formSubtype,
      state: formState,
      district: formDistrict || 'Handicrafts Hub',
      village: formVillage || 'Artisan Hamlet',
      experienceYears: Number(formExp) || 10,
      awards: [{ name: formAward, year: new Date().getFullYear(), authority: 'Ministry of Textiles' }],
      bio: formBio || `Master craftsperson preserving authentic ${formSubtype} from ${formState}.`,
      techniques: 'Traditional techniques handed down across generations using natural materials.',
      materials: ['Natural Pigments', 'Pure Handloom Base', 'Traditional Hand Tools'],
      priceRange: formPriceRange,
      workshop: {
        name: `${formName} Heritage Workshop`,
        address: `${formVillage || 'Heritage Street'}, ${formDistrict || ''}, ${formState}`,
        district: formDistrict,
        state: formState,
        visitingHours: '10:00 AM - 06:00 PM',
        workshopVisitsAllowed: true
      },
      contact: {
        phone: formPhone,
        whatsapp: formPhone,
        email: formEmail || `${formName.toLowerCase().replace(/\\s+/g, '')}@craftdirectory.in`
      },
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      coverImage: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80',
          title: `${formSubtype} Masterpiece`,
          description: 'Documented authentic traditional craft piece'
        }
      ]
    });

    setAddModalOpen(false);
    // Reset form
    setFormName('');
    setFormSubtype('');
    setFormPhone('');
    setFormBio('');
  };

  const handleUpdateArtisan = (e) => {
    e.preventDefault();
    if (!editingArtisan) return;

    updateArtisan(editingArtisan.id, {
      name: editingArtisan.name,
      craftSubtype: editingArtisan.craftSubtype,
      state: editingArtisan.state,
      district: editingArtisan.district,
      experienceYears: Number(editingArtisan.experienceYears) || 10,
      bio: editingArtisan.bio,
      priceRange: editingArtisan.priceRange,
      contact: {
        ...editingArtisan.contact,
        phone: editingArtisan.contact?.phone
      }
    });

    setEditingArtisan(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E7DFCE] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrative Governance & Verification Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A] mt-1">
            Admin Verification Desk
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-xl">
            Verify artisan profiles, review field nominations, monitor direct connection metrics, 
            and maintain directory authenticity.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B33925] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Master Artisan</span>
          </button>

          <button
            onClick={resetToSeedData}
            title="Reset to verified government seed database"
            className="p-2.5 rounded-xl bg-white border border-[#E7DFCE] text-gray-600 hover:text-[#C85A32] text-xs font-medium transition-colors shadow-2xs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Overview Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E7DFCE] shadow-sm space-y-1">
          <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>Total Artisans</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-heritage font-bold text-[#1E232A]">
            {stats.totalArtisans}
          </div>
          <p className="text-[11px] text-gray-400">All registered profiles</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7DFCE] shadow-sm space-y-1">
          <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>Verified Ratio</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-heritage font-bold text-emerald-600">
            {stats.verifiedRatio}
          </div>
          <p className="text-[11px] text-emerald-700">{stats.verifiedArtisans} verified masters</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7DFCE] shadow-sm space-y-1">
          <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-heritage font-bold text-amber-600">
            {stats.pendingNominations}
          </div>
          <p className="text-[11px] text-amber-700">Awaiting verification</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7DFCE] shadow-sm space-y-1">
          <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>Total Views</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-heritage font-bold text-[#1B365D]">
            {stats.totalViews}
          </div>
          <p className="text-[11px] text-gray-400">Public profile visits</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7DFCE] shadow-sm space-y-1">
          <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>Direct Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#C85A32]" />
          </div>
          <div className="text-2xl font-heritage font-bold text-[#C85A32]">
            {stats.directInquiriesSent}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">0% middleman fees</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E7DFCE] text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('artisans')}
          className={`pb-3 px-3 transition-colors relative ${
            activeTab === 'artisans'
              ? 'text-[#C85A32] font-bold border-b-2 border-[#C85A32]'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Artisans Management ({artisans.length})
        </button>

        <button
          onClick={() => setActiveTab('nominations')}
          className={`pb-3 px-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'nominations'
              ? 'text-[#C85A32] font-bold border-b-2 border-[#C85A32]'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>Pending Nominations Queue</span>
          {stats.pendingNominations > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
              {stats.pendingNominations}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 px-3 transition-colors relative ${
            activeTab === 'inquiries'
              ? 'text-[#C85A32] font-bold border-b-2 border-[#C85A32]'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Direct Inquiries Monitor ({inquiries.length})
        </button>
      </div>

      {/* TAB 1: ARTISANS MANAGEMENT TABLE */}
      {activeTab === 'artisans' && (
        <div className="space-y-4">
          
          {/* Table Search & Status Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E7DFCE]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by artisan name, craft, state..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-gray-500 font-medium">Status:</span>
              {['All', 'Verified', 'Pending Review'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-[#1B365D] text-white'
                      : 'bg-[#FAF6EF] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Artisans Table */}
          <div className="bg-white rounded-2xl border border-[#E7DFCE] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E7DFCE] text-gray-700 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Artisan</th>
                    <th className="py-3 px-4">Craft & Region</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Verification Status</th>
                    <th className="py-3 px-4">Inquiries</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {filteredArtisans.map((artisan) => (
                    <tr key={artisan.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                      {/* Name & Photo */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={artisan.profileImage}
                            alt={artisan.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#E7DFCE]"
                          />
                          <div>
                            <Link
                              to={`/artisans/${artisan.id}`}
                              className="font-bold text-[#1E232A] hover:text-[#C85A32]"
                            >
                              {artisan.name}
                            </Link>
                            <div className="text-[11px] text-gray-400 font-mono">
                              {artisan.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Craft & State */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">{artisan.craftSubtype}</div>
                        <div className="text-gray-500">{artisan.village}, {artisan.state}</div>
                      </td>

                      {/* Experience */}
                      <td className="py-3 px-4 text-gray-700">
                        {artisan.experienceYears} Years
                      </td>

                      {/* Verification Status Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleVerification(artisan.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            artisan.verificationStatus === 'Verified'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                          }`}
                          title="Click to toggle verification status"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{artisan.verificationStatus}</span>
                        </button>
                      </td>

                      {/* Inquiries */}
                      <td className="py-3 px-4 text-gray-700 font-mono">
                        {artisan.inquiriesReceived || 0} direct
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingArtisan(artisan)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#1B365D] hover:bg-gray-100"
                            title="Edit Profile"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove ${artisan.name} from the directory?`)) {
                                deleteArtisan(artisan.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete Artisan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PENDING NOMINATIONS QUEUE */}
      {activeTab === 'nominations' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E7DFCE] text-xs text-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#C85A32]" />
              <span>Reviewing new artisan profiles nominated by field officers, NGOs, or craft communities.</span>
            </div>
            <Link to="/onboard" className="font-semibold text-[#C85A32] hover:underline">
              Submit New Nomination →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nominations.map((nom) => {
              const isApproved = nom.verificationStatus === 'Approved & Verified';
              return (
                <div
                  key={nom.id}
                  className="bg-white p-6 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-[#F2ECE1] pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400">{nom.id}</span>
                        <h3 className="text-base font-heritage font-bold text-[#1E232A]">
                          {nom.artisanName}
                        </h3>
                        <p className="text-xs text-[#C85A32] font-semibold">
                          {nom.craftSubtype} ({nom.craftCategory})
                        </p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}>
                        {nom.verificationStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="text-gray-400 block">Location:</span>
                        <span className="font-medium text-gray-800">{nom.village}, {nom.district}, {nom.state}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Experience:</span>
                        <span className="font-medium text-gray-800">{nom.experienceYears} Years</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Phone / WhatsApp:</span>
                        <span className="font-medium text-gray-800">{nom.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Nominator:</span>
                        <span className="font-medium text-gray-800">{nom.nominatorName} ({nom.nominatorRelation})</span>
                      </div>
                    </div>

                    {nom.techniqueDescription && (
                      <div className="p-3 rounded-xl bg-[#FAF6EF] text-xs text-gray-700 border border-[#E7DFCE]/50">
                        <strong className="block text-[#1E232A] mb-0.5">Technique & Craft Lore:</strong>
                        {nom.techniqueDescription}
                      </div>
                    )}

                    {nom.evidenceDocuments?.length > 0 && (
                      <div className="text-[11px] text-gray-500">
                        <strong>Evidence:</strong> {nom.evidenceDocuments.join(' • ')}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      Submitted: {new Date(nom.submittedAt).toLocaleDateString()}
                    </span>

                    {!isApproved ? (
                      <button
                        onClick={() => approveNomination(nom.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Issue Verified Badge</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Listed in Directory
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DIRECT INQUIRIES MONITOR */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E7DFCE] text-xs text-gray-700 flex items-center justify-between">
            <span>Direct connections initiated by collectors, museums, and institutions without intermediaries.</span>
            <span className="font-semibold text-emerald-600">Total Middleman Fees Saved: {stats.middlemanSavings}</span>
          </div>

          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-4 rounded-2xl bg-white border border-[#E7DFCE] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#1E232A] text-sm">
                    {inq.inquirerName} ({inq.organization || 'Direct Buyer'})
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                    {inq.status}
                  </span>
                </div>
                <div className="text-gray-600">
                  Target Artisan: <strong className="text-[#1E232A]">{inq.artisanName}</strong> ({inq.craft}) • Channel: {inq.directContactChannel}
                </div>
                {inq.message && (
                  <p className="text-gray-500 italic bg-[#FAF6EF] p-2.5 rounded-lg">
                    "{inq.message}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD MASTER ARTISAN */}
      {addModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#E7DFCE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#F2ECE1] pb-3">
              <h3 className="font-heritage text-lg font-bold text-[#1E232A]">
                Add Master Artisan to Directory
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>

            <form onSubmit={handleCreateArtisan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Artisan Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Shyam Lal Kumhar"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Craft Subtype *</label>
                  <input
                    type="text"
                    required
                    value={formSubtype}
                    onChange={(e) => setFormSubtype(e.target.value)}
                    placeholder="e.g. Molela Terracotta"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                  >
                    <option value="Textiles & Weaving">Textiles & Weaving</option>
                    <option value="Traditional Painting">Traditional Painting</option>
                    <option value="Metalwork">Metalwork & Casting</option>
                    <option value="Ceramics & Pottery">Ceramics & Pottery</option>
                    <option value="Woodcraft">Woodcraft</option>
                    <option value="Textiles & Embroidery">Textiles & Embroidery</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    value={formExp}
                    onChange={(e) => setFormExp(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">District / Cluster</label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    placeholder="e.g. Rajsamand"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Village</label>
                  <input
                    type="text"
                    value={formVillage}
                    onChange={(e) => setFormVillage(e.target.value)}
                    placeholder="e.g. Molela"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Direct Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Award / Honor</label>
                  <input
                    type="text"
                    value={formAward}
                    onChange={(e) => setFormAward(e.target.value)}
                    placeholder="e.g. Shilp Guru, National Award"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Biography & Lineage</label>
                <textarea
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Artisan background, generational heritage..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B33925] shadow-sm"
                >
                  Save & Publish to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ARTISAN */}
      {editingArtisan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setEditingArtisan(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#E7DFCE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#F2ECE1] pb-3">
              <h3 className="font-heritage text-lg font-bold text-[#1E232A]">
                Edit Artisan Profile: {editingArtisan.name}
              </h3>
              <button onClick={() => setEditingArtisan(null)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>

            <form onSubmit={handleUpdateArtisan} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Name</label>
                  <input
                    type="text"
                    value={editingArtisan.name}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Craft Subtype</label>
                  <input
                    type="text"
                    value={editingArtisan.craftSubtype}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, craftSubtype: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={editingArtisan.state}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={editingArtisan.contact?.phone || ''}
                    onChange={(e) => setEditingArtisan({ 
                      ...editingArtisan, 
                      contact: { ...editingArtisan.contact, phone: e.target.value } 
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Biography</label>
                <textarea
                  rows={4}
                  value={editingArtisan.bio}
                  onChange={(e) => setEditingArtisan({ ...editingArtisan, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingArtisan(null)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B33925]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
