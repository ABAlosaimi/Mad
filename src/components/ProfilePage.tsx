import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';

interface UserProfile {
  full_name: string;
  avatar_url?: string;
  location?: string;
  account_type: 'individual' | 'developer' | 'company';
  subscription_type: 'free' | 'basic' | 'pro' | 'enterprise' | 'Mad pro Mad priemunme';
  phone_number?: string;
}

const mockProfile: UserProfile = {
  full_name: 'Abdulrahman Alosaimi',
  avatar_url: '/whatsapp_image_2025-12-12_at_02.55.14.jpeg',
  location: 'Riyadh, Saudi Arabia',
  account_type: 'developer',
  subscription_type: 'Mad pro Mad priemunme',
  phone_number: '+966579876342',
};

const mockEmail = 'aalosaimi@gmail.com';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);

  const handleAvatarChange = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, avatar_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdatePhone = async (phone: string) => {
    setProfile((prev) => ({ ...prev, phone_number: phone }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
          <p className="text-slate-300">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          <ProfileHeader
            fullName={profile.full_name}
            avatarUrl={profile.avatar_url}
            location={profile.location}
            accountType={profile.account_type}
            subscriptionType={profile.subscription_type}
            onAvatarChange={handleAvatarChange}
          />

          <ProfileDetails
            email={mockEmail}
            phoneNumber={profile.phone_number}
            onUpdatePhone={handleUpdatePhone}
          />
        </div>
      </div>
    </div>
  );
}
