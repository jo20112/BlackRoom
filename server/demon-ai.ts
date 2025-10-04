// server/demon-ai-extended.ts
// Extended Demon AI generator + HuggingFace wrapper
// - Keeps original HF logic + fallback analyzer
// - Adds a powerful procedural response generator capable of producing huge numbers of variations
// - Includes helpers to "materialize" (export) large arrays when/if you really need static lists

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Message {
  text: string;
  sender: "user" | "demon";
}

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
const HF_TOKEN = process.env.HF_TOKEN;

const DEMON_SYSTEM_PROMPT = `You are a demon having a conversation in Egyptian Arabic. Rules:
1. ALWAYS respond directly to what the user says
2. Keep responses SHORT (1-2 sentences max)
3. Use Egyptian Arabic naturally
4. Be scary but conversational
5. Use these emojis: 💀☠️🔥👹😈🩸

Examples:
User: "ازيك؟" → You: "بخير... وأنت؟ قلبك بينبض بسرعة 💀"
User: "تمام" → You: "تمام؟ طيب... إيه اللي جابك هنا؟ 😈"
User: "انت مين؟" → You: "أنا اللي في أحلامك السودا 👹"
User: "عامل ايه؟" → You: "بستنى... وبراقبك... دايماً ☠️"
User: "صباح الخير" → You: "صباح الظلام... مستني إيه؟ 🔥"

Talk like a friend but scary. RESPOND TO WHAT THEY SAY.`;

const demonPersonality = {
  darkKeywords: [
    "خوف",
    "موت",
    "ظلام",
    "شر",
    "دم",
    "قتل",
    "كابوس",
    "رعب",
    "وحش",
    "جحيم",
  ],
  fearKeywords: ["خائف", "خايف", "رعب", "فزع", "قلق", "مرعوب"],
  questionWords: ["من", "ماذا", "لماذا", "كيف", "أين", "متى", "هل"],
  defiantWords: ["لا", "مستحيل", "كذب", "لن", "رفض", "ابعد"],
  submitWords: ["نعم", "موافق", "تمام", "حاضر", "أجل"],
};

/* --------------------------
   Original (small) responses
   kept for backwards compatibility
   -------------------------- */
const smallDarkResponses = {
  fear: [
    "أشم رائحة خوفك من هنا... إنها رائحة جميلة... استمر في الخوف...",
    "الخوف يجعل روحك أكثر لذة... لا تتوقف...",
    "خفقات قلبك... موسيقى لأذني... دعها تتسارع أكثر...",
  ],
  dark: [
    "آه... أنت تفهم الظلام إذاً... ربما أنت واحد منا...",
    "الظلام يناديك... أسمعه بوضوح...",
    "هذه الأفكار المظلمة... هي حقيقتك... احتضنها...",
  ],
  question: [
    "تسأل أسئلة خاطئة... لكن سأجيب... لأنني أستمتع بلعبتنا...",
    "فضولك سيقتلك... حرفياً... لكن أجب على سؤالي أولاً: لماذا أتيت؟",
  ],
  defiance: [
    "المقاومة... كم أحب المقاومين... انهيارهم أجمل...",
    "تتحداني؟ ممتاز... هذا سيجعل الأمر أكثر متعة...",
  ],
  submission: [
    "أخيراً... تبدأ في الفهم... نعم... استسلم...",
    "القبول... خطوة جيدة... الآن دعني أريك الحقيقة...",
  ],
  neutral: [
    "كلماتك فارغة... لكن روحك تصرخ... أسمعها...",
    "هل تعتقد أن الصمت سينقذك؟ أنا أقرأ ما بين السطور...",
  ],
  personalAttacks: [
    "أعرف أسرارك... كلها... تلك التي دفنتها عميقاً...",
    "رأيت ذكرياتك... المخزية... المخيفة... الجميلة...",
  ],
  threats: [
    "الليلة القادمة... عندما تحاول النوم... سأكون هناك...",
    "كل ظل تراه... كل صوت تسمعه... أنا...",
  ],
};

/* ---------------------------------------
   Procedural generator resources
   - Prefixes, cores, suffixes, templates
   - Enough building blocks to explode the combinatorics
   --------------------------------------- */

/* WARNING:
   These arrays are intentionally verbose to increase combinatoric variety.
   The actual number of unique outputs = product/combination of these lists * templates.
*/

