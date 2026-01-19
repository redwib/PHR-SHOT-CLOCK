import { User, Target, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ScoreCardProps {
  player?: { firstName: string; lastName: string; profileImageUrl: string | null };
  customName?: string;
  teamName?: string;
  rating?: string;
  isGuest?: boolean;
  score: number;
  isBreaker: boolean;
  isWinner?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onSetBreaker?: () => void;
  onUpdateName?: (name: string) => void;
  onUpdateTeam?: (team: string) => void;
  onUpdateRating?: (rating: string) => void;
  readOnly?: boolean;
}

export function ScoreCard({ 
  player, 
  customName,
  teamName,
  rating,
  isGuest,
  score, 
  isBreaker, 
  isWinner,
  onIncrement, 
  onDecrement,
  onSetBreaker,
  onUpdateName,
  onUpdateTeam,
  onUpdateRating,
  readOnly 
}: ScoreCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [editName, setEditName] = useState(customName || (player ? `${player.firstName} ${player.lastName}` : ""));
  const [editTeam, setEditTeam] = useState(teamName || "");
  const [editRating, setEditRating] = useState(rating || "");

  if (!player && !customName && isGuest === undefined) return (
    <div className="flex flex-col items-center p-8 rounded-3xl bg-muted/50 border-2 border-dashed border-border min-h-[400px] justify-center text-muted-foreground">
      Waiting for player...
    </div>
  );

  const displayName = customName || (player ? `${player.firstName} ${player.lastName}` : "Guest Player");

  const handleNameSubmit = () => {
    onUpdateName?.(editName);
    setIsEditing(false);
  };

  const handleTeamSubmit = () => {
    onUpdateTeam?.(editTeam);
    setIsEditingTeam(false);
  };

  const handleRatingSubmit = () => {
    onUpdateRating?.(editRating);
    setIsEditingRating(false);
  };

  return (
    <div className={`
      relative flex flex-col items-center p-8 rounded-3xl transition-all duration-300
      ${isWinner ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20' : 'bg-card border-border'}
      border-2 w-full
    `}>
      {/* Player Header */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className={`relative p-1.5 rounded-full border-2 ${isBreaker ? 'border-primary' : 'border-transparent'}`}>
          <img 
            src={player?.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`} 
            alt="Player" 
            className="w-20 h-20 rounded-full bg-muted object-cover"
          />
          {isBreaker && (
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg animate-pulse">
              <Target className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="text-center group flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            {isEditing && !readOnly ? (
              <Input 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)}
                className="h-8 w-40 text-center font-bold"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                onBlur={handleNameSubmit}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold font-display">{displayName}</h2>
                {!readOnly && (
                  <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditingTeam && !readOnly ? (
              <Input 
                value={editTeam} 
                onChange={(e) => setEditTeam(e.target.value)}
                className="h-6 w-32 text-center text-sm font-medium"
                placeholder="Team Name"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleTeamSubmit()}
                onBlur={handleTeamSubmit}
              />
            ) : (
              <>
                <p className="text-sm font-medium text-primary/80">{teamName || "No Team"}</p>
                {!readOnly && (
                  <button onClick={() => setIsEditingTeam(true)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-3 h-3 text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="text-center group flex items-center gap-2">
          {isEditingRating && !readOnly ? (
            <div className="flex gap-2">
              <Input 
                value={editRating} 
                onChange={(e) => setEditRating(e.target.value)}
                className="h-6 w-24 text-center text-sm"
                placeholder="Rating"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleRatingSubmit()}
                onBlur={handleRatingSubmit}
              />
            </div>
          ) : (
            <>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Rating: {rating || "None"}
              </span>
              {!readOnly && (
                <button onClick={() => setIsEditingRating(true)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-3 h-3 text-muted-foreground hover:text-primary" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Score Display */}
      <div className="mb-8 w-full flex justify-center items-center gap-6">
        {!readOnly && (
          <Button 
            variant="outline" 
            size="icon"
            className="h-16 w-16 text-3xl font-bold rounded-2xl hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 border-2"
            onClick={onDecrement}
            disabled={score <= -4}
          >
            -
          </Button>
        )}

        <div className="text-9xl font-digital font-bold tracking-tighter text-glow text-foreground min-w-[120px] text-center">
          {score !== null && score !== undefined ? score : 0}
        </div>

        {!readOnly && (
          <Button 
            variant="default" 
            size="icon"
            className="h-16 w-16 text-3xl font-bold rounded-2xl shadow-lg shadow-primary/20"
            onClick={onIncrement}
          >
            +
          </Button>
        )}
      </div>

      {/* Breaker Control */}
      {!readOnly && (
        <Button 
          variant="outline"
          className={`w-full h-12 rounded-xl transition-all font-bold gap-2 ${isBreaker ? 'bg-primary/20 border-primary text-primary hover:bg-primary/30' : 'hover:bg-primary/10'}`}
          onClick={onSetBreaker}
        >
          <Target className="w-5 h-5" />
          {isBreaker ? "Current Breaker" : "Set as Breaker"}
        </Button>
      )}

      
      {isWinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-3xl z-10">
          <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold shadow-xl transform rotate-[-5deg] border-2 border-white/20">
            WINNER
          </div>
        </div>
      )}
    </div>
  );
}
