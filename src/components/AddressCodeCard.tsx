import { Code, Copy, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AddressCodeCard() {
  const [copied, setCopied] = useState(false);
  const addressCode = "SC-MAP-123-4B";

  const handleCopy = () => {
    navigator.clipboard.writeText(addressCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <Code className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Property Address Code</h3>
          <p className="text-xs text-emerald-100">Share with tenants/buyers</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-emerald-100">Your unique code</span>
          <button
            onClick={handleCopy}
            className="text-white hover:text-emerald-100 transition-colors"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-2xl font-bold tracking-wider font-mono">{addressCode}</p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-100">Service Score</span>
          <span className="font-semibold">94/100</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-100">Reliability</span>
          <span className="font-semibold">Excellent</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-100">Public Views</span>
          <span className="font-semibold">23</span>
        </div>
      </div>

      <button className="w-full bg-white text-emerald-600 py-2.5 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
        <Share2 className="w-4 h-4" />
        Share Property Report
      </button>
    </div>
  );
}
