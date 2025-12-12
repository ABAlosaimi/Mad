import { Mail, Phone, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

interface ProfileDetailsProps {
  email: string;
  phoneNumber?: string;
  onUpdatePhone?: (phone: string) => Promise<void>;
  onUpdatePassword?: (currentPassword: string, newPassword: string) => Promise<void>;
}

export default function ProfileDetails({
  email,
  phoneNumber,
  onUpdatePhone,
}: ProfileDetailsProps) {
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [phoneValue, setPhoneValue] = useState(phoneNumber || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSavePhone = async () => {
    if (!onUpdatePhone) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await onUpdatePhone(phoneValue);
      setSuccess('Phone number updated successfully');
      setIsEditingPhone(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update phone number');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPhone = () => {
    setPhoneValue(phoneNumber || '');
    setIsEditingPhone(false);
    setError('');
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold text-white mb-6">Account Details</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
          {success}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-400">Email Address</p>
              <p className="text-white">{email}</p>
            </div>
            <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
              Cannot be changed
            </span>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-400 mb-2">Phone Number</p>
              {isEditingPhone ? (
                <input
                  type="tel"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              ) : (
                <p className="text-white">{phoneNumber || 'Not set'}</p>
              )}
            </div>
            <div className="flex gap-2">
              {isEditingPhone ? (
                <>
                  <button
                    onClick={handleSavePhone}
                    disabled={loading}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelPhone}
                    disabled={loading}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingPhone(true)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
