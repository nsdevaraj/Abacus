import React, { useState, useEffect, useCallback } from 'react';

interface AbacusProps {
  value?: number;
  interactive?: boolean;
  onChange?: (val: number) => void;
  columns?: number;
}

const Abacus: React.FC<AbacusProps> = ({ value, interactive = true, onChange, columns = 13 }) => {
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
       const str = newCols.join('').replace(/^0+(?!$)/, '');
       onChange(parseInt(str || '0', 10));
    }
  };

  const isUnitColumn = (idx: number) => (columns - 1 - idx) % 3 === 0 && idx !== columns - 1;

  // Colorful bead colors array
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
    <div className="p-4 sm:p-8 bg-gradient-to-b from-sky-400 to-sky-600 rounded-[3rem] shadow-2xl border-[12px] border-white/50 overflow-x-auto no-scrollbar">
      <div className="flex bg-white/20 p-2 sm:p-4 gap-2 sm:gap-4 min-w-max rounded-[2.5rem] shadow-inner backdrop-blur-sm border-4 border-white/30">
        {colValues.map((val, colIdx) => {
          const isUpperActive = val >= 5;
          const lowerVal = val % 5;
          const columnColorClass = beadColors[colIdx % beadColors.length];

          return (
            <div key={colIdx} className="relative flex flex-col items-center w-14 sm:w-20">
              {/* Rod with glossy effect */}
              <div className="absolute top-0 bottom-0 w-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 z-0 rounded-full shadow-md"></div>

              {/* Upper Section */}
              <div className="h-28 w-full flex flex-col justify-end items-center py-4 z-10 relative border-b-8 border-white/60">
                <div 
                  onClick={() => toggleUpper(colIdx)}
                  className={`
                    w-12 h-10 sm:w-16 sm:h-12 rounded-[1.2rem] cursor-pointer shadow-xl transition-all duration-300 ease-out z-20 transform
                    ${isUpperActive ? 'translate-y-12 scale-110 rotate-3' : '-translate-y-4 scale-100'}
                    bg-gradient-to-br ${columnColorClass}
                    border-4 border-white/50 hover:brightness-110 active:scale-95
                    flex items-center justify-center
                  `}
                >
                  <div className="w-1/2 h-1/4 bg-white/30 rounded-full"></div>
                </div>
              </div>

              {/* Beam Dot for reference */}
               {isUnitColumn(colIdx) && (
                  <div className="absolute top-[7.4rem] w-3 h-3 bg-white rounded-full z-30 shadow-lg animate-pulse border-2 border-sky-400"></div>
               )}

              {/* Lower Section */}
              <div className="h-64 w-full flex flex-col justify-start items-center py-4 space-y-1 z-10">
                 {[0, 1, 2, 3].map((beadIdx) => {
                   const isActive = (beadIdx + 1) <= lowerVal;
                   return (
                     <div
                        key={beadIdx}
                        onClick={() => toggleLower(colIdx, beadIdx)}
                        className={`
                          w-12 h-10 sm:w-16 sm:h-12 rounded-[1.2rem] cursor-pointer shadow-xl transition-all duration-300 ease-out z-20 transform
                          ${isActive ? '-translate-y-6 scale-110 -rotate-3' : 'translate-y-4 scale-100'}
                          bg-gradient-to-br ${columnColorClass}
                          border-4 border-white/50 hover:brightness-110 active:scale-95
                          flex items-center justify-center
                        `}
                     >
                       <div className="w-1/2 h-1/4 bg-white/30 rounded-full"></div>
                     </div>
                   );
                 })}
              </div>
              
              {/* Digit Preview (Kid friendly font style) */}
              <div className="mt-4 bg-white/40 px-3 py-1 rounded-full text-white font-black text-sm shadow-sm backdrop-blur-md">
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
