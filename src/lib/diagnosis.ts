export type AxisKey = 'inflammation' | 'gut' | 'neural' | 'metabolic' | 'hormonal' | 'social';

export interface Question {
  id: string;
  axis: AxisKey;
  text: string;
  options: { label: string; score: number }[];
}

export interface AxisConfig {
  key: AxisKey;
  label: string;
  ja: string;
  icon: string;
  color: string;
  bg: string;
  description: string;
  highScoreInsight: string;
  lowScoreInsight: string;
  japaneseProtocol: string[];
}

export const AXES: AxisConfig[] = [
  {
    key: 'inflammation',
    label: 'Inflammation',
    ja: '炎症軸',
    icon: '🔥',
    color: '#e07b54',
    bg: '#fff4f0',
    description: 'Chronic low-grade inflammation — the silent engine of aging',
    highScoreInsight: 'Your inflammatory markers appear well-managed. Your dietary and lifestyle choices seem to be supporting a low-inflammation state.',
    lowScoreInsight: 'Signs point to elevated chronic inflammation. This is a primary driver of accelerated aging and metabolic dysfunction.',
    japaneseProtocol: [
      'Adopt washoku principles: fish, seaweed, miso, green tea daily',
      'Include fermented foods (natto, miso) to support gut-immune axis',
      'Eliminate refined seed oils; replace with sesame and olive oil',
      'Practice hara hachi bu (eat to 80% fullness) to reduce mTOR activation',
    ],
  },
  {
    key: 'gut',
    label: 'Gut Microbiome',
    ja: '腸内環境軸',
    icon: '🦠',
    color: '#7a9e7e',
    bg: '#f0f6f1',
    description: 'Microbiome diversity — the hidden organ of longevity',
    highScoreInsight: 'Your gut microbiome appears diverse and well-supported. Japan\'s fermentation culture is your ancestral edge.',
    lowScoreInsight: 'Low gut diversity is associated with accelerated aging, systemic inflammation, and impaired immunity. Priority area for you.',
    japaneseProtocol: [
      'Eat natto 3–5x per week (Nattokinase + Vitamin K2 + Bifidobacterium)',
      'Introduce daily miso soup with varied ingredients (wakame, tofu, mushroom)',
      'Add tsukemono (Japanese pickles) as a daily probiotic source',
      'Increase dietary fiber via hijiki, gobō, and konjac',
    ],
  },
  {
    key: 'neural',
    label: 'Neural / Stress',
    ja: '神経軸',
    icon: '🧠',
    color: '#7b68ee',
    bg: '#f4f2ff',
    description: 'HPA axis and stress — the telomere clock regulator',
    highScoreInsight: 'Your nervous system appears well-regulated. Your stress-recovery balance supports healthy cortisol rhythms.',
    lowScoreInsight: 'Chronic HPA axis activation is measurably shortening your telomeres. Neural regulation is your highest leverage point.',
    japaneseProtocol: [
      'Begin shinrin-yoku (forest bathing) practice: 2 hours/week minimum',
      'Start 10-minute zazen (seated meditation) each morning',
      'Incorporate Japanese concept of ma (intentional pause/space) into daily life',
      'Cold/hot bath cycling (onsen protocol) to reset autonomic balance',
    ],
  },
  {
    key: 'metabolic',
    label: 'Metabolic',
    ja: '代謝軸',
    icon: '⚡',
    color: '#e8a838',
    bg: '#fffbf0',
    description: 'Mitochondrial function — your cellular energy currency',
    highScoreInsight: 'Your metabolic flexibility appears strong. Mitochondrial efficiency is a core driver of your longevity potential.',
    lowScoreInsight: 'Metabolic dysregulation is impairing mitochondrial biogenesis. This reduces cellular energy and accelerates senescence.',
    japaneseProtocol: [
      'Use onsen (or hot bath) 3x/week to activate HSP70 and mitochondrial biogenesis',
      'Practice ashiyu (foot bath) variations for accessible thermal stress',
      'Incorporate taiso (Japanese calisthenics) morning movement ritual',
      'Apply hara hachi bu to maintain insulin sensitivity and AMPK activation',
    ],
  },
  {
    key: 'hormonal',
    label: 'Hormonal / Sleep',
    ja: 'ホルモン軸',
    icon: '🌙',
    color: '#3d5a80',
    bg: '#f0f4f8',
    description: 'Circadian rhythm and sleep — the master hormonal synchronizer',
    highScoreInsight: 'Your circadian alignment appears strong. Healthy sleep architecture is actively protecting your hormonal longevity.',
    lowScoreInsight: 'Circadian disruption is suppressing melatonin, growth hormone, and cortisol cycles — all critical aging regulators.',
    japaneseProtocol: [
      'Align with Japanese concept of genki (vital energy) by waking at sunrise',
      'Use warm bath 90 minutes before sleep to trigger core body temperature drop',
      'Replace evening screen time with engawa-style (veranda sitting) wind-down',
      'Consume glycine-rich collagen (from dashi broth) before sleep to improve sleep depth',
    ],
  },
  {
    key: 'social',
    label: 'Social / Ikigai',
    ja: '社会軸',
    icon: '🤝',
    color: '#c9a96e',
    bg: '#faf6ef',
    description: 'Ikigai and social bonds — the measurable longevity signal',
    highScoreInsight: 'Strong ikigai and social connection are among the most powerful predictors of longevity. Your Okinawa score is high.',
    lowScoreInsight: 'Social isolation and low purpose are as harmful as smoking 15 cigarettes per day. This axis deserves immediate attention.',
    japaneseProtocol: [
      'Define and document your ikigai: the intersection of passion, skill, need, and reward',
      'Join or create a moai (Okinawan social support circle) in your community',
      'Practice omotenashi (selfless hospitality) as an oxytocin-activating ritual',
      'Engage in volunteer or community-oriented work weekly (purpose activation)',
    ],
  },
];

