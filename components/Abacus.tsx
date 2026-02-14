import React, { useState, useEffect } from 'react';

interface AbacusProps {
  value?: number;
  interactive?: boolean;
  onChange?: (val: number) => void;
  columns?: number;
}

const Abacus: React.FC<AbacusProps> = ({ value, interactive = true, onChange, columns = 11 }) => {
  const [colValues, setColValues] = useState<number[]>(Array(columns).fill(0));

  useEffect(() => {
    if (value !== undefined) {
      const valStr = Math.abs(value).toString().replace('.', ''); 
      const newCols = Array(columns).fill(0);
      const digits = valStr.split('').map(Number);
      
      let colIdx = columns - 1;
      for (let i = digits.length - 1; i >= 0; i--) {
        if (colIdx >= 0) {
          newCols[colIdx] = digits[i];
          colIdx--;
        }
      }
      setColValues(newCols);
    }
  }, [value, columns]);

  const toggleUpper = (colIndex: number) => {
    if (!interactive) return;
    const currentVal = colValues[colIndex];
    const isUpperActive = currentVal >= 5;
    let newVal = isUpperActive ? currentVal - 5 : currentVal + 5;
    updateColumn(colIndex, newVal);
  };

  const toggleLower = (colIndex: number, beadIndex: number) => {
    if (!interactive) return;
    const currentVal = colValues[colIndex];
    const upperVal = currentVal >= 5 ? 5 : 0;
    // beadIndex is 0-3. If user clicks bead 2 (3rd bead), lowerVal becomes 3.
    // If lowerVal is already >= beadIndex + 1, we are reducing it.
    const lowerVal = currentVal % 5;
    const clickedBeadIsActive = (beadIndex + 1) <= lowerVal;
    let newLowerVal = clickedBeadIsActive ? beadIndex : beadIndex + 1;
    updateColumn(colIndex, upperVal + newLowerVal);
  };

  const updateColumn = (index: number, val: number) => {
    const newCols = [...colValues];
    newCols[index] = val;
    setColValues(newCols);
    if (onChange) {
       // We calculate the value from the right to left to represent the number correctly
       let total = 0;
       for (let i = 0; i < newCols.length; i++) {
         total = total * 10 + newCols[i];
       }
       onChange(total);
    }
  };

  const isUnitColumn = (idx: number) => (columns - 1 - idx) % 3 === 0 && idx !== columns - 1;

  const beadColors = [
    'from-pink-400 to-pink-600',
    'from-sky-400 to-sky-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-orange-400 to-orange-600',
    'from-emerald-400 to-emerald-600',
    'from-indigo-400 to-indigo-600',
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-sky-500 to-sky-700 rounded-[2.5rem] shadow-2xl border-[10px] border-white/40 overflow-x-auto no-scrollbar max-w-full">
      <div className="flex bg-white/10 p-2 sm:p-3 gap-1 sm:gap-2 min-w-max rounded-[1.8rem] shadow-inner backdrop-blur-sm border-2 border-white/20">
        {colValues.map((val, colIdx) => {
          const isUpperActive = val >= 5;
          const lowerVal = val % 5;
          const columnColorClass = beadColors[colIdx % beadColors.length];

          return (
            <div key={colIdx} className="relative flex flex-col items-center w-12 sm:w-16">
              {/* Rod */}
              <div className="absolute top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 z-0 rounded-full shadow-inner"></div>

              {/* HEAVEN BEAD SECTION (One bead) */}
              <div className="h-20 sm:h-24 w-full flex flex-col items-center py-2 z-10 relative">
                <div 
                  onClick={() => toggleUpper(colIdx)}
                  className={`
                    w-10 h-8 sm:w-14 sm:h-10 rounded-xl cursor-pointer shadow-lg transition-all duration-300 ease-out z-20 transform
                    ${isUpperActive 
                      ? 'translate-y-8 sm:translate-y-10 scale-105 border-white' 
                      : 'translate-y-0 scale-100 border-white/40'}
                    bg-gradient-to-br ${columnColorClass}
                    border-2 sm:border-4 hover:brightness-110 active:scale-95
                    flex items-center justify-center
                  `}
                >
                  <div className="w-1/2 h-1/4 bg-white/20 rounded-full"></div>
                </div>
              </div>

              {/* BEAM (Horizontal Divider) */}
              <div className="w-full h-2 bg-white/80 z-20 shadow-sm relative flex items-center justify-center">
                {isUnitColumn(colIdx) && (
                  <div className="w-2 h-2 bg-sky-900 rounded-full shadow-sm animate-pulse"></div>
                )}
              </div>

              {/* EARTH BEAD SECTION (Four beads) */}
              <div className="h-44 sm:h-56 w-full flex flex-col items-center py-2 z-10 relative">
                 {[0, 1, 2, 3].map((beadIdx) => {
                   // A bead is active if its index + 1 is <= the lowerVal of that column
                   const isActive = (beadIdx + 1) <= lowerVal;
                   return (
                     <div
                        key={beadIdx}
                        onClick={() => toggleLower(colIdx, beadIdx)}
                        className={`
                          w-10 h-8 sm:w-14 sm:h-10 rounded-xl cursor-pointer shadow-md transition-all duration-300 ease-out z-20 transform
                          ${isActive 
                            ? '-translate-y-2 sm:-translate-y-3' 
                            : 'translate-y-4 sm:translate-y-6'}
                          bg-gradient-to-br ${columnColorClass}
                          border-2 sm:border-4 ${isActive ? 'border-white' : 'border-white/40'}
                          hover:brightness-110 active:scale-95
                          flex items-center justify-center
                          my-0.5
                        `}
                     >
                       <div className="w-1/2 h-1/4 bg-white/20 rounded-full"></div>
                     </div>
                   );
                 })}
              </div>
              
              {/* Digit Preview */}
              <div className="mt-2 bg-white/30 px-3 py-1 rounded-full text-white font-black text-xs sm:text-sm shadow-sm backdrop-blur-md">
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
