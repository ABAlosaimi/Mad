import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface UtilityCardProps {
  icon: ReactNode;
  title: string;
  usage: string;
  cost: string;
  trend: number;
  color: 'amber' | 'blue' | 'emerald';
  status: 'normal' | 'warning';
  details: {
    peak: string;
    devices: string;
  };
}

const colorClasses = {
  amber: {
    bg: 'bg-amber-500/20 border-amber-500/30',
    icon: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    trend: 'text-amber-400'
  },
  blue: {
    bg: 'bg-blue-500/20 border-blue-500/30',
    icon: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    trend: 'text-blue-400'
  },
  emerald: {
    bg: 'bg-emerald-500/20 border-emerald-500/30',
    icon: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    trend: 'text-emerald-400'
  }
};

export default function UtilityCard({
  icon,
  title,
  usage,
  cost,
  trend,
  color,
  status,
  details
}: UtilityCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6 hover:shadow-md transition-shadow ${colors.bg}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>

        {status === 'warning' && (
          <div className="flex items-center gap-1 text-amber-400 bg-amber-500/20 px-2 py-1 rounded-lg border border-amber-500/30">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Alert</span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-slate-300 mb-1">{title}</h3>
      <div className="flex items-end gap-3 mb-3">
        <p className="text-3xl font-bold text-white">{usage}</p>
        <div className="flex items-center gap-1 mb-1">
          {trend < 0 ? (
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingUp className={`w-4 h-4 ${colors.trend}`} />
          )}
          <span className={`text-sm font-medium ${trend < 0 ? 'text-emerald-400' : colors.trend}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <span className="text-sm text-slate-300">This month</span>
        <span className="text-lg font-bold text-white">{cost}</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Peak usage</span>
          <span className="text-slate-200 font-medium">{details.peak}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Status</span>
          <span className="text-slate-200 font-medium">{details.devices}</span>
        </div>
      </div>
    </div>
  );
}