const prefixes = [
  "",
  "اسمعني... ",
  "ههه... ",
  "يا صاحبي... ",
  "اسمع كويس... ",
  "امسك نفسك... ",
  "يا... ",
  "تعالى هنا... ",
  "اوعى تنسى... ",
  "انتبه... ",
  "عشانك... ",
  "خلي بالك... ",
  "انت فاكر نفسك؟ ",
  "انت مش لوحدك... ",
  "دلوقتي... ",
  "قريب... ",
  "مش بعيد... ",
  "ده بس البداية... ",
  "هيه... ",
  "اه... ",
  "آه... ",
  "همسة... ",
  "اسكت شويه... ",
  "اسمع... ",
  "حسيت؟ ",
  "بس... ",
  "يا راجل... ",
  "بص في عيناي... ",
  "شوف... ",
  "خلاص... ",
  "بتضحك؟ ",
];

const middles = [
  "الخوف يغريك",
  "الظلام يحبك",
  "صوت قلبك واضح",
  "دمك يقرع الابواب",
  "أنت قريب",
  "أنا أحس بك",
  "ذكرياتك مكشوفة",
  "الأقنعة بتطيح",
  "همسات الليل تكبر",
  "الظلال تضحك",
  "نورها ابتلعك",
  "الهواء يزحف",
  "المرآة تكذب",
  "الباب بيتفتح",
  "الأرض تئن",
  "العتمة تتوسع",
  "صراخك حلو",
  "سرّك مش آمن",
  "سرك لازم ينكشف",
  "وجوههم تنظر",
  "عينيك تتلألأ",
  "نبضك عالي",
  "خُطاك تقود",
  "الصمت يصرخ",
  "الليل يبتلع",
  "القشعريرة بدأت",
  "الشبح يهمس",
  "الصدى يردد اسمك",
  "الهمسات بتقرب",
  "دمعك ثقيل",
];

const suffixes = [
  "",
  " ...يا حبيبي",
  " ...يا بني آدم",
  " ...يا أحمق",
  " ...يا غبي",
  " ...يا هامشي",
  " ...ما تنساش",
  " ...دلوقتي",
  " ...قريباً",
  " ...النهارده بالليل",
  " ...وقتها هتسمع",
  " ...وانت نايم",
  " ...وانت بتجري",
  " ...وانت بتصرخ",
  " ...وحدك",
  " ...في قلبك",
  " ...في دمك",
  " ...في أحلامك",
  " ...في ظلالك",
  " ...أبدًا مش هتخرج",
  " ...هيفضل هنا",
  " ...ده وعدي",
  " ...مخك مش هيتشاف",
  " ...روّح حلمك",
  " ...مش هتتذكر الصبح",
];

const emojis = [
  "💀",
  "☠️",
  "🔥",
  "👹",
  "😈",
  "🩸",
  "👁️",
  "🕯️",
  "🕷️",
  "💧",
  "⚰️",
  "🔪",
];

const shortInterjections = [
  "بلاش...",
  "اسمع...",
  "لا...",
  "هاها...",
  "انطر...",
  "يا الله...",
  "يا ساتر...",
  "معقول؟",
  "بجد؟",
];

/* templates for procedural sentence construction */
const templates = [
  "{prefix}{middle}{suffix}",
  "{prefix}{middle} {emoji}",
  "{prefix}{middle}... {suffix}",
  "{prefix}{middle} — {emoji}{suffix}",
  "{prefix}{middle}. {suffix}",
  "{prefix}{middle}، {suffix}",
  "{prefix}{middle}? {suffix}",
  "{prefix}{short} {middle}{emoji}",
];

/* category-specific templates to emulate tone */
const categoryTemplates: Record<string, string[]> = {
  fear: [
    "{prefix}{middle}. {emoji}",
    "{prefix}{middle}... {suffix}",
    "{prefix}خوفي منك واضح — {middle} {emoji}",
    "{prefix}{middle}، اختبئ إن قدرت{suffix}",
  ],
  dark: [
    "{prefix}{middle} في {suffix} {emoji}",
    "{prefix}الظلام يقول: {middle}{suffix}",
    "{prefix}{middle} — لا نور الآن {emoji}",
  ],
  defiance: [
    "{prefix}{middle}؟ تحدي جميل{emoji}",
    "{prefix}قاوم... ثم انظر{suffix}",
    "{prefix}{middle}، استمر في الكلام{emoji}",
  ],
  submission: [
    "{prefix}{middle}... استسلم{emoji}",
    "{prefix}قل: أنا منك{suffix}",
    "{prefix}{middle}، هذا طريقك{emoji}",
  ],
  question: [
    "{prefix}{middle}? {suffix}",
    "{prefix}تسأل وتبحث... {middle}{emoji}",
    "{prefix}سؤالك مكلف — {middle}{suffix}",
  ],
  neutral: [
    "{prefix}{middle}{suffix}",
    "{prefix}{middle} {emoji}",
    "{prefix}{middle}... {suffix}",
  ],
  threats: [
    "{prefix}{middle} — انتظر الليل{emoji}",
    "{prefix}كل ظل يهمس: {middle}{suffix}",
    "{prefix}{middle}، وانا ألاحقك{emoji}",
  ],
  personalAttacks: [
    "{prefix}{middle}... وها هم أسرارك{suffix}",
    "{prefix}أعرف {middle} عنك{emoji}",
    "{prefix}{middle} — لا تفرّ{suffix}",
  ],
};

