import { useState } from 'react';
import { Search, MapPin, TrendingUp, Zap, Droplet, Wifi, AlertCircle, CheckCircle, Star } from 'lucide-react';

export default function PropertyLookup() {
  const [searchCode, setSearchCode] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">Property Service Lookup</h2>
            <p className="text-slate-300">
              Enter a Property Address Code to view verified utility performance and service quality data
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter address code (e.g., SC-MAP-123-4B)"
                className="w-full px-6 py-4 pr-32 text-lg rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors backdrop-blur-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { setSearchCode('SC-MAP-123-4B'); setShowResults(true); }}
              className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Try example: SC-MAP-123-4B
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => { setSearchCode('SC-OAK-456-12A'); setShowResults(true); }}
              className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Try example: SC-OAK-456-12A
            </button>
          </div>
        </div>

        {showResults && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                    <MapPin className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">123 Maple Street, Apt 4B</h3>
                      <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-2">Downtown District • 2 Bed, 1 Bath • 850 sq ft</p>
                    <p className="text-sm text-slate-400">Code: {searchCode} • Last updated: 1 hour ago</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-3xl font-bold text-white">94</span>
                  </div>
                  <p className="text-sm text-slate-300">Service Score</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-amber-500/20 rounded-lg p-4 border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold text-white">Electricity</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Reliability</span>
                      <span className="font-medium text-white">99.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg. Monthly</span>
                      <span className="font-medium text-white">$45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Outages/Year</span>
                      <span className="font-medium text-white">0.5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-white">Water</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Pressure</span>
                      <span className="font-medium text-white">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg. Monthly</span>
                      <span className="font-medium text-white">$22</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Quality</span>
                      <span className="font-medium text-white">A+</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/20 rounded-lg p-4 border border-emerald-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-white">Internet</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg. Speed</span>
                      <span className="font-medium text-white">245 Mbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Stability</span>
                      <span className="font-medium text-white">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Latency</span>
                      <span className="font-medium text-white">12ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">6-Month Performance</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Electricity Reliability</span>
                      <span className="font-medium text-white">99.8%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '99.8%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Water Consistency</span>
                      <span className="font-medium text-white">97.2%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '97.2%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Internet Uptime</span>
                      <span className="font-medium text-white">98.5%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '98.5%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <p className="text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 inline text-emerald-400 mr-1" />
                    <span className="font-semibold">Excellent</span> overall service quality with minimal disruptions
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">Service History</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-white">No major incidents</p>
                      <p className="text-xs text-slate-400">Last 6 months - All systems operational</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-white">Scheduled maintenance</p>
                      <p className="text-xs text-slate-400">3 months ago - Internet, 2 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-white">Brief power outage</p>
                      <p className="text-xs text-slate-400">5 months ago - 15 minutes, resolved quickly</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full py-2.5 bg-white/10 text-slate-200 rounded-lg font-medium hover:bg-white/20 transition-colors text-sm border border-white/10">
                    View Full Service History
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-bold text-white mb-3">Interested in this property?</h3>
                <p className="text-slate-300 mb-6">
                  This verified service data is provided by the property owner through Mad.
                  All metrics are based on real monitoring data and updated continuously.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    Contact Property Owner
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10">
                    Download Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
