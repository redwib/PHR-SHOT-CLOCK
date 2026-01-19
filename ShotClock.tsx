import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShotClock() {
  const INITIAL_TIME = 30;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = useCallback(() => {
    setTimeLeft(INITIAL_TIME);
    setIsRunning(true);
  }, []);

  const getProgressColor = () => {
    if (timeLeft > 10) {
      return "text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]";
    }
    return "text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]";
  };

  const getBorderColor = () => {
    return timeLeft > 10 ? "border-green-500/20" : "border-red-500/20";
  };

  const getLabelColor = () => {
    return timeLeft > 10 ? "text-green-500/70" : "text-red-500/70";
  };

  const getRingBgColor = () => {
    return timeLeft > 10 ? "bg-green-950/20 border-green-500/10" : "bg-red-950/20 border-red-500/10";
  };

  return (
    <div className={`flex flex-col items-center justify-center bg-card border-2 ${getBorderColor()} rounded-3xl p-8 shadow-2xl w-full max-w-[320px] backdrop-blur-sm transition-colors duration-500`}>
      <h3 className={`text-sm uppercase tracking-[0.2em] ${getLabelColor()} font-black mb-6 transition-colors duration-500`}>Shot Clock</h3>
      
      <div className="relative mb-8">
        {/* Progress Ring Background */}
        <div className={`w-48 h-48 rounded-full border-4 ${getRingBgColor()} flex items-center justify-center shadow-inner transition-colors duration-500`}>
          <span className={`text-8xl font-digital font-bold ${getProgressColor()} tabular-nums tracking-tighter transition-colors duration-500`}>
            {timeLeft}
          </span>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <Button 
          variant={isRunning ? "secondary" : "default"} 
          className={`flex-1 h-16 rounded-2xl text-xl shadow-lg transition-all ${!isRunning ? (timeLeft > 10 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white') : ''}`}
          onClick={toggleTimer}
          disabled={timeLeft === 0 && !isRunning}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        <Button 
          variant="outline" 
          className={`h-16 w-16 rounded-2xl border-2 transition-colors duration-500 ${timeLeft > 10 ? 'hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/50' : 'hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50'}`}
          onClick={resetTimer}
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
