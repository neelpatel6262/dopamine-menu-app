import { useState } from "react";
import { X, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface ActivityModalProps {
  activity: {
    title: string;
    description: string;
    steps?: string[];
    duration?: string;
    tips?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const activityDetails: { [key: string]: any } = {
  "5-Minute Dance Break": {
    steps: [
      "Find a private space where you won't be interrupted",
      "Put on your favorite upbeat song (or use our playlist)",
      "Start with simple movements - just sway to the beat",
      "Let your body move naturally - no choreography needed",
      "Focus on how the music makes you feel, not how you look",
    ],
    duration: "5 minutes",
    tips: [
      "Close your eyes if you feel self-conscious",
      "Try different genres to see what energizes you most",
      "Dancing releases endorphins naturally - embrace the good feelings!",
    ],
  },
  "Learn Something New": {
    steps: [
      "Think of something you've been curious about lately",
      "Search for a 5-10 minute tutorial on YouTube or online",
      "Get any materials you might need beforehand",
      "Follow along actively - don't just watch passively",
      "Take one small note about what you learned",
    ],
    duration: "10-15 minutes",
    tips: [
      "Start with something completely unrelated to work",
      "Choose topics that spark genuine curiosity",
      "Learning activates your brain's reward system naturally",
    ],
  },
  "Creative Doodling": {
    steps: [
      "Grab any paper and pen/pencil you have nearby",
      "Start with simple shapes or lines - no pressure",
      "Let your hand move without planning what to draw",
      "Try drawing patterns, faces, or whatever comes to mind",
      "Focus on the process, not the result",
    ],
    duration: "5-10 minutes",
    tips: [
      "There's no wrong way to doodle",
      "Try drawing with your non-dominant hand for a fun challenge",
      "Creative expression helps process emotions and stress",
    ],
  },
  "Call a Friend": {
    steps: [
      "Think of someone you haven't talked to in a while",
      "Send a quick text first: 'Hey! Thinking of you, got a few minutes to chat?'",
      "If they're available, make the call",
      "Ask them how they're really doing, not just 'how are you?'",
      "Share something genuine about your day or week",
    ],
    duration: "10-20 minutes",
    tips: [
      "People are usually happy to hear from old friends",
      "Even a 5-minute conversation can brighten both your days",
      "Social connection is one of the strongest mood boosters",
    ],
  },
  "4-7-8 Breathing": {
    steps: [
      "Sit comfortably with your back straight",
      "Place your tongue against the roof of your mouth",
      "Exhale completely through your mouth",
      "Inhale through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale through your mouth for 8 counts",
      "Repeat this cycle 3-4 times",
    ],
    duration: "3-5 minutes",
    tips: [
      "The exhale should make a whoosh sound",
      "Don't worry if you feel dizzy at first - that's normal",
      "This technique activates your body's relaxation response",
    ],
  },
  "Brain Dump": {
    steps: [
      "Get a blank piece of paper or open a document",
      "Set a timer for 5-10 minutes",
      "Write down everything on your mind - don't edit",
      "Include worries, tasks, random thoughts, everything",
      "Don't worry about organization or spelling",
      "When done, take three deep breaths and review what you wrote",
    ],
    duration: "5-10 minutes",
    tips: [
      "Write continuously - even if you repeat things",
      "This helps clear mental clutter and reduce overwhelm",
      "You can organize or prioritize the list later if needed",
    ],
  },
  "One Small Task": {
    steps: [
      "Look at your to-do list or think of pending tasks",
      "Pick the smallest, easiest thing you can complete",
      "Something that takes 2-5 minutes maximum",
      "Do it right now - don't overthink it",
      "Celebrate completing it, even if it's tiny",
    ],
    duration: "2-5 minutes",
    tips: [
      "Examples: reply to one email, wash one dish, file one document",
      "Momentum builds momentum - small wins lead to bigger ones",
      "Completing tasks releases dopamine naturally",
    ],
  },
  "Nature Break": {
    steps: [
      "Step outside or go to a window with a view",
      "Take 5 deep breaths of fresh air",
      "Look for something green - trees, grass, plants",
      "Notice the sky, clouds, or weather",
      "Listen for natural sounds - birds, wind, etc.",
      "Stay present and avoid checking your phone",
    ],
    duration: "5-10 minutes",
    tips: [
      "Even 30 seconds of nature exposure can help",
      "If you can't go outside, look at nature photos",
      "Nature automatically reduces stress hormones",
    ],
  },
  "Change Your Environment": {
    steps: [
      "Save your current work if needed",
      "Move to a completely different location",
      "Try a different room, café, or outdoor space",
      "Bring your problem/task with you to the new space",
      "Spend a few minutes adjusting to the new environment",
      "Approach your challenge with fresh eyes",
    ],
    duration: "15-20 minutes",
    tips: [
      "Even moving to a different chair can help",
      "New environments stimulate different thinking patterns",
      "Change of scenery often brings change of perspective",
    ],
  },
  "Talk It Out": {
    steps: [
      "Find someone willing to listen (friend, colleague, family)",
      "Explain your problem from the beginning",
      "Don't ask for solutions - just ask them to listen",
      "Talk through your thought process out loud",
      "Often you'll discover the solution while explaining",
    ],
    duration: "10-15 minutes",
    tips: [
      "A rubber duck or pet works too - seriously!",
      "The act of verbalizing organizes your thoughts",
      "Sometimes just being heard helps reduce stress",
    ],
  },
  "Take a Walk": {
    steps: [
      "Put down whatever you're working on",
      "Go for a 10-15 minute walk - no destination needed",
      "Leave your phone behind or keep it in your pocket",
      "Walk at a comfortable pace",
      "Let your mind wander - don't try to solve anything",
      "Notice your surroundings as you walk",
    ],
    duration: "10-15 minutes",
    tips: [
      "Walking increases creative thinking by up to 60%",
      "The rhythm of walking helps organize thoughts",
      "Solutions often come when you stop trying so hard",
    ],
  },
  "Set a Timer": {
    steps: [
      "Set a timer for 15-25 minutes",
      "Commit to working on your challenge until it goes off",
      "Don't aim for perfection - just make progress",
      "If you get stuck, keep going anyway",
      "When the timer stops, take a break regardless of progress",
    ],
    duration: "15-25 minutes",
    tips: [
      "Time limits reduce perfectionism and analysis paralysis",
      "You'll often surprise yourself with what you accomplish",
      "This technique is similar to the Pomodoro method",
    ],
  },
};

export function ActivityModal({
  activity,
  isOpen,
  onClose,
  onComplete,
}: ActivityModalProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen || !activity) return null;

  const details = activityDetails[activity.title] || {};

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
    setTimeout(() => {
      onClose();
      setIsCompleted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm rounded-t-3xl border-b border-gray-100/80 p-6 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[var(--color-text-dark)] leading-tight pr-8">
            {activity.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X size={20} className="text-[var(--color-text-medium)]" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Duration */}
            {details.duration && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-2xl border border-blue-100/50">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <span className="font-sans font-medium text-blue-700">
                  {details.duration}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100/50">
              <p className="font-sans text-[var(--color-text-medium)] leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Steps */}
            {details.steps && (
              <div className="space-y-4">
                <h3 className="font-serif font-semibold text-[var(--color-text-dark)] text-lg flex items-center gap-2">
                  <span className="text-purple-500">📝</span>
                  How to do it:
                </h3>
                <div className="space-y-3">
                  {details.steps.map((step: string, index: number) => (
                    <div key={index} className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100/50 hover:border-gray-200/70 transition-colors duration-200">
                      <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-[var(--color-soft-blue)] to-[var(--color-sage-green)] rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-sm">
                        {index + 1}
                      </span>
                      <span className="font-sans text-[var(--color-text-medium)] leading-relaxed">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {details.tips && (
              <div className="space-y-4">
                <h3 className="font-serif font-semibold text-[var(--color-text-dark)] text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-500" />
                  Pro Tips:
                </h3>
                <div className="space-y-3">
                  {details.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex gap-3 p-4 bg-gradient-to-r from-yellow-50/80 to-amber-50/40 rounded-xl border border-yellow-100/50">
                      <span className="text-yellow-500 flex-shrink-0 mt-1">✨</span>
                      <span className="font-sans text-yellow-800 leading-relaxed">
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100/80 p-6">
          <div className="flex gap-3">
            {!isCompleted ? (
              <>
                <button
                  onClick={handleComplete}
                  className="flex-1 bg-gradient-to-r from-[var(--color-sage-green)] to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle2 size={18} />
                  I did it!
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-[var(--color-text-dark)] font-medium rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200/50"
                >
                  Maybe later
                </button>
              </>
            ) : (
              <div className="flex-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 border border-green-200/50">
                <CheckCircle2 size={18} />
                Great job! 🎉
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}