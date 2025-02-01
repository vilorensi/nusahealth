import { supabase } from "@/integrations/supabase/client";

export const getAIResponse = async (prompt: string, systemPrompt: string) => {
  try {
    console.log('Fetching Alibaba API key from Supabase...');
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'ALIBABA_API_KEY')
      .single();

    if (secretError) {
      console.error('Error fetching API key:', secretError);
      throw new Error('Failed to get API key: ' + secretError.message);
    }

    if (!secretData?.value) {
      console.error('No API key found in secrets');
      throw new Error('No API key found in Supabase secrets');
    }

    console.log('Making request to Alibaba Cloud API...');
    const response = await fetch('https://nlp.aliyuncs.com/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretData.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
        parameters: {
          temperature: 0.2,
          maxTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Alibaba Cloud API Error Response:', errorData);
      throw new Error(`Alibaba Cloud API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Alibaba Cloud API Response:', data);
    
    if (!data.output?.text) {
      console.error('Unexpected API response format:', data);
      throw new Error('Unexpected API response format');
    }

    return data.output.text;
  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
};