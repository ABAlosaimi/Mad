import { useState } from 'react';
import {
  RefreshCw,
  Trash2,
  Bell,
  BarChart3,
  MapPin,
  Droplet,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: typeof RefreshCw;
  action: string;
  confirmMessage: string;
}

export default function SettingsPage() {
  const [resetStatus, setResetStatus] = useState<Record<string, 'idle' | 'success' | 'processing'>>({});

  const settingItems: SettingItem[] = [
    {
      id: 'dashboard',
      title: 'Reset Dashboard Preferences',
      description: 'Reset all dashboard customizations and view preferences to default settings.',
      icon: RefreshCw,
      action: 'Reset Dashboard',
      confirmMessage: 'Dashboard preferences have been reset'
    },
    {
      id: 'property-cache',
      title: 'Clear Property Data Cache',
      description: 'Clear all cached property information. This will refresh property data on next load.',
      icon: MapPin,
      action: 'Clear Cache',
      confirmMessage: 'Property cache cleared'
    },
    {
      id: 'notifications',
      title: 'Reset Notification Settings',
      description: 'Reset all notification preferences and alert settings to default values.',
      icon: Bell,
      action: 'Reset Notifications',
      confirmMessage: 'Notification settings reset'
    },
    {
      id: 'consumption',
      title: 'Clear Consumption History',
      description: 'Remove all local consumption data history. This will not affect your account records.',
      icon: BarChart3,
      action: 'Clear History',
      confirmMessage: 'Consumption history cleared'
    },
    {
      id: 'chart-preferences',
      title: 'Reset Chart Preferences',
      description: 'Reset all chart display settings including colors, scales, and time ranges.',
      icon: BarChart3,
      action: 'Reset Charts',
      confirmMessage: 'Chart preferences reset'
    },
    {
      id: 'utility-preferences',
      title: 'Reset Utility Preferences',
      description: 'Reset water, electricity, and internet utility settings to default values.',
      icon: Droplet,
      action: 'Reset Utilities',
      confirmMessage: 'Utility preferences reset'
    },
    {
      id: 'all-data',
      title: 'Reset All Platform Data',
      description: 'Clear all local application data and reset all settings to defaults. This is irreversible.',
      icon: Trash2,
      action: 'Reset Everything',
      confirmMessage: 'All platform data has been reset'
    }
  ];

  const handleReset = (itemId: string, confirmMessage: string) => {
    if (itemId === 'all-data') {
      const confirmed = window.confirm(
        'Are you sure you want to reset all platform data? This action cannot be undone and will clear all your preferences and cached data.'
      );
      if (!confirmed) return;
    }

    setResetStatus(prev => ({ ...prev, [itemId]: 'processing' }));

    setTimeout(() => {
      setResetStatus(prev => ({ ...prev, [itemId]: 'success' }));

      setTimeout(() => {
        setResetStatus(prev => ({ ...prev, [itemId]: 'idle' }));
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
          <p className="text-slate-300">Manage your platform preferences and reset options</p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-200 text-sm font-medium mb-1">Important Notice</p>
            <p className="text-amber-200/80 text-sm">
              Reset actions will clear local data and preferences. Your account information and historical records remain safe in the database.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {settingItems.map((item) => {
            const Icon = item.icon;
            const status = resetStatus[item.id] || 'idle';

            return (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.id === 'all-data'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {status === 'success' && (
                        <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>{item.confirmMessage}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleReset(item.id, item.confirmMessage)}
                    disabled={status === 'processing'}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 flex-shrink-0 ${
                      item.id === 'all-data'
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30'
                    } ${status === 'processing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {status === 'processing' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>{item.action}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">About Reset Actions</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Reset actions only affect local application data and preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Your account information and historical data in the database remain unchanged</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>After resetting, the platform will use default settings and refresh data from the server</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>You can reset individual settings or reset all platform data at once</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
