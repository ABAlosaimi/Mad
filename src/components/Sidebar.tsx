import { Droplet, Zap, Wifi, Code, Home, Building2, Search, User, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'water', label: 'Water', icon: Droplet },
    { id: 'electricity', label: 'Electricity', icon: Zap },
    { id: 'internet', label: 'Internet', icon: Wifi },
    { id: 'property-address-codes', label: 'Property Codes', icon: Code },
    { id: 'lookup-code', label: 'Lookup Code', icon: Search },
    { id: 'properties', label: 'Properties', icon: Building2 },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-white/10 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5">
            <img
              src="/whatsapp_image_2025-12-10_at_23.10.44.jpeg"
              alt="Mad Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Mad</h1>
            <p className="text-xs text-slate-400">Utility Management</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
            currentPage === 'profile'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-medium">My Profile</p>
            <p className="text-xs opacity-70">View account</p>
          </div>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentPage === 'settings'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}
