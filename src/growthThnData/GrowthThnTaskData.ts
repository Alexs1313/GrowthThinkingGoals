import {growthThnGetDayIndex} from '../growthThnUtil/GrowthThnTimeUtils';
import type {
  GrowthThnDailyAdvice,
  GrowthThnDailyChallenge,
} from './GrowthThnTaskTypes';

const growthThnMin = (m: number) => m * 60;

export const growthThnAdvicePool: GrowthThnDailyAdvice[] = [
  {
    quote:
      'It does not matter how slowly you go, as long as you do not stop.',
    author: 'Confucius',
  },
  { quote: 'A small action repeated today is stronger than a big plan postponed until tomorrow.' },
  { quote: 'Motivation often appears after movement, not before it. Start with one simple step.' },
  { quote: 'You do not need a perfect day. You only need to return to your path.' },
  { quote: 'When everything feels too big, choose one task and finish it with full attention.' },
  { quote: 'Discipline is not loud pressure. It is the calm decision to keep one promise to yourself.' },
  { quote: 'A missed day is not failure. It is a reminder to begin again with more awareness.' },
  { quote: 'Focus is not something you find. It is something you practice through small decisions.' },
  { quote: 'Do not compare your progress to others. Try to become slightly better than yesterday.' },
  { quote: 'Every habit, task, and focused minute adds a new line to your growth story.' },
  { quote: 'Thinking about change is useful, but action is what turns intention into progress.' },
  { quote: 'Not every goal needs speed. Some goals need patience, rhythm, and care.' },
  { quote: 'Like a puzzle, growth happens one move at a time. Make the next move wisely.' },
  { quote: 'The way you start your day can shape the way you handle the rest of it.' },
  { quote: 'Track your progress. What you can see, you can understand. What you understand, you can improve.' },
  { quote: 'You do not need to rush your growth. You only need to keep walking.' },
  { quote: 'Intensity may feel powerful, but consistency builds the life you actually keep.' },
  { quote: 'A repeated habit is not boring when it is connected to the person you want to become.' },
  { quote: 'Every small promise you keep today becomes trust for tomorrow.' },
  { quote: 'When the whole day feels heavy, focus only on the next minute and what you can do with it.' },
  { quote: 'A clear goal is not a cage. It is a direction when your energy feels scattered.' },
  { quote: 'Personal growth is not a jump to the top. It is the courage to take the next step.' },
  { quote: 'Reading can inspire you, but action is what turns an idea into change.' },
  { quote: 'Rest, reflection, and clear thinking are also part of becoming stronger.' },
  { quote: 'Choose one promise today and keep it. Confidence grows from evidence.' },
  { quote: 'Start where you are, with what you have, and adjust as you move.' },
  { quote: 'You may not see the change every day, but every completed action is proof of movement.' },
  { quote: 'Strong days are built from small blocks: one habit, one task, one focused choice.' },
  { quote: 'Challenge yourself, track your result, and try to beat your previous best.' },
  { quote: 'A timer is not pressure. It is a small container for focused effort.' },
  { quote: 'You do not need to transform your whole life today. Just make one part of it better.' },
  { quote: 'Move with clarity, return with patience, and let each day become part of your orbit.' },
  { quote: 'You can improve your life without being harsh with yourself. Kind discipline lasts longer.' },
  { quote: 'The first version of progress is rarely perfect. Begin anyway.' },
  { quote: 'Before you act, pause for one breath. Then choose the next useful step.' },
  { quote: 'Even a small completed task deserves recognition. You showed up.' },
  { quote: 'Your future may feel far away, but it is shaped by what you repeat today.' },
  { quote: 'Statistics are not judgment. They are feedback that helps you understand your rhythm.' },
  { quote: 'Completing a small task can create the energy to complete something bigger.' },
  { quote: 'Every day is a puzzle. Move one piece with patience and focus.' },
  { quote: 'As long as you return, your progress is not lost. Keep moving.' },
];

