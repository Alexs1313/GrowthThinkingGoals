import type {ImageSourcePropType} from 'react-native';

import {growthThnImages} from '../growthThnAssts';

export type GrowthThnOnboardingStepId =
  | 'customize'
  | 'habits'
  | 'challenges'
  | 'logic'
  | 'articles'
  | 'progress';

export type GrowthThnOnboardingStep = {
  id: GrowthThnOnboardingStepId;
  title: string;
  description: string;
  primaryLabel: string;
  illustration: ImageSourcePropType;
};

export const growthThnOnboardingSteps: GrowthThnOnboardingStep[] = [
  {
    id: 'customize',
    title: 'Customize Your Routine',
    description:
      'Create habits and choose which days they repeat. Your schedule, your rules. Build the life you want one habit at a time.',
    primaryLabel: 'Next',
    illustration: growthThnImages.onboardingCustomize,
  },
  {
    id: 'habits',
    title: 'Build Powerful Habits',
    description:
      'Track your weekly habits with our calendar. See your progress at a glance and stay on track every single day.',
    primaryLabel: 'Next',
    illustration: growthThnImages.onboardingHabits,
  },
  {
    id: 'challenges',
    title: 'Daily Life Challenges',
    description:
      'Complete daily improvement tasks with built-in timers. Small challenges that compound into big transformations.',
    primaryLabel: 'Next',
    illustration: growthThnImages.onboardingChallenges,
  },
  {
    id: 'logic',
    title: 'Train Your Logic',
    description:
      "Challenge your mind with Mercury's disc puzzle. Beat your personal record every level.",
    primaryLabel: 'Next',
    illustration: growthThnImages.onboardingLogic,
  },
  {
    id: 'articles',
    title: 'Read to Grow',
    description:
      'Explore motivational articles on discipline, confidence, and personal excellence. Knowledge that moves you forward.',
    primaryLabel: 'Next',
    illustration: growthThnImages.onboardingArticles,
  },
  {
    id: 'progress',
    title: 'See Your Progress',
    description:
      'Track every habit, task, game, and article. Watch your growth score rise as you build the life you deserve.',
    primaryLabel: 'Get Started',
    illustration: growthThnImages.onboardingProgress,
  },
];
