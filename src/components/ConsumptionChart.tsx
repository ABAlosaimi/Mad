import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function ConsumptionChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [
    { electricity: 28, water: 320, internet: 45 },
    { electricity: 32, water: 380, internet: 52 },
    { electricity: 30, water: 410, internet: 48 },
    { electricity: 38, water: 350, internet: 58 },
    { electricity: 34, water: 490, internet: 55 },
    { electricity: 36, water: 420, internet: 68 },
    { electricity: 26, water: 340, internet: 42 }
  ];

  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; type: string } | null>(null);

  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;

      path += ` Q ${controlX} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`;
      path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const createAreaPath = (points: { x: number; y: number }[], height: number) => {
    if (points.length < 2) return '';

    const linePath = createSmoothPath(points);
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];

    return `${linePath} L ${lastPoint.x} ${height} L ${firstPoint.x} ${height} Z`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6">

      <div className="grid grid-cols-1 gap-8">
        {/* Electricity Chart */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-200">Electricity (kWh)</span>
          </div>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 700 240">
              {[40, 30, 20, 10, 0].map((value, idx) => (
                <g key={value}>
                  <line
                    x1="60"
                    y1={20 + idx * 50}
                    x2="680"
                    y2={20 + idx * 50}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                  <text
                    x="50"
                    y={20 + idx * 50 + 4}
                    textAnchor="end"
                    className="text-xs fill-slate-400"
                    fontSize="12"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {(() => {
                const chartHeight = 200;
                const chartWidth = 620;
                const padding = 60;
                const maxValue = 40;
                const points = data.map((d, i) => ({
                  x: padding + (i * chartWidth) / (data.length - 1),
                  y: 20 + chartHeight - (d.electricity / maxValue) * chartHeight
                }));

                return (
                  <>
                    <defs>
                      <linearGradient id="electricityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    <path
                      d={createAreaPath(points, 220)}
                      fill="url(#electricityGradient)"
                    />

                    <path
                      d={createSmoothPath(points)}
                      fill="none"
                      stroke="rgb(245, 158, 11)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />

                    {points.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={hoveredPoint?.index === index && hoveredPoint?.type === 'electricity' ? 6 : 4}
                          fill="rgb(245, 158, 11)"
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer transition-all duration-200"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                          onMouseEnter={() => setHoveredPoint({ index, type: 'electricity' })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {hoveredPoint?.index === index && hoveredPoint?.type === 'electricity' && (
                          <>
                            <rect
                              x={point.x - 35}
                              y={point.y - 40}
                              width="70"
                              height="28"
                              rx="6"
                              fill="rgba(15, 23, 42, 0.95)"
                              stroke="rgba(255, 255, 255, 0.1)"
                              strokeWidth="1"
                              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                            />
                            <text
                              x={point.x}
                              y={point.y - 22}
                              textAnchor="middle"
                              className="fill-white font-medium"
                              fontSize="12"
                            >
                              {data[index].electricity} kWh
                            </text>
                          </>
                        )}
                      </g>
                    ))}
                  </>
                );
              })()}

              {days.map((day, index) => (
                <text
                  key={day}
                  x={60 + (index * 620) / (days.length - 1)}
                  y="235"
                  textAnchor="middle"
                  className="text-xs fill-slate-300 font-medium"
                  fontSize="12"
                >
                  {day}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Water Chart */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-200">Water (gallons)</span>
          </div>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 700 240">
              {[500, 400, 300, 200, 100, 0].map((value, idx) => (
                <g key={value}>
                  <line
                    x1="60"
                    y1={20 + idx * 40}
                    x2="680"
                    y2={20 + idx * 40}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                  <text
                    x="50"
                    y={20 + idx * 40 + 4}
                    textAnchor="end"
                    className="text-xs fill-slate-400"
                    fontSize="12"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {(() => {
                const chartHeight = 200;
                const chartWidth = 620;
                const padding = 60;
                const maxValue = 500;
                const points = data.map((d, i) => ({
                  x: padding + (i * chartWidth) / (data.length - 1),
                  y: 20 + chartHeight - (d.water / maxValue) * chartHeight
                }));

                return (
                  <>
                    <defs>
                      <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    <path
                      d={createAreaPath(points, 220)}
                      fill="url(#waterGradient)"
                    />

                    <path
                      d={createSmoothPath(points)}
                      fill="none"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />

                    {points.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={hoveredPoint?.index === index && hoveredPoint?.type === 'water' ? 6 : 4}
                          fill="rgb(59, 130, 246)"
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer transition-all duration-200"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                          onMouseEnter={() => setHoveredPoint({ index, type: 'water' })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {hoveredPoint?.index === index && hoveredPoint?.type === 'water' && (
                          <>
                            <rect
                              x={point.x - 35}
                              y={point.y - 40}
                              width="70"
                              height="28"
                              rx="6"
                              fill="rgba(15, 23, 42, 0.95)"
                              stroke="rgba(255, 255, 255, 0.1)"
                              strokeWidth="1"
                              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                            />
                            <text
                              x={point.x}
                              y={point.y - 22}
                              textAnchor="middle"
                              className="fill-white font-medium"
                              fontSize="12"
                            >
                              {data[index].water} gal
                            </text>
                          </>
                        )}
                      </g>
                    ))}
                  </>
                );
              })()}

              {days.map((day, index) => (
                <text
                  key={day}
                  x={60 + (index * 620) / (days.length - 1)}
                  y="235"
                  textAnchor="middle"
                  className="text-xs fill-slate-300 font-medium"
                  fontSize="12"
                >
                  {day}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Internet Chart */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-200">Internet (GB)</span>
          </div>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 700 240">
              {[80, 60, 40, 20, 0].map((value, idx) => (
                <g key={value}>
                  <line
                    x1="60"
                    y1={20 + idx * 50}
                    x2="680"
                    y2={20 + idx * 50}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                  <text
                    x="50"
                    y={20 + idx * 50 + 4}
                    textAnchor="end"
                    className="text-xs fill-slate-400"
                    fontSize="12"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {(() => {
                const chartHeight = 200;
                const chartWidth = 620;
                const padding = 60;
                const maxValue = 80;
                const points = data.map((d, i) => ({
                  x: padding + (i * chartWidth) / (data.length - 1),
                  y: 20 + chartHeight - (d.internet / maxValue) * chartHeight
                }));

                return (
                  <>
                    <defs>
                      <linearGradient id="internetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    <path
                      d={createAreaPath(points, 220)}
                      fill="url(#internetGradient)"
                    />

                    <path
                      d={createSmoothPath(points)}
                      fill="none"
                      stroke="rgb(16, 185, 129)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />

                    {points.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={hoveredPoint?.index === index && hoveredPoint?.type === 'internet' ? 6 : 4}
                          fill="rgb(16, 185, 129)"
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer transition-all duration-200"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                          onMouseEnter={() => setHoveredPoint({ index, type: 'internet' })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {hoveredPoint?.index === index && hoveredPoint?.type === 'internet' && (
                          <>
                            <rect
                              x={point.x - 35}
                              y={point.y - 40}
                              width="70"
                              height="28"
                              rx="6"
                              fill="rgba(15, 23, 42, 0.95)"
                              stroke="rgba(255, 255, 255, 0.1)"
                              strokeWidth="1"
                              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                            />
                            <text
                              x={point.x}
                              y={point.y - 22}
                              textAnchor="middle"
                              className="fill-white font-medium"
                              fontSize="12"
                            >
                              {data[index].internet} GB
                            </text>
                          </>
                        )}
                      </g>
                    ))}
                  </>
                );
              })()}

              {days.map((day, index) => (
                <text
                  key={day}
                  x={60 + (index * 620) / (days.length - 1)}
                  y="235"
                  textAnchor="middle"
                  className="text-xs fill-slate-300 font-medium"
                  fontSize="12"
                >
                  {day}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-400">Weekly Electricity</p>
            <p className="text-lg font-semibold text-amber-400">224 kWh</p>
            <p className="text-xs text-emerald-400 mt-1">↓ 5.2% vs last week</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Weekly Water</p>
            <p className="text-lg font-semibold text-blue-400">2,710 gal</p>
            <p className="text-xs text-red-400 mt-1">↑ 2.8% vs last week</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Weekly Internet</p>
            <p className="text-lg font-semibold text-emerald-400">368 GB</p>
            <p className="text-xs text-emerald-400 mt-1">↓ 1.5% vs last week</p>
            <p className="text-xs text-slate-300 mt-1">Peak: 68 GB (Sat)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
