import type {GrowthThnArticle, GrowthThnArticleTag} from './GrowthThnArticleTypes';

function growthThnMakeArticle(
  id: string,
  emoji: string,
  title: string,
  tag: GrowthThnArticleTag,
  preview: string,
  body: string,
): GrowthThnArticle {
  return {
    id,
    emoji,
    title,
    tag,
    preview,
    paragraphs: body.split(/\n\n+/).map(p => p.trim()).filter(Boolean),
  };
}

export const growthThnArticles: GrowthThnArticle[] = [
  growthThnMakeArticle(
    'power-of-consistent-action',
    '🔥',
    "The Power of Consistent Action",
    'DISCIPLINE',
    "Every achievement you admire was built one day at a time — not through bursts of inspiration but through showing up consistently.",
    `Every achievement you admire was built one day at a time — not through sudden bursts of inspiration, but through consistent action repeated when it was easy, boring, uncomfortable, and ordinary.

Consistency is powerful because it removes the need to restart your life every week. When you repeat a useful action, your mind begins to understand that progress is not a rare event. It becomes part of your identity. You stop asking, “Do I feel motivated today?” and start asking, “What is the next small action I can complete?”

Discipline does not mean doing everything perfectly. It means returning to the path after distraction, tiredness, or delay. A missed day does not erase your progress. A broken rhythm can always be rebuilt with one honest action.

Start with something small enough to repeat. Read one page. Clean one corner. Walk for five minutes. Mark one habit as complete. These actions may look simple, but they train your ability to show up.

The goal is not to create a perfect version of yourself overnight. The goal is to become someone who keeps moving, even slowly. Consistent action turns small effort into visible growth.`,
  ),
  growthThnMakeArticle(
    'starting-before-ready',
    '🚀',
    "Starting Before You're Ready",
    'NEW BEGINNINGS',
    "Waiting until you feel ready is the most effective way to never begin. Readiness is not a feeling — it is a choice.",
    `Waiting until you feel ready is one of the easiest ways to never begin. Readiness often feels like something that should arrive before action, but in real life it usually appears after you have already started.

When you begin something new, uncertainty is normal. You may not know enough, feel confident enough, or understand the full path ahead. That does not mean you are not capable. It means you are standing at the beginning, where everyone starts.

The first step does not need to be impressive. It only needs to be real. Open the document. Write the first sentence. Add the first habit. Start the timer. Try the first level. The beginning is not supposed to prove your talent; it is supposed to create motion.

Confidence grows through evidence. Every small action gives your mind proof that you can move forward even when the situation is not perfect. The more you act, the less frightening the next step becomes.

Do not wait for a perfect mood, perfect plan, or perfect moment. Begin with what you have, where you are, and let clarity appear through movement.`,
  ),
  growthThnMakeArticle(
    'building-mental-toughness',
    '💪',
    "Building Mental Toughness",
    'CONFIDENCE',
    "Mental toughness is not an innate quality. It is a skill built through intentional discomfort and deliberate recovery.",
    `Mental toughness is not an innate quality that only a few people are born with. It is a skill built through intentional discomfort, honest recovery, and repeated effort.

Every time you finish a task you wanted to avoid, you train your mind to trust your strength. Every time you stay calm during a difficult moment, you prove that discomfort does not control you. Every time you return after a mistake, you build resilience.

Mental toughness does not mean ignoring emotions. It means noticing them without letting them make every decision. You can feel nervous and still act. You can feel tired and still complete one small step. You can feel uncertain and still move forward carefully.

A strong mind is not created by pressure alone. Recovery matters too. Rest, reflection, and self-respect help you continue without burning out. Toughness without recovery becomes exhaustion. Recovery without action becomes avoidance.

Build mental toughness gently but consistently. Choose small challenges. Finish them. Learn from them. Return again tomorrow. Over time, your mind becomes stronger because it has practiced staying present when things are not easy.`,
  ),
  growthThnMakeArticle(
    'focus-trainable-skill',
    '🧠',
    "Focus Is a Trainable Skill",
    'FOCUS',
    "Focus is not something you either have or do not have. It improves when you practice protecting your attention.",
    `Focus is not something you either have or do not have. It is a skill that improves when you practice protecting your attention.

Modern life constantly asks your mind to jump from one thing to another. Notifications, messages, thoughts, unfinished tasks, and endless content can make deep attention feel impossible. But focus returns when you create small boundaries.

Start by choosing one task and giving it a clear time container. Ten minutes of focused work can be more useful than one hour of scattered attention. A timer helps because it tells your brain, “For this short period, we stay here.”

Remove one distraction before you begin. Put your phone away. Close extra tabs. Clear the surface in front of you. You do not need a perfect environment, but you do need fewer things fighting for your attention.

Focus improves through repetition. Each time you return to the task instead of escaping into distraction, you strengthen your attention. Even if your mind wanders, gently bring it back.

The goal is not to become perfectly focused forever. The goal is to practice returning. Focus grows every time you choose one meaningful action and stay with it a little longer.`,
  ),
  growthThnMakeArticle(
    'small-habits-big-change',
    '🌱',
    "Small Habits Create Big Change",
    'HABITS',
    "Big change often feels exciting in the beginning, but small habits are what make change last.",
    `Big change often feels exciting in the beginning, but small habits are what make change last. A small habit is easy to underestimate because it does not look dramatic. Yet its strength comes from repetition.

A habit does not need to be large to be valuable. Drinking water, planning tomorrow, stretching for five minutes, reading one page, or writing one honest thought can all become powerful when repeated over time.

Small habits work because they reduce resistance. When an action feels simple, you are more likely to begin. When you begin often, the action becomes familiar. When it becomes familiar, it starts to become part of your routine.

The secret is not to make the habit impressive. The secret is to make it repeatable. A habit that you can complete on an ordinary day is more useful than a perfect routine that only works when life is calm.

Track your habits because visible progress creates awareness. A checkmark is not just a symbol. It is proof that you showed up today. Over weeks and months, those small marks become a story of growth.`,
  ),
  growthThnMakeArticle(
    'personal-growth-orbit',
    '🪐',
    "Your Personal Growth Orbit",
    'MINDSET',
    "Personal growth is not a straight line. It is more like an orbit.",
    `Personal growth is not a straight line. It is more like an orbit. Some days you move quickly. Some days you slow down. Sometimes you feel close to your goals, and sometimes you feel far away. What matters is that you keep returning to the path.

Many people give up because they expect progress to feel constant. They believe that if one day is difficult, something is wrong. But difficult days are part of the process. They test whether your growth depends only on motivation or whether it can survive real life.

Your orbit is built from the actions you repeat. Habits, tasks, reflection, learning, and focused challenges keep you connected to the person you are becoming.

When you lose rhythm, do not judge yourself too harshly. Ask a better question: “What small action can bring me back?” One completed habit can restart momentum. One timed task can clear your mind. One article can remind you why you began.

Growth is not about never drifting. It is about learning how to return with patience, clarity, and purpose.`,
  ),
  growthThnMakeArticle(
    'tracking-progress-matters',
    '📊',
    "Why Tracking Progress Matters",
    'PROGRESS',
    "Progress becomes easier to understand when you can see it.",
    `Progress becomes easier to understand when you can see it. Without tracking, your growth may feel invisible, especially on days when change is slow.

A habit calendar, task history, focus timer, article count, and logic records are not just numbers. They are feedback. They show patterns, strengths, and places where your routine needs support.

Tracking helps you notice what actually happens, not just what you feel. You may feel like you are not improving, but your completed habits may show steady effort. You may think you lack discipline, but your streaks may prove that you are already building it.

Statistics should not feel like judgment. They are a mirror. They help you understand your rhythm and make better choices. If a habit is often missed, maybe it needs a smaller version. If your focus time is growing, maybe your attention is getting stronger.

Visible progress creates motivation because it turns effort into evidence. When you see what you have already completed, it becomes easier to believe that the next step is possible.`,
  ),
  growthThnMakeArticle(
    'train-logic-patience',
    '🧩',
    "Train Your Logic, Train Your Patience",
    'LOGIC',
    "Logic games train patience, attention, planning, and the ability to think before acting.",
    `Logic games are not only about solving puzzles. They train patience, attention, planning, and the ability to think before acting.

A disc puzzle may look simple at first. Move the pieces, follow the rules, reach the goal. But as the levels become harder, the game begins to ask more from your mind. You must plan ahead, avoid rushed moves, and learn from mistakes.

This kind of challenge is useful because it mirrors personal growth. You cannot always move directly to the final result. Sometimes you must make a temporary move, clear space, and trust the process. Progress may require patience before the solution becomes visible.

Trying to beat your personal record adds another layer. You are not competing with others. You are observing your own improvement. A better time, fewer moves, or a completed level becomes proof that your thinking is becoming sharper.

Train your logic slowly. Accept mistakes as part of learning. Each attempt improves your ability to focus, plan, and stay calm under pressure.`,
  ),
  growthThnMakeArticle(
    'restarting-after-missed-day',
    '🌙',
    "Restarting After a Missed Day",
    'CONSISTENCY',
    "Missing a day does not mean you failed. It means you are human.",
    `Missing a day does not mean you failed. It means you are human. The real danger is not the missed day itself, but the story you tell yourself afterward.

Many people turn one missed action into a reason to stop completely. They think, “I broke the streak, so it does not matter anymore.” But growth is not destroyed by one pause. It is weakened only when you refuse to return.

The best response to a missed day is simple: restart with a smaller action. Do not try to punish yourself with extra effort. Do not create a heavy plan to make up for everything. Just complete the next useful step.

A strong routine includes recovery. Life changes, energy shifts, and unexpected problems appear. Your system should help you return, not make you feel guilty.

When you miss a day, open your calendar, choose one habit, and complete it. That single action tells your mind: “The path is still active.” Consistency is not perfection. It is the skill of returning.`,
  ),
  growthThnMakeArticle(
    'clear-goals-easier-action',
    '🎯',
    "Clear Goals Make Action Easier",
    'GOALS',
    "A goal becomes more useful when it is clear.",
    `A goal becomes more useful when it is clear. Vague goals create confusion because they do not tell you what to do next. Clear goals give your energy a direction.

Instead of saying, “I want to be better,” ask what that means in daily life. Do you want to read more? Move more? focus better? finish tasks earlier? build discipline? reduce distractions? Each answer can become a specific habit or challenge.

A clear goal should connect to a visible action. “Improve focus” can become “complete one 15-minute focus timer.” “Become more organized” can become “clean one surface every evening.” “Grow mentally” can become “read one article and write one idea.”

When a goal feels too large, break it into the smallest next step. Your mind needs something it can begin, not just something it can admire from a distance.

Clear goals do not remove effort, but they reduce confusion. When you know what matters and what action supports it, progress becomes easier to start and easier to track.`,
  ),
  growthThnMakeArticle(
    'motivation-follows-movement',
    '⚡',
    "Motivation Follows Movement",
    'MOTIVATION',
    "Often, motivation is not the beginning. It is the result of beginning.",
    `Many people wait for motivation before they act. They imagine motivation as the spark that starts everything. But often, motivation is not the beginning. It is the result of beginning.

When you take one small action, your brain receives a signal that progress is possible. That signal can create energy. You start to feel more capable because you are no longer stuck in thought. You are moving.

This is why tiny steps matter. A five-minute timer, one cleaned corner, one completed habit, or one simple plan can change the emotional direction of your day. You may not feel fully motivated at first, but action creates momentum.

Waiting for the perfect feeling can keep you trapped. Starting with a small action gives you control. You do not need to feel powerful to begin. You only need to do something small enough to complete.

The next time motivation feels low, reduce the task instead of abandoning it. Start smaller. Move first. Let motivation catch up.`,
  ),
  growthThnMakeArticle(
    'discipline-without-pressure',
    '🧭',
    "Discipline Without Pressure",
    'DISCIPLINE',
    "Discipline should not feel like punishment.",
    `Discipline should not feel like punishment. When discipline becomes harsh, it may work for a short time, but it often creates exhaustion, guilt, and resistance.

Healthy discipline is different. It is a supportive structure that helps you do what matters even when your mood changes. It is not about forcing yourself to become perfect. It is about making good choices easier to repeat.

A disciplined life can still include rest, flexibility, and kindness. You can have goals without attacking yourself. You can expect effort without demanding constant intensity. You can grow without turning every missed action into a personal failure.

The best discipline is practical. Choose clear habits. Set repeat days. Use timers. Track progress. Keep tasks small enough to complete. These tools reduce emotional pressure because they give you a simple next step.

Discipline becomes sustainable when it respects real life. Build a system that guides you, not one that breaks you. The goal is not to control every moment. The goal is to return to useful action with calm consistency.`,
  ),
  growthThnMakeArticle(
    'confidence-kept-promises',
    '🔐',
    "Confidence Comes From Kept Promises",
    'CONFIDENCE',
    "Confidence is built through evidence — every time you keep a promise to yourself.",
    `Confidence is not only about positive thinking. It is built through evidence. Every time you keep a promise to yourself, your confidence becomes stronger.

The promise does not need to be huge. In fact, small promises are often better because they are easier to repeat. “I will stretch for five minutes.” “I will read one page.” “I will complete one focus timer.” “I will mark today’s habit.” These actions may seem simple, but they build trust.

When you repeatedly do what you said you would do, your mind starts to believe you. You begin to see yourself as someone who can follow through. That identity is powerful.

Broken promises can weaken confidence, especially when they happen often. This is why realistic planning matters. Do not create goals that sound impressive but are impossible to maintain. Choose promises that fit your real energy and schedule.

Confidence grows when your actions support your words. Keep one small promise today. Then keep another tomorrow. Over time, self-trust becomes a quiet strength.`,
  ),
  growthThnMakeArticle(
    'growth-can-be-gentle',
    '🌿',
    "Growth Can Be Gentle",
    'MINDSET',
    "Personal growth does not have to be aggressive to be effective.",
    `Personal growth does not have to be aggressive to be effective. You can improve your life without constantly criticizing yourself, rushing yourself, or comparing yourself to others.

Gentle growth is not laziness. It is sustainable effort. It means choosing actions that challenge you without destroying your energy. It means understanding that progress needs patience as much as ambition.

A gentle approach helps you stay connected to your goals longer. When growth feels like punishment, you may avoid it. When growth feels supportive, you are more likely to return.

This does not mean every action will feel easy. Some tasks will still require discipline. Some habits will still test your patience. But you can meet those challenges with respect instead of pressure.

Be firm with your direction and kind with your process. Small steps, repeated with care, can create deep change. You do not need to become someone else overnight. You can build yourself steadily.`,
  ),
  growthThnMakeArticle(
    'finish-something-small-today',
    '🏁',
    "Finish Something Small Today",
    'PRODUCTIVITY',
    "Finishing something small can change the energy of your day.",
    `Finishing something small can change the energy of your day. It creates a sense of completion, and completion creates momentum.

When your task list feels too large, your mind may freeze. You may not know where to start, so you avoid everything. The solution is not always to work harder. Sometimes the solution is to choose one small thing and finish it fully.

A small finished task sends a clear message: “I can complete actions.” That message matters. It can help you move from stress into motion.

Choose something simple. Reply to one message. Organize one folder. Clean one surface. Plan one meal. Read one page. Complete one timer. The size of the task matters less than the fact that you finish it.

Do not underestimate small completion. It creates order, confidence, and focus. One finished action can become the first step toward a stronger day.`,
  ),
  growthThnMakeArticle(
    'strength-of-repetition',
    '🔄',
    "The Strength of Repetition",
    'HABITS',
    "Repetition is the hidden structure behind most meaningful progress.",
    `Repetition may look boring from the outside, but it is the hidden structure behind most meaningful progress.

A habit becomes powerful not because it is exciting every time, but because it is repeated often enough to shape your behavior. Repetition teaches your brain what matters. It reduces decision fatigue and turns useful actions into familiar routines.

At first, repetition may feel slow. You may wonder if your small effort is doing anything. But growth often works quietly before it becomes visible. The repeated action is preparing your mind, body, and environment for better results.

The key is to connect repetition with purpose. You are not just checking off a habit. You are becoming someone who takes care of your goals. You are building a pattern that supports your future.

Repeat the action. Track it. Notice it. Respect it. What feels small today may become the foundation of lasting change.`,
  ),
  growthThnMakeArticle(
    'time-blocks-focus',
    '🕰',
    "Time Blocks Create Focus",
    'FOCUS',
    "A time block gives your attention a clear container.",
    `A time block gives your attention a clear container. Instead of asking yourself to focus for an undefined amount of time, you choose a specific period and protect it.

This works because the mind often resists tasks that feel endless. A 10-minute timer feels possible. A 15-minute focus session feels clear. A short block reduces pressure and makes starting easier.

During a time block, the goal is simple: stay with one task until the timer ends. You do not need to finish everything. You only need to give honest attention to the action in front of you.

Time blocks also help you understand your energy. Some tasks need longer focus. Others only need a short sprint. Over time, you learn what kind of timer works best for different goals.

Use time as a support tool, not a source of stress. A timer is not there to rush you. It is there to create a focused space where progress can happen.`,
  ),
  growthThnMakeArticle(
    'better-one-percent',
    '🌟',
    "Become Better by One Percent",
    'GROWTH',
    "Improve by one percent through small daily choices.",
    `Trying to change everything at once can feel inspiring for a day, but it is difficult to maintain. A better approach is to improve by one percent through small daily choices.

One percent growth does not demand perfection. It asks for a slightly better action than yesterday. A little more focus. A little more patience. A slightly cleaner space. One completed habit. One useful decision.

These small improvements compound. They may not feel dramatic immediately, but they create direction. A person who improves a little each day will eventually become very different from the person who only waits for huge motivation.

The one percent mindset also reduces fear. You do not need to solve your whole life today. You only need to make one part of today better.

Ask yourself: “What is one small improvement I can make right now?” Then do it. Growth becomes manageable when it is measured in honest, repeatable steps.`,
  ),
  growthThnMakeArticle(
    'reflection-smarter-progress',
    '🧘',
    "Reflection Makes Progress Smarter",
    'REFLECTION',
    "Reflection helps you understand what your actions are teaching you.",
    `Action is important, but reflection helps you understand what your actions are teaching you. Without reflection, you may repeat patterns without noticing whether they help.

A short reflection can reveal a lot. What gave you energy today? What drained you? Which habit felt easy? Which task did you avoid? What made focus difficult? What helped you return?

Reflection is not about judging yourself. It is about gathering information. When you understand your rhythm, you can build a better system around it.

Even one honest sentence can be useful. “I felt distracted because I started too late.” “I completed my habit because it was simple.” “I avoided the task because it felt too big.” These observations help you adjust.

Progress becomes smarter when you pause long enough to learn from it. Reflect, adapt, and continue. Growth is not only about doing more. It is also about understanding yourself better.`,
  ),
  growthThnMakeArticle(
    'future-built-today',
    '🌌',
    "Your Future Is Built Today",
    'MOTIVATION',
    "The future is shaped by what you repeat today.",
    `The future often feels far away, but it is shaped by what you repeat today. Every habit, task, choice, and focused minute becomes part of the person you are building.

You do not need to see the full transformation immediately. Most meaningful growth begins quietly. It happens when you choose water, movement, reading, planning, focus, or patience one more time.

Today may feel ordinary, but ordinary days are where identity is formed. The actions you repeat on normal days matter more than rare moments of inspiration.

Think of your future self as someone waiting for proof. Every completed habit is proof. Every finished timer is proof. Every article read, puzzle solved, and promise kept becomes evidence that you are moving.

Build today with intention. Make one choice that your future self will thank you for. Then repeat it tomorrow.`,
  ),
  growthThnMakeArticle(
    'build-day-before-builds-you',
    '🧱',
    "Build Your Day Before It Builds You",
    'PLANNING',
    "A strong day is often shaped by small decisions you make before pressure begins.",
    `A strong day does not always happen by accident. It is often shaped by the small decisions you make before the pressure begins. When you wake up without any direction, the day can quickly become filled with distractions, unfinished tasks, and other people’s priorities. But when you choose a few clear actions in advance, you give yourself a better chance to move with purpose.

Planning does not mean controlling every hour. A good plan should not feel like a cage. It should feel like a map. It tells you where to begin, what matters most, and what can wait. Even a simple plan with three priorities can make your day feel lighter because your mind no longer has to carry everything at once.

The most useful plan is realistic. Many people create lists that are too long, then feel disappointed when they cannot complete them. A better approach is to choose one important task, one small habit, and one action that will make tomorrow easier. This creates structure without overwhelming you.

Planning also protects your energy. When you know what matters, it becomes easier to say no to unnecessary distractions. You can return to your priorities faster because you have already decided what deserves your attention.

Before your day becomes busy, take a few minutes to shape it. Write down what matters. Choose the first step. Keep the plan simple enough to follow. A planned day does not need to be perfect. It only needs to give your growth a clear direction.`,
  ),
  growthThnMakeArticle(
    'honest-self-check',
    '🪞',
    "Honest Self-Check",
    'REFLECTION',
    "Personal growth becomes stronger when you look at yourself clearly.",
    `Personal growth becomes stronger when you are willing to look at yourself honestly. Not harshly, not dramatically, but clearly. An honest self-check helps you understand what is really happening inside your habits, emotions, choices, and routines.

Many people avoid reflection because they think it will make them feel guilty. But reflection is not meant to be punishment. It is a tool for awareness. When you ask yourself honest questions, you collect useful information. You notice what helps you move forward and what quietly pulls you away from your goals.

A simple self-check can begin with three questions: What gave me energy today? What drained me? What is one small thing I can improve tomorrow? These questions are not complicated, but they can reveal patterns. Maybe you always feel better after movement. Maybe you lose focus when your space is messy. Maybe your goals feel difficult because they are too large and need to be smaller.

Honesty is important because you cannot improve what you refuse to notice. If a habit is not working, that does not mean you failed. It means the habit needs a better design. If you keep avoiding a task, maybe the first step is unclear. If you feel tired often, maybe your routine needs more recovery.

Growth is not about pretending everything is fine. It is about seeing clearly and adjusting with patience. Take a few minutes to check in with yourself. Write one true sentence. Let it guide one better action.`,
  ),
  growthThnMakeArticle(
    'protect-quiet-focus',
    '🕯',
    "Protect Your Quiet Focus",
    'FOCUS',
    "Quiet focus needs protection from notifications and distraction.",
    `Focus is easier to lose than to build. It can disappear through one notification, one unnecessary tab, one quick scroll, or one thought that pulls you away from the task in front of you. This is why quiet focus needs protection.

Quiet focus does not always mean silence. It means giving your attention one clear place to stay. Your mind works better when it is not forced to jump between too many signals. Even a short period of protected focus can help you think more clearly, work faster, and feel more in control.

Start by creating a small focus zone. Choose one task. Set a timer. Remove one distraction. Put your phone away or turn it face down. Close what you do not need. Prepare what you do need. These small steps tell your brain that this moment has a purpose.

During the timer, your mind may still wander. That is normal. The practice is not to never lose focus. The practice is to return. Each return is a small act of discipline. Each return strengthens your ability to stay with something important.

Quiet focus is not only useful for work. It helps with reading, planning, learning, cleaning, reflecting, and solving logic challenges. It gives your mind space to complete one action without constant interruption.

Protecting focus is a form of self-respect. It says, “My attention matters.” When you protect even ten minutes of clear attention, you create a place where progress can happen.`,
  ),
  growthThnMakeArticle(
    'stop-starting-over',
    '🚦',
    "Stop Starting Over",
    'CONSISTENCY',
    "If you always start over, you never give your progress enough time to grow.",
    `Starting over can feel exciting because it creates the illusion of a fresh identity. A new week, a new plan, a new routine, a new promise. But if you always start over, you never give your progress enough time to grow.

Many people abandon their habits after one difficult day. They miss a workout, skip reading, forget a task, or break a streak, then decide the whole plan is ruined. But growth does not require a perfect streak. It requires returning before the pause becomes permanent.

The problem is not that you sometimes miss a day. The problem is believing that a missed day means you must restart everything from zero. You do not. You can continue from where you are. One missed step is not the end of the path.

Consistency becomes easier when you build a recovery rule. For example: “If I miss a habit, I complete a tiny version the next day.” This keeps the routine alive without creating guilt. If you usually read ten pages, read one. If you usually clean for twenty minutes, clean for three. If you usually focus for thirty minutes, start with five.

A tiny return is better than a dramatic restart. It protects your identity as someone who keeps going.

Do not keep waiting for the perfect Monday, perfect mood, or perfect version of yourself. Continue today. Your path does not need to be rebuilt from nothing. It only needs your next honest action.`,
  ),
  growthThnMakeArticle(
    'goals-easier-to-begin',
    '🧠',
    "Make Your Goals Easier to Begin",
    'GOALS',
    "Sometimes the goal is too unclear, too large, or too far from the first action.",
    `A goal can be meaningful and still be difficult to start. Sometimes the problem is not your motivation. Sometimes the goal is simply too unclear, too large, or too far away from the first action.

For example, “be more disciplined” sounds good, but it does not tell you what to do at 7:00 PM when you are tired. “Get healthier” is important, but it does not automatically become a behavior. “Improve focus” is valuable, but it needs a specific action to become real.

To make a goal easier to begin, translate it into a small visible step. “Be more disciplined” can become “complete one 10-minute timer.” “Get healthier” can become “drink water before coffee.” “Improve focus” can become “put my phone away for 15 minutes.” A goal becomes useful when it gives you a clear next move.

The first step should be small enough that your mind does not fight it. Many people fail because they design goals for their most energetic self, not their ordinary self. A good goal should work even on a normal day with normal energy.

You can also connect your goal to a repeat day. When an action has a place in your week, it becomes easier to remember and easier to track. The calendar turns intention into structure.

Do not judge a goal by how impressive it sounds. Judge it by how easy it is to begin and repeat. The best goal is not the one that looks perfect. It is the one that creates action.`,
  ),
  growthThnMakeArticle(
    'reduce-resistance',
    '🌊',
    "Reduce Resistance",
    'MINDSET',
    "Resistance is normal, but it becomes dangerous when it controls your decisions.",
    `Resistance is the invisible force that appears before action. It can sound like, “I will do it later,” “I do not have enough energy,” “This will take too long,” or “I need to be in the right mood.” Resistance is normal, but it becomes dangerous when it controls your decisions.

The solution is not always to push harder. Often, the better solution is to make the action smaller. If a task feels too heavy, reduce it until it becomes possible to start. Instead of cleaning the whole room, clear one surface. Instead of writing a full plan, write one sentence. Instead of completing a large project, open the file and work for five minutes.

Starting reduces resistance because it breaks the emotional wall around the task. Before you begin, the task exists mostly in your imagination, where it can feel larger than it really is. Once you begin, you meet the task in reality. It becomes specific. It becomes manageable.

Resistance also becomes weaker when your environment supports action. Put useful items where you can see them. Remove distractions. Prepare your space before you need it. Make the good choice easier and the distracting choice less automatic.

Do not wait for resistance to disappear. It may not. Instead, lower the barrier. Begin with the smallest useful action. Once motion begins, the mind often becomes more willing to continue.`,
  ),
  growthThnMakeArticle(
    'effort-into-identity',
    '🔥',
    "Turn Effort Into Identity",
    'GROWTH',
    "Every repeated action teaches you something about who you are.",
    `Every repeated action teaches you something about who you are. When you complete a habit, finish a task, read an article, or solve a level, you are not only collecting progress. You are building identity.

Identity is powerful because people usually act in ways that match how they see themselves. If you see yourself as someone who always gives up, starting becomes harder. If you see yourself as someone who returns after difficulty, your next step becomes easier. Your actions create evidence for the identity you believe.

This is why small wins matter. One completed habit may not change your life immediately, but it gives your mind proof. It says, “I am someone who can follow through.” A timer completed with focus says, “I am someone who can protect my attention.” A solved puzzle says, “I am someone who can think patiently.”

Over time, these proofs become stronger. You start to trust yourself more because you have seen yourself act. Confidence becomes less dependent on mood and more connected to evidence.

Do not underestimate the meaning of ordinary effort. You are not just checking boxes. You are practicing the person you want to become.

Choose one action today that supports your desired identity. Make it small. Complete it honestly. Let it become proof.`,
  ),
  growthThnMakeArticle(
    'direction-before-speed',
    '🧭',
    "Direction Before Speed",
    'PRODUCTIVITY',
    "Speed is not useful when you are moving in the wrong direction.",
    `Moving fast can feel productive, but speed is not useful when you are moving in the wrong direction. Before trying to do more, it is worth asking whether your effort is pointed at what actually matters.

Many busy days are filled with motion but not progress. You answer messages, move between tasks, check notifications, open apps, close apps, and still end the day feeling like the important work was untouched. This happens when urgency replaces direction.

Direction begins with clarity. Ask yourself: What is the one action that would make today feel meaningful? What task supports my goal? What habit protects my future self? These questions help separate useful effort from noise.

Once direction is clear, speed becomes safer. A focused 15-minute sprint on the right task can be more valuable than hours spent reacting to everything around you. Productivity is not about filling time. It is about using attention with intention.

This also applies to personal growth. You do not need to add endless habits or challenges. You need the right small actions repeated with care. One clear habit can be stronger than ten vague goals.

Before rushing, pause. Choose direction. Then move. A slower step on the right path is better than fast movement that leads nowhere.`,
  ),
  growthThnMakeArticle(
    'evening-reset',
    '🌙',
    "Evening Reset for a Better Tomorrow",
    'ROUTINE',
    "A better morning often begins the night before.",
    `A better morning often begins the night before. The evening is a powerful time to reduce tomorrow’s friction, calm your mind, and create a smoother start.

You do not need a complicated night routine. In fact, the best evening reset is usually simple. Prepare one item for tomorrow. Clear one small area. Write one priority. Put your phone away a little earlier. Choose clothes. Fill a water bottle. These actions may seem small, but they remove decisions from the morning.

Evening resets work because mornings are often sensitive. If you wake up to clutter, confusion, or too many choices, your energy can disappear quickly. But when something is already prepared, you begin with less resistance.

This routine also helps your mind feel complete. Many people carry unfinished thoughts into sleep. A short plan or reflection can help close the day. You can write what you completed, what needs attention tomorrow, and what you are ready to release.

Do not turn the evening reset into another stressful task. Keep it gentle. The goal is not perfection. The goal is to make tomorrow easier for yourself.

Before the day ends, complete one small action that supports the next morning. Your future self will meet that preparation as kindness.`,
  ),
  growthThnMakeArticle(
    'compete-previous-self',
    '🏆',
    "Compete With Your Previous Self",
    'CONFIDENCE',
    "Personal growth becomes healthier when you compete with your previous self.",
    `Comparison can steal the joy from progress. When you measure yourself only against other people, your growth may always feel too slow, too small, or not impressive enough. But personal growth becomes healthier when you compete with your previous self.

Your previous self is the most useful comparison because it shows your real direction. Did you complete more habits than last week? Did you focus for longer than before? Did you return faster after a missed day? Did you solve a level with fewer moves? These signs matter because they show improvement inside your own life.

Competing with yourself creates motivation without unnecessary pressure. You are not trying to prove that you are better than everyone else. You are trying to understand what you can improve next. This turns progress into a game of awareness.

Personal records are powerful because they make growth visible. A best time, a habit streak, a weekly completion rate, or a focus total gives you something concrete to beat. It transforms effort into feedback.

Some days you will beat your record. Some days you will simply show up. Both are valuable. A record shows improvement. Showing up protects the path.

Look at who you were yesterday, last week, or last month. Then choose one small way to move forward. Your strongest competition is not another person. It is the version of you that stopped too soon.`,
  ),
];
