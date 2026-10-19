import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Layers,
  ChevronRight
} from 'lucide-react';

export default function AtlasPage() {
  const { regions, artisans } = useData();
  const [selectedZone, setSelectedZone] = useState('All');
  const navigate = useNavigate();

  const zones = ['All', 'Northern India', 'Western India', 'Southern India', 'Eastern India', 'Central India'];

  const filteredRegions = regions.filter(r => {
    if (selectedZone !== 'All' && r.zone !== selectedZone) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E7DFCE] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
          <Compass className="w-4 h-4" />
          <span>Geographical Craft Atlas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A]">
          India's Regional Craft Ecosystem
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
          Explore India's artisan clusters state-by-state. From the Kani weavers of the Kashmir Himalayas 
          to the Chola bronze casters of the Kaveri delta, discover living heritage geography.
        </p>
      </div>

      {/* Zone Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="font-semibold text-gray-700 mr-1 shrink-0">Geographic Zones:</span>
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setSelectedZone(zone)}
            className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedZone === zone
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegions.map((region) => {
          // Count active masters from this state in directory
          const stateArtisans = artisans.filter(a => a.state.toLowerCase() === region.state.toLowerCase());

          return (
            <div
              key={region.id}
              className="bg-white rounded-3xl border border-[#E7DFCE] shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* State Cover */}
                <div className="relative h-44 overflow-hidden bg-gray-900">
                  <img
                    src={region.heroImage}
                    alt={region.state}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#C85A32]/90 text-white text-[11px] font-semibold backdrop-blur-sm">
                    {region.zone}
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 text-[#1E232A] text-[11px] font-bold shadow">
                    {region.registeredGITags} GI Tags
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-heritage font-bold">
                      {region.state}
                    </h3>
                    <p className="text-xs text-gray-200">
                      {stateArtisans.length} Verified Master Artisans Listed
                    </p>
                  </div>
                </div>

                {/* Highlights & Clusters */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {region.highlights}
                  </p>

                  {/* Craft Hubs */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                      Key Clusters & Hubs
                    </div>
                    <div className="space-y-1.5">
                      {region.craftHubs?.map((hub, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-[#FAF6EF] text-xs space-y-0.5 border border-[#E7DFCE]/60">
                          <div className="font-semibold text-[#1E232A]">{hub.name}</div>
                          <div className="text-[11px] text-[#C85A32] truncate">
                            {hub.crafts?.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  to={`/artisans?state=${encodeURIComponent(region.state)}`}
                  className="w-full py-2.5 rounded-xl bg-[#FAF6EF] text-[#C85A32] border border-[#C85A32]/30 hover:bg-[#C85A32] hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore {region.state} Artisans ({stateArtisans.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