export const QUESTIONS: Question[] = [
  // Inflammation axis (4 questions)
  {
    id: 'inf-1',
    axis: 'inflammation',
    text: 'How often do you experience bloating, joint stiffness, or unexplained fatigue?',
    options: [
      { label: 'Rarely or never', score: 4 },
      { label: 'A few times a month', score: 3 },
      { label: 'Several times a week', score: 2 },
      { label: 'Daily', score: 1 },
    ],
  },
  {
    id: 'inf-2',
    axis: 'inflammation',
    text: 'How would you describe your typical diet?',
    options: [
      { label: 'Mostly whole foods, fish, vegetables, fermented foods', score: 4 },
      { label: 'Balanced, with some processed foods', score: 3 },
      { label: 'Often convenience or processed foods', score: 2 },
      { label: 'Mostly ultra-processed, fast food, or high sugar', score: 1 },
    ],
  },
  {
    id: 'inf-3',
    axis: 'inflammation',
    text: 'How frequently do you consume fermented foods (miso, natto, yogurt, kimchi)?',
    options: [
      { label: 'Daily', score: 4 },
      { label: '3–4 times per week', score: 3 },
      { label: 'Occasionally (once a week)', score: 2 },
      { label: 'Rarely or never', score: 1 },
    ],
  },
  {
    id: 'inf-4',
    axis: 'inflammation',
    text: 'How much vegetable oil, fried food, or refined carbohydrates do you consume?',
    options: [
      { label: 'Very little — I prioritize quality fats and whole grains', score: 4 },
      { label: 'Moderate amounts', score: 3 },
      { label: 'Quite a bit most days', score: 2 },
      { label: 'Very high — it\'s a staple of my diet', score: 1 },
    ],
  },
  // Gut axis (4 questions)
  {
    id: 'gut-1',
    axis: 'gut',
    text: 'How regular and comfortable is your digestion?',
    options: [
      { label: 'Very regular, no discomfort', score: 4 },
      { label: 'Mostly fine with occasional issues', score: 3 },
      { label: 'Frequent gas, bloating, or irregular bowels', score: 2 },
      { label: 'Chronic digestive issues (IBS, constipation, etc.)', score: 1 },
    ],
  },
  {
    id: 'gut-2',
    axis: 'gut',
    text: 'How diverse is your diet across the week (variety of plants, colors, sources)?',
    options: [
      { label: '30+ different plant foods regularly', score: 4 },
      { label: '15–30 different plant foods', score: 3 },
      { label: '5–15 plant foods, not much variety', score: 2 },
      { label: 'Very limited variety, mostly same foods', score: 1 },
    ],
  },
  {
    id: 'gut-3',
    axis: 'gut',
    text: 'Have you taken antibiotics in the past 2 years?',
    options: [
      { label: 'No, not at all', score: 4 },
      { label: 'Once, and I actively restored my microbiome after', score: 3 },
      { label: 'Once or twice without restoration protocol', score: 2 },
      { label: 'Multiple courses in recent years', score: 1 },
    ],
  },
  {
    id: 'gut-4',
    axis: 'gut',
    text: 'How much dietary fiber do you consume daily (vegetables, legumes, whole grains, seaweed)?',
    options: [
      { label: 'High — 30g+ daily from diverse sources', score: 4 },
      { label: 'Moderate — 20–30g', score: 3 },
      { label: 'Low — less than 20g', score: 2 },
      { label: 'Very low — highly processed diet', score: 1 },
    ],
  },
  // Neural axis (4 questions)
  {
    id: 'neu-1',
    axis: 'neural',
    text: 'How would you rate your chronic stress level?',
    options: [
      { label: 'Low — I have effective coping strategies', score: 4 },
      { label: 'Moderate — manageable most of the time', score: 3 },
      { label: 'High — frequently stressed and overwhelmed', score: 2 },
      { label: 'Very high — constant or near-constant stress', score: 1 },
    ],
  },
  {
    id: 'neu-2',
    axis: 'neural',
    text: 'Do you have a regular mindfulness, meditation, or relaxation practice?',
    options: [
      { label: 'Yes — daily practice (meditation, breathing, etc.)', score: 4 },
      { label: 'Sometimes — a few times per week', score: 3 },
      { label: 'Rarely — when things get bad', score: 2 },
      { label: 'No regular practice', score: 1 },
    ],
  },
  {
    id: 'neu-3',
    axis: 'neural',
    text: 'How much time do you spend in nature or outdoor environments weekly?',
    options: [
      { label: '5+ hours in natural settings', score: 4 },
      { label: '2–5 hours outdoors', score: 3 },
      { label: 'Less than 2 hours, mostly urban', score: 2 },
      { label: 'Rarely outdoors, primarily indoor/screen environment', score: 1 },
    ],
  },
  {
    id: 'neu-4',
    axis: 'neural',
    text: 'How often do you experience brain fog, difficulty concentrating, or emotional reactivity?',
    options: [
      { label: 'Rarely — my mental clarity is generally good', score: 4 },
      { label: 'Occasionally', score: 3 },
      { label: 'Frequently', score: 2 },
      { label: 'Almost daily', score: 1 },
    ],
  },
  // Metabolic axis (4 questions)
  {
    id: 'met-1',
    axis: 'metabolic',
    text: 'How active are you physically on a daily basis?',
    options: [
      { label: 'Very active — structured exercise + regular movement throughout day', score: 4 },
      { label: 'Moderately active — regular workouts, some daily movement', score: 3 },
      { label: 'Lightly active — occasional exercise, mostly sedentary', score: 2 },
      { label: 'Sedentary — minimal exercise, desk-based lifestyle', score: 1 },
    ],
  },
  {
    id: 'met-2',
    axis: 'metabolic',
    text: 'How stable is your energy throughout the day?',
    options: [
      { label: 'Consistently stable — no afternoon crashes', score: 4 },
      { label: 'Generally stable with minor fluctuations', score: 3 },
      { label: 'Frequent energy dips, rely on caffeine or sugar', score: 2 },
      { label: 'Significant energy crashes daily', score: 1 },
    ],
  },
  {
    id: 'met-3',
    axis: 'metabolic',
    text: 'Do you practice any form of thermal stress (sauna, hot/cold bath, onsen)?',
    options: [
      { label: 'Yes — regular sauna, onsen, or contrast therapy', score: 4 },
      { label: 'Occasionally — a few times per month', score: 3 },
      { label: 'Rarely, only when travelling', score: 2 },
      { label: 'Never', score: 1 },
    ],
  },
  {
    id: 'met-4',
    axis: 'metabolic',
    text: 'How would you describe your relationship with food timing and eating windows?',
    options: [
      { label: 'Mindful — I practice intermittent fasting or time-restricted eating', score: 4 },
      { label: 'Fairly structured meal times, no late-night eating', score: 3 },
      { label: 'Irregular meal timing, occasional late eating', score: 2 },
      { label: 'No structure — eating at all hours, frequent late-night meals', score: 1 },
    ],
  },
  // Hormonal axis (4 questions)
  {
    id: 'hor-1',
    axis: 'hormonal',
    text: 'How many hours of quality sleep do you typically get?',
    options: [
      { label: '7–9 hours, feel rested and alert', score: 4 },
      { label: '6–7 hours, mostly okay', score: 3 },
      { label: '5–6 hours, often tired', score: 2 },
      { label: 'Less than 5, or highly disrupted sleep', score: 1 },
    ],
  },
  {
    id: 'hor-2',
    axis: 'hormonal',
    text: 'How consistent is your wake time in the morning?',
    options: [
      { label: 'Very consistent — I wake within 30 minutes of the same time daily', score: 4 },
      { label: 'Fairly consistent on weekdays, varies on weekends', score: 3 },
      { label: 'Variable — significant differences day to day', score: 2 },
      { label: 'Very irregular — no set sleep/wake schedule', score: 1 },
    ],
  },
  {
    id: 'hor-3',
    axis: 'hormonal',
    text: 'How much blue light / screen exposure do you have in the 2 hours before sleep?',
    options: [
      { label: 'Minimal — I use blue light filters or avoid screens after sunset', score: 4 },
      { label: 'Moderate — some screen time but wind down before bed', score: 3 },
      { label: 'High — screens until shortly before sleep', score: 2 },
      { label: 'Very high — phones/TV until I fall asleep', score: 1 },
    ],
  },
  {
    id: 'hor-4',
    axis: 'hormonal',
    text: 'Do you get morning sunlight within 1 hour of waking?',
    options: [
      { label: 'Yes — daily sunlight exposure in the morning', score: 4 },
      { label: 'Most days', score: 3 },
      { label: 'Rarely', score: 2 },
      { label: 'Almost never — indoor or underground commute', score: 1 },
    ],
  },
  // Social / Ikigai axis (5 questions)
  {
    id: 'soc-1',
    axis: 'social',
    text: 'How clearly can you articulate your ikigai — your reason for getting up in the morning?',
    options: [
      { label: 'Very clearly — I live with strong purpose and meaning', score: 4 },
      { label: 'I have a sense of purpose but it\'s not fully defined', score: 3 },
      { label: 'I struggle to identify my purpose', score: 2 },
      { label: 'I feel little meaning or direction in my daily life', score: 1 },
    ],
  },
  {
    id: 'soc-2',
    axis: 'social',
    text: 'How deep and frequent are your meaningful social connections?',
    options: [
      { label: 'I have several deep relationships and connect regularly', score: 4 },
      { label: 'A few close relationships, moderate frequency', score: 3 },
      { label: 'Limited close connections, often feel somewhat isolated', score: 2 },
      { label: 'Primarily isolated, lack of meaningful human connection', score: 1 },
    ],
  },
  {
    id: 'soc-3',
    axis: 'social',
    text: 'Do you contribute to something larger than yourself (community, cause, family, creativity)?',
    options: [
      { label: 'Yes — active contribution to community, cause, or others', score: 4 },
      { label: 'Somewhat, in limited ways', score: 3 },
      { label: 'Rarely, mostly focused on personal concerns', score: 2 },
      { label: 'No meaningful contribution to anything beyond myself', score: 1 },
    ],
  },
  {
    id: 'soc-4',
    axis: 'social',
    text: 'How often do you experience genuine laughter, joy, or deep conversation?',
    options: [
      { label: 'Daily — my life is rich with positive interactions', score: 4 },
      { label: 'Several times per week', score: 3 },
      { label: 'Rarely, life feels somewhat flat or transactional', score: 2 },
      { label: 'Almost never — predominantly isolated or joyless', score: 1 },
    ],
  },
  {
    id: 'soc-5',
    axis: 'social',
    text: 'How do you relate to your work or primary daily activities?',
    options: [
      { label: 'Deeply meaningful — I feel engaged and purposeful', score: 4 },
      { label: 'Generally satisfying with some frustrations', score: 3 },
      { label: 'Mostly transactional — I work for income, not meaning', score: 2 },
      { label: 'Draining, disconnected from any sense of meaning', score: 1 },
    ],
  },
];