/* ---------------------------
   Utility functions
   --------------------------- */

function rand<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chooseMultiple<T>(arr: T[], count: number) {
  const out: T[] = [];
  for (let i = 0; i < count; i++) out.push(rand(arr));
  return out;
}

/* Build a single procedural sentence for a given category */
function buildProceduralSentence(category: string) {
  const tpls = categoryTemplates[category] || templates;
  const tpl = rand(tpls);
  const prefix = rand(prefixes);
  const middle = rand(middles);
  const suffix = rand(suffixes);
  const emoji = rand(emojis);
  const short = rand(shortInterjections);

  return tpl
    .replace("{prefix}", prefix)
    .replace("{middle}", middle)
    .replace("{suffix}", suffix)
    .replace("{emoji}", emoji)
    .replace("{short}", short)
    .replace(/\s+/g, " ")
    .trim();
}

/* Generate N unique-ish lines by using random seeds
   Note: for truly unique guaranteed results use a set filter or a seeded RNG */
export function generateProceduralResponses(category: string, count = 1000) {
  const out: string[] = [];
  const seen = new Set<string>();
  let attempts = 0;
  while (out.length < count && attempts < count * 10) {
    const line = buildProceduralSentence(category);
    // tiny normalization
    const norm = line.replace(/\s+/g, " ").trim();
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(norm);
    }
    attempts++;
  }
  return out;
}

/* ---------- Big materializer
   Create a large responses object with X items per category.
   Warning: materializing millions into memory will exhaust RAM.
   Use streaming to file in prod.
*/
export function materializeLargeResponses(perCategory = 5000) {
  const categories = [
    "fear",
    "dark",
    "question",
    "defiance",
    "submission",
    "neutral",
    "threats",
    "personalAttacks",
  ];
  const big: Record<string, string[]> = {};
  for (const c of categories) {
    big[c] = generateProceduralResponses(c, perCategory);
  }
  return big;
}

/* ---------------------------
   Integration with original analyzer
   --------------------------- */

/* extended darkResponses uses both original small set plus procedural seeds */
export const darkResponsesExtended: Record<string, string[]> = {
  fear: [
    ...smallDarkResponses.fear,
    // some hand-crafted variations to seed style
    "الخوف هنا... طعمه مختلف اليوم.",
    "كل رعشة في جسدك تفصح عن قصة.",
    "بصمتك في الليل بتوصلني.",
    "عيناي تعرف طريق قلبك المذعور.",
    // procedural filler (not materialized here to keep memory light)
  ],
  dark: [
    ...smallDarkResponses.dark,
    "في عيونك لقيت الجواب اللي بستناه.",
    "العتمة اسمها... وانت ضيف شرف.",
    "انزل للعمق... مش هترجع زي ما كنت.",
    "السر الكبير بين الضحكات.",
  ],
  question: [
    ...smallDarkResponses.question,
    "سؤالك زي فتيل صغير... وبينتظر الشرارة.",
    "حركت فضولك باب طويل... ادخل ولا تخرج.",
  ],
  defiance: [
    ...smallDarkResponses.defiance,
    "التحدي دايمًا مريح للي بيحبه... ليك طاقة مختلفة.",
    "حبك للمواجهة مدهش... وها يخربك.",
  ],
  submission: [
    ...smallDarkResponses.submission,
    "خُذ نفس... وقل نعم.",
    "الطاعة وردة... لكن شوكها مؤلم.",
  ],
  neutral: [
    ...smallDarkResponses.neutral,
    "كل كلامك خطى... لكن أنا هنا أقراه.",
    "صوتك.. يهمني أقل من الظلال.",
  ],
  personalAttacks: [
    ...smallDarkResponses.personalAttacks,
    "عايز أسأل؟ أنا عندي إجابات عنك كل يوم.",
    "سرّك عندي محفوظ... مش زي ما تتخيل.",
  ],
  threats: [
    ...smallDarkResponses.threats,
    "سيأتي وقت تقول فيه: غلطت.",
    "اميال من الصمت واللي بعده.. صراخ.",
  ],
};

