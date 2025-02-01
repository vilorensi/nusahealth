import { supabase } from "@/integrations/supabase/client";

export const getAIResponse = async (prompt: string, systemPrompt: string) => {
  try {
    // Fetch the OpenAI API key from Supabase secrets
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'OPENAI_API_KEY')
      .limit(1)
      .single();

    if (secretError) {
      console.error('Error fetching OpenAI API key:', secretError);
      throw new Error('Failed to get API key: ' + secretError.message);
    }

    if (!secretData || !secretData.value) {
      console.error('No API key found in secrets');
      throw new Error('No API key found in secrets');
    }

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretData.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
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
      console.error('OpenAI API Error Response:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI API Response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response format:', data);
      throw new Error('Unexpected API response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
};