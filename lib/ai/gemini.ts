export async function callGeminiStructured<T>(
  systemPrompt: string,
  userPrompt: string,
  fallbackData: T
): Promise<{ data: T; source: 'gemini' | 'agent_engine' }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return { data: fallbackData, source: 'agent_engine' };
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemPrompt}\n\nIMPORTANT: Respond ONLY with valid, raw JSON. Do not include markdown codeblocks (no \`\`\`json), no preamble, no postscript.\n\n${userPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      console.warn(`Gemini API error status: ${response.status}. Using agent engine fallback.`);
      return { data: fallbackData, source: 'agent_engine' };
    }

    const resJson = await response.json();
    const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return { data: fallbackData, source: 'agent_engine' };
    }

    const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleanJson) as T;
    return { data: parsed, source: 'gemini' };
  } catch (err) {
    console.warn('Failed to parse Gemini response. Recovering via Agent Engine:', err);
    return { data: fallbackData, source: 'agent_engine' };
  }
}
