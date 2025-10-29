import { useState, useCallback } from 'react';
import { Cell } from '@/shared/types';
import { Crown, Sparkles } from 'lucide-react';

interface GameGridProps {
  grid: string[][];
  wordsToFind: string[];
  foundWords: string[];
  onWordFound: (word: string) => void;
}

export default function GameGrid({ grid, wordsToFind, foundWords, onWordFound }: GameGridProps) {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const createCell = (row: number, col: number): Cell => ({
    row,
    col,
    letter: grid[row][col],
    isSelected: selectedCells.some(cell => cell.row === row && cell.col === col),
    isFound: false,
  });

  const isValidDirection = (start: Cell, end: Cell): boolean => {
    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);
    
    // Horizontal, vertical, or diagonal
    return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
  };

  const getWordFromSelection = (start: Cell, end: Cell): string => {
    const cells: Cell[] = [];
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    const rowStep = steps === 0 ? 0 : rowDiff / steps;
    const colStep = steps === 0 ? 0 : colDiff / steps;

    for (let i = 0; i <= steps; i++) {
      const row = Math.round(start.row + rowStep * i);
      const col = Math.round(start.col + colStep * i);
      cells.push(createCell(row, col));
    }

    return cells.map(cell => cell.letter).join('');
  };

  const handleMouseDown = useCallback((row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([createCell(row, col)]);
  }, [grid]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!isSelecting || selectedCells.length === 0) return;

    const start = selectedCells[0];
    const end = createCell(row, col);

    if (isValidDirection(start, end)) {
      const cells: Cell[] = [];
      const rowDiff = end.row - start.row;
      const colDiff = end.col - start.col;
      const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
      
      const rowStep = steps === 0 ? 0 : rowDiff / steps;
      const colStep = steps === 0 ? 0 : colDiff / steps;

      for (let i = 0; i <= steps; i++) {
        const cellRow = Math.round(start.row + rowStep * i);
        const cellCol = Math.round(start.col + colStep * i);
        cells.push(createCell(cellRow, cellCol));
      }

      setSelectedCells(cells);
    }
  }, [isSelecting, selectedCells, grid]);

  const handleMouseUp = useCallback(() => {
    if (selectedCells.length > 1) {
      const start = selectedCells[0];
      const end = selectedCells[selectedCells.length - 1];
      const word = getWordFromSelection(start, end);
      const reverseWord = word.split('').reverse().join('');

      const foundWord = wordsToFind.find(w => 
        w.toUpperCase() === word.toUpperCase() || w.toUpperCase() === reverseWord.toUpperCase()
      );

      if (foundWord && !foundWords.includes(foundWord)) {
        onWordFound(foundWord);
      }
    }

    setIsSelecting(false);
    setSelectedCells([]);
  }, [selectedCells, wordsToFind, foundWords, onWordFound]);

  return (
    <div className="select-none">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Crown className="w-6 h-6 text-amber-400 candlelight-glow" />
          <h3 className="text-2xl gothic-title text-amber-100 candlelight-glow">
            Victorian Word Cipher Grid
          </h3>
          <Crown className="w-6 h-6 text-amber-400 candlelight-glow" />
        </div>
        <p className="text-amber-300/90 gothic-text">
          Drag across the mystical letters to reveal hidden Victorian words
        </p>
      </div>

      <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-8">
        <div className="grid grid-cols-8 gap-2 justify-center">
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const isSelected = selectedCells.some(cell => 
                cell.row === rowIndex && cell.col === colIndex
              );
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    relative w-12 h-12 flex items-center justify-center text-xl font-bold gothic-title
                    border-2 rounded-lg cursor-pointer select-none
                    transition-all duration-300 transform hover:scale-110
                    ${isSelected 
                      ? 'bg-amber-600/80 border-amber-500 text-white shadow-deep-gothic scale-110 candlelight-glow' 
                      : 'ornate-frame bg-amber-800/50 border-amber-600/60 text-amber-200 hover:bg-amber-700/60 hover:border-amber-500/80 shadow-gothic'
                    }
                  `}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                >
                  <span className="relative z-10">{letter}</span>
                  
                  {/* Victorian decorative corner */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
                  
                  {/* Selected glow effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/30 rounded-lg animate-pulse"></div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Victorian instruction scroll */}
        <div className="mt-8 text-center ornate-frame bg-gradient-to-br from-amber-950/30 to-amber-900/15 p-4">
          <div className="flex items-center justify-center gap-2 text-amber-300/80">
            <Sparkles className="w-4 h-4" />
            <span className="gothic-text text-sm">
              Click and drag across letters to form words in any direction
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
