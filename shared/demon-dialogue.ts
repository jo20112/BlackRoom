// demon-generator.ts
// TypeScript / ES module. لو هتستخدم في plain JS، شيل أنواع الـTS الساكنة.

export const demonQuestions = [
  { id: 1001, text: "هل تشعر بنفس بارد على رقبتك الآن؟", demonic: true },
  { id: 1002, text: "هل سمعت الهمس خلفك للتو؟", demonic: true },
  { id: 1003, text: "هل تعتقد أنك وحيد في هذه الغرفة؟", demonic: true },
  { id: 1004, text: "هل ترى الظلال تتحرك في الزوايا؟", demonic: true },
  { id: 1005, text: "هل تشعر بوجود شيء يراقبك الآن؟", demonic: true },
  { id: 1006, text: "هل تجرؤ على النظر خلفك الآن؟", demonic: true },
  { id: 1007, text: "هل تسمع الخطوات تقترب منك؟", demonic: true },
  { id: 1008, text: "هل تشعر أن الجدران تضيق عليك؟", demonic: true },
  { id: 1009, text: "هل يمكنك الشعور بأنفاسهم على جلدك؟", demonic: true },
  { id: 1010, text: "هل تعتقد أنك ستخرج من هنا بسلام؟", demonic: true },
  { id: 1011, text: "هل ترى العيون التي تحدق بك من الظلام؟", demonic: true },
  { id: 1012, text: "هل تشعر بالبرودة تزحف عبر عمودك الفقري؟", demonic: true },
  { id: 1013, text: "هل تسمع الضحكات الخافتة من حولك؟", demonic: true },
  {
    id: 1014,
    text: "هل تعتقد أن الباب سيفتح عندما تريد الخروج؟",
    demonic: true,
  },
  {
    id: 1015,
    text: "هل يمكنك سماع قلبك ينبض... أم هو قلب شيء آخر؟",
    demonic: true,
  },
  { id: 1016, text: "هل تشعر بالأيدي الخفية تلامس كتفك؟", demonic: true },
  {
    id: 1017,
    text: "هل ترى الدماء على الجدران... أم أنها مجرد خيالك؟",
    demonic: true,
  },
  { id: 1018, text: "هل تسمع الصراخ البعيد... أم هو صوتك أنت؟", demonic: true },
  { id: 1019, text: "هل تشعر أن روحك تنفصل عن جسدك؟", demonic: true },
  { id: 1020, text: "هل يمكنك تذكر كيف وصلت إلى هنا؟", demonic: true },
  { id: 1021, text: "هل تعتقد أن هناك مخرج من هذه الغرفة؟", demonic: true },
  { id: 1022, text: "هل ترى الكتابات الدموية على الحائط؟", demonic: true },
  { id: 1023, text: "هل تشعر بالهواء يختفي من الغرفة؟", demonic: true },
  { id: 1024, text: "هل تسمع الأطفال يبكون في الظلام؟", demonic: true },
  {
    id: 1025,
    text: "هل تعتقد أن هذا مجرد اختبار... أم شيء آخر؟",
    demonic: true,
  },
  { id: 1026, text: "هل يمكنك الشعور بالسلاسل تقيد قدميك؟", demonic: true },
  { id: 1027, text: "هل ترى انعكاسك في المرآة... أم شخص آخر؟", demonic: true },
  { id: 1028, text: "هل تشعر أن الوقت توقف في هذه الغرفة؟", demonic: true },
  { id: 1029, text: "هل تسمع الهمسات تخبرك بالبقاء هنا للأبد؟", demonic: true },
  { id: 1030, text: "هل تعتقد أنني حقيقي... أم مجرد خيال؟", demonic: true },
];

