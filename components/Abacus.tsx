import React, { useState, useEffect, useCallback } from 'react';

interface AbacusProps {
  value?: number; // If provided, the abacus will visualize this value (readonly-ish or target)
  interactive?: boolean;
  onChange?: (val: number) => void;
  columns?: number;
}

// Soroban: 1 Upper bead (value 5), 4 Lower beads (value 1)
// Active state: Upper bead is DOWN (towards beam). Lower beads are UP (towards beam).
// Visual layout:
// [ Top Frame ]
// [ Upper Bead ] (Default UP/Away)
// [ Beam ]
// [ Lower Bead 1 ] (Default DOWN/Away)
// [ Lower Bead 2 ]
// [ Lower Bead 3 ]
// [ Lower Bead 4 ]
// [ Bottom Frame ]

const Abacus: React.FC<AbacusProps> = ({ value, interactive = true, onChange, columns = 13 }) => {
  // Store state as array of digits. e.g. [0, 0, 1, 2, 5]
  const [colValues, setColValues] = useState<number[]>(Array(columns).fill(0));

  // Sync internal state if `value` prop changes
  useEffect(() => {
    if (value !== undefined) {
      const valStr = Math.abs(value).toString().replace('.', ''); 
      // Mapping a number to columns is tricky without fixed decimal point. 
      // For this learning app, we will align to the right.
      // If decimal, we might need a marker, but for simplicity let's align right.
      
      const newCols = Array(columns).fill(0);
      const digits = valStr.split('').map(Number);
      
      // Right align
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
    
    let newVal = currentVal;
    if (isUpperActive) {
      newVal -= 5;
    } else {
      newVal += 5;
    }
    
    updateColumn(colIndex, newVal);
  };

  const toggleLower = (colIndex: number, beadIndex: number) => {
    // beadIndex 0 is top-most lower bead (closest to beam)
    // beadIndex 3 is bottom-most lower bead
    if (!interactive) return;
    
    const currentVal = colValues[colIndex];
    const upperVal = currentVal >= 5 ? 5 : 0;
    const lowerVal = currentVal % 5; // 0 to 4
    
    // In soroban, clicking a lower bead usually "pushes" it and all above it together.
    // If we click bead at index 2 (3rd bead), we want 3 beads active (index 0,1,2).
    // If we have 3 beads active, and click index 1 (2nd bead), we might want to set it to 2.
    
    // Simplified logic: 
    // If the clicked bead is currently INACTIVE (down), activate it and all above it.
    // If the clicked bead is currently ACTIVE (up), deactivate it and all below it.
    
    const clickedBeadIsActive = (beadIndex + 1) <= lowerVal; // beads are 1-based for value counting
    
    let newLowerVal = lowerVal;
    
    if (clickedBeadIsActive) {
      // Deactivate this and all below (which actually means setting value to beadIndex)
      // e.g. Value 4 (all up). Click beadIndex 2 (3rd one). 
      // We want bead 3 and 4 to go down. Remaining active: 1, 2. Value becomes 2.
       newLowerVal = beadIndex;
    } else {
      // Activate this and all above
      // e.g. Value 1. Click beadIndex 2 (3rd one). Value becomes 3.
      newLowerVal = beadIndex + 1;
    }
    
    updateColumn(colIndex, upperVal + newLowerVal);
  };

  const updateColumn = (index: number, val: number) => {
    const newCols = [...colValues];
    newCols[index] = val;
    setColValues(newCols);
    
    if (onChange) {
       // Convert columns back to number (naive implementation for integer)
       const str = newCols.join('');
       onChange(parseInt(str, 10));
    }
  };

  // Helper to visualize decimal points (every 3 columns usually)
  const isUnitColumn = (idx: number) => (columns - 1 - idx) % 3 === 0 && idx !== columns - 1;

  return (
    <div className="p-4 bg-amber-800 rounded-lg shadow-2xl border-4 border-amber-900 overflow-x-auto">
      {/* Frame */}
      <div className="flex bg-black p-1 gap-1 min-w-max">
        {colValues.map((val, colIdx) => {
          const isUpperActive = val >= 5;
          const lowerVal = val % 5;

          return (
            <div key={colIdx} className="relative flex flex-col items-center w-12 sm:w-16">
              
              {/* Rod */}
              <div className="absolute top-0 bottom-0 w-1 bg-gray-300 z-0"></div>

              {/* Upper Section */}
              <div className="h-24 w-full bg-slate-100/10 flex flex-col justify-end items-center py-2 z-10 relative border-b-4 border-black">
                {/* The Upper Bead. Value 5. 
                    If Active (>=5), it slides DOWN towards the beam (bottom of this section).
                    If Inactive (<5), it stays UP (top of this section).
                */}
                <div 
                  onClick={() => toggleUpper(colIdx)}
                  className={`
                    w-10 h-8 sm:w-14 sm:h-10 rounded-full cursor-pointer shadow-lg transition-all duration-200 ease-out z-20
                    ${isUpperActive ? 'translate-y-8 bg-red-600' : '-translate-y-4 bg-amber-600'}
                    border-b-2 border-r-2 border-black/30
                    flex items-center justify-center
                  `}
                >
                  <div className="w-1/2 h-1/2 bg-white/20 rounded-full"></div>
                </div>
              </div>

              {/* Beam (Visual separator provided by border-b above, but we can add dots) */}
               {isUnitColumn(colIdx) && (
                  <div className="absolute top-[6rem] w-2 h-2 bg-white rounded-full z-30 pointer-events-none"></div>
               )}

              {/* Lower Section */}
              <div className="h-56 w-full bg-slate-100/10 flex flex-col justify-start items-center py-2 space-y-1 z-10">
                 {/* 4 Lower Beads. Value 1 each.
                     Active = UP (Towards beam). Inactive = DOWN.
                 */}
                 {[0, 1, 2, 3].map((beadIdx) => {
                   const isActive = (beadIdx + 1) <= lowerVal;
                   return (
                     <div
                        key={beadIdx}
                        onClick={() => toggleLower(colIdx, beadIdx)}
                        className={`
                          w-10 h-8 sm:w-14 sm:h-10 rounded-full cursor-pointer shadow-lg transition-all duration-200 ease-out z-20
                          ${isActive ? '-translate-y-4 bg-red-600' : 'translate-y-4 bg-amber-600'}
                          border-b-2 border-r-2 border-black/30
                          flex items-center justify-center
                        `}
                     >
                       <div className="w-1/2 h-1/2 bg-white/20 rounded-full"></div>
                     </div>
                   );
                 })}
              </div>
              
              {/* Value Label (Optional) */}
              <div className="mt-2 text-white font-mono text-xs opacity-50">{val}</div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Abacus;
