import { useState, useEffect } from 'react';
import { Building2, Zap, Droplet, Wifi, TrendingDown, TrendingUp, Plus, X } from 'lucide-react';
import RealEstateComplexCard from './RealEstateComplexCard';
import PropertyLeaderboard from './PropertyLeaderboard';
import { supabase } from '../lib/supabase';
import { generatePropertyCode, generateComplexCode, calculateServiceScore, getReliabilityRating } from '../lib/propertyCodeUtils';

interface SingleProperty {
  id: string;
  name: string;
  address: string;
  type: string;
  electricity: { usage: number; cost: number; change: number };
  water: { usage: number; cost: number; change: number };
  internet: { usage: number; cost: number; change: number };
  totalCost: number;
}

export default function PropertiesPage() {
  const [singleProperties, setSingleProperties] = useState<SingleProperty[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showComplexForm, setShowComplexForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [propertyForm, setPropertyForm] = useState({
    name: '',
    address: '',
    type: 'Single Family Home',
    electricityUsage: '',
    electricityCost: '',
    waterUsage: '',
    waterCost: '',
    internetUsage: '',
    internetCost: '',
  });

  const dummyProperties: SingleProperty[] = [
    {
      id: 'dummy-1',
      name: 'Sunset Villa',
      address: '123 Ocean Drive, Miami, FL',
      type: 'Single Family Home',
      electricity: { usage: 850, cost: 102.50, change: -5.2 },
      water: { usage: 4200, cost: 45.80, change: 2.1 },
      internet: { usage: 450, cost: 79.99, change: -1.5 },
      totalCost: 228.29,
    },
    {
      id: 'dummy-2',
      name: 'Downtown Loft',
      address: '456 Main Street, Austin, TX',
      type: 'Apartment',
      electricity: { usage: 620, cost: 74.40, change: -8.3 },
      water: { usage: 2800, cost: 32.50, change: -4.7 },
      internet: { usage: 780, cost: 89.99, change: 3.2 },
      totalCost: 196.89,
    },
    {
      id: 'dummy-3',
      name: 'Garden Cottage',
      address: '789 Maple Lane, Portland, OR',
      type: 'Cottage',
      electricity: { usage: 540, cost: 64.80, change: -3.1 },
      water: { usage: 3200, cost: 38.40, change: 1.2 },
      internet: { usage: 320, cost: 69.99, change: -2.5 },
      totalCost: 173.19,
    },
    {
      id: 'dummy-4',
      name: 'Riverside Condo',
      address: '321 River Road, Denver, CO',
      type: 'Condo',
      electricity: { usage: 680, cost: 81.60, change: -6.8 },
      water: { usage: 2600, cost: 31.20, change: -3.4 },
      internet: { usage: 590, cost: 84.99, change: 0.8 },
      totalCost: 197.79,
    },
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('single_properties')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedProperties = data.map((prop: any) => ({
            id: prop.id,
            name: prop.name,
            address: prop.address,
            type: prop.type,
            electricity: {
              usage: Number(prop.electricity_usage),
              cost: Number(prop.electricity_cost),
              change: -5.2
            },
            water: {
              usage: Number(prop.water_usage),
              cost: Number(prop.water_cost),
              change: 2.1
            },
            internet: {
              usage: Number(prop.internet_usage),
              cost: Number(prop.internet_cost),
              change: -1.5
            },
            totalCost: Number(prop.electricity_cost) + Number(prop.water_cost) + Number(prop.internet_cost),
          }));
          setSingleProperties(formattedProperties);
        } else {
          setSingleProperties(dummyProperties);
        }
      } else {
        setSingleProperties(dummyProperties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setSingleProperties(dummyProperties);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Please log in to add properties');
        return;
      }

      const electricityCost = parseFloat(propertyForm.electricityCost) || 0;
      const waterCost = parseFloat(propertyForm.waterCost) || 0;
      const internetCost = parseFloat(propertyForm.internetCost) || 0;

      const { data: propertyData, error: propertyError } = await supabase
        .from('single_properties')
        .insert({
          user_id: user.id,
          name: propertyForm.name,
          address: propertyForm.address,
          type: propertyForm.type,
          electricity_usage: parseFloat(propertyForm.electricityUsage) || 0,
          electricity_cost: electricityCost,
          water_usage: parseFloat(propertyForm.waterUsage) || 0,
          water_cost: waterCost,
          internet_usage: parseFloat(propertyForm.internetUsage) || 0,
          internet_cost: internetCost,
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      if (propertyData) {
        const code = generatePropertyCode(propertyForm.name, propertyForm.type);
        const serviceScore = calculateServiceScore(electricityCost, waterCost, internetCost);
        const reliabilityRating = getReliabilityRating(serviceScore);

        const { error: codeError } = await supabase
          .from('property_codes')
          .insert({
            property_id: propertyData.id,
            code: code,
            service_score: serviceScore,
            reliability_rating: reliabilityRating,
            public_views: 0,
            is_active: true,
          });

        if (codeError) {
          console.error('Error creating property code:', codeError);
        }
      }

      setPropertyForm({
        name: '',
        address: '',
        type: 'Single Family Home',
        electricityUsage: '',
        electricityCost: '',
        waterUsage: '',
        waterCost: '',
        internetUsage: '',
        internetCost: '',
      });
      setShowPropertyForm(false);
      fetchProperties();
      alert('Property added successfully with a unique property code!');
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property. Please try again.');
    }
  };

  const realEstateComplexes = [
    {
      id: 'c1',
      name: 'Harbor View Apartments',
      address: '789 Waterfront Blvd, Seattle, WA',
      totalUnits: 24,
      occupiedUnits: 22,
      totalCost: 4850.00,
      averageCostPerUnit: 202.08,
      savings: 485.50,
      units: [
        { id: 'u1', name: 'Unit 101', totalCost: 198.50, occupancy: 'Occupied' },
        { id: 'u2', name: 'Unit 102', totalCost: 205.30, occupancy: 'Occupied' },
        { id: 'u3', name: 'Unit 103', totalCost: 192.80, occupancy: 'Occupied' },
        { id: 'u4', name: 'Unit 104', totalCost: 210.45, occupancy: 'Vacant' },
        { id: 'u5', name: 'Unit 201', totalCost: 188.90, occupancy: 'Occupied' },
        { id: 'u6', name: 'Unit 202', totalCost: 215.60, occupancy: 'Occupied' },
        { id: 'u7', name: 'Unit 203', totalCost: 195.20, occupancy: 'Occupied' },
        { id: 'u8', name: 'Unit 204', totalCost: 208.75, occupancy: 'Vacant' },
      ],
    },
  ];

  const leaderboardEntries = [
    { id: 'l1', name: 'Downtown Loft', type: 'property' as const, efficiency: 94.5, savings: 125.80, totalCost: 196.89, rank: 1 },
    { id: 'l2', name: 'Harbor View Apartments', type: 'complex' as const, efficiency: 92.3, savings: 485.50, totalCost: 4850.00, rank: 2 },
    { id: 'l3', name: 'Sunset Villa', type: 'property' as const, efficiency: 88.7, savings: 95.40, totalCost: 228.29, rank: 3 },
    { id: 'l4', name: 'Riverside Complex', type: 'complex' as const, efficiency: 85.2, savings: 320.15, totalCost: 3250.00, rank: 4 },
    { id: 'l5', name: 'Garden Cottage', type: 'property' as const, efficiency: 82.1, savings: 78.90, totalCost: 245.50, rank: 5 },
  ];

  const [complexForm, setComplexForm] = useState({
    name: '',
    address: '',
    totalUnits: '',
    occupiedUnits: '',
  });

  const handleAddComplex = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Please log in to add complexes');
        return;
      }

      const totalUnits = parseInt(complexForm.totalUnits) || 0;
      const occupiedUnits = parseInt(complexForm.occupiedUnits) || 0;

      const { data: complexData, error: complexError } = await supabase
        .from('real_estate_complexes')
        .insert({
          user_id: user.id,
          name: complexForm.name,
          address: complexForm.address,
          total_units: totalUnits,
          occupied_units: occupiedUnits,
        })
        .select()
        .single();

      if (complexError) throw complexError;

      if (complexData) {
        const code = generateComplexCode(complexForm.name, totalUnits);
        const serviceScore = calculateServiceScore(0, 0, 0);
        const reliabilityRating = getReliabilityRating(serviceScore);

        const { error: codeError } = await supabase
          .from('property_codes')
          .insert({
            complex_id: complexData.id,
            code: code,
            service_score: serviceScore,
            reliability_rating: reliabilityRating,
            public_views: 0,
            is_active: true,
          });

        if (codeError) {
          console.error('Error creating complex code:', codeError);
        }
      }

      setComplexForm({
        name: '',
        address: '',
        totalUnits: '',
        occupiedUnits: '',
      });
      setShowComplexForm(false);
      alert('Complex added successfully with a unique property code!');
    } catch (error) {
      console.error('Error adding complex:', error);
      alert('Failed to add complex. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-slate-400" />
            <h2 className="text-3xl font-bold text-white">Properties</h2>
          </div>
          <p className="text-slate-300">View and manage your properties</p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Single Properties</h3>
              <button
                onClick={() => setShowPropertyForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Single Property
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Property</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          Electricity
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                        <div className="flex items-center justify-center gap-2">
                          <Droplet className="w-4 h-4 text-blue-400" />
                          Water
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                        <div className="flex items-center justify-center gap-2">
                          <Wifi className="w-4 h-4 text-emerald-400" />
                          Internet
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {singleProperties.map((property) => (
                      <tr key={property.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-white">{property.name}</p>
                            <p className="text-sm text-slate-400">{property.address}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
                            {property.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <p className="font-semibold text-white">{property.electricity.usage} kWh</p>
                            <p className="text-sm text-slate-400">${property.electricity.cost.toFixed(2)}</p>
                            <div className={`flex items-center justify-center gap-1 mt-1 text-xs ${property.electricity.change < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {property.electricity.change < 0 ? (
                                <TrendingDown className="w-3 h-3" />
                              ) : (
                                <TrendingUp className="w-3 h-3" />
                              )}
                              <span>{Math.abs(property.electricity.change)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <p className="font-semibold text-white">{property.water.usage} gal</p>
                            <p className="text-sm text-slate-400">${property.water.cost.toFixed(2)}</p>
                            <div className={`flex items-center justify-center gap-1 mt-1 text-xs ${property.water.change < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {property.water.change < 0 ? (
                                <TrendingDown className="w-3 h-3" />
                              ) : (
                                <TrendingUp className="w-3 h-3" />
                              )}
                              <span>{Math.abs(property.water.change)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-center">
                            <p className="font-semibold text-white">{property.internet.usage} GB</p>
                            <p className="text-sm text-slate-400">${property.internet.cost.toFixed(2)}</p>
                            <div className={`flex items-center justify-center gap-1 mt-1 text-xs ${property.internet.change < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {property.internet.change < 0 ? (
                                <TrendingDown className="w-3 h-3" />
                              ) : (
                                <TrendingUp className="w-3 h-3" />
                              )}
                              <span>{Math.abs(property.internet.change)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="text-xl font-bold text-white">${property.totalCost.toFixed(2)}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Real Estate Complexes</h3>
              <button
                onClick={() => setShowComplexForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Real Estate Complex
              </button>
            </div>
            <div className="grid gap-6">
              {realEstateComplexes.map((complex) => (
                <RealEstateComplexCard key={complex.id} complex={complex} />
              ))}
            </div>
          </div>

          <div>
            <PropertyLeaderboard entries={leaderboardEntries} />
          </div>
        </div>
      </div>

      {showPropertyForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add Single Property</h3>
              <button
                onClick={() => setShowPropertyForm(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={propertyForm.name}
                    onChange={(e) => setPropertyForm({ ...propertyForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Sunset Villa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Property Type *
                  </label>
                  <select
                    required
                    value={propertyForm.type}
                    onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Single Family Home">Single Family Home</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={propertyForm.address}
                  onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 123 Ocean Drive, Miami, FL"
                />
              </div>

              <div className="border-t border-slate-700 pt-4 mt-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Electricity
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Usage (kWh)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={propertyForm.electricityUsage}
                      onChange={(e) => setPropertyForm({ ...propertyForm, electricityUsage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 850"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={propertyForm.electricityCost}
                      onChange={(e) => setPropertyForm({ ...propertyForm, electricityCost: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 102.50"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-400" />
                  Water
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Usage (gallons)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={propertyForm.waterUsage}
                      onChange={(e) => setPropertyForm({ ...propertyForm, waterUsage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 4200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={propertyForm.waterCost}
                      onChange={(e) => setPropertyForm({ ...propertyForm, waterCost: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 45.80"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-emerald-400" />
                  Internet
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Usage (GB)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={propertyForm.internetUsage}
                      onChange={(e) => setPropertyForm({ ...propertyForm, internetUsage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 450"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={propertyForm.internetCost}
                      onChange={(e) => setPropertyForm({ ...propertyForm, internetCost: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 79.99"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPropertyForm(false)}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showComplexForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700">
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add Real Estate Complex</h3>
              <button
                onClick={() => setShowComplexForm(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddComplex} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Complex Name *
                </label>
                <input
                  type="text"
                  required
                  value={complexForm.name}
                  onChange={(e) => setComplexForm({ ...complexForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Harbor View Apartments"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={complexForm.address}
                  onChange={(e) => setComplexForm({ ...complexForm, address: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., 789 Waterfront Blvd, Seattle, WA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Total Units *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={complexForm.totalUnits}
                    onChange={(e) => setComplexForm({ ...complexForm, totalUnits: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., 24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Occupied Units *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={complexForm.occupiedUnits}
                    onChange={(e) => setComplexForm({ ...complexForm, occupiedUnits: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., 22"
                  />
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-slate-300">
                  After creating the complex, you can add individual units and their utility information from the complex details page.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowComplexForm(false)}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold"
                >
                  Add Complex
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