export function calculateScores(answers: Record<string, number>): Record<AxisKey, number> {
  const totals: Record<AxisKey, { sum: number; count: number }> = {
    inflammation: { sum: 0, count: 0 },
    gut: { sum: 0, count: 0 },
    neural: { sum: 0, count: 0 },
    metabolic: { sum: 0, count: 0 },
    hormonal: { sum: 0, count: 0 },
    social: { sum: 0, count: 0 },
  };

  QUESTIONS.forEach((q) => {
    if (answers[q.id] !== undefined) {
      totals[q.axis].sum += answers[q.id];
      totals[q.axis].count += 1;
    }
  });

  const scores: Record<AxisKey, number> = {} as Record<AxisKey, number>;
  (Object.keys(totals) as AxisKey[]).forEach((axis) => {
    const { sum, count } = totals[axis];
    scores[axis] = count > 0 ? Math.round((sum / (count * 4)) * 100) : 0;
  });
  return scores;
}

export function getOverallScore(scores: Record<AxisKey, number>): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excellent', color: '#7a9e7e' };
  if (score >= 65) return { label: 'Good', color: '#c9a96e' };
  if (score >= 50) return { label: 'Moderate', color: '#e8a838' };
  if (score >= 35) return { label: 'Needs Work', color: '#e07b54' };
  return { label: 'Critical', color: '#d44' };
}
