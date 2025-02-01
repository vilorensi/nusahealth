import { supabase } from "@/integrations/supabase/client";

async function checkApiKey() {
  const { data, error } = await supabase
    .from("secrets")
    .select("*")
    .eq("name", "openai_api_key");

  console.log("Supabase API Key Data:", data, error);
}

// Run the check immediately
checkApiKey();

export const getAIResponse = async (prompt: string, systemPrompt: string) => {
  try {
    // Debug Supabase connection
    console.log('Checking Supabase connection...');
    const { data: secretData, error: secretError } = await supabase
      .from('secrets')
      .select('*')
      .eq('name', 'openai_api_key')
      .single();

    console.log('Supabase query result:', { 
      data: secretData ? 'API key exists' : 'No API key found', 
      error: secretError 
    });

    if (secretError) {
      console.error('Error fetching API key:', secretError);
      throw new Error('Failed to get API key: ' + secretError.message);
    }

    if (!secretData?.value) {
      console.error('No API key found in secrets table');
      throw new Error('OpenAI API key not found in Supabase secrets.');
    }

    const openAIApiKey = secretData.value;
    console.log('API Key retrieved successfully');

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
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
      const errorData = await response.json();
      console.error('OpenAI API Error Response:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI API Response received');
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', data);
      throw new Error('Unexpected API response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
};