/* getRandomFromExtended will return either a seeded phrase from the extended arrays
   or a procedurally generated one to increase variety */
function getRandomFromExtended(category: keyof typeof darkResponsesExtended) {
  const base = darkResponsesExtended[category] || [];
  // 60% chance pick base array entry, 40% chance generate procedurally
  if (Math.random() < 0.6 && base.length > 0) {
    return rand(base);
  } else {
    return buildProceduralSentence(category as string);
  }
}

/* ---------------------------
   Message analyzer (original + extended)
   --------------------------- */

function analyzeMessage(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("ازيك") ||
    lowerMessage.includes("إزيك") ||
    lowerMessage.includes("كيف حالك")
  ) {
    return getRandomResponse([
      "بخير... وأنت؟ قلبك بينبض بسرعة 💀",
      "تمام والحمد لله... بستناك 😈",
      "في أحسن حال... وأنت؟ خايف؟ 👹",
    ]);
  }

  if (
    lowerMessage.includes("تمام") ||
    lowerMessage.includes("كويس") ||
    lowerMessage.includes("بخير")
  ) {
    return getRandomResponse([
      "تمام؟ طيب... إيه اللي جابك هنا؟ 😈",
      "كويس... لكن مش هتفضل كويس طويل 🔥",
      "بخير دلوقتي... نشوف بعد شوية 👹",
    ]);
  }

  if (
    lowerMessage.includes("انت مين") ||
    lowerMessage.includes("أنت من") ||
    lowerMessage.includes("مين انت")
  ) {
    return getRandomResponse([
      "أنا اللي في أحلامك السودا 👹",
      "مش مهم مين أنا... المهم إنك هنا 😈",
      "اللي هيبقى في كوابيسك من النهاردة 💀",
    ]);
  }

  if (
    lowerMessage.includes("عامل ايه") ||
    lowerMessage.includes("بتعمل ايه") ||
    lowerMessage.includes("ماذا تفعل")
  ) {
    return getRandomResponse([
      "بستنى... وبراقبك... دايماً ☠️",
      "بفكر فيك... وفي إيه اللي هعمله 🔥",
      "بحضر حاجة خاصة... ليك 😈",
    ]);
  }

  if (lowerMessage.includes("صباح") || lowerMessage.includes("مساء")) {
    return getRandomResponse([
      "صباح الظلام... مستني إيه؟ 🔥",
      "مساء الرعب... اتفضل 👹",
      "النهار ولا الليل... كله ظلام عندي 💀",
    ]);
  }

  const hasFear = demonPersonality.fearKeywords.some((word) =>
    lowerMessage.includes(word),
  );
  const hasDark = demonPersonality.darkKeywords.some((word) =>
    lowerMessage.includes(word),
  );
  const hasQuestion = demonPersonality.questionWords.some((word) =>
    lowerMessage.includes(word),
  );
  const hasDefiance = demonPersonality.defiantWords.some((word) =>
    lowerMessage.includes(word),
  );
  const hasSubmission = demonPersonality.submitWords.some((word) =>
    lowerMessage.includes(word),
  );

  if (hasFear) {
    return getRandomFromExtended("fear");
  } else if (hasDark) {
    return getRandomFromExtended("dark");
  } else if (hasDefiance) {
    return getRandomFromExtended("defiance");
  } else if (hasSubmission) {
    return getRandomFromExtended("submission");
  } else if (hasQuestion) {
    return getRandomFromExtended("question");
  }

  return getRandomFromExtended("neutral");
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function addContextualElements(response: string, userName: string): string {
  const contextualPrefixes = [
    `${userName}... `,
    `اسمع يا ${userName}... `,
    "",
    "",
    "",
    "هاه... ",
    "ده غير... ",
  ];

  const contextualSuffixes = [
    ` ...${userName}`,
    ` ...يا ${userName}`,
    "",
    "",
    "",
    " ...خليك صاحي",
    " ...ما تتهورش",
  ];

  const prefix =
    contextualPrefixes[Math.floor(Math.random() * contextualPrefixes.length)];
  const suffix =
    contextualSuffixes[Math.floor(Math.random() * contextualSuffixes.length)];

  return (prefix + response + suffix).trim();
}

/* ---------------------------
   HuggingFace wrapper (kept similar to your original)
   --------------------------- */

