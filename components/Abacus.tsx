import React, { useState, useEffect } from 'react';

interface AbacusProps {
  value?: number;
  interactive?: boolean;
  onChange?: (val: number) => void;
  columns?: number;
}

const BEAD_COLORS = [
  { from: '#fb7185', to: '#e11d48' }, // rose
  { from: '#fbbf24', to: '#d97706' }, // amber
  { from: '#34d399', to: '#059669' }, // emerald
  { from: '#60a5fa', to: '#2563eb' }, // blue
  { from: '#a78bfa', to: '#7c3aed' }, // violet
  { from: '#f472b6', to: '#db2777' }, // pink
  { from: '#22d3ee', to: '#0891b2' }, // cyan
];

interface BeadProps {
  active: boolean;
  position: 'upper' | 'lower';
  color: { from: string; to: string };
  onClick: () => void;
}

const Bead: React.FC<BeadProps> = ({ active, position, color, onClick }) => {
  const translate =
    position === 'upper'
      ? active
        ? 'translate-y-[28px] md:translate-y-[34px]'
        : 'translate-y-0'
      : active
        ? '-translate-y-2'
        : 'translate-y-2';

  return (
    <button
      type="button"
      onClick={onClick}
      data-focus
      aria-pressed={active}
      aria-label={`${position} bead ${active ? 'active' : 'inactive'}`}
      className={`w-10 h-7 md:w-12 md:h-8 ${translate} relative rounded-[10px] bead-shadow transition-transform duration-200 ease-out hover:brightness-110 active:scale-[0.96]`}
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, ${color.from} 0%, ${color.to} 100%)`,
      }}
    >
      <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/45" />
    </button>
  );
};

const Abacus: React.FC<AbacusProps> = ({ value, interactive = true, onChange, columns = 11 }) => {
  const [cols, setCols] = useState<number[]>(() => Array(columns).fill(0));

  useEffect(() => {
    if (value === undefined || value === null) return;
    const s = Math.abs(Math.round(value)).toString();
    const next = Array(columns).fill(0);
    let ci = columns - 1;
    for (let i = s.length - 1; i >= 0 && ci >= 0; i--, ci--) next[ci] = +s[i];
    setCols(next);
  }, [value, columns]);

  const update = (idx: number, v: number) => {
    if (!interactive) return;
    const next = cols.slice();
    next[idx] = v;
    setCols(next);
    if (onChange) {
      let total = 0;
      for (let i = 0; i < next.length; i++) total = total * 10 + next[i];
      onChange(total);
    }
  };

  const toggleUpper = (i: number) => {
    const cur = cols[i];
    update(i, cur >= 5 ? cur - 5 : cur + 5);
  };
  const setLower = (i: number, beadIdx: number) => {
    const cur = cols[i];
    const upper = cur >= 5 ? 5 : 0;
    const lower = cur % 5;
    const isActive = beadIdx + 1 <= lower;
    update(i, upper + (isActive ? beadIdx : beadIdx + 1));
  };

  const isUnit = (i: number) => (columns - 1 - i) % 3 === 0 && i !== columns - 1;

  return (
    <div
      className="
        relative w-full overflow-x-auto no-scrollbar
        rounded-3xl border
        border-amber-200/80 dark:border-slate-700
        bg-gradient-to-b from-amber-50 to-amber-100
        dark:from-slate-800 dark:to-slate-900
        p-3 md:p-4
      "
    >
      <div
        className="
          relative mx-auto flex justify-center gap-0.5 md:gap-1.5 min-w-max
          rounded-2xl border
          border-amber-100 dark:border-slate-700/60
          bg-white/70 dark:bg-slate-900/60
          px-2 py-3 md:px-3 md:py-4
          shadow-inner
        "
      >
        {cols.map((val, i) => {
          const color = BEAD_COLORS[i % BEAD_COLORS.length];
          const upper = val >= 5;
          const lower = val % 5;

          return (
            <div key={i} className="relative flex flex-col items-center w-12 md:w-14">
              <div className="rod absolute top-2 bottom-8 left-1/2 -translate-x-1/2 w-[3px] rounded-full" />

              {/* Heaven bead */}
              <div className="relative z-10 h-[58px] md:h-[68px] w-full flex justify-center">
                <div className="pt-1">
                  <Bead position="upper" active={upper} color={color} onClick={() => toggleUpper(i)} />
                </div>
              </div>

              {/* Beam */}
              <div className="relative z-20 w-full h-[6px] bg-gradient-to-b from-stone-300 to-stone-400 dark:from-slate-600 dark:to-slate-700 rounded-sm shadow-sm flex items-center justify-center">
                {isUnit(i) && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
              </div>

              {/* Earth beads */}
              <div className="relative z-10 h-[148px] md:h-[170px] w-full flex flex-col items-center justify-start pt-2 gap-1">
                {[0, 1, 2, 3].map(bi => (
                  <Bead
                    key={bi}
                    position="lower"
                    active={bi + 1 <= lower}
                    color={color}
                    onClick={() => setLower(i, bi)}
                  />
                ))}
              </div>

              {/* Digit readout */}
              <div className="mt-2 px-2 min-w-[28px] text-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold tabular-nums">
                {val}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Abacus;
