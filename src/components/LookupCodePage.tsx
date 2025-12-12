import { useState } from 'react';
import { Search, Building2, MapPin, BarChart3, Eye, CheckCircle, XCircle, Zap, Droplet, Wifi } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PropertyDetails {
  code: string;
  propertyName: string;
  propertyAddress: string;
  propertyType: string;
  serviceScore: number;
  reliabilityRating: string;
  publicViews: number;
  isActive: boolean;
}

export default function LookupCodePage() {
  const [searchCode, setSearchCode] = useState('');
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchCode.trim()) {
      setError('Please enter a property code');
      return;
    }

    setLoading(true);
    setError('');
    setPropertyDetails(null);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('property_codes')
        .select(`
          code,
          service_score,
          reliability_rating,
          public_views,
          is_active,
          single_properties (
            name,
            address,
            type
          ),
          real_estate_complexes (
            name,
            address
          )
        `)
        .eq('code', searchCode.trim().toUpperCase())
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        setError('Property code not found. Please check the code and try again.');
        return;
      }

      if (data.single_properties) {
        setPropertyDetails({
          code: data.code,
          propertyName: data.single_properties.name,
          propertyAddress: data.single_properties.address,
          propertyType: data.single_properties.type,
          serviceScore: data.service_score,
          reliabilityRating: data.reliability_rating,
          publicViews: data.public_views,
          isActive: data.is_active,
        });
      } else if (data.real_estate_complexes) {
        setPropertyDetails({
          code: data.code,
          propertyName: data.real_estate_complexes.name,
          propertyAddress: data.real_estate_complexes.address,
          propertyType: 'Real Estate Complex',
          serviceScore: data.service_score,
          reliabilityRating: data.reliability_rating,
          publicViews: data.public_views,
          isActive: data.is_active,
        });
      } else {
        setError('Property code not found. Please check the code and try again.');
        return;
      }

      await supabase
        .from('property_codes')
        .update({ public_views: data.public_views + 1 })
        .eq('code', searchCode.trim().toUpperCase());

    } catch (err) {
      console.error('Error searching property code:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getRatingBadge = (rating: string) => {
    const colors: Record<string, string> = {
      'Excellent': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Good': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Fair': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'Poor': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[rating] || colors['Good'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Lookup Property Code</h2>
          <p className="text-slate-300">
            Enter a property code to view detailed information about utilities and services
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              placeholder="Enter property code (e.g., SC-SV-789-2A)"
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {searched && !loading && !error && !propertyDetails && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3">
            <XCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-amber-400">No property found with this code</p>
          </div>
        )}

        {propertyDetails && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{propertyDetails.propertyName}</h3>
                    <p className="text-sm text-slate-300">{propertyDetails.propertyType}</p>
                  </div>
                </div>
                {propertyDetails.isActive ? (
                  <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1 bg-slate-500/20 text-slate-400 rounded-full text-sm">
                    <XCircle className="w-4 h-4" />
                    Inactive
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Address</p>
                  <p className="text-white">{propertyDetails.propertyAddress}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-slate-400" />
                    <p className="text-sm text-slate-400">Service Score</p>
                  </div>
                  <p className={`text-2xl font-bold ${getScoreColor(propertyDetails.serviceScore)}`}>
                    {propertyDetails.serviceScore}/100
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-slate-400 mb-2">Reliability Rating</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRatingBadge(propertyDetails.reliabilityRating)}`}>
                    {propertyDetails.reliabilityRating}
                  </span>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-slate-400" />
                    <p className="text-sm text-slate-400">Public Views</p>
                  </div>
                  <p className="text-2xl font-bold text-white">{propertyDetails.publicViews}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">Available Utilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Zap className="w-5 h-5 text-amber-400" />
                    </div>
                    <span>Electricity</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Droplet className="w-5 h-5 text-blue-400" />
                    </div>
                    <span>Water</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Wifi className="w-5 h-5 text-purple-400" />
                    </div>
                    <span>Internet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">How to Use Property Codes</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              Property codes are unique identifiers that property owners share to provide transparency
              about their property's utility services and performance.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Enter the property code provided by the property owner</li>
              <li>View services' historical data and reliability ratings</li>
              <li>Access detailed information about electricity, water, and internet services</li>
              <li>Make informed decisions based on verified utility data</li>
            </ul>
            <p className="pt-2 text-emerald-400">
              Property codes start with "SC-" for single properties or "RC-" for real estate complexes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
