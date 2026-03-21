const CarbonResult = require("../models/CarbonResult");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";

const RESPONSE_STYLES = [
  {
    name: "short-answer",
    instruction:
      "Use a concise response with 3-5 focused lines and one quick action to start today.",
  },
  {
    name: "step-by-step-plan",
    instruction:
      "Use a numbered 4-step practical plan that can be started this week.",
  },
  {
    name: "bullet-points",
    instruction:
      "Use crisp bullet points with action + expected benefit for each bullet.",
  },
  {
    name: "casual-explanation",
    instruction:
      "Use a conversational tone with clear explanation and realistic examples.",
  },
];

const INTRO_LINES = [
  "Looking at your footprint pattern...",
  "From your current sustainability data...",
  "A practical improvement path for you...",
  "Based on your weekly trend...",
  "Here is a focused action plan for your profile...",
];

const TEMPERATURE_CHOICES = [0.72, 0.78, 0.84, 0.9];

function randomItem(list = []) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function randomTemperature() {
  return randomItem(TEMPERATURE_CHOICES) ?? 0.8;
}

function buildFallbackReply(message, context = {}) {
  const lower = String(message || "").toLowerCase();
  const co2 = typeof context.totalCO2 === "number" ? context.totalCO2 : null;
  const eco = typeof context.ecoScore === "number" ? context.ecoScore : null;

  let focus = "transportation and electricity";
  if (lower.includes("electric") || lower.includes("power"))
    focus = "electricity";
  if (lower.includes("waste") || lower.includes("recycle")) focus = "waste";
  if (lower.includes("plastic")) focus = "plastic usage";
  if (lower.includes("transport") || lower.includes("commute"))
    focus = "transportation";

  const introSeed = randomItem(INTRO_LINES) || "Here is a focused plan";
  const intro =
    co2 !== null && eco !== null
      ? `${introSeed} Your current values are ${co2.toFixed(1)} kg/week and eco score ${eco}/100.`
      : `${introSeed} Start by prioritizing ${focus}.`;

  const fallbackMode = randomItem(["short", "steps", "bullets"]) || "steps";

  if (fallbackMode === "short") {
    return [
      intro,
      `Highest-impact focus: ${focus}.`,
      "Do one repeatable action for 7 days and measure change at week end.",
      "Then add one low-effort habit to compound progress.",
    ].join("\n");
  }

  if (fallbackMode === "bullets") {
    return [
      intro,
      "",
      "- Prioritize one high-impact change in your main emission area.",
      "- Keep the action easy enough to repeat daily for one week.",
      "- Track CO2 and eco score change weekly to validate progress.",
      "- Add one extra habit only after consistency is stable.",
    ].join("\n");
  }

  return [
    intro,
    "",
    "Try this practical 7-day plan:",
    "1. Pick one high-impact change and repeat it daily.",
    "2. Track the result at the end of the week.",
    "3. Add one additional low-effort habit next week.",
    "",
    "Share your commute, electricity, and waste routine for a tighter personalized plan.",
  ].join("\n");
}

function buildSystemPrompt(context = {}, dynamicStyle, introLine) {
  const ecoScoreText =
    typeof context.ecoScore === "number"
      ? `${context.ecoScore}/100`
      : "unknown";
  const co2Text =
    typeof context.totalCO2 === "number"
      ? `${context.totalCO2.toFixed(1)} kg/week`
      : "unknown";
  const transportText = context.transportType || "unknown";

  return [
    "You are an intelligent AI sustainability advisor.",
    "Your goal is to provide practical, personalized, and actionable guidance.",
    "Never produce identical responses for different turns.",
    "Vary structure and wording naturally between turns.",
    "Prioritize high-impact actions first, then low-effort quick wins.",
    "Identify likely biggest emission source from context and question.",
    "Avoid generic motivational fluff and avoid unrealistic advice.",
    "When useful, include estimated impact ranges.",
    dynamicStyle?.instruction ||
      "Use a concise but practical format with clear next actions.",
    `Start your response with this opener: ${introLine || "Here is a focused recommendation."}`,
    "",
    "User context:",
    `- CO2: ${co2Text}`,
    `- Eco Score: ${ecoScoreText}`,
    `- Main transport type: ${transportText}`,
  ].join("\n");
}

