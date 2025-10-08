import { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  onTry: () => void;
  isCompleted?: boolean;
}

export function ActivityCard({ title, description, onTry, isCompleted = false }: ActivityCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 backdrop-blur-sm ${
        isCompleted 
          ? 'border-green-200/70 bg-gradient-to-br from-green-50/80 to-emerald-50/40 shadow-md' 
          : 'border-gray-200/50 hover:border-gray-300/70 shadow-sm hover:shadow-lg hover:scale-[1.01]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
          <CheckCircle2 size={14} className="text-white" />
        </div>
      )}
      
      <div className="flex flex-col gap-5">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-serif font-semibold text-lg leading-tight transition-colors duration-200 ${
              isCompleted 
                ? 'text-green-800' 
                : 'text-[var(--color-text-dark)] group-hover:text-[var(--color-text-dark)]'
            }`}>
              {title}
            </h3>
          </div>
          <p className={`font-sans leading-relaxed transition-colors duration-200 ${
            isCompleted 
              ? 'text-green-700' 
              : 'text-[var(--color-text-medium)]'
          }`}>
            {description}
          </p>
        </div>
        
        <button
          onClick={onTry}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className={`
            self-start inline-flex items-center gap-2 px-5 py-3 rounded-xl font-sans font-medium 
            transition-all duration-200 shadow-sm hover:shadow-md border backdrop-blur-sm
            ${isPressed ? 'scale-95' : 'hover:scale-105'}
            active:scale-95 touch-manipulation
            ${isCompleted 
              ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-200/50' 
              : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-[var(--color-text-dark)] border-gray-200/50 hover:border-gray-300/50'
            }
          `}
        >
          <span>{isCompleted ? 'Try again' : 'Try it'}</span>
          <ArrowRight 
            size={14} 
            className={`transition-transform duration-200 ${
              isHovered && !isCompleted ? 'translate-x-0.5' : ''
            }`} 
          />
        </button>
      </div>
    </div>
  );
}