import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Building, 
  User, 
  DollarSign,
  HeartHandshake,
  Filter
} from 'lucide-react';

export default function InquiriesPage() {
  const { inquiries, stats, artisans, openInquiryModal } = useData();
  const [filterType, setFilterType] = useState('All');

  const filteredInquiries = inquiries.filter(inq => {
    if (filterType !== 'All' && inq.inquiryType !== filterType) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E7DFCE] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
          <HeartHandshake className="w-4 h-4" />
          <span>Direct Connection Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A]">
          Middleman-Free Direct Connections
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
          Real-time log of direct inquiries routed from museum curators, architects, researchers, 
          and conscious collectors straight to master artisans. 0% broker deductions, 100% fair artisan value.
        </p>
      </div>

      {/* Impact Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#1B365D] text-white space-y-1 shadow-sm">
          <div className="text-xs text-gray-300 font-medium">Estimated Broker Markup Saved</div>
          <div className="text-2xl sm:text-3xl font-heritage font-bold text-[#F3A628]">
            {stats.middlemanSavings}
          </div>
          <p className="text-[11px] text-gray-300">Saved by direct buyer-to-artisan routing</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E7DFCE] space-y-1 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Direct Inquiries</div>
          <div className="text-2xl sm:text-3xl font-heritage font-bold text-[#C85A32]">
            {inquiries.length}
          </div>
          <p className="text-[11px] text-gray-500">Documented orders & visits</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E7DFCE] space-y-1 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Middleman Commission</div>
          <div className="text-2xl sm:text-3xl font-heritage font-bold text-emerald-600">
            0.00%
          </div>
          <p className="text-[11px] text-emerald-700">Strictly zero intermediary fees</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E7DFCE] space-y-1 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Direct Contact Channels</div>
          <div className="text-2xl sm:text-3xl font-heritage font-bold text-[#1E232A]">
            Phone & WhatsApp
          </div>
          <p className="text-[11px] text-gray-500">Real-time artisan studio communication</p>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
          <span className="font-semibold text-gray-700 shrink-0">Filter by Type:</span>
          {[
            'All',
            'Direct Custom Commission',
            'Architectural Commission',
            'Institutional Documentation',
            'Direct Ethical Purchase',
            'Direct Bulk Sourcing'
          ].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-[#C85A32] text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <Link
          to="/artisans"
          className="px-5 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B33925] shadow-sm shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Connect With an Artisan</span>
        </Link>
      </div>

      {/* Inquiries Feed Table / Cards */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E7DFCE]">
            <p className="text-gray-500 text-sm">No inquiries match the selected filter.</p>
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const target = artisans.find(a => a.id === inq.artisanId);
            return (
              <div
                key={inq.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E7DFCE] shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#F2ECE1] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FAF6EF] text-[#C85A32] flex items-center justify-center font-bold text-xs shrink-0">
                      {inq.inquirerName.charAt(0)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#1E232A]">
                          {inq.inquirerName}
                        </h3>
                        {inq.organization && (
                          <span className="text-xs text-gray-500 font-normal">
                            ({inq.organization})
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Inquiry ID: <span className="font-mono">{inq.id}</span> • {new Date(inq.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {inq.status}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#1B365D]/10 text-[#1B365D] text-[10px] font-semibold">
                      0% Fee
                    </span>
                  </div>
                </div>

                {/* Target Artisan & Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium">Target Master Artisan:</span>
                    <div className="font-bold text-[#1E232A]">
                      {inq.artisanName}
                    </div>
                    <div className="text-[#C85A32] font-semibold">
                      {inq.craft}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium">Inquiry Scope / Quantity:</span>
                    <div className="font-medium text-gray-800">
                      {inq.inquiryType}
                    </div>
                    <div className="text-gray-500">
                      {inq.intendedQuantity || 'Bespoke Piece'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium">Direct Channel Used:</span>
                    <div className="font-medium text-emerald-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {inq.directContactChannel}
                    </div>
                    <div className="text-gray-500">
                      Middleman Fee: <strong className="text-emerald-600">₹0.00</strong>
                    </div>
                  </div>
                </div>

                {/* Message Excerpt */}
                {inq.message && (
                  <div className="p-3 bg-[#FAF7F2] rounded-xl text-xs text-gray-700 leading-relaxed border border-[#E7DFCE]/50">
                    "{inq.message}"
                  </div>
                )}

                {/* Actions */}
                {target && (
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <Link
                      to={`/artisans/${target.id}`}
                      className="text-[#1B365D] font-semibold hover:text-[#C85A32] flex items-center gap-1"
                    >
                      View {target.name}'s Dossier →
                    </Link>

                    <button
                      onClick={() => openInquiryModal(target)}
                      className="text-[#C85A32] font-semibold hover:underline"
                    >
                      Send Another Direct Inquiry
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