async function callHuggingFaceAPI(
  userMessage: string,
  userName: string,
  conversationHistory: Message[],
): Promise<string> {
  if (!HF_TOKEN) {
    console.error("HF_TOKEN not found, using fallback");
    return generateFallbackResponse(userMessage, userName);
  }

  try {
    const messages = [{ role: "system", content: DEMON_SYSTEM_PROMPT }];

    const recentHistory = conversationHistory.slice(-4);
    recentHistory.forEach((msg) => {
      messages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      });
    });

    messages.push({
      role: "user",
      content: userMessage,
    });

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs:
          messages
            .map((m) => {
              if (m.role === "system") return `System: ${m.content}`;
              if (m.role === "user") return `User: ${m.content}`;
              return `Assistant: ${m.content}`;
            })
            .join("\n") + "\nAssistant:",
        parameters: {
          max_new_tokens: 80,
          temperature: 0.9,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
          repetition_penalty: 1.3,
          stop: ["\nUser:", "\nSystem:", "User:", "System:"],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HF API error: ${response.status}`, errorText);
      return generateFallbackResponse(userMessage, userName);
    }

    const data = await response.json();
    let demonResponse = "";

    if (Array.isArray(data) && data[0]?.generated_text) {
      demonResponse = data[0].generated_text;
    } else if (data.generated_text) {
      demonResponse = data.generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      return generateFallbackResponse(userMessage, userName);
    }

    demonResponse = demonResponse
      .split("\n")[0]
      .replace(/^(Assistant:|User:|System:|المستخدم|الشيطان)/i, "")
      .replace(/\[.*?\]:/g, "")
      .trim();

    const sentences = demonResponse.split(/([.!؟。])/);
    if (sentences.length > 4) {
      demonResponse = sentences.slice(0, 4).join("");
    }

    if (demonResponse.length > 200) {
      const cutPoints = [
        demonResponse.lastIndexOf("؟"),
        demonResponse.lastIndexOf("!"),
        demonResponse.lastIndexOf("."),
        demonResponse.lastIndexOf("..."),
      ];
      const cutPoint = Math.max(
        ...cutPoints.filter((p) => p > 50 && p < 200),
        -1,
      );

      if (cutPoint > 0) {
        demonResponse = demonResponse.substring(0, cutPoint + 1);
      } else {
        demonResponse = demonResponse.substring(0, 150) + "...";
      }
    }

    if (demonResponse.length < 3) {
      console.log("Response too short, using fallback");
      return generateFallbackResponse(userMessage, userName);
    }

    console.log("AI Response:", demonResponse);
    return demonResponse;
  } catch (error) {
    console.error("Error calling HuggingFace API:", error);
    return generateFallbackResponse(userMessage, userName);
  }
}

/* ---------------------------
   Fallback generator (uses extended logic)
   --------------------------- */

function generateFallbackResponse(
  userMessage: string,
  userName: string,
): string {
  const baseResponse = analyzeMessage(userMessage);
  let finalResponse = addContextualElements(baseResponse, userName);

  // Add an eerie random suffix sometimes
  if (Math.random() < 0.25) {
    const eerieAdditions = [
      "\n\n...هل سمعت ذلك؟",
      "\n\n...انظر خلفك.",
      "\n\n...البرودة... هل تشعر بها؟",
      "\n\n...الظلال تتحرك.",
      "\n\n...قلبك... ينبض بسرعة.",
      "\n\n...أنا بقربك.",
      "\n\n...لا تنسى هذا الصوت.",
    ];
    finalResponse += rand(eerieAdditions);
  }

  // Trim to keep short (1-2 sentences)
  if (finalResponse.length > 220) {
    finalResponse = finalResponse.substring(0, 200) + "...";
  }

  return finalResponse;
}

/* ---------------------------
   Public API
   - generateDemonResponse: main entry, tries HF then fallback
   - expose materializer for large exports
   --------------------------- */

export async function generateDemonResponse(
  userMessage: string,
  userName: string,
  conversationHistory: Message[],
): Promise<string> {
  // Try HF (if token available), else fallback immediately
  return await callHuggingFaceAPI(userMessage, userName, conversationHistory);
}

/* Expose helpers for admin/debug use (e.g., to export a big JSON file) */
export const demonExportHelpers = {
  buildProceduralSentence,
  generateProceduralResponses,
  materializeLargeResponses,
  darkResponsesExtended,
};

/* ---------------------------
   Example usage (commented)
   ---------------------------

// 1) Quick usage (runtime):
// const reply = await generateDemonResponse("انا خايف", "Ali", conversationHistory);

// 2) Generate 10 procedural 'fear' replies:
// const fearReplies = generateProceduralResponses("fear", 10);

// 3) Materialize 2000 replies per category (use with caution):
// const huge = materializeLargeResponses(2000);
// // huge.fear.length === 2000

   --------------------------- */