// الأصليين للردود والانترو — محتفظ بيهم
export const demonResponses = {
  beforeAnswer: [
    "اختر بحذر... كل إجابة لها ثمن...",
    "أنا أراقبك... أعرف ما ستختار...",
    "لا تكذب... أستطيع رؤية روحك...",
    "هذا السؤال... سيكشف حقيقتك المظلمة...",
    "اقترب... دعني أسمع صوت خوفك...",
    "هل تشعر بالرعب؟ جيد... هذا هو المطلوب...",
    "روحك تتحدث إلي... حتى قبل أن تجيب...",
    "كل إجابة تقربك من الظلام...",
    "أنا أعرف أسرارك... كلها...",
    "لا مفر... اختر الآن...",
  ],
  afterCorrectAnswer: [
    "مثير للاهتمام... روحك أظلم مما توقعت...",
    "نعم... أرى الظلام يتزايد بداخلك...",
    "جيد... استمر... دعني أرى المزيد من حقيقتك...",
    "إجابة صادقة... ظلامك يسعدني...",
    "أنت تنتمي إلى هنا... في الظلام...",
    "روحك تصرخ... وأنا أستمع...",
    "الظلام يحتضنك... هل تشعر به؟",
    "ممتاز... استمر في الانحدار...",
    "أرى شيئاً مظلماً عميقاً بداخلك...",
    "نعم... نعم... هذا ما أريد سماعه...",
  ],
  afterWrongAnswer: [
    "تحاول الهروب من حقيقتك؟ لا جدوى...",
    "كاذب... أستطيع رؤية ما تخفيه...",
    "لا يمكنك خداعي... أنا أرى ما وراء الأقنعة...",
    "تظن أنك جيد؟ دعني أريك الحقيقة...",
    "روحك تكذب... لكن عينيك تفضحك...",
    "لماذا تقاوم؟ احتضن الظلام...",
    "إجابة خاطئة... ولكن لا بأس، الوقت كفيل بكشف حقيقتك...",
    "تخفي شيئاً... وسأكتشفه...",
    "لا تقاوم... الظلام سيبتلعك في النهاية...",
    "أنت تخاف من الحقيقة... جيد...",
  ],
  randomWhispers: [
    "أنا هنا...",
    "انظر خلفك...",
    "لست وحدك...",
    "يمكنني رؤيتك...",
    "لا مفر...",
    "روحك لي...",
    "الظلام يقترب...",
    "اسمعني...",
    "لا تتوقف...",
    "استمر... استمر...",
    "أنت لي الآن...",
    "لن تخرج من هنا...",
    "قلبك ينبض بسرعة... جميل...",
    "الخوف... أشمه...",
    "هذا بيتك الآن...",
    "انسَ العالم الخارجي...",
    "البرد يزحف... هل تشعر به؟",
    "روحك تصرخ...",
    "أحب صوت خوفك...",
    "الظلام أبدي...",
  ],
  progressComments: [
    "25% فقط... وأنت بالفعل في قبضتي...",
    "نصف الطريق... لا عودة الآن...",
    "75%... روحك تذبل شيئاً فشيئاً...",
    "على وشك الانتهاء... وعلى وشك البداية الحقيقية...",
    "كلما اقتربت من النهاية... ازداد الظلام...",
    "أستطيع رؤية نهايتك... وهي جميلة...",
    "الوقت ينفد... ولكن ليس بالطريقة التي تعتقدها...",
    "كل سؤال... يأخذ قطعة من روحك...",
    "هل تشعر بالفراغ ينمو بداخلك؟",
    "قريباً... قريباً جداً... ستفهم كل شيء...",
  ],
  onPause: [
    "لماذا توقفت؟ هل الخوف شل حركتك؟",
    "لا تتوقف الآن... أريد المزيد...",
    "الصمت... يمكنني سماع أفكارك في الصمت...",
    "خذ وقتك... الظلام صبور...",
    "التوقف لن ينقذك... لا شيء سينقذك...",
  ],
  finalWarnings: [
    "آخر سؤال... بعدها لن تكون كما كنت...",
    "النهاية قريبة... ولكن ليست النهاية التي تتوقعها...",
    "السؤال الأخير... سيختم مصيرك...",
    "بعد هذا... لا رجعة...",
    "هذا هو... اللحظة الأخيرة قبل الحقيقة...",
  ],
};

