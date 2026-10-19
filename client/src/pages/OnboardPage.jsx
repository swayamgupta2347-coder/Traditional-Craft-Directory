import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  UserCheck, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  Info,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export default function OnboardPage() {
  const { submitNomination, crafts, regions } = useData();
  const navigate = useNavigate();

  const [artisanName, setArtisanName] = useState('');
  const [craftCategory, setCraftCategory] = useState('Textiles & Weaving');
  const [craftSubtype, setCraftSubtype] = useState('');
  const [state, setState] = useState('Gujarat');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [experienceYears, setExperienceYears] = useState(15);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [workshopAddress, setWorkshopAddress] = useState('');
  const [techniqueDescription, setTechniqueDescription] = useState('');
  const [nominatorName, setNominatorName] = useState('');
  const [nominatorRelation, setNominatorRelation] = useState('Field Officer / NGO');
  const [pehchanCard, setPehchanCard] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artisanName || !craftSubtype || !phone || !state || !district) {
      alert('Please fill out all mandatory fields marked with an asterisk (*).');
      return;
    }

    submitNomination({
      artisanName,
      craftCategory,
      craftSubtype,
      state,
      district,
      village: village || 'Artisan Cluster',
      experienceYears: Number(experienceYears) || 5,
      phone,
      email,
      workshopAddress: workshopAddress || `${village}, ${district}, ${state}`,
      techniqueDescription,
      nominatorName: nominatorName || 'Field Mobilizer',
      nominatorRelation,
      evidenceDocuments: [
        pehchanCard ? `Pehchan Artisan ID: ${pehchanCard}` : 'Local Craft Council Verification Letter',
        'Physical Workshop Verification Photo'
      ]
    });

    setIsSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E7DFCE] pb-6 space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
          <UserCheck className="w-4 h-4" />
          <span>Artisan Digital Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heritage font-bold text-[#1E232A]">
          Nominate a Traditional Master Artisan
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
          Help bridge the digital divide. Artisans, family members, local NGOs, and field officers 
          can submit unindexed traditional craftspersons for government-standard verification and free directory listing.
        </p>
      </div>

      {isSuccess ? (
        // Success Card
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E7DFCE] shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-heritage font-bold text-[#1E232A]">
              Nomination Queued For Verification!
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Master artisan <strong>{artisanName}</strong> ({craftSubtype}) has been successfully submitted to the National Verification Desk.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7DFCE] max-w-md mx-auto text-xs text-left space-y-2 text-gray-700">
            <div className="font-bold text-[#1E232A]">What happens next?</div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1B365D] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
              <span>Regional Field Officers review the craft credentials and Pehchan ID.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1B365D] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
              <span>The Admin Dashboard verifies the profile and issues the official badge.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1B365D] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
              <span>The artisan profile goes live across India with 100% direct contact!</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/admin"
              className="px-6 py-2.5 rounded-xl bg-[#1B365D] text-white text-xs font-semibold hover:bg-[#10223D] transition-colors"
            >
              Open Admin Review Queue →
            </Link>
            <button
              onClick={() => {
                setIsSuccess(false);
                setArtisanName('');
                setCraftSubtype('');
                setPhone('');
              }}
              className="px-6 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:border-[#C85A32]"
            >
              Nominate Another Artisan
            </button>
          </div>
        </div>
      ) : (
        // Nomination Form
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E7DFCE] shadow-sm space-y-8">
          
          {/* Section 1: Artisan Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F2ECE1] pb-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="font-heritage text-base font-bold text-[#1E232A]">Artisan Personal & Contact Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Artisan Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={artisanName}
                  onChange={(e) => setArtisanName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra Shilpi"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Direct Contact / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="artisan@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ministry Pehchan Artisan Card ID / GI Registry No.
                </label>
                <input
                  type="text"
                  value={pehchanCard}
                  onChange={(e) => setPehchanCard(e.target.value)}
                  placeholder="e.g. PEHCHAN-RJ-2024-9182"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Craft & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F2ECE1] pb-2">
              <span className="w-6 h-6 rounded-full bg-[#1B365D] text-white flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="font-heritage text-base font-bold text-[#1E232A]">Craft Discipline & Generational Lineage</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Craft Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={craftCategory}
                  onChange={(e) => setCraftCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                >
                  <option value="Textiles & Weaving">Textiles & Weaving</option>
                  <option value="Traditional Painting">Traditional Painting</option>
                  <option value="Metalwork">Metalwork & Casting</option>
                  <option value="Ceramics & Pottery">Ceramics & Pottery</option>
                  <option value="Woodcraft">Woodcraft & Lacquer</option>
                  <option value="Textiles & Embroidery">Textiles & Embroidery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Specific Craft Subtype <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={craftSubtype}
                  onChange={(e) => setCraftSubtype(e.target.value)}
                  placeholder="e.g. Terracotta Votive Murals, Double-Ikat"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="80"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Technique Description & Indigenous Raw Materials
              </label>
              <textarea
                rows={3}
                value={techniqueDescription}
                onChange={(e) => setTechniqueDescription(e.target.value)}
                placeholder="Describe how the craft is executed, traditional tools, botanical or mineral colors, and generational history..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>
          </div>

          {/* Section 3: Geographic Location & Workshop */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F2ECE1] pb-2">
              <span className="w-6 h-6 rounded-full bg-[#F3A628] text-white flex items-center justify-center text-xs font-bold">3</span>
              <h3 className="font-heritage text-base font-bold text-[#1E232A]">Workshop & Location</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  State / UT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Rajasthan, Odisha"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Puri, Kutch, Thanjavur"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Village / Craft Cluster
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Raghurajpur, Nirona"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Physical Workshop Address
              </label>
              <input
                type="text"
                value={workshopAddress}
                onChange={(e) => setWorkshopAddress(e.target.value)}
                placeholder="Street address, nearest landmark, pin code..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>
          </div>

          {/* Section 4: Nominator Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F2ECE1] pb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">4</span>
              <h3 className="font-heritage text-base font-bold text-[#1E232A]">Nominator Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Name (Nominator / Field Officer)
                </label>
                <input
                  type="text"
                  value={nominatorName}
                  onChange={(e) => setNominatorName(e.target.value)}
                  placeholder="e.g. Sunita Devi"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Relationship to Artisan
                </label>
                <select
                  value={nominatorRelation}
                  onChange={(e) => setNominatorRelation(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                >
                  <option value="Self-Nomination (Artisan)">Self-Nomination (Artisan)</option>
                  <option value="Family Member / Disciple">Family Member / Disciple</option>
                  <option value="Field Officer / NGO">Field Officer / NGO Mobilizer</option>
                  <option value="Researcher / Curator">Researcher / Curator</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-[#F2ECE1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All submitted data is verified before public listing. Zero fee charged.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B33925] text-white font-semibold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Nomination for Verification</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
