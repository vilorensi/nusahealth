import { supabase } from "@/integrations/supabase/client";
import OpenAI from "openai";

const checkApiKey = async () => {
  console.log("Checking Supabase connection...");
  const { data, error } = await supabase
    .from("secrets")
    .select("value")
    .eq("name", "openai_api_key")
    .single();

  console.log("Supabase API response:", data, error);
};

// Run check immediately when file loads
checkApiKey();

export const getAIResponse = async (userInput: string, systemPrompt: string) => {
  try {
    console.log("Making request to OpenAI API...");
    
    const { data, error } = await supabase
      .from("secrets")
      .select("value")
      .eq("name", "openai_api_key")
      .single();

    if (error) {
      throw new Error(`Failed to get API key: ${error.message}`);
    }

    if (!data?.value) {
      throw new Error("No API key found");
    }

    console.log("API Key retrieved successfully");

    const openai = new OpenAI({
      apiKey: data.value,
      dangerouslyAllowBrowser: true
    });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error Response:", error);
    throw new Error(`AI Response Error: ${JSON.stringify(error)}`);
  }
};