import { useState } from "react";
import { Zap, ArrowLeft } from "lucide-react";
import { MoodButton } from "./components/MoodButton";
import { ActivityCard } from "./components/ActivityCard";
import { ActivityModal } from "./components/ActivityModal";

type Mood = "bored" | "overwhelmed" | "stuck" | null;

const activities = {
  bored: [
    {
      title: "5-Minute Dance Break",
      description:
        "Put on your favorite upbeat song and dance like nobody's watching. Movement releases endorphins and breaks the monotony.",
    },
    {
      title: "Learn Something New",
      description:
        "Watch a 10-minute YouTube tutorial on something you've always been curious about. Feed your brain with fresh knowledge.",
    },
    {
      title: "Creative Doodling",
      description:
        "Grab some paper and draw whatever comes to mind. No pressure to create art—just let your hand move freely.",
    },
    {
      title: "Call a Friend",
      description:
        "Reach out to someone you haven't talked to in a while. Human connection is the best cure for boredom.",
    },
  ],
  overwhelmed: [
    {
      title: "4-7-8 Breathing",
      description:
        "Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times. This activates your parasympathetic nervous system.",
    },
    {
      title: "Brain Dump",
      description:
        "Write down everything on your mind for 5 minutes. Don't organize, just get it all out of your head onto paper.",
    },
    {
      title: "One Small Task",
      description:
        "Pick the tiniest thing on your to-do list and complete it. Success builds momentum and clarity.",
    },
    {
      title: "Nature Break",
      description:
        "Step outside for 5 minutes. Look at the sky, feel the air, notice something green. Nature resets your nervous system.",
    },
  ],
  stuck: [
    {
      title: "Change Your Environment",
      description:
        "Move to a different room, go to a café, or even just rearrange your workspace. New perspectives unlock new thoughts.",
    },
    {
      title: "Talk It Out",
      description:
        "Explain your problem to someone else (or even a rubber duck). Verbalizing often reveals solutions.",
    },
    {
      title: "Take a Walk",
      description:
        "Leave the problem behind and take a 10-minute walk. Studies show walking boosts creative thinking by 60%.",
    },
    {
      title: "Set a Timer",
      description:
        "Give yourself 15 minutes to work on the problem without judgment. Time pressure can break perfectionism.",
    },
  ],
};

const allActivities = [
  ...activities.bored,
  ...activities.overwhelmed,
  ...activities.stuck,
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [currentActivities, setCurrentActivities] =
    useState(allActivities);
  const [selectedActivity, setSelectedActivity] =
    useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedActivities, setCompletedActivities] =
    useState<Set<string>>(new Set());
  const [isFiltered, setIsFiltered] = useState(false);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    if (mood) {
      setCurrentActivities(activities[mood]);
      setIsFiltered(true);
    }
  };

  const handleSurpriseMe = () => {
    setSelectedMood(null);
    const shuffled = [...allActivities].sort(
      () => Math.random() - 0.5,
    );
    setCurrentActivities(shuffled.slice(0, 1));
    setIsFiltered(true);
  };

  const handleBackToMain = () => {
    setSelectedMood(null);
    setCurrentActivities(allActivities);
    setIsFiltered(false);
  };

  const handleTryActivity = (activity: any) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleCompleteActivity = () => {
    if (selectedActivity) {
      setCompletedActivities(
        (prev) => new Set([...prev, selectedActivity.title]),
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-green-50/20">
      <div className="max-w-md mx-auto px-6 py-12 space-y-10">
        {/* Header with Back Button */}
        <div className="text-center space-y-6">
          {isFiltered && (
            <div className="flex justify-start mb-4">
              <button
                onClick={handleBackToMain}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white border border-gray-200/50 hover:border-gray-300/50 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                <ArrowLeft
                  size={16}
                  className="text-[var(--color-text-medium)]"
                />
                <span className="font-sans font-medium text-[var(--color-text-medium)]">
                  Back
                </span>
              </button>
            </div>
          )}

          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:shadow-[0_0_40px_rgba(251,191,36,0.8)] transition-all duration-300 mb-4 animate-pulse-gentle">
              <Zap
                className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                size={32}
              />
            </div>
            <h1 className="font-serif text-4xl text-[var(--color-text-dark)] leading-tight tracking-tight">
              Your Dopamine Menu
            </h1>
          </div>
          <p className="font-sans text-lg text-[var(--color-text-medium)] leading-relaxed max-w-sm mx-auto">
            When you're feeling stuck, overwhelmed, or just
            plain bored—pick something that sparks joy and gets
            you moving again.
          </p>

          {/* Completed activities counter */}
          {completedActivities.size > 0 && (
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 px-4 py-2 rounded-2xl font-medium shadow-sm">
              <span className="text-lg">🎉</span>
              <span className="font-sans">
                {completedActivities.size} completed today
              </span>
            </div>
          )}
        </div>

        {/* Mood Buttons - Only show when not filtered */}
        {!isFiltered && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[var(--color-text-dark)] text-center mb-6">
              How are you feeling?
            </h2>
            <div className="grid gap-4">
              <MoodButton
                mood="bored"
                emoji="😴"
                label="I'm Bored"
                onClick={() => handleMoodSelect("bored")}
                isActive={selectedMood === "bored"}
              />
              <MoodButton
                mood="overwhelmed"
                emoji="😵‍💫"
                label="I'm Overwhelmed"
                onClick={() => handleMoodSelect("overwhelmed")}
                isActive={selectedMood === "overwhelmed"}
              />
              <MoodButton
                mood="stuck"
                emoji="🤯"
                label="I'm Stuck"
                onClick={() => handleMoodSelect("stuck")}
                isActive={selectedMood === "stuck"}
              />
            </div>

            {/* Surprise Me Button */}
            <div className="pt-2">
              <button
                onClick={handleSurpriseMe}
                className="w-full min-h-[64px] px-6 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-soft-blue-light)] via-[var(--color-blush-red-light)] to-[var(--color-sage-green-light)] hover:from-[var(--color-soft-blue)] hover:via-[var(--color-blush-red)] hover:to-[var(--color-sage-green)] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] touch-manipulation font-sans font-medium text-[var(--color-text-dark)] border border-white/50"
              >
                <span className="text-xl animate-pulse">
                  ✨
                </span>
                <span className="text-base">Surprise Me</span>
              </button>
            </div>
          </div>
        )}

        {/* Activities */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-[var(--color-text-dark)] mb-2">
              {selectedMood
                ? `When you're ${selectedMood}`
                : currentActivities.length === 1
                  ? "Your surprise activity"
                  : "Quick dopamine hits"}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-soft-blue)] to-[var(--color-sage-green)] rounded-full mx-auto"></div>
          </div>

          <div className="space-y-5">
            {currentActivities.map((activity, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ActivityCard
                  title={activity.title}
                  description={activity.description}
                  onTry={() => handleTryActivity(activity)}
                  isCompleted={completedActivities.has(
                    activity.title,
                  )}
                />
              </div>
            ))}
          </div>

          {/* Show all activities button when filtered */}
          {isFiltered && currentActivities.length > 1 && (
            <div className="text-center pt-4">
              <button
                onClick={handleBackToMain}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white border border-gray-200/50 hover:border-gray-300/50 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md backdrop-blur-sm font-sans font-medium text-[var(--color-text-medium)]"
              >
                <span>View all activities</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Activity Modal */}
      <ActivityModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleCompleteActivity}
      />
    </div>
  );
}