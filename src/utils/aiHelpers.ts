import { supabase } from "@/integrations/supabase/client";

export const getAIResponse = async (prompt: string, systemPrompt: string) => {
  try {
    const { data, error } = await supabase
      .from('secrets')
      .select('OPENAI_API_KEY')
      .single();

    if (error) {
      console.error('Error fetching API key:', error);
      throw new Error('Failed to get API key');
    }

    if (!data || !data.OPENAI_API_KEY) {
      console.error('No API key found');
      throw new Error('OpenAI API key not found');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${data.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error('Failed to get answer from OpenAI');
    }

    const data2 = await response.json();
    return data2.choices[0].message.content;
  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
};