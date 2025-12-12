import { Home, Zap, Droplet, Wifi, TrendingDown, TrendingUp } from 'lucide-react';

interface SinglePropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    type: string;
    electricity: { usage: number; cost: number; change: number };
    water: { usage: number; cost: number; change: number };
    internet: { usage: number; cost: number; change: number };
    totalCost: number;
  };
}

export default function SinglePropertyCard({ property }: SinglePropertyCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <Home className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{property.name}</h3>
            <p className="text-sm text-slate-400">{property.address}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
              {property.type}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Total Monthly</p>
          <p className="text-2xl font-bold text-white">${property.totalCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300">Electricity</span>
          </div>
          <p className="text-lg font-semibold text-white">{property.electricity.usage} kWh</p>
          <p className="text-sm text-slate-400">${property.electricity.cost.toFixed(2)}</p>
          <div className={`flex items-center gap-1 mt-2 text-xs ${property.electricity.change < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {property.electricity.change < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <TrendingUp className="w-3 h-3" />
            )}
            <span>{Math.abs(property.electricity.change)}%</span>
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-300">Water</span>
          </div>
          <p className="text-lg font-semibold text-white">{property.water.usage} gal</p>
          <p className="text-sm text-slate-400">${property.water.cost.toFixed(2)}</p>
          <div className={`flex items-center gap-1 mt-2 text-xs ${property.water.change < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {property.water.change < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <TrendingUp className="w-3 h-3" />
            )}
            <span>{Math.abs(property.water.change)}%</span>
          </div>
        </div>

        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300">Internet</span>
          </div>
          <p className="text-lg font-semibold text-white">{property.internet.usage} GB</p>
          <p className="text-sm text-slate-400">${property.internet.cost.toFixed(2)}</p>
          <div className={`flex items-center gap-1 mt-2 text-xs ${property.internet.change < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {property.internet.change < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <TrendingUp className="w-3 h-3" />
            )}
            <span>{Math.abs(property.internet.change)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
