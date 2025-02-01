import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getAIResponse = async (prompt: string, systemPrompt: string) => {
  try {
    const { data: { OPENAI_API_KEY }, error } = await supabase
      .from('secrets')
      .select('OPENAI_API_KEY')
      .single();

    if (error || !OPENAI_API_KEY) {
      throw new Error('Failed to get API key');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get answer');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to get AI response');
  }
};