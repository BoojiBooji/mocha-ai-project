import { useState, useEffect } from 'react';
import { Puzzle, UserProgress } from '@/shared/types';

export function usePuzzle(stage: number) {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPuzzle() {
      try {
        setLoading(true);
        const response = await fetch(`/api/puzzles/${stage}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch puzzle');
        }
        
        const data = await response.json();
        setPuzzle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (stage >= 1 && stage <= 3) {
      fetchPuzzle();
    }
  }, [stage]);

  return { puzzle, loading, error };
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/progress');
      
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (
    stage: number,
    completedPuzzles: string[],
    currentProgress: any,
    isCompleted: boolean
  ) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage,
          completed_puzzles: JSON.stringify(completedPuzzles),
          current_stage_progress: JSON.stringify(currentProgress),
          is_completed: isCompleted,
        }),
      });

      if (response.ok) {
        await fetchProgress(); // Refresh progress
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  return {
    progress,
    loading,
    fetchProgress,
    saveProgress,
  };
}
