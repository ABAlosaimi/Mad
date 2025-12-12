import { Home, Search, LogOut } from 'lucide-react';

type View = 'dashboard' | 'property-lookup';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
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
            <div>
              <h1 className="text-xl font-bold text-white">Mad</h1>
              <p className="text-xs text-emerald-200">Intelligent Monitoring</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => onViewChange('property-lookup')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === 'property-lookup'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Lookup
            </button>
            <button className="px-4 py-2 rounded-lg font-medium transition-all bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
