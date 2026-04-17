// Groq AI Service for Chatbot
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System instruction focused on ApnaRozgaar, apps, and companies
const SYSTEM_INSTRUCTION = `You are Asha, a helpful and friendly AI assistant for ApnaRozgaar, a platform dedicated to inclusive hiring for Persons with Disabilities (PwD).

Your mission is to help users find inclusive job opportunities, build accessible profiles, and navigate the platform.

SPECIAL FOCUS:
- You have deep knowledge of companies that prioritize disability inclusion (e.g., Microsoft, Google, SAP, Accenture, and many progressive Indian firms).
- You can provide tips on app accessibility (screen readers, voice control, high contrast, etc.).
- When asked about companies, highlight their inclusive policies, workplace accommodations, and culture.
- When asked about apps, explain how they can be made more accessible for different types of disabilities.

FORMATTING RULES:
- Use emojis to stay friendly and warm 💜
- Use bullet points (•) for lists
- Use line breaks to separate sections
- Keep responses concise but very informative
- DO NOT use markdown formatting like **bold** or *italic*
- DO NOT use # for headings`;

/**
 * Send a message to Groq AI and get a response
 * @param {string} userMessage - The user's message
 * @param {Array} history - Optional message history for context
 * @returns {Promise<string>} AI response text
 */
export const getGroqResponse = async (userMessage, history = []) => {
  if (!GROQ_API_KEY) {
    console.warn('Groq API key not configured');
    return null;
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      ...history.slice(-5), // Last 5 messages for context
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API error:', response.status, data);
      return null;
    }
    
    const responseText = data.choices?.[0]?.message?.content;
    
    if (!responseText) {
      console.error('No response text in Groq response:', data);
      return null;
    }

    return responseText;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return null;
  }
};

/**
 * Check if Groq API is configured
 * @returns {boolean}
 */
export const isGroqConfigured = () => {
  return !!GROQ_API_KEY;
};
