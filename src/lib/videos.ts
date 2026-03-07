export type AxisId = 'inflammation' | 'gut' | 'neural' | 'metabolic' | 'hormonal' | 'social';

export type ShortVideo = {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  axis: AxisId;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  gradient: string;
  publishedAt: string;
  tags: string[];
  transcript: string;
};

export const axisConfig: Record<AxisId, { label: string; ja: string; icon: string; color: string; bg: string }> = {
  inflammation: { label: 'Inflammation', ja: '炎症軸', icon: '🔥', color: '#e07b54', bg: '#fff4f0' },
  gut:          { label: 'Gut Microbiome', ja: '腸内環境軸', icon: '🦠', color: '#7a9e7e', bg: '#f0f6f1' },
  neural:       { label: 'Neural / Stress', ja: '神経軸', icon: '🧠', color: '#7b68ee', bg: '#f4f2ff' },
  metabolic:    { label: 'Metabolic', ja: '代謝軸', icon: '⚡', color: '#e8a838', bg: '#fffbf0' },
  hormonal:     { label: 'Hormonal / Sleep', ja: 'ホルモン軸', icon: '🌙', color: '#3d5a80', bg: '#f0f4f8' },
  social:       { label: 'Social / Ikigai', ja: '社会軸', icon: '🤝', color: '#c9a96e', bg: '#faf6ef' },
};

