import { Building2, Users, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Unit {
  id: string;
  name: string;
  totalCost: number;
  occupancy: string;
}

interface RealEstateComplexCardProps {
  complex: {
    id: string;
    name: string;
    address: string;
    totalUnits: number;
    occupiedUnits: number;
    totalCost: number;
    averageCostPerUnit: number;
    savings: number;
    units: Unit[];
  };
}

export default function RealEstateComplexCard({ complex }: RealEstateComplexCardProps) {
  const [expanded, setExpanded] = useState(false);
  const occupancyRate = ((complex.occupiedUnits / complex.totalUnits) * 100).toFixed(0);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-violet-500/20 rounded-lg">
              <Building2 className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{complex.name}</h3>
              <p className="text-sm text-slate-400">{complex.address}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
                  <Users className="w-3 h-3" />
                  {complex.occupiedUnits}/{complex.totalUnits} Units
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 rounded-full text-xs text-emerald-400">
                  {occupancyRate}% Occupied
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Total Monthly</p>
            <p className="text-2xl font-bold text-white">${complex.totalCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <p className="text-xs text-slate-400 mb-1">Avg Cost per Unit</p>
            <p className="text-xl font-semibold text-white">${complex.averageCostPerUnit.toFixed(2)}</p>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-slate-400">Total Savings</p>
            </div>
            <p className="text-xl font-semibold text-emerald-400">${complex.savings.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-slate-300 text-sm"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Units
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              View All Units
            </>
          )}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-white/10 bg-black/20">
          <div className="p-6">
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Units</h4>
            <div className="space-y-2">
              {complex.units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-white font-medium">{unit.name}</span>
                    <span className="text-xs text-slate-400 px-2 py-1 bg-slate-700/50 rounded">
                      {unit.occupancy}
                    </span>
                  </div>
                  <span className="text-white font-semibold">${unit.totalCost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
