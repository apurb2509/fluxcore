import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const classifyEmail = async (subject, body) => {
  const prompt = `
  Analyze this email for FluxCore and return a JSON object.
  Categories: ORDERS, REFUNDS, MARKETING, CRM, SENTIMENT.
      You are an AI Revenue Operations Classifier for FluxCore. 
  Analyze the following email and categorize it into exactly ONE of these domains:
  1. ORDERS: Questions about package location, delivery status, or shipping delays.
  2. REFUNDS: Requests for money back, return status, or warranty claims.
  3. MARKETING: Questions about coupons, loyalty points, or current campaigns.
  4. CRM: Partnership proposals, bulk orders, or business inquiries.
  5. SENTIMENT: High-priority angry or very disappointed customers.

    Output the result in JSON format:
    {
      "category": "DOMAIN_NAME",
      "urgency": "high|medium|low",
      "reason": "Brief explanation"
    }
    Email Subject: ${subject}
    Email Body: ${body}
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
console.log("🧠 Full AI Response:", JSON.stringify(data, null, 2));

    const text = data.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    console.log("📄 AI Brain Response:", text);

    try {
      return JSON.parse(text);
    } catch {
      return {
        category: "CRM",
        urgency: "medium",
        reason: "Invalid JSON from AI",
      };
    }

  } catch (error) {
    console.error("❌ AI Error:", error.message);
    throw error;
  }
};
