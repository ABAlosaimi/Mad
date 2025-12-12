import { User, MapPin, Building2, Crown, Upload } from 'lucide-react';
import { useState } from 'react';

interface ProfileHeaderProps {
  fullName: string;
  avatarUrl?: string;
  location?: string;
  accountType: 'individual' | 'developer' | 'company';
  subscriptionType: 'free' | 'basic' | 'pro' | 'enterprise' | 'Mad pro Mad priemunme';
  onAvatarChange?: (file: File) => void;
}

export default function ProfileHeader({
  fullName,
  avatarUrl,
  location,
  accountType,
  subscriptionType,
  onAvatarChange,
}: ProfileHeaderProps) {
  const [isHovering, setIsHovering] = useState(false);

  const getAccountTypeLabel = () => {
    switch (accountType) {
      case 'individual':
        return 'Individual';
      case 'developer':
        return 'Real Estate Developer';
      case 'company':
        return 'Real Estate Company';
      default:
        return accountType;
    }
  };

  const getSubscriptionBadge = () => {
    const badges: Record<string, string> = {
      free: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      basic: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pro: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      enterprise: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'Mad pro Mad priemunme': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    };
    return badges[subscriptionType] || badges.pro;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 h-32"></div>

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 mb-6">
          <div className="flex items-end gap-4">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-32 h-32 rounded-xl bg-white/10 border-4 border-slate-900 overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
                    <User className="w-16 h-16 text-white/50" />
                  </div>
                )}
              </div>

              {isHovering && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl cursor-pointer transition-opacity">
                  <Upload className="w-8 h-8 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white mb-1">{fullName}</h2>
              {location && (
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-lg border font-medium capitalize flex items-center gap-2 ${getSubscriptionBadge()}`}>
              <Crown className="w-4 h-4" />
              {subscriptionType}
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Account Type</p>
              <p className="text-white font-medium">{getAccountTypeLabel()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
