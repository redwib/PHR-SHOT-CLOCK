import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsertMatch } from "@shared/schema";
import { useUpdateMatch } from "@/hooks/use-matches";

interface MatchClockProps {
  matchId: number;
  elapsedSeconds: number;
  isPaused: boolean;
  lastActionAt: string | null;
  readOnly?: boolean;
}

export function MatchClock({ matchId, elapsedSeconds, isPaused, lastActionAt, readOnly }: MatchClockProps) {
  const [displaySeconds, setDisplaySeconds] = useState(elapsedSeconds);
  const updateMatch = useUpdateMatch();

  // Sync effect
  useEffect(() => {
    if (isPaused) {
      setDisplaySeconds(elapsedSeconds);
      return;
    }

    // If running, calculate based on diff
    const start = lastActionAt ? new Date(lastActionAt) : new Date();
    
    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(now, start);
      const remaining = Math.max(0, elapsedSeconds - diff);
      setDisplaySeconds(remaining);

      // Auto-pause when reaching zero
      if (remaining === 0 && !isPaused) {
        updateMatch.mutate({
          id: matchId,
          updates: {
            isPaused: true,
            elapsedSeconds: 0,
            lastActionAt: new Date().toISOString() as any
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [elapsedSeconds, isPaused, lastActionAt]);

  const handleTogglePause = () => {
    const now = new Date().toISOString();
    
    if (isPaused) {
      // Resume
      updateMatch.mutate({
        id: matchId,
        updates: {
          isPaused: false,
          lastActionAt: now as any // Casting for timestamp vs string match
        }
      });
    } else {
      // Pause - Commit the time elapsed
      const diff = lastActionAt ? differenceInSeconds(new Date(), new Date(lastActionAt)) : 0;
      updateMatch.mutate({
        id: matchId,
        updates: {
          isPaused: true,
          elapsedSeconds: Math.max(0, elapsedSeconds - diff),
          lastActionAt: now as any
        }
      });
    }
  };

  const handleReset = () => {
    if (readOnly) return;
    const now = new Date().toISOString();
    updateMatch.mutate({
      id: matchId,
      updates: {
        elapsedSeconds: 1800, // Reset to 30 mins
        isPaused: true,
        lastActionAt: now as any
      }
    });
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
      <Timer className="w-6 h-6 text-red-500 animate-pulse" />
      <span className="font-digital text-5xl font-bold tracking-widest text-red-500 min-w-[150px] text-center drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
        {formatTime(displaySeconds)}
      </span>
      {!readOnly && (
        <div className="flex flex-col gap-1 ml-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 p-0 hover:bg-red-500/10 text-red-500" 
            onClick={handleTogglePause}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 p-0 hover:bg-red-500/10 text-red-500" 
            onClick={handleReset}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