export const growthThnChallengePool: GrowthThnDailyChallenge[] = [
  {
    id: 'deep-breathing',
    title: 'Deep breathing session',
    category: 'Mental Wellness',
    description:
      'Practice box breathing: inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat calmly until the timer ends.',
    durationSeconds: growthThnMin(5),
  },
  { id: 'clear-one-surface', title: 'Clear One Surface', category: 'Focus', description: 'Choose one small surface near you, such as a desk, table, shelf, or nightstand. Remove everything unnecessary and leave only what you truly need.', durationSeconds: growthThnMin(6) },
  { id: 'write-three-priorities', title: 'Write Three Priorities', category: 'Planning', description: 'Write down three realistic priorities for today or tomorrow. Keep them simple, specific, and possible to complete.', durationSeconds: growthThnMin(7) },
  { id: 'five-minute-reset', title: 'Five-Minute Reset', category: 'Calm', description: 'Sit quietly, put your phone away, and breathe slowly. Let your mind settle before you return to your next task.', durationSeconds: growthThnMin(5) },
  { id: 'one-delayed-step', title: 'One Delayed Step', category: 'Discipline', description: 'Choose one task you have been postponing. Do not try to finish everything. Complete only the first useful step.', durationSeconds: growthThnMin(12) },
  { id: 'drink-and-pause', title: 'Drink and Pause', category: 'Health', description: 'Drink a glass of water slowly. Use this short pause to relax your shoulders and reset your focus.', durationSeconds: growthThnMin(3) },
  { id: 'message-of-gratitude', title: 'Message of Gratitude', category: 'Connection', description: 'Send a short message to someone you appreciate. Mention one specific reason why you are grateful for them.', durationSeconds: growthThnMin(8) },
  { id: 'ten-minute-walk', title: 'Ten-Minute Walk', category: 'Energy', description: 'Take a short walk without scrolling on your phone. Notice your breathing, surroundings, and body movement.', durationSeconds: growthThnMin(10) },
  { id: 'plan-tomorrow-tonight', title: 'Plan Tomorrow Tonight', category: 'Planning', description: 'Write a simple plan for tomorrow. Choose one important task, one small habit, and one thing that will make your day easier.', durationSeconds: growthThnMin(9) },
  { id: 'digital-clean-up', title: 'Digital Clean-Up', category: 'Focus', description: 'Delete old screenshots, unused files, or unnecessary notes from your phone. Clear a small part of your digital space.', durationSeconds: growthThnMin(11) },
  { id: 'read-one-page', title: 'Read One Page', category: 'Mind', description: 'Read one useful page from a book, article, or saved note. After reading, write one idea you want to remember.', durationSeconds: growthThnMin(6) },
  { id: 'stretch-and-breathe', title: 'Stretch and Breathe', category: 'Energy', description: 'Do light stretching for your neck, shoulders, back, or legs. Move slowly and breathe calmly while you stretch.', durationSeconds: growthThnMin(7) },
  { id: 'write-one-honest-thought', title: 'Write One Honest Thought', category: 'Reflection', description: 'Write one honest sentence about how you feel today. Do not judge it. Just notice it and let it exist.', durationSeconds: growthThnMin(5) },
  { id: 'finish-a-tiny-task', title: 'Finish a Tiny Task', category: 'Productivity', description: 'Choose one small task that can be completed quickly, such as replying to a message, organizing one item, or preparing something for later.', durationSeconds: growthThnMin(10) },
  { id: 'no-phone-focus', title: 'No-Phone Focus', category: 'Discipline', description: 'Put your phone away and focus on one useful activity. Do not switch tasks until the timer ends.', durationSeconds: growthThnMin(15) },
  { id: 'clean-your-start-zone', title: 'Clean Your Start Zone', category: 'Order', description: 'Prepare the place where you usually begin your day or work. Make it cleaner, calmer, and easier to use.', durationSeconds: growthThnMin(13) },
  { id: 'name-one-goal-clearly', title: 'Name One Goal Clearly', category: 'Goals', description: 'Write one goal you want to move toward. Then write one small action that can support it today.', durationSeconds: growthThnMin(4) },
  { id: 'one-minute-courage', title: 'One-Minute Courage', category: 'Confidence', description: 'Think about one thing you are avoiding because it feels uncomfortable. Name it clearly, then choose the smallest possible action.', durationSeconds: growthThnMin(2) },
  { id: 'prepare-one-healthy-choice', title: 'Prepare One Healthy Choice', category: 'Health', description: 'Prepare one simple healthy choice for later, such as water, fruit, a light snack, or a planned meal.', durationSeconds: growthThnMin(14) },
  { id: 'review-your-wins', title: 'Review Your Wins', category: 'Motivation', description: 'Write three things you have already done well this week. They can be small. Small wins still count.', durationSeconds: growthThnMin(6) },
  { id: 'mindful-breathing', title: 'Mindful Breathing', category: 'Calm', description: 'Breathe in slowly, hold for a moment, and breathe out gently. Repeat until the timer ends.', durationSeconds: growthThnMin(4) },
  { id: 'sort-one-small-area', title: 'Sort One Small Area', category: 'Order', description: 'Choose one drawer, bag, folder, or corner. Sort only that area and remove what no longer belongs there.', durationSeconds: growthThnMin(16) },
  { id: 'learn-one-new-idea', title: 'Learn One New Idea', category: 'Mind', description: 'Read or watch something educational for a few minutes. Save one useful thought in your notes.', durationSeconds: growthThnMin(9) },
  { id: 'compliment-yourself', title: 'Compliment Yourself', category: 'Confidence', description: 'Write one sincere compliment to yourself. Focus on effort, patience, courage, or progress rather than appearance.', durationSeconds: growthThnMin(3) },
  { id: 'reset-your-workspace', title: 'Reset Your Workspace', category: 'Productivity', description: 'Make your workspace ready for the next task. Remove distractions, place needed items nearby, and create a clean starting point.', durationSeconds: growthThnMin(8) },
  { id: 'micro-workout', title: 'Micro Workout', category: 'Energy', description: 'Do a short movement session. Choose simple exercises like squats, arm circles, marching in place, or gentle stretching.', durationSeconds: growthThnMin(12) },
  { id: 'choose-what-to-stop', title: 'Choose What to Stop', category: 'Awareness', description: 'Write one habit, action, or distraction that is taking energy from you. Choose one small way to reduce it today.', durationSeconds: growthThnMin(5) },
  { id: 'share-a-positive-thought', title: 'Share a Positive Thought', category: 'Connection', description: 'Send someone a kind message, useful idea, or encouraging sentence. Make the message simple and real.', durationSeconds: growthThnMin(7) },
  { id: 'focus-on-one-thing', title: 'Focus on One Thing', category: 'Focus', description: 'Pick one important task and work on it without switching. The goal is not perfection, only focused progress.', durationSeconds: growthThnMin(18) },
  { id: 'clean-your-mind-list', title: 'Clean Your Mind List', category: 'Planning', description: 'Write everything that is on your mind. Then choose only one thing that needs action today.', durationSeconds: growthThnMin(10) },
  { id: 'prepare-for-sleep', title: 'Prepare for Sleep', category: 'Calm', description: 'Do one thing that makes your evening calmer. Put away your phone, prepare clothes, tidy your bed, or lower distractions.', durationSeconds: growthThnMin(17) },
  { id: 'beat-the-first-step', title: 'Beat the First Step', category: 'Action', description: 'Start something you have been delaying. Work only until the timer ends. Starting is the goal.', durationSeconds: growthThnMin(6) },
  { id: 'organize-your-notes', title: 'Organize Your Notes', category: 'Mind', description: 'Open your notes and clean up one section. Delete what is useless and keep what still helps you.', durationSeconds: growthThnMin(13) },
  { id: 'one-kind-action', title: 'One Kind Action', category: 'Connection', description: 'Do one small kind action for someone. It can be a message, help with a task, or a simple thoughtful gesture.', durationSeconds: growthThnMin(11) },
  { id: 'build-a-better-morning', title: 'Build a Better Morning', category: 'Routine', description: 'Choose one thing that would make tomorrow morning easier. Prepare it now before the day gets busy.', durationSeconds: growthThnMin(8) },
  { id: 'check-your-energy', title: 'Check Your Energy', category: 'Reflection', description: 'Rate your energy from 1 to 10. Write one reason for that number and one small thing that could improve it.', durationSeconds: growthThnMin(4) },
  { id: 'remove-one-distraction', title: 'Remove One Distraction', category: 'Discipline', description: 'Find one distraction around you and remove it from your space. Make your next action easier to begin.', durationSeconds: growthThnMin(5) },
  { id: 'practice-patience', title: 'Practice Patience', category: 'Mindset', description: 'Choose one current problem and write what is inside your control. Focus only on the part you can influence.', durationSeconds: growthThnMin(9) },
  { id: 'create-a-mini-reward', title: 'Create a Mini Reward', category: 'Motivation', description: 'Choose a small reward for completing today’s main task. Keep it simple, healthy, and realistic.', durationSeconds: growthThnMin(6) },
  { id: 'simplify-one-plan', title: 'Simplify One Plan', category: 'Planning', description: 'Take one complicated plan and make it simpler. Remove extra steps and keep only the next clear action.', durationSeconds: growthThnMin(10) },
  { id: 'mercury-sprint', title: 'Mercury Sprint', category: 'Productivity', description: 'Work on one meaningful task with full attention. No scrolling, no switching, no overthinking. Just one focused sprint.', durationSeconds: growthThnMin(20) },
  { id: 'reflect-and-release', title: 'Reflect and Release', category: 'Reflection', description: 'Write one thing that bothered you today. Then write what you can learn from it or what you can let go.', durationSeconds: growthThnMin(12) },
  { id: 'rebuild-your-streak', title: 'Rebuild Your Streak', category: 'Habits', description: 'Choose one habit you want to restart. Complete a tiny version of it today to rebuild momentum.', durationSeconds: growthThnMin(7) },
  { id: 'calm-your-space', title: 'Calm Your Space', category: 'Calm', description: 'Make your environment more peaceful. Adjust lighting, remove clutter, open a window, or prepare a calm corner.', durationSeconds: growthThnMin(14) },
  { id: 'confidence-rehearsal', title: 'Confidence Rehearsal', category: 'Confidence', description: 'Think of one situation where you want to feel more confident. Write or say how you want to act in that moment.', durationSeconds: growthThnMin(8) },
  { id: 'finish-before-perfect', title: 'Finish Before Perfect', category: 'Discipline', description: 'Work on something without trying to make it perfect. Complete a usable version and allow yourself to improve it later.', durationSeconds: growthThnMin(15) },
  { id: 'personal-check-in', title: 'Personal Check-In', category: 'Reflection', description: 'Ask yourself: “What do I need today?” Write one honest answer and one small action that supports it.', durationSeconds: growthThnMin(6) },
  { id: 'learn-from-yesterday', title: 'Learn From Yesterday', category: 'Growth', description: 'Write one thing yesterday taught you. Then write how you can use that lesson today.', durationSeconds: growthThnMin(9) },
  { id: 'one-better-choice', title: 'One Better Choice', category: 'Health', description: 'Choose one better option right now. It can be water instead of another drink, movement instead of sitting, or rest instead of scrolling.', durationSeconds: growthThnMin(5) },
  { id: 'logic-warm-up', title: 'Logic Warm-Up', category: 'Mind', description: 'Solve a small puzzle, memory task, or logic question. Train your mind before moving into your next activity.', durationSeconds: growthThnMin(10) },
  { id: 'end-with-order', title: 'End With Order', category: 'Routine', description: 'Before finishing your day, put three things back in their place and prepare one thing for tomorrow.', durationSeconds: growthThnMin(16) },
];

export function growthThnPickDailyAdvice(date = new Date()): GrowthThnDailyAdvice {
  const growthThnIdx = growthThnGetDayIndex(date) % growthThnAdvicePool.length;
  return growthThnAdvicePool[growthThnIdx];
}

export function growthThnPickDailyChallenge(date = new Date()): GrowthThnDailyChallenge {
  const growthThnIdx = growthThnGetDayIndex(date) % growthThnChallengePool.length;
  return {...growthThnChallengePool[growthThnIdx]};
}

export function growthThnPickRandomChallenge(
  growthThnExcludeId?: string,
): GrowthThnDailyChallenge {
  const growthThnCandidates = growthThnExcludeId
    ? growthThnChallengePool.filter(c => c.id !== growthThnExcludeId)
    : growthThnChallengePool;
  const growthThnPick =
    growthThnCandidates[Math.floor(Math.random() * growthThnCandidates.length)];
  return { ...growthThnPick };
}