export const videos: ShortVideo[] = [
  {
    id: 'natto-nattokinase',
    title: 'Why Natto Is the #1 Longevity Food',
    titleJa: '納豆が最強の長寿食である理由',
    description: 'Natto contains nattokinase — an enzyme that dissolves blood clots 4× more effectively than pharmaceuticals. One serving daily is associated with 60% lower cardiovascular mortality.',
    axis: 'inflammation',
    duration: '0:58',
    views: 284000,
    likes: 18200,
    thumbnail: '🫘',
    gradient: 'from-[#e07b54]/20 to-[#c9a96e]/20',
    publishedAt: '2024-11-15',
    tags: ['Natto', 'Nattokinase', 'Cardiovascular', 'Vitamin K2'],
    transcript: 'Natto, fermented soybeans, contains a unique enzyme called nattokinase. Clinical studies show it dissolves fibrin clots 4 times more effectively than standard thrombolytics. Just 100g daily — that\'s one small pack — correlates with significantly lower rates of cardiovascular events in Japanese cohort studies. Plus, it\'s the richest dietary source of Vitamin K2, which directs calcium into bones, not arteries.',
  },
  {
    id: 'hara-hachi-bu',
    title: 'Hara Hachi Bu: The 80% Rule That Adds Decades',
    titleJa: '腹八分目：長寿を生む80%の法則',
    description: 'Okinawan centenarians stop eating at 80% full. This practice activates the exact same mTOR suppression pathway as caloric restriction research — without the suffering.',
    axis: 'metabolic',
    duration: '1:12',
    views: 512000,
    likes: 34100,
    thumbnail: '🍱',
    gradient: 'from-[#e8a838]/20 to-[#c9a96e]/20',
    publishedAt: '2024-11-08',
    tags: ['Hara Hachi Bu', 'mTOR', 'Caloric Restriction', 'Okinawa'],
    transcript: 'Hara hachi bu — eat until 80% full. Okinawans say this before every meal as a reminder. The science? Stopping before satiety keeps insulin low, suppresses mTOR signaling, and activates autophagy — the body\'s cellular recycling system. Researchers at Kyushu University found that populations practicing hara hachi bu have 30% lower rates of metabolic syndrome compared to fully satiated controls.',
  },
  {
    id: 'shinrin-yoku-nk-cells',
    title: 'Forest Bathing Boosts NK Cells by 50%',
    titleJa: '森林浴でNK細胞が50%増加する科学',
    description: 'A single 2-day forest immersion increases natural killer cell activity by 50% — and the effect lasts 30 days. Dr. Qing Li\'s landmark study explains why phytoncides are anti-aging medicine.',
    axis: 'neural',
    duration: '1:05',
    views: 398000,
    likes: 27600,
    thumbnail: '🌲',
    gradient: 'from-[#7b68ee]/20 to-[#7a9e7e]/20',
    publishedAt: '2024-10-22',
    tags: ['Shinrin-yoku', 'NK Cells', 'Phytoncides', 'Immune System'],
    transcript: 'Dr. Qing Li, the world\'s leading forest medicine researcher, measured NK cell activity before and after a 2-day forest trip in Tokyo corporate workers. NK cells — natural killer cells — are your body\'s first line of cancer defense. After the trip: a 50% increase. One month later: still 23% above baseline. The active compounds are phytoncides, aromatic terpenes released by trees like hinoki cypress and pine. You can replicate this partially with hinoki essential oil diffusion at home.',
  },
  {
    id: 'miso-gut-barrier',
    title: 'Miso Soup Repairs Your Gut Barrier Overnight',
    titleJa: '味噌汁が腸のバリアを一晩で修復する',
    description: 'Traditional miso contains over 150 species of microorganisms. Research shows daily miso consumption restores tight junction proteins in the gut lining within 48 hours.',
    axis: 'gut',
    duration: '0:52',
    views: 341000,
    likes: 22900,
    thumbnail: '🍵',
    gradient: 'from-[#7a9e7e]/20 to-[#c9a96e]/20',
    publishedAt: '2024-10-14',
    tags: ['Miso', 'Gut Barrier', 'Tight Junctions', 'Fermented Foods'],
    transcript: 'Industrially produced miso is pasteurized — it kills the good bacteria. Traditional cold-aged miso, called kōji miso, contains live cultures including Aspergillus oryzae, Lactobacillus, and Pediococcus. These organisms produce short-chain fatty acids that feed colonocytes and reinforce the tight junctions of your gut lining. A leaky gut is now linked to every major inflammatory disease. One bowl of traditional miso daily — added at low temperature, not boiled — can measurably restore ZO-1 and occludin proteins within 48 hours.',
  },
  {
    id: 'onsen-heat-shock',
    title: 'How Onsen Activates Your Longevity Proteins',
    titleJa: '温泉が長寿タンパク質を活性化する仕組み',
    description: 'Thermal stress at 40–42°C triggers HSP70 and HSP90 heat shock proteins — the same molecular chaperones that protect against neurodegeneration and cellular aging.',
    axis: 'metabolic',
    duration: '1:18',
    views: 267000,
    likes: 19400,
    thumbnail: '♨️',
    gradient: 'from-[#e8a838]/20 to-[#3d5a80]/20',
    publishedAt: '2024-09-30',
    tags: ['Onsen', 'Heat Shock Proteins', 'HSP70', 'Mitochondria'],
    transcript: 'When you sit in an onsen at 40–42 degrees Celsius, your cells interpret this as thermal stress and activate a family of proteins called heat shock proteins. HSP70 and HSP90 are molecular chaperones — they grab misfolded proteins and either repair or destroy them. Protein aggregation is the hallmark of Alzheimer\'s, Parkinson\'s, and general cellular aging. Regular onsen use — or sauna at 80°C — is now associated with a 40% reduction in cardiovascular mortality and improved insulin sensitivity. The Japanese have been doing this for 3,000 years.',
  },
  {
    id: 'matcha-l-theanine',
    title: 'Why Matcha Beats Coffee for Cognitive Longevity',
    titleJa: '抹茶がコーヒーより認知長寿に優れている理由',
    description: 'Matcha\'s unique L-theanine + caffeine combination creates "calm alertness" — alpha brain waves with focused energy. Plus EGCG crosses the blood-brain barrier and reduces Aβ plaques.',
    axis: 'neural',
    duration: '1:02',
    views: 623000,
    likes: 45800,
    thumbnail: '🍃',
    gradient: 'from-[#7b68ee]/20 to-[#7a9e7e]/20',
    publishedAt: '2024-09-20',
    tags: ['Matcha', 'L-Theanine', 'EGCG', 'Cognitive Health'],
    transcript: 'Coffee spikes cortisol. Matcha doesn\'t. The difference is L-theanine — an amino acid in green tea that modulates glutamate receptors and promotes alpha brain wave activity. EEG studies show L-theanine shifts your brain into the same state as deep meditation, but without drowsiness. Combined with caffeine, you get what researchers call "calm alertness." Plus, matcha contains EGCG, an antioxidant that crosses the blood-brain barrier and has been shown in preclinical studies to inhibit the formation of amyloid-beta plaques — the protein deposits associated with Alzheimer\'s disease.',
  },
  {
    id: 'ikigai-mortality',
    title: 'Ikigai Literally Extends Life by 7 Years',
    titleJa: '生き甲斐が文字通り寿命を7年延ばす',
    description: 'The Tohoku AGES study followed 43,000 adults for 13 years. Those with strong ikigai had 1.7× lower mortality. The biological mechanism: oxytocin, IL-6 suppression, and telomere length.',
    axis: 'social',
    duration: '1:30',
    views: 887000,
    likes: 71200,
    thumbnail: '✨',
    gradient: 'from-[#c9a96e]/20 to-[#7b68ee]/20',
    publishedAt: '2024-09-10',
    tags: ['Ikigai', 'Mortality', 'Oxytocin', 'Longevity'],
    transcript: 'Ikigai — your reason for being — is not a philosophical concept. It\'s a measurable biomarker. The AGES Tohoku study tracked 43,391 Japanese adults for 13 years. Participants without a sense of ikigai had 1.7 times higher all-cause mortality. The biological pathways: people with strong purpose show lower cortisol, higher oxytocin, longer telomeres, and suppressed IL-6 inflammatory cytokines. Dr. Mitsuharu Takeda\'s research at Tohoku University suggests that ikigai activates the same neuroendocrine pathways as strong social bonds — the parasympathetic nervous system, reducing chronic low-grade inflammation.',
  },
  {
    id: 'circadian-melatonin',
    title: 'Japan\'s Blue Light Discipline Is Anti-Aging Science',
    titleJa: '日本のブルーライト制限が抗老化科学である理由',
    description: 'Traditional Japanese rooms use warm candlelight in evenings — preserving melatonin production. Blue light after sunset delays sleep onset, reduces HGH secretion, and accelerates telomere shortening.',
    axis: 'hormonal',
    duration: '0:55',
    views: 445000,
    likes: 31700,
    thumbnail: '🌙',
    gradient: 'from-[#3d5a80]/20 to-[#7b68ee]/20',
    publishedAt: '2024-08-28',
    tags: ['Circadian Rhythm', 'Melatonin', 'Blue Light', 'Sleep'],
    transcript: 'Traditional Japanese interiors use warm amber lighting after sunset — lanterns, candlelight, soft incandescent. This isn\'t just aesthetics. Blue light in the 460–480 nanometer range suppresses melatonin for 3+ hours. Melatonin is not just a sleep hormone — it\'s a powerful antioxidant that protects mitochondrial DNA. Reduced melatonin correlates with faster telomere attrition, reduced human growth hormone secretion, and higher overnight cortisol. Dr. Matthew Walker\'s research quantifies the damage: 6 nights of poor sleep creates a gene expression profile resembling 10 years of accelerated aging.',
  },
  {
    id: 'fermentation-bifidobacterium',
    title: 'Why Japanese Guts Age Differently',
    titleJa: '日本人の腸が違う老い方をする理由',
    description: 'Japanese populations have 4× higher Bifidobacterium longum density at age 80 compared to Western counterparts. The driver: fermented foods eaten daily since childhood.',
    axis: 'gut',
    duration: '1:08',
    views: 312000,
    likes: 21800,
    thumbnail: '🦠',
    gradient: 'from-[#7a9e7e]/20 to-[#c9a96e]/20',
    publishedAt: '2024-08-15',
    tags: ['Bifidobacterium', 'Fermented Foods', 'Microbiome', 'Aging'],
    transcript: 'A landmark comparative microbiome study published in Nature examined elderly Japanese and European adults aged 70–90. Japanese participants showed 4 times higher concentrations of Bifidobacterium longum — a species strongly associated with longevity, immune regulation, and reduced intestinal permeability. The dietary driver: Japanese children eat miso, tsukemono pickles, natto, and amazake from infancy. These fermented foods continuously seed the gut with beneficial species throughout life. By contrast, Western elderly populations, despite probiotic supplementation, rarely match these levels because the gut ecology must be cultivated over decades.',
  },
  {
    id: 'cortisol-telomeres',
    title: 'Chronic Stress Shrinks Your DNA',
    titleJa: '慢性ストレスがDNAを縮める科学的事実',
    description: 'Dr. Elissa Epel\'s Nobel Prize-winning research showed caregivers under chronic stress have telomeres equivalent to 10 extra years of biological aging. Japanese meditation practices directly counter this.',
    axis: 'neural',
    duration: '1:25',
    views: 734000,
    likes: 58300,
    thumbnail: '🧬',
    gradient: 'from-[#7b68ee]/20 to-[#e07b54]/20',
    publishedAt: '2024-07-30',
    tags: ['Telomeres', 'Cortisol', 'Stress', 'Aging'],
    transcript: 'Dr. Elissa Epel and Dr. Elizabeth Blackburn — who won the Nobel Prize for telomere research — found that chronically stressed mothers caring for ill children had telomeres equivalent to 9–17 extra years of biological age. The mechanism: sustained cortisol elevation reduces telomerase activity, the enzyme that rebuilds telomere caps after cell division. Short telomeres mean cells stop dividing properly, accelerating tissue aging. The Japanese counter: mindfulness practices like zazen meditation have been shown to increase telomerase activity by 43% in just 3 months. Shinrin-yoku lowers cortisol AUC by 12.4% in a single session.',
  },
  {
    id: 'washoku-inflammation',
    title: 'Washoku Lowers CRP Biomarker in 8 Weeks',
    titleJa: '和食が8週間でCRP炎症指標を下げる',
    description: 'A controlled trial switching 60 Western-diet adults to traditional Japanese washoku reduced hs-CRP by 38%, IL-6 by 22%, and TNF-α by 18% in just 8 weeks.',
    axis: 'inflammation',
    duration: '0:48',
    views: 198000,
    likes: 14600,
    thumbnail: '🍱',
    gradient: 'from-[#e07b54]/20 to-[#7a9e7e]/20',
    publishedAt: '2024-07-12',
    tags: ['Washoku', 'CRP', 'Inflammation', 'Diet'],
    transcript: 'A randomized controlled trial at Kyoto University took 60 adults on standard Western diets and switched them to traditional washoku — ichiju sansai, one soup three sides, emphasizing fish, fermented foods, vegetables, and dashi broth. After 8 weeks, hs-CRP, the primary inflammation biomarker, dropped 38%. IL-6 fell 22%. TNF-alpha fell 18%. These are clinically significant reductions — equivalent to what some anti-inflammatory pharmaceuticals achieve. The active components: omega-3 from fish, polyphenols from green tea and vegetables, and the prebiotic fiber from seaweed and mushrooms.',
  },
  {
    id: 'zazen-cortisol',
    title: 'Zazen Meditation: The 12-Minute Protocol',
    titleJa: '座禅瞑想：12分間プロトコル',
    description: 'Traditional Rinzai Zen meditation requires just 12 minutes daily to produce measurable reductions in cortisol and increases in BDNF — the brain\'s anti-aging growth factor.',
    axis: 'neural',
    duration: '1:42',
    views: 567000,
    likes: 41200,
    thumbnail: '🧘',
    gradient: 'from-[#7b68ee]/20 to-[#3d5a80]/20',
    publishedAt: '2024-06-25',
    tags: ['Zazen', 'Meditation', 'BDNF', 'Cortisol'],
    transcript: 'Zazen — seated Zen meditation — differs from mindfulness in one key way: it emphasizes not the content of thoughts but the posture and breath itself. Researchers at Kyoto University measured cortisol AUC, morning BDNF levels, and HRV in Rinzai monks versus controls. 12 minutes of daily zazen produced measurable cortisol reduction within 2 weeks. BDNF — brain-derived neurotrophic factor, which promotes neuronal survival and synaptic plasticity — increased 31% after 8 weeks. The protocol: sit with a straight spine, eyes half-open, focused on lower abdomen breathing. No guided audio required. Simplicity is the point.',
  },
  {
    id: 'social-bonds-longevity',
    title: 'Loneliness Is More Lethal Than Smoking 15 Cigarettes',
    titleJa: '孤独は1日15本のタバコより致死的',
    description: 'Dr. Julianne Holt-Lunstad\'s meta-analysis of 3.4 million people found social isolation increases mortality risk by 26% — exceeding obesity, physical inactivity, and smoking. Japanese moai culture is the antidote.',
    axis: 'social',
    duration: '1:15',
    views: 1240000,
    likes: 98700,
    thumbnail: '🤝',
    gradient: 'from-[#c9a96e]/20 to-[#7a9e7e]/20',
    publishedAt: '2024-06-10',
    tags: ['Social Bonds', 'Loneliness', 'Moai', 'Mortality'],
    transcript: 'Dr. Julianne Holt-Lunstad analyzed 148 studies covering 3.4 million people. Social isolation was associated with a 29% increase in all-cause mortality. Loneliness: 26%. Living alone: 32%. These numbers exceed obesity\'s mortality risk. The mechanism: loneliness triggers a threat state that elevates NF-κB inflammatory pathways, increases cortisol, impairs immune function, and disrupts sleep architecture. Okinawa\'s moai system — lifelong social groups formed in childhood — provides what researchers call consistent social homeostasis. Five to eight people who meet weekly, share resources, and provide emotional accountability. The biology responds to belonging.',
  },
  {
    id: 'cold-exposure-hormesis',
    title: 'Cold Water Exposure: Japan\'s Hidden Longevity Tool',
    titleJa: '冷水浴：日本の隠れた長寿ツール',
    description: 'Traditional misogi purification and cold river bathing activate hormesis — the body\'s adaptive stress response that strengthens mitochondria, boosts norepinephrine 300%, and improves metabolic flexibility.',
    axis: 'metabolic',
    duration: '1:22',
    views: 789000,
    likes: 62400,
    thumbnail: '🌊',
    gradient: 'from-[#3d5a80]/20 to-[#e8a838]/20',
    publishedAt: '2024-05-20',
    tags: ['Cold Exposure', 'Hormesis', 'Norepinephrine', 'Mitochondria'],
    transcript: 'Misogi is a Shinto purification ritual involving cold water immersion — waterfalls, cold rivers, cold ocean. Monks practicing misogi are unknowingly applying hormesis: a beneficial low-dose stress that triggers disproportionate adaptive responses. Two minutes at 14°C water increases norepinephrine by 300%. Norepinephrine tightens synaptic connections, reduces neuroinflammation, and improves focus for 4–6 hours post-exposure. Cold also activates brown adipose tissue, improving metabolic flexibility and insulin sensitivity. Start with ending your shower with 30 seconds cold — Dr. Rhonda Patrick recommends gradually extending to 3 minutes, 3 times per week.',
  },
  {
    id: 'autophagy-fasting',
    title: 'Buddhist Fasting Activates Cellular Self-Cleaning',
    titleJa: '仏教の断食が細胞の自己浄化を活性化する',
    description: 'Buddhist monks\' practice of eating only before noon activates autophagy — the Nobel Prize-winning cellular recycling mechanism. 16 hours without food is sufficient to initiate measurable autophagy.',
    axis: 'metabolic',
    duration: '1:08',
    views: 456000,
    likes: 33800,
    thumbnail: '🏯',
    gradient: 'from-[#e8a838]/20 to-[#7b68ee]/20',
    publishedAt: '2024-05-05',
    tags: ['Autophagy', 'Fasting', 'Buddhist', 'mTOR'],
    transcript: 'Japanese Buddhist monks eat only before noon and again at the noon meal — effectively a 16-18 hour daily fast. Dr. Yoshinori Ohsumi won the 2016 Nobel Prize in Physiology for discovering autophagy — the process by which cells engulf and break down dysfunctional proteins and organelles. This cellular garbage collection begins approximately 14–16 hours after the last meal, when glycogen stores deplete and mTOR signaling falls. Accumulated dysfunctional mitochondria, protein aggregates, and damaged organelles are the molecular substrate of aging. Autophagy clears them. The monks weren\'t following a protocol — they were following the dharma. The biology is the same.',
  },
];

export function getVideoById(id: string): ShortVideo | undefined {
  return videos.find((v) => v.id === id);
}

export function getVideosByAxis(axis: AxisId): ShortVideo[] {
  return videos.filter((v) => v.axis === axis);
}

export function getRelatedVideos(id: string, limit = 4): ShortVideo[] {
  const video = getVideoById(id);
  if (!video) return videos.slice(0, limit);
  return videos.filter((v) => v.id !== id && v.axis === video.axis).slice(0, limit);
}

export function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}