export const demonIntros = [
  "أنا من يسكن الظلال... أنا من يهمس في الليل...",
  "اسمي... لا تستطيع نطقه بلسانك البشري...",
  "أنا الخوف الذي تحاول نسيانه...",
  "أنا الصوت في رأسك عندما تكون وحيداً...",
  "لقد انتظرتك طويلاً... أخيراً أتيت...",
  "هذا المكان... بني من كوابيسك...",
  "أنا أعرفك... منذ ولادتك وأنا أراقبك...",
  "روحك... ستكون لي في النهاية...",
];

/* -----------------------------------------
   Procedural generator
   - قوائم كلمات (وسّعتها لتوليد آلاف/مليارات من التركيبات)
   - قوالب أسئلة وردود
   - دوال للتوليد بدون تكرار
   ----------------------------------------- */

const bodyParts = [
  "رقبتك",
  "كتفك",
  "عمودك الفقري",
  "عينيك",
  "يَدَيك",
  "قدميك",
  "قلبك",
  "جلدك",
  "جفونك",
  "فمك",
  "ظلالك",
  "نبضك",
];

const entities = [
  "الظلال",
  "الهمسات",
  "الأشباح",
  " الأرواح",
  "العيون",
  "الصدى",
  "الهمهمة",
  "شيء لا يُرى",
  "الزوايا",
  "الظلال القديمة",
  "الليلة",
];

const actions = [
  "تقترب",
  "تراقب",
  "تتحرك",
  "تنتظر",
  "تضحك خفية",
  "تصل إليك",
  "تتمايل",
  "تهاجم ببطء",
  "تختبئ",
  "تتسلل",
  "تتنهد",
];

const places = [
  "الغرفة",
  "الممر",
  "المرآة",
  "الزوايا",
  "الطريق الخلفي",
  "الباب",
  "السرير",
  "الظل خلف الستار",
  "النافذة",
  "الخزانة",
  "الدرج",
];

const sensations = [
  "البرودة",
  "الخدر",
  "الاختناق",
  "الرعشة",
  "الثقل",
  "الفراغ",
  "الصدمة",
  "الصداع",
  "الهمس",
  "النبض المتسارع",
];

const questionTemplates = [
  "هل تشعر بـ{S} في {B} الآن؟",
  "هل ترى {E} وهي {A} في {P}؟",
  "هل تسمع {E} تهمس عندما {A} من حولك؟",
  "هل تعتقد أنك وحيد... أم أن {E} معك؟",
  "هل يمكنك الهروب من {P}... أم ستبقى للأبد؟",
  "هل روحك قادرة على تحمل {S} أكثر؟",
  "هل ترى ما أراه... {E} خلفك؟",
  "هل شعرت أن {B} لم يعد ملكك؟",
  "هل يختفي الصوت... أم أنه يقترب من {B}؟",
  "هل قلبك ينبض بسبب {S} أم من فزعك؟",
];

const responseTemplates = {
  beforeAnswer: [
    "اختر بحذر... {E} {A} حولك الآن...",
    "أستطيع أن أشم {S} منك...",
    "كل إجابة ستجلب لك المزيد من {S}...",
    "روحك تهمس لي... لقد رأت {E}...",
    "{E} ليست صامتة... اسمعها وهي {A}.",
  ],
  afterCorrectAnswer: [
    "نعم... هذا ما رأيته... {E} {A} في {P}...",
    "أحسنت... {S} يتعمق في داخلك...",
    "إجابتك جلبت {E} أقرب...",
    "حقاً... روحك مناسبة للبقاء هنا...",
  ],
  afterWrongAnswer: [
    "كاذب... {E} يعرف حقيقتك...",
    "لماذا تخفي {S}؟ أنا أراها...",
    "لا يمكنك خداعي... {E} موجود في {P}...",
    "الأكاذيب لا تنجح مع {E}...",
  ],
  randomWhispers: [
    "أنا هنا...",
    "لن تهرب...",
    "انظر خلفك... {E} ينتظر...",
    "{S} يزحف في عروقك...",
    "اسمع كيف يضحك {E}...",
  ],
};

