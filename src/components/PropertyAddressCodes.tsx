import { useState, useEffect } from 'react';
import { Copy, CheckCircle, Eye, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PropertyCode {
  id: string;
  propertyName: string;
  propertyAddress: string;
  propertyType: string;
  code: string;
  serviceScore: number;
  reliabilityRating: string;
  publicViews: number;
  isActive: boolean;
}

export default function PropertyAddressCodes() {
  const [propertyCodes, setPropertyCodes] = useState<PropertyCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dummyPropertyCodes: PropertyCode[] = [
    {
      id: 'dummy-1',
      propertyName: 'Sunset Villa',
      propertyAddress: '123 Ocean Drive, Miami, FL',
      propertyType: 'Single Family Home',
      code: 'SC-SV-789-2A',
      serviceScore: 88,
      reliabilityRating: 'Excellent',
      publicViews: 23,
      isActive: true,
    },
    {
      id: 'dummy-2',
      propertyName: 'Downtown Loft',
      propertyAddress: '456 Main Street, Austin, TX',
      propertyType: 'Apartment',
      code: 'SC-DL-456-7C',
      serviceScore: 94,
      reliabilityRating: 'Excellent',
      publicViews: 45,
      isActive: true,
    },
    {
      id: 'dummy-3',
      propertyName: 'Harbor View Apartments',
      propertyAddress: '789 Waterfront Blvd, Seattle, WA',
      propertyType: 'Real Estate Complex',
      code: 'RC-HV-123-9B',
      serviceScore: 92,
      reliabilityRating: 'Excellent',
      publicViews: 67,
      isActive: true,
    },
    {
      id: 'dummy-4',
      propertyName: 'Garden Cottage',
      propertyAddress: '789 Maple Lane, Portland, OR',
      propertyType: 'Cottage',
      code: 'SC-GC-456-8C',
      serviceScore: 82,
      reliabilityRating: 'Good',
      publicViews: 12,
      isActive: true,
    },
    {
      id: 'dummy-5',
      propertyName: 'Riverside Condo',
      propertyAddress: '321 River Road, Denver, CO',
      propertyType: 'Condo',
      code: 'SC-RC-654-4D',
      serviceScore: 91,
      reliabilityRating: 'Excellent',
      publicViews: 34,
      isActive: false,
    },
  ];

  useEffect(() => {
    fetchPropertyCodes();
  }, []);

  const fetchPropertyCodes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('property_codes')
          .select(`
            id,
            code,
            service_score,
            reliability_rating,
            public_views,
            is_active,
            created_at,
            single_properties!inner (
              name,
              address,
              type,
              user_id
            )
          `)
          .eq('single_properties.user_id', user.id)
          .order('created_at', { ascending: false });

        const { data: complexesData, error: complexesError } = await supabase
          .from('property_codes')
          .select(`
            id,
            code,
            service_score,
            reliability_rating,
            public_views,
            is_active,
            created_at,
            real_estate_complexes!inner (
              name,
              address,
              user_id
            )
          `)
          .eq('real_estate_complexes.user_id', user.id)
          .order('created_at', { ascending: false });

        const allCodes: PropertyCode[] = [];

        if (propertiesData && !propertiesError) {
          const formattedProperties = propertiesData.map((item: any) => ({
            id: item.id,
            propertyName: item.single_properties.name,
            propertyAddress: item.single_properties.address,
            propertyType: item.single_properties.type,
            code: item.code,
            serviceScore: item.service_score,
            reliabilityRating: item.reliability_rating,
            publicViews: item.public_views,
            isActive: item.is_active,
          }));
          allCodes.push(...formattedProperties);
        }

        if (complexesData && !complexesError) {
          const formattedComplexes = complexesData.map((item: any) => ({
            id: item.id,
            propertyName: item.real_estate_complexes.name,
            propertyAddress: item.real_estate_complexes.address,
            propertyType: 'Real Estate Complex',
            code: item.code,
            serviceScore: item.service_score,
            reliabilityRating: item.reliability_rating,
            publicViews: item.public_views,
            isActive: item.is_active,
          }));
          allCodes.push(...formattedComplexes);
        }

        if (allCodes.length > 0) {
          setPropertyCodes(allCodes);
        } else {
          setPropertyCodes(dummyPropertyCodes);
        }
      } else {
        setPropertyCodes(dummyPropertyCodes);
      }
    } catch (error) {
      console.error('Error fetching property codes:', error);
      setPropertyCodes(dummyPropertyCodes);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Property Address Codes</h2>
          <p className="text-slate-300">Manage and share your property address codes with potential tenants</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Property Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Property Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Reliability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {propertyCodes.map((property) => (
                  <tr key={property.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{property.propertyName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">{property.propertyAddress}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">{property.propertyType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                          {property.code}
                        </code>
                        <button
                          onClick={() => handleCopy(property.code, property.id)}
                          className="text-slate-400 hover:text-white transition-colors"
                          title="Copy code"
                        >
                          {copiedId === property.id ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1 text-sm font-semibold ${getScoreColor(property.serviceScore)}`}>
                        <BarChart3 className="w-4 h-4" />
                        {property.serviceScore}/100
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRatingBadge(property.reliabilityRating)}`}>
                        {property.reliabilityRating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-300">
                        <Eye className="w-4 h-4" />
                        {property.publicViews}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        property.isActive
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {property.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">What are Property Address Codes?</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              Property Address Codes are unique identifiers that allow property owners to share verified
              utility performance data with potential tenants or buyers.
            </p>
            <p>
              When you share your code, interested parties can view real-time and historical data about:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Electricity reliability and costs</li>
              <li>Water quality and pressure</li>
              <li>Internet speed and stability</li>
              <li>Service history and maintenance records</li>
            </ul>
            <p className="pt-2">
              This transparency helps renters make informed decisions and builds trust between property
              owners and tenants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
