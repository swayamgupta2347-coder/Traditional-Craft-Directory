import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  X, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function DirectInquiryModal() {
  const { inquiryModalArtisan, closeInquiryModal, submitInquiry } = useData();

  const [inquiryType, setInquiryType] = useState('Direct Custom Commission');
  const [inquirerName, setInquirerName] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquirerEmail, setInquirerEmail] = useState('');
  const [inquirerPhone, setInquirerPhone] = useState('');
  const [intendedQuantity, setIntendedQuantity] = useState('1 Bespoke Piece');
  const [visitDate, setVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!inquiryModalArtisan) return null;

  const artisan = inquiryModalArtisan;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquirerName || !inquirerPhone) {
      alert('Please provide your name and phone number so the artisan can reach you directly.');
      return;
    }

    submitInquiry({
      artisanId: artisan.id,
      inquirerName,
      organization,
      inquirerEmail,
      inquirerPhone,
      inquiryType,
      message,
      intendedQuantity,
      visitDate
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    closeInquiryModal();
  };

  // Format WhatsApp Link
  const cleanPhone = (artisan.contact?.whatsapp || artisan.contact?.phone || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Namaste ${artisan.name} Ji, I discovered your profile on The Traditional Craft Directory and would like to inquire about your ${artisan.craftSubtype}.`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#E7DFCE] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={closeInquiryModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-gray-500 hover:text-gray-900 flex items-center justify-center shadow-sm border border-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          // Success State
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-heritage font-bold text-[#1E232A]">
                Direct Connection Established!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Your inquiry has been directly logged and delivered to <strong>{artisan.name}</strong>. 
                Zero intermediaries, zero platform commissions.
              </p>
            </div>

            {/* Direct Contact Card */}
            <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E7DFCE] text-left max-w-md mx-auto space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                Artisan Direct Contact Details
              </div>
              <div className="space-y-2 text-sm text-[#1E232A]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <a href={`tel:${artisan.contact?.phone}`} className="font-semibold hover:underline">
                    {artisan.contact?.phone}
                  </a>
                  <span className="text-xs text-gray-400">(Call Directly)</span>
                </div>
                {artisan.contact?.whatsapp && (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline">
                      Chat on WhatsApp
                    </a>
                  </div>
                )}
                {artisan.contact?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C85A32]" />
                    <a href={`mailto:${artisan.contact?.email}`} className="text-gray-700 hover:underline truncate">
                      {artisan.contact?.email}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-2 pt-1 border-t border-gray-200">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    {artisan.workshop?.address || `${artisan.village}, ${artisan.district}, ${artisan.state}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#1EBE5D] transition-colors shadow-sm text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp Chat
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#1B365D] text-white font-medium hover:bg-[#10223D] transition-colors text-sm"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          // Main Form
          <div>
            {/* Header Banner */}
            <div className="p-6 bg-gradient-to-r from-[#1B365D] to-[#2E5B88] text-white relative">
              <div className="flex items-center gap-4">
                <img
                  src={artisan.profileImage}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#F3A628] shadow-md"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heritage text-xl font-bold text-white">
                      {artisan.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Master
                    </span>
                  </div>
                  <p className="text-xs text-[#E7DFCE] font-medium">
                    {artisan.craftSubtype} • {artisan.village}, {artisan.state}
                  </p>
                  <p className="text-[11px] text-gray-300">
                    Experience: {artisan.experienceYears} Years • {artisan.awards?.[0]?.name || 'National Master'}
                  </p>
                </div>
              </div>

              {/* Zero Middleman Banner */}
              <div className="mt-4 p-2.5 rounded-lg bg-black/25 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#F3A628]">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">Zero Middleman Policy</span>
                </div>
                <span className="text-emerald-300 font-mono font-medium">
                  Intermediary Fee: ₹0.00 (100% Direct)
                </span>
              </div>
            </div>

            {/* Quick Direct Channel Shortcuts */}
            <div className="bg-[#FAF7F2] p-4 border-b border-[#E7DFCE] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-gray-600 font-medium">
                Want immediate contact?
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${artisan.contact?.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7DFCE] text-[#1E232A] font-semibold hover:border-[#C85A32] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Call: {artisan.contact?.phone}
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Direct Custom Commission',
                    'Schedule Workshop Visit',
                    'Institutional Sourcing'
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setInquiryType(type)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium text-center border transition-all ${
                        inquiryType === type
                          ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#C85A32]/40'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquirer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={inquirerName}
                    onChange={(e) => setInquirerName(e.target.value)}
                    placeholder="e.g. Maya Sen"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquirerPhone}
                    onChange={(e) => setInquirerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                  />
                </div>
              </div>

              {/* Organization & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Organization / Studio (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Private Collector / Design Firm"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inquirerEmail}
                    onChange={(e) => setInquirerEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                  />
                </div>
              </div>

              {/* Dynamic Fields based on Type */}
              {inquiryType === 'Schedule Workshop Visit' ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Preferred Visit Date & Visiting Hours
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Workshop Visiting Hours: {artisan.workshop?.visitingHours || '10:00 AM - 05:00 PM'}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Intended Quantity or Piece Type
                  </label>
                  <input
                    type="text"
                    value={intendedQuantity}
                    onChange={(e) => setIntendedQuantity(e.target.value)}
                    placeholder="e.g. 1 Wall Panel (36x24 in) or 10 Shawls"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                  />
                </div>
              )}

              {/* Detailed Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message / Custom Requirements / Questions
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Describe your custom motif, dimensions, preferred timeline, or questions for Master ${artisan.name}...`}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 focus:border-[#C85A32]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeInquiryModal}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white font-medium hover:opacity-95 shadow-md transition-all text-sm"
                >
                  <Send className="w-4 h-4" />
                  Send Direct Inquiry (0% Fee)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
