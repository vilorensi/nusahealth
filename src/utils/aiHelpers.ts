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
      console.error("Error fetching API key:", error);
      throw new Error(`Failed to get API key: ${error.message}`);
    }

    if (!data?.value) {
      console.error("No API key found in database");
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
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 500
    });

    if (!completion.choices?.[0]?.message?.content) {
      console.error("Invalid response structure from OpenAI:", completion);
      throw new Error("Invalid response structure from OpenAI");
    }

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error("OpenAI API Error Response:", error);
    if (error.response) {
      throw new Error(`AI Response Error: ${error.response.data.error.message}`);
    }
    throw new Error(`AI Response Error: ${error.message}`);
  }
};