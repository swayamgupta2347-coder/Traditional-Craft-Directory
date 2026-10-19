import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Heart, 
  Phone, 
  MessageCircle, 
  Mail, 
  Calendar, 
  ExternalLink, 
  Clock, 
  Eye, 
  CheckCircle2, 
  Layers, 
  Compass, 
  ArrowLeft,
  Share2,
  Sparkles,
  Info
} from 'lucide-react';

export default function ArtisanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { artisans, recordArtisanView, favorites, toggleFavorite, openInquiryModal, showToast } = useData();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  // Find artisan
  const artisan = artisans.find(a => a.id === id);

  // Record view on mount
  useEffect(() => {
    if (artisan) {
      recordArtisanView(artisan.id);
    }
  }, [id]);

  if (!artisan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">Artisan Profile Not Found</h2>
        <p className="text-gray-500 text-sm">The artisan profile you are looking for may have been archived or does not exist.</p>
        <Link to="/artisans" className="inline-block px-5 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold">
          Return to Directory
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(artisan.id);
  const relatedArtisans = artisans
    .filter(a => a.id !== artisan.id && (a.craftCategory === artisan.craftCategory || a.state === artisan.state))
    .slice(0, 3);

  const cleanPhone = (artisan.contact?.whatsapp || artisan.contact?.phone || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Namaste ${artisan.name} Ji, I discovered your profile on The Traditional Craft Directory and would like to inquire about your ${artisan.craftSubtype}.`)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artisan.name} - ${artisan.craftSubtype}`,
        text: `Discover verified master craftsperson ${artisan.name} on The Traditional Craft Directory.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-[#C85A32]">Home</Link>
          <span>/</span>
          <Link to="/artisans" className="hover:text-[#C85A32]">Directory</Link>
          <span>/</span>
          <span className="text-[#C85A32] font-semibold truncate max-w-xs">{artisan.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7DFCE] text-gray-700 hover:text-[#C85A32] text-xs font-medium shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={() => toggleFavorite(artisan.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7DFCE] text-gray-700 hover:text-[#C85A32] text-xs font-medium shadow-2xs"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'text-[#C85A32] fill-current' : ''}`} />
            <span>{isFav ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hero Dossier Card */}
      <div className="bg-white rounded-3xl border border-[#E7DFCE] shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 bg-gray-900">
          <img
            src={artisan.coverImage}
            alt={artisan.craftSubtype}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Top Indicators */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            {artisan.giTag ? (
              <span className="px-3 py-1 rounded-full bg-[#1B365D]/90 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                {artisan.giTag.title} ({artisan.giTag.number})
              </span>
            ) : <span></span>}

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/40 text-white text-xs backdrop-blur-sm flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#F3A628]" />
                {artisan.viewCount || 1} Dossier Views
              </span>
            </div>
          </div>

          {/* Bottom Title on Cover */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="flex items-end gap-4">
              <img
                src={artisan.profileImage}
                alt={artisan.name}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-xl shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-heritage font-bold">
                    {artisan.name}
                  </h1>
                  {artisan.verificationStatus === 'Verified' && (
                    <span title="Government Verified Master" className="text-emerald-400">
                      <ShieldCheck className="w-6 h-6 fill-emerald-500/20" />
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-[#FAF7F2] font-medium">
                  {artisan.title}
                </p>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F3A628]" />
                  {artisan.village}, {artisan.district}, {artisan.state} • {artisan.experienceYears} Years Generational Mastery
                </p>
              </div>
            </div>

            {/* Price & Direct Tag */}
            <div className="text-right shrink-0">
              <div className="text-xs text-gray-300">Typical Commission Range</div>
              <div className="text-lg sm:text-xl font-heritage font-bold text-[#F3A628]">
                {artisan.priceRange}
              </div>
              <div className="text-[11px] text-emerald-300 font-medium">
                0% Middleman Commission
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar (Direct Contact Tools) */}
        <div className="bg-[#FAF7F2] p-4 sm:p-6 border-b border-[#E7DFCE] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`tel:${artisan.contact?.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7DFCE] text-[#1E232A] font-semibold text-xs sm:text-sm hover:border-[#C85A32] shadow-2xs transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call: {artisan.contact?.phone}</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-medium text-xs sm:text-sm hover:bg-[#1EBE5D] shadow-2xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Master</span>
            </a>

            {artisan.contact?.email && (
              <a
                href={`mailto:${artisan.contact?.email}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7DFCE] text-gray-700 font-medium text-xs sm:text-sm hover:border-[#C85A32] shadow-2xs transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C85A32]" />
                <span>Email Studio</span>
              </a>
            )}
          </div>

          <button
            onClick={() => openInquiryModal(artisan)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white font-semibold text-xs sm:text-sm shadow-md hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            <span>Send Direct Custom Inquiry / Visit Request</span>
          </button>
        </div>

        {/* Verification Credentials Ribbon */}
        <div className="px-6 py-3 bg-[#1B365D] text-white text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>Verification Authority:</strong> {artisan.verifiedBy}
            </span>
          </div>
          <span className="text-gray-300">
            Verified On: {artisan.verificationDate} • Status: <strong className="text-emerald-300">{artisan.verificationStatus}</strong>
          </span>
        </div>
      </div>

      {/* Main Content Grid (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Biography, Techniques, Gallery */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Historical Biography */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-4">
            <h2 className="text-xl font-heritage font-bold text-[#1E232A] flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#C85A32]"></span>
              Artisan Background & Cultural Heritage
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {artisan.bio}
            </p>

            {/* National Awards Carousel / List */}
            {artisan.awards?.length > 0 && (
              <div className="pt-4 border-t border-[#F2ECE1] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                  Recognitions & National Honors
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artisan.awards.map((award, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFCE] flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1E232A]">{award.name} ({award.year})</div>
                        <div className="text-[11px] text-gray-500">{award.authority}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Techniques & Methodological Documentation */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-4">
            <h2 className="text-xl font-heritage font-bold text-[#1E232A] flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#1B365D]"></span>
              Technique & Indigenous Processes
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7DFCE]">
              {artisan.techniques}
            </p>

            {/* Raw Materials Used */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1B365D]">
                Natural Materials & Components Employed
              </div>
              <div className="flex flex-wrap gap-2">
                {artisan.materials?.map((mat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#E7DFCE] text-xs font-medium text-[#1E232A] shadow-2xs"
                  >
                    • {mat}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Craftwork & Product Gallery */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heritage font-bold text-[#1E232A] flex items-center gap-2">
                <span className="w-2 h-5 rounded-full bg-[#F3A628]"></span>
                Portfolio & Sample Craftworks
              </h2>
              <span className="text-xs text-gray-500 font-medium">
                {artisan.gallery?.length || 0} documented pieces
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {artisan.gallery?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGalleryImg(item)}
                  className="rounded-2xl border border-[#E7DFCE] overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h3 className="font-heritage font-bold text-xs sm:text-sm text-[#1E232A] group-hover:text-[#C85A32] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span>{item.dimensions}</span>
                      <span className="text-[#C85A32] font-semibold">View Details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (1 Col): Workshop Hub, Visiting, Related Masters */}
        <div className="space-y-6">
          
          {/* Workshop & Location Dossier */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE1]">
              <MapPin className="w-5 h-5 text-[#C85A32]" />
              <h3 className="font-heritage text-base font-bold text-[#1E232A]">
                Workshop & Studio Location
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="font-semibold text-gray-800">{artisan.workshop?.name}</div>
                <p className="text-gray-600 mt-0.5 leading-relaxed">
                  {artisan.workshop?.address}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  District: {artisan.district} • State: {artisan.state} • PIN: {artisan.workshop?.pincode}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F2ECE1] flex items-center gap-2 text-xs text-gray-700">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Hours: <strong>{artisan.workshop?.visitingHours}</strong></span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {artisan.workshop?.workshopVisitsAllowed ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Workshop Visits Welcomed
                  </span>
                ) : (
                  <span className="text-gray-500">Visits by appointment only</span>
                )}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${artisan.name} ${artisan.workshop?.address || artisan.village}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF6EF] text-[#C85A32] font-semibold text-xs border border-[#C85A32]/30 hover:bg-[#C85A32] hover:text-white transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Commission Capabilities */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E7DFCE] space-y-4">
            <h3 className="font-heritage text-sm font-bold text-[#1E232A] uppercase tracking-wider">
              Commission Capabilities
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Accepts Bespoke Custom Motifs & Dimensions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Institutional Orders for Museums & Embassies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Educational Lectures & Live Master Demonstrations</span>
              </li>
            </ul>

            <button
              onClick={() => openInquiryModal(artisan)}
              className="w-full py-2.5 rounded-xl bg-[#1B365D] text-white font-semibold text-xs hover:bg-[#10223D] transition-colors"
            >
              Request Custom Commission
            </button>
          </div>

          {/* Related Masters */}
          {relatedArtisans.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-4">
              <h3 className="font-heritage text-sm font-bold text-[#1E232A] uppercase tracking-wider">
                Related Master Artisans
              </h3>
              <div className="space-y-3">
                {relatedArtisans.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/artisans/${rel.id}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF6EF] transition-colors group"
                  >
                    <img
                      src={rel.profileImage}
                      alt={rel.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#E7DFCE]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#1E232A] group-hover:text-[#C85A32] truncate">
                        {rel.name}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {rel.craftSubtype} • {rel.state}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Modal for Gallery Images */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedGalleryImg.url}
              alt={selectedGalleryImg.title}
              className="w-full max-h-[65vh] object-cover"
            />
            <div className="p-5 space-y-1">
              <h4 className="font-heritage font-bold text-base text-[#1E232A]">
                {selectedGalleryImg.title}
              </h4>
              <p className="text-xs text-gray-600">
                {selectedGalleryImg.description}
              </p>
              <div className="text-xs font-medium text-[#C85A32] pt-1">
                Dimensions: {selectedGalleryImg.dimensions}
              </div>
            </div>
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
