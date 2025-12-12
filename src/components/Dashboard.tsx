import { useState } from 'react';
import { Zap, Droplet, Wifi, AlertTriangle, TrendingUp, Bell, Shield, Code } from 'lucide-react';
import UtilityCard from './UtilityCard';
import AlertPanel from './AlertPanel';

interface DashboardProps {
  onOpenChat: (message: string) => void;
}

export default function Dashboard({ onOpenChat }: DashboardProps) {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Abdulrahman</h2>
            <p className="text-emerald-200">Diriyah, Riyadh, Saudi Arabia</p>
          </div>

          <div className="relative group">
            <button className="w-12 h-12 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 transition-all shadow-lg">
              <Bell className="w-5 h-5 text-emerald-400" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full text-xs font-bold flex items-center justify-center text-white">4</span>
            </button>

            <div className="absolute top-full right-0 mt-2 w-80 bg-slate-800 rounded-xl shadow-2xl border border-white/20 p-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-red-500/30">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Water leak detected</p>
                    <p className="text-xs text-slate-400">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Peak usage optimization applied</p>
                    <p className="text-xs text-slate-400">1 hour ago</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                    <Wifi className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Internet speed test completed</p>
                    <p className="text-xs text-slate-400">3 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-slate-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-500/30">
                    <Code className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Address code shared with tenant</p>
                    <p className="text-xs text-slate-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAlert && (
          <AlertPanel
            onClose={() => setShowAlert(false)}
            onOpenChat={onOpenChat}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <UtilityCard
          icon={<Zap className="w-6 h-6" />}
          title="Electricity"
          usage="324 kWh"
          cost="$42.58"
          trend={-5}
          color="amber"
          status="normal"
          details={{
            peak: "2.8 kW at 7:00 PM",
            devices: "AC Unit using 45%"
          }}
        />

        <UtilityCard
          icon={<Droplet className="w-6 h-6" />}
          title="Water"
          usage="8,420 L"
          cost="$18.32"
          trend={12}
          color="blue"
          status="warning"
          details={{
            peak: "850 L at 8:00 AM",
            devices: "Possible leak detected"
          }}
        />

        <UtilityCard
          icon={<Wifi className="w-6 h-6" />}
          title="Internet"
          usage="247 GB"
          cost="$59.99"
          trend={8}
          color="emerald"
          status="normal"
          details={{
            peak: "42 GB at 9:00 PM",
            speed: "245 Mbps avg",
            devices: "12 devices connected"
          }}
        />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white shadow-lg border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Agent Status</h3>
                <p className="text-xs text-emerald-200">Active & Monitoring</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Anomaly Detection</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Auto-Reporting</span>
                <span className="text-emerald-400 font-medium">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Predictions</span>
                <span className="text-emerald-400 font-medium">Enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-white">Predictive Insights</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-white">Optimal AC Schedule</p>
                  <p className="text-xs text-emerald-200 mt-1">Set AC to 74°F between 2-6 PM to save $12/month</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-white">Water Usage Pattern</p>
                  <p className="text-xs text-blue-200 mt-1">Shower usage peaks detected. Efficient showerhead could save 15%</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-white">Next Month Forecast</p>
                  <p className="text-xs text-amber-200 mt-1">Expected total: $125. 8% higher due to summer cooling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
