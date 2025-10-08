import { useState } from 'react';

interface MoodButtonProps {
  mood: 'bored' | 'overwhelmed' | 'stuck';
  emoji: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const moodColors = {
  bored: {
    bg: 'bg-[var(--color-soft-blue)]',
    bgLight: 'bg-[var(--color-soft-blue-light)]',
    hover: 'hover:bg-[var(--color-soft-blue)]',
    border: 'border-[var(--color-soft-blue)]/30',
    shadow: 'shadow-[var(--color-soft-blue)]/20',
  },
  overwhelmed: {
    bg: 'bg-[var(--color-blush-red)]',
    bgLight: 'bg-[var(--color-blush-red-light)]',
    hover: 'hover:bg-[var(--color-blush-red)]',
    border: 'border-[var(--color-blush-red)]/30',
    shadow: 'shadow-[var(--color-blush-red)]/20',
  },
  stuck: {
    bg: 'bg-[var(--color-sage-green)]',
    bgLight: 'bg-[var(--color-sage-green-light)]',
    hover: 'hover:bg-[var(--color-sage-green)]',
    border: 'border-[var(--color-sage-green)]/30',
    shadow: 'shadow-[var(--color-sage-green)]/20',
  },
};

export function MoodButton({ mood, emoji, label, onClick, isActive = false }: MoodButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const colors = moodColors[mood];

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className={`
        w-full min-h-[68px] px-6 py-5 rounded-2xl transition-all duration-300 
        flex items-center justify-center gap-4 border backdrop-blur-sm
        ${isActive 
          ? `${colors.bg} ${colors.border} shadow-lg ${colors.shadow}` 
          : `${colors.bgLight} border-gray-200/50 shadow-sm hover:shadow-md`
        }
        ${colors.hover}
        ${isPressed ? 'scale-[0.97]' : isHovered ? 'scale-[1.02]' : 'scale-100'}
        ${isActive ? 'shadow-xl' : ''}
        active:scale-[0.97] touch-manipulation
        font-sans font-medium text-[var(--color-text-dark)]
        hover:border-gray-300/50
      `}
    >
      <span className={`text-2xl transition-transform duration-200 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}>
        {emoji}
      </span>
      <span className="text-base tracking-wide">{label}</span>
      {isActive && (
        <div className="ml-auto">
          <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
        </div>
      )}
    </button>
  );
}