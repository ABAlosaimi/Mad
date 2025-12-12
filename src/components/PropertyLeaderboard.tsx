import { Trophy, Medal, Award, TrendingDown, Home, Building2 } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  type: 'property' | 'complex';
  efficiency: number;
  savings: number;
  totalCost: number;
  rank: number;
}

interface PropertyLeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function PropertyLeaderboard({ entries }: PropertyLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-slate-400 font-semibold text-sm">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 2:
        return 'bg-slate-500/20 border-slate-500/30';
      case 3:
        return 'bg-amber-600/20 border-amber-600/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Efficiency Leaderboard
          </h3>
          <p className="text-sm text-slate-400 mt-1">Top performers ranked by cost efficiency</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
          <p className="text-xs text-slate-300">Total Savings</p>
          <p className="text-lg font-bold text-emerald-400">
            ${entries.reduce((sum, e) => sum + e.savings, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:scale-[1.02] ${getRankColor(entry.rank)}`}
          >
            <div className="flex items-center justify-center w-10">
              {getRankIcon(entry.rank)}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {entry.type === 'complex' ? (
                  <Building2 className="w-4 h-4 text-violet-400" />
                ) : (
                  <Home className="w-4 h-4 text-cyan-400" />
                )}
                <h4 className="font-semibold text-white">{entry.name}</h4>
                <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-700/50 rounded">
                  {entry.type === 'complex' ? 'Complex' : 'Property'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-400">
                  Efficiency: <span className="text-emerald-400 font-semibold">{entry.efficiency}%</span>
                </span>
                <span className="text-slate-400">
                  Monthly: <span className="text-white font-semibold">${entry.totalCost.toFixed(2)}</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingDown className="w-4 h-4" />
                <span className="font-semibold">${entry.savings.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-400">saved</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{entries.filter(e => e.type === 'property').length}</p>
            <p className="text-xs text-slate-400">Properties</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{entries.filter(e => e.type === 'complex').length}</p>
            <p className="text-xs text-slate-400">Complexes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">
              {(entries.reduce((sum, e) => sum + e.efficiency, 0) / entries.length).toFixed(1)}%
            </p>
            <p className="text-xs text-slate-400">Avg Efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