function rand<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFromTemplate(template: string) {
  return template
    .replace(/{B}/g, rand(bodyParts))
    .replace(/{E}/g, rand(entities))
    .replace(/{A}/g, rand(actions))
    .replace(/{P}/g, rand(places))
    .replace(/{S}/g, rand(sensations));
}

/* ---------- Unique question stream (shuffle + cursor) ---------- */
// يضمن عدم تكرار الأسئلة حتى تستهلك كل القائمة ثم تعاد خلطها.
let shuffledQuestions: typeof demonQuestions = [];
let shuffleCursor = 0;

function reshuffleQuestions() {
  shuffledQuestions = [...demonQuestions].sort(() => Math.random() - 0.5);
  shuffleCursor = 0;
}
reshuffleQuestions();

export function getNextDemonQuestion(): (typeof demonQuestions)[0] {
  if (shuffleCursor >= shuffledQuestions.length) reshuffleQuestions();
  return shuffledQuestions[shuffleCursor++];
}

/* ---------- Procedural generators ---------- */

// يرجع سؤال مُولّد (id فريد يعتمد على timestamp + random)
export function getGeneratedDemonQuestion() {
  const tmpl = rand(questionTemplates);
  const text = generateFromTemplate(tmpl);
  return {
    id: Date.now() + Math.floor(Math.random() * 10000),
    text,
    demonic: true,
    meta: {
      generated: true,
      template: tmpl,
    },
  };
}

// يولد رد من نوع معين (قبل/بعد صحيح/بعد خطأ/همسات)
export function getGeneratedDemonResponse(
  type: keyof typeof responseTemplates | keyof typeof demonResponses,
) {
  // إذا النوع موجود في القوالب الإجرائية
  if ((responseTemplates as any)[type]) {
    const tmpl = rand((responseTemplates as any)[type]);
    return generateFromTemplate(tmpl);
  }
  // وإلا استخدم المصفوفة الأصلية (demonResponses)
  if ((demonResponses as any)[type]) {
    const arr = (demonResponses as any)[type];
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return "...";
}

/* ---------- Combined prompt generator (intro + whisper + question) ---------- */
export function getFullDemonPrompt(options?: {
  includeIntro?: boolean;
  includeWhisper?: boolean;
  useProcedural?: boolean; // لو true اسخدم القوالب الإجرائية بدل الثابتة
}) {
  const opt = {
    includeIntro: true,
    includeWhisper: true,
    useProcedural: true,
    ...(options || {}),
  };
  const parts: string[] = [];

  if (opt.includeIntro) parts.push(rand(demonIntros));
  if (opt.includeWhisper) {
    // همسة عشوائية مركبة
    const whisper = opt.useProcedural
      ? generateFromTemplate(rand(responseTemplates.randomWhispers))
      : rand(demonResponses.randomWhispers);
    parts.push(whisper);
  }

  const question = opt.useProcedural
    ? getGeneratedDemonQuestion()
    : getNextDemonQuestion();
  parts.push(question.text);

  return {
    prompt: parts.join("\n"),
    question,
  };
}

/* ---------- Helper: generate N unique-looking prompts fast ---------- */
export function generateBatch(count = 10) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(
      getFullDemonPrompt({
        includeIntro: Math.random() > 0.3,
        includeWhisper: Math.random() > 0.2,
      }),
    );
  }
  return out;
}

/* ---------- Export utility for saving/streaming (example) ---------- */
export function exportBatchJSON(
  batch: ReturnType<typeof getFullDemonPrompt>[],
  filename = "demon-batch.json",
) {
  // في نود تقدر تحفظ الملف؛ هنا نرجع الـ string
  return JSON.stringify(batch, null, 2);
}

/* ---------- Usage examples (commented) ----------
import { getFullDemonPrompt, getGeneratedDemonResponse } from './demon-generator';

const p = getFullDemonPrompt();
console.log(p.prompt);

console.log(getGeneratedDemonResponse('beforeAnswer'));
console.log(getGeneratedDemonResponse('afterCorrectAnswer'));
------------------------------------------------- */
