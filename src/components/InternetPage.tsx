import { useState, useEffect } from 'react';
import { Wifi, X, TrendingUp, Activity, Copy, CheckCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PropertyCode {
  id: string;
  propertyName: string;
  propertyType: string;
  code: string;
}

interface MetricsModalProps {
  propertyType: string;
  propertyName: string;
  addressCode: string;
  onClose: () => void;
}

function MetricsModal({ propertyType, propertyName, addressCode, onClose }: MetricsModalProps) {
  const weeklyData = [
    { day: 'Mon', consumption: 28.5, cost: 8.55 },
    { day: 'Tue', consumption: 32.2, cost: 9.66 },
    { day: 'Wed', consumption: 35.8, cost: 10.74 },
    { day: 'Thu', consumption: 31.3, cost: 9.39 },
    { day: 'Fri', consumption: 42.6, cost: 12.78 },
    { day: 'Sat', consumption: 48.4, cost: 14.52 },
    { day: 'Sun', consumption: 45.8, cost: 13.74 }
  ];

  const monthlyData = [
    { month: 'Jan', consumption: 247, cost: 59.99 },
    { month: 'Feb', consumption: 232, cost: 59.99 },
    { month: 'Mar', consumption: 258, cost: 59.99 },
    { month: 'Apr', consumption: 272, cost: 59.99 },
    { month: 'May', consumption: 295, cost: 59.99 },
    { month: 'Jun', consumption: 318, cost: 59.99 },
    { month: 'Jul', consumption: 342, cost: 59.99 },
    { month: 'Aug', consumption: 335, cost: 59.99 },
    { month: 'Sep', consumption: 298, cost: 59.99 },
    { month: 'Oct', consumption: 285, cost: 59.99 },
    { month: 'Nov', consumption: 268, cost: 59.99 },
    { month: 'Dec', consumption: 254, cost: 59.99 }
  ];

  const maxConsumption = Math.max(...monthlyData.map(d => d.consumption));
  const avgConsumption = (monthlyData.reduce((acc, d) => acc + d.consumption, 0) / monthlyData.length).toFixed(1);
  const totalAnnual = monthlyData.reduce((acc, d) => acc + d.consumption, 0);

  const avgWeeklyCost = (weeklyData.reduce((acc, d) => acc + d.cost, 0) / weeklyData.length).toFixed(2);
  const avgMonthlyCost = (monthlyData.reduce((acc, d) => acc + d.cost, 0) / monthlyData.length).toFixed(2);
  const avgYearlyCost = (monthlyData.reduce((acc, d) => acc + d.cost, 0)).toFixed(2);

  const maxWeeklyConsumption = Math.max(...weeklyData.map(d => d.consumption));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi className="w-8 h-8 text-emerald-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Internet Metrics</h2>
              <p className="text-slate-400 text-sm mt-1">
                {propertyName} ({propertyType}) - Code: {addressCode}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-medium text-slate-300">Avg. Data Usage</h3>
              </div>
              <p className="text-3xl font-bold text-white">{avgConsumption} GB</p>
              <p className="text-xs text-slate-400 mt-1">Per month</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-medium text-slate-300">Annual Total</h3>
              </div>
              <p className="text-3xl font-bold text-white">{totalAnnual} GB</p>
              <p className="text-xs text-slate-400 mt-1">This year</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Monthly Data Usage</h3>
            <div className="space-y-3">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-slate-400">{data.month}</div>
                  <div className="flex-1 bg-slate-700/30 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${(data.consumption / maxConsumption) * 100}%` }}
                    >
                      <span className="text-white text-xs font-semibold">{data.consumption} GB</span>
                    </div>
                  </div>
                  <div className="w-20 text-sm font-medium text-emerald-400 text-right">${data.cost}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Data Usage</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(data.consumption / maxWeeklyConsumption) * 200}px` }}
                      title={`${data.day}: ${data.consumption} GB`}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Cost Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Avg cost per Week</p>
                <p className="text-xl font-bold text-white">${avgWeeklyCost}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Avg cost per Month</p>
                <p className="text-xl font-bold text-white">${avgMonthlyCost}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Avg cost per Year</p>
                <p className="text-xl font-bold text-white">${avgYearlyCost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InternetPage() {
  const [propertyCodes, setPropertyCodes] = useState<PropertyCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMetricsModal, setShowMetricsModal] = useState<{ propertyType: string; propertyName: string; code: string } | null>(null);

  const dummyPropertyCodes: PropertyCode[] = [
    {
      id: 'dummy-1',
      propertyName: 'Sunset Villa',
      propertyType: 'Single Family Home',
      code: 'SC-SV-789-2A',
    },
    {
      id: 'dummy-2',
      propertyName: 'Downtown Loft',
      propertyType: 'Apartment',
      code: 'SC-DL-456-7C',
    },
    {
      id: 'dummy-3',
      propertyName: 'Harbor View Apartments',
      propertyType: 'Real Estate Complex',
      code: 'RC-HV-123-9B',
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
            created_at,
            single_properties!inner (
              name,
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
            created_at,
            real_estate_complexes!inner (
              name,
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
            propertyType: item.single_properties.type,
            code: item.code,
          }));
          allCodes.push(...formattedProperties);
        }

        if (complexesData && !complexesError) {
          const formattedComplexes = complexesData.map((item: any) => ({
            id: item.id,
            propertyName: item.real_estate_complexes.name,
            propertyType: 'Real Estate Complex',
            code: item.code,
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

  const handleViewMetrics = (property: PropertyCode) => {
    setShowMetricsModal({
      propertyType: property.propertyType,
      propertyName: property.propertyName,
      code: property.code
    });
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
          <div className="flex items-center gap-3 mb-2">
            <Wifi className="w-8 h-8 text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Internet</h2>
          </div>
          <p className="text-slate-300">Monitor data usage, report issues, and find solutions</p>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Metrics</h3>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Property Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Property Code
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        View Metrics
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
                          <button
                            onClick={() => handleViewMetrics(property)}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Problems</h3>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">All Systems Normal</h4>
                  <p className="text-slate-300 text-sm">No problems detected with your internet service at this time.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Solutions</h3>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Upgrade to a faster internet plan</h5>
                    <p className="text-slate-300 text-sm">If you're experiencing slow speeds, consider upgrading to a higher bandwidth plan that better matches your household needs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Optimize router placement</h5>
                    <p className="text-slate-300 text-sm">Place your router in a central location away from walls and electronic devices to maximize WiFi coverage and signal strength.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Use ethernet for high-bandwidth devices</h5>
                    <p className="text-slate-300 text-sm">Connect gaming consoles, smart TVs, and work computers directly to the router via ethernet cable for more stable connections.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Regularly restart your router</h5>
                    <p className="text-slate-300 text-sm">Restart your router monthly to clear the cache and improve performance. Consider automating this with a smart plug on a schedule.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h5 className="text-white font-semibold mb-1">Consider a mesh WiFi system</h5>
                    <p className="text-slate-300 text-sm">For larger homes, invest in a mesh WiFi system to eliminate dead zones and ensure consistent coverage throughout your property.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showMetricsModal && (
        <MetricsModal
          propertyType={showMetricsModal.propertyType}
          propertyName={showMetricsModal.propertyName}
          addressCode={showMetricsModal.code}
          onClose={() => setShowMetricsModal(null)}
        />
      )}
    </div>
  );
}
