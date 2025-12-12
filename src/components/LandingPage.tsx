import { ArrowRight, Zap, Droplet, Wifi, Shield, TrendingUp, Users, Eye, Building, Search } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
  onLookupCode: () => void;
}

export default function LandingPage({ onLogin, onSignUp, onLookupCode }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5">
                <img
                  src="/whatsapp_image_2025-12-10_at_23.10.44.jpeg"
                  alt="Mad Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Mad</span>
            </div>
            <div className="hidden md:flex gap-6 items-center">
              <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
              <button onClick={onLogin} className="text-slate-300 hover:text-white transition">Login</button>
              <button onClick={onSignUp} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">Sign up</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Intelligent property Monitoring for secure, sustainable Vision
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Monitor electricity, water, and internet in real-time. Get AI-powered insights, predictive analytics, and share transparent property data with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onSignUp}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-lg shadow-lg"
            >
              Start freely
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onLookupCode}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors text-lg shadow-lg"
            >
              <Search className="w-5 h-5" />
              Lookup a Code
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Secure against incidents</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition">
              <Zap className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Real-time Monitoring</h3>
              <p className="text-slate-300">Track electricity, water, and internet usage with instant alerts for anomalies.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition">
              <Shield className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Agent</h3>
              <p className="text-slate-300">Intelligent anomaly detection and automated reporting to service providers.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Predictive Insights</h3>
              <p className="text-slate-300">ML-powered forecasting helps optimize consumption and reduce costs.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition">
              <Droplet className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Property Code</h3>
              <p className="text-slate-300">Share verified property performance data with tenants and buyers transparently.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition">
              <Wifi className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Internet Analytics</h3>
              <p className="text-slate-300">Monitor speed, latency, and data usage per device for optimal performance.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition">
              <Users className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Agentic AI Support</h3>
              <p className="text-slate-300">Agentic AI chatbot providing instant assistance for troubleshooting and reporting issues to authorites.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Monitor & Analyze</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                An intelligent consuming system that allows you to monitor and optimize your property utilities monthly consumptions.
              </p>
            </div>

            <div className="relative">
              <div>
                <div className="relative flex items-center justify-center w-full h-[300px]">

                  {/* Eye - Monitoring System at the center */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 border-4 border-slate-800">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Connection lines from utilities to eye */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                    {/* Electricity to Eye */}
                    <line x1="80" y1="204" x2="50%" y2="33%" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.5">
                      <animate attributeName="stroke-dashoffset" from="0" to="14" dur="2s" repeatCount="indefinite" />
                    </line>
                    {/* Water to Eye */}
                    <line x1="50%" y1="204" x2="50%" y2="33%" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.5">
                      <animate attributeName="stroke-dashoffset" from="0" to="14" dur="2s" repeatCount="indefinite" />
                    </line>
                    {/* Internet to Eye */}
                    <line x1="calc(100% - 80px)" y1="204" x2="50%" y2="33%" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.5">
                      <animate attributeName="stroke-dashoffset" from="0" to="14" dur="2s" repeatCount="indefinite" />
                    </line>
                  </svg>

                  {/* Utilities positioned at the bottom */}
                  {/* Electricity - Bottom Left */}
                  <div className="absolute bottom-8 left-12" style={{ zIndex: 10 }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500/30 to-amber-600/20 backdrop-blur-sm rounded-xl border-2 border-amber-500/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Zap className="w-9 h-9 text-amber-400" />
                    </div>
                  </div>

                  {/* Water - Bottom Center */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ zIndex: 10 }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 backdrop-blur-sm rounded-xl border-2 border-cyan-500/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Droplet className="w-9 h-9 text-cyan-400" />
                    </div>
                  </div>

                  {/* Internet - Bottom Right */}
                  <div className="absolute bottom-8 right-12" style={{ zIndex: 10 }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/20 backdrop-blur-sm rounded-xl border-2 border-blue-500/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Wifi className="w-9 h-9 text-blue-400" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-12 border border-emerald-500/30">
                <Building className="w-20 h-20 text-emerald-400 mb-6 mx-auto" />
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <p className="text-slate-300 text-sm font-semibold mb-1">Apartment 101</p>
                    <p className="text-slate-400 text-xs">John Doe • john@email.com</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <p className="text-slate-300 text-sm font-semibold mb-1">Apartment 102</p>
                    <p className="text-slate-400 text-xs">Jane Smith • jane@email.com</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <p className="text-slate-300 text-sm font-semibold mb-1">Apartment 103</p>
                    <p className="text-slate-400 text-xs">Mike Johnson • mike@email.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Reflect your configuration</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                Bring your property configurations from apartment numbers and their subsequent data to contact information of tenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Promote trust by transparency</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                You can share a verified code with tenants or buyers so they can preview the building/apartment quality before renting or purchasing.
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-12 border border-blue-500/30">
                <Shield className="w-20 h-20 text-blue-400 mb-6 mx-auto" />
                <div className="text-center space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <p className="text-slate-300 text-xs uppercase tracking-wider mb-2">Verified Property Code</p>
                    <p className="text-3xl font-mono font-bold text-white">ABC-1234</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <div className="bg-emerald-500/20 rounded-lg px-4 py-2 border border-emerald-500/30">
                      <p className="text-emerald-300 text-xs">Electricity</p>
                      <p className="text-white font-semibold">Optimal</p>
                    </div>
                    <div className="bg-cyan-500/20 rounded-lg px-4 py-2 border border-cyan-500/30">
                      <p className="text-cyan-300 text-xs">Water</p>
                      <p className="text-white font-semibold">Excellent</p>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg px-4 py-2 border border-blue-500/30">
                      <p className="text-blue-300 text-xs">Internet</p>
                      <p className="text-white font-semibold">Fast</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Pricing</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <p className="text-4xl font-bold text-emerald-400 mb-6">$0<span className="text-lg text-slate-300">/mo</span></p>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Basic monitoring
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Weekly reports
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  1 property
                </li>
              </ul>
              <button className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">Get Started</button>
            </div>

            <div className="bg-emerald-600 rounded-xl p-8 border-2 border-emerald-400 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-bold">Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Mad Pro</h3>
              <p className="text-4xl font-bold text-white mb-6">$9.99<span className="text-lg text-emerald-100">/mo</span></p>
              <ul className="space-y-3 text-emerald-50 mb-8">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Everything in Free
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Detection by Agentic AI
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Up to 5 properties
                </li>
              </ul>
              <button className="w-full py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition font-semibold">Choose Plan</button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Mad Premium</h3>
              <p className="text-4xl font-bold text-emerald-400 mb-6">$29.99<span className="text-lg text-slate-300">/mo</span></p>
              <ul className="space-y-3 text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Everything in Mad Pro
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Certified reports
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Unlimited properties
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  Priority support
                </li>
              </ul>
              <button className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">Choose Plan</button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Compare Plans</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">Features</th>
                      <th className="text-center py-4 px-6 text-white font-semibold">Free</th>
                      <th className="text-center py-4 px-6 text-white font-semibold bg-emerald-600/20">Mad Pro</th>
                      <th className="text-center py-4 px-6 text-white font-semibold">Mad Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Basic Monitoring</td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Weekly Reports</td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Number of Properties</td>
                      <td className="text-center py-4 px-6 text-slate-400">1 property</td>
                      <td className="text-center py-4 px-6 text-white bg-emerald-600/10">Up to 5</td>
                      <td className="text-center py-4 px-6 text-white">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Detection by Agentic AI</td>
                      <td className="text-center py-4 px-6">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Real-time Alerts</td>
                      <td className="text-center py-4 px-6">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Predictive Analytics</td>
                      <td className="text-center py-4 px-6">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Certified Reports</td>
                      <td className="text-center py-4 px-6">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-slate-300">Property Code</td>
                      <td className="text-center py-4 px-6">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-300">Priority Support</td>
                      <td className="text-center py-4 px-6">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6 bg-emerald-600/10">
                        <span className="text-slate-500 text-xl">—</span>
                      </td>
                      <td className="text-center py-4 px-6">
                        <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>2024 Mad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
