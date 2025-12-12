import { AlertTriangle, X, Send } from 'lucide-react';
import { useState } from 'react';

interface AlertPanelProps {
  onClose: () => void;
  onOpenChat: (message: string) => void;
}

export default function AlertPanel({ onClose, onOpenChat }: AlertPanelProps) {
  const [showReport, setShowReport] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl p-6 mb-8 shadow-sm backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-red-500/30">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-red-400">Water Anomaly Detected</h3>
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full font-medium">
                Agent Alert
              </span>
            </div>

            <p className="text-slate-200 mb-4">
              Unusual water consumption detected in bathroom. Flow rate 25% higher than normal baseline.
              Possible leak or malfunctioning fixture identified.
            </p>

            {!showReport && !showDetails ? (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onOpenChat('Submit anomaly report');
                    onClose();
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Report to Provider
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 bg-white/10 text-slate-200 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10"
                >
                  View Details
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Dismiss
                </button>
              </div>
            ) : showReport ? (
              <div className="bg-white/10 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <Send className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Diagnostic Report Ready</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      AI Agent has prepared a detailed report for your water provider including:
                    </p>
                    <ul className="text-sm text-slate-300 space-y-1 mb-4">
                      <li>• Flow rate measurements (2.8 L/min baseline vs 3.5 L/min current)</li>
                      <li>• Time-series data from last 48 hours</li>
                      <li>• Suspected location: Master bathroom</li>
                      <li>• Estimated excess usage: 850L over 2 days</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm">
                    Confirm & Send to Provider
                  </button>
                  <button
                    onClick={() => setShowReport(false)}
                    className="px-4 py-2 bg-white/10 text-slate-200 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-3">Alert Details</h4>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">Detection Time</p>
                      <p className="text-sm text-white font-medium">Today, 2:45 PM</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">Alert Severity</p>
                      <p className="text-sm text-red-400 font-medium">High</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">Location</p>
                      <p className="text-sm text-white font-medium">Master Bathroom</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">Anomaly Type</p>
                      <p className="text-sm text-white font-medium">Flow Rate Spike</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-slate-300 mb-2 font-medium">Flow Rate Analysis</p>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-slate-400">Baseline</span>
                          <span className="text-xs text-slate-200">2.8 L/min</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-slate-400">Current</span>
                          <span className="text-xs text-red-400 font-medium">3.5 L/min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Increase</span>
                          <span className="text-xs text-red-400 font-medium">+25%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-300 mb-2 font-medium">Consumption Impact</p>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <ul className="text-xs text-slate-300 space-y-1">
                          <li>• Excess usage: 850L over 48 hours</li>
                          <li>• Estimated cost impact: $12.75 extra</li>
                          <li>• Projected monthly waste: 12,750L</li>
                          <li>• Projected monthly cost: $191.25 extra</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onOpenChat('Submit anomaly report');
                      onClose();
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
                  >
                    Submit Report to Provider
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 bg-white/10 text-slate-200 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/10 text-sm"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
