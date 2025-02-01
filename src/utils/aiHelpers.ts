import { supabase } from "@/integrations/supabase/client";

export const getAIResponse = async (prompt: string, systemPrompt: string) => {
  try {
    // Fetch the OpenAI API key from Supabase secrets table
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'OPENAI_API_KEY')
      .single();

    if (secretError || !secretData) {
      console.error('Error fetching OpenAI API key:', secretError);
      throw new Error('Failed to get API key');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretData.value}`,
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

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
};