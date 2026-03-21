const { z } = require("zod");

const historyMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1000),
});

const aiChatSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(1500),
  ecoScore: z.number().min(0).max(100).optional(),
  co2: z.number().min(0).optional(),
  history: z.array(historyMessageSchema).max(12).optional().default([]),
  context: z
    .object({
      ecoScore: z.number().min(0).max(100).optional(),
      totalCO2: z.number().min(0).optional(),
      transportType: z.string().max(30).optional(),
    })
    .optional()
    .default({}),
});

module.exports = { aiChatSchema };