async function callLLM({ message, context, history = [] }) {
  if (!OPENAI_API_KEY) {
    return {
      reply:
        "AI provider is not configured yet. Please set OPENAI_API_KEY in backend environment to enable dynamic AI responses.",
      provider: "none",
    };
  }

  const selectedStyle = randomItem(RESPONSE_STYLES) || RESPONSE_STYLES[0];
  const introLine =
    randomItem(INTRO_LINES) || "Here is a focused recommendation.";
  const temperature = randomTemperature();

  const messages = [
    {
      role: "system",
      content: buildSystemPrompt(context, selectedStyle, introLine),
    },
    ...history.map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: item.content,
    })),
    { role: "user", content: message },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature,
        max_tokens: 450,
        messages,
      }),
      signal: controller.signal,
    });

    const data = await response.json();
    if (!response.ok) {
      const detail = data?.error?.message || "LLM API request failed";
      const err = new Error(detail);
      err.llmStatus = response.status;
      throw err;
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error("LLM returned an empty response");
    }

    return {
      reply,
      provider: "openai",
      model: OPENAI_MODEL,
      style: selectedStyle.name,
      temperature,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function enrichContextFromLatestResult(context = {}, userId) {
  const enriched = { ...(context || {}) };

  const needsEcoScore = typeof enriched.ecoScore !== "number";
  const needsTotalCO2 = typeof enriched.totalCO2 !== "number";
  const needsTransportType = !enriched.transportType;

  if (!userId || (!needsEcoScore && !needsTotalCO2 && !needsTransportType)) {
    return enriched;
  }

  const latest = await CarbonResult.findOne({ user: userId })
    .sort({ createdAt: -1 })
    .select("results inputs")
    .lean();

  if (!latest) {
    return enriched;
  }

  if (needsEcoScore && typeof latest?.results?.ecoScore === "number") {
    enriched.ecoScore = latest.results.ecoScore;
  }

  if (needsTotalCO2 && typeof latest?.results?.totalCO2 === "number") {
    enriched.totalCO2 = latest.results.totalCO2;
  }

  if (needsTransportType && latest?.inputs?.transportType) {
    enriched.transportType = latest.inputs.transportType;
  }

  return enriched;
}

function hasContextValue(context = {}) {
  return (
    typeof context.ecoScore === "number" ||
    typeof context.totalCO2 === "number" ||
    (typeof context.transportType === "string" && context.transportType.trim())
  );
}

function resolveContextSource(requestContext = {}, enrichedContext = {}) {
  const hasRequestContext = hasContextValue(requestContext);
  const hasFinalContext = hasContextValue(enrichedContext);

  if (!hasFinalContext) {
    return "none";
  }

  if (hasRequestContext) {
    return "request";
  }

  return "enriched";
}

// @route  POST /api/ai/chat
// @access Public (token optional; if valid, missing context is enriched from latest saved result)
const chat = async (req, res) => {
  try {
    const { message, context, ecoScore, co2, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message is required." });
    }

    const requestContext = {
      ...(context || {}),
      ecoScore: typeof ecoScore === "number" ? ecoScore : context?.ecoScore,
      totalCO2: typeof co2 === "number" ? co2 : context?.totalCO2,
    };

    const enrichedContext = await enrichContextFromLatestResult(
      requestContext,
      req.user?._id,
    );
    const contextSource = resolveContextSource(requestContext, enrichedContext);

    let response;
    try {
      response = await callLLM({
        message: message.trim(),
        context: enrichedContext,
        history,
      });
    } catch (llmError) {
      const status = Number(llmError?.llmStatus || 0);
      const detail = String(llmError?.message || "").toLowerCase();
      const isQuotaOrProviderIssue =
        status === 401 ||
        status === 402 ||
        status === 403 ||
        status === 429 ||
        detail.includes("quota") ||
        detail.includes("billing") ||
        detail.includes("rate limit") ||
        detail.includes("insufficient_quota") ||
        detail.includes("api key") ||
        detail.includes("fetch failed") ||
        detail.includes("aborted");

      if (!isQuotaOrProviderIssue) {
        throw llmError;
      }

      console.warn(
        "AI provider unavailable, serving fallback reply:",
        llmError.message,
      );
      response = {
        reply: buildFallbackReply(message, enrichedContext),
        provider: "fallback",
        model: null,
      };
    }

    res.status(200).json({
      reply: response.reply,
      provider: response.provider,
      model: response.model,
      style: response.style,
      temperature: response.temperature,
      contextSource,
    });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ message: "Failed to generate response." });
  }
};

module.exports = { chat };
