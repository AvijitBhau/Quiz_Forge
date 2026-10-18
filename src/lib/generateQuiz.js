import { supabase } from './supabase.js';

export async function generateQuiz({
  topic,
  difficulty,
  questionCount,
  material,
}) {
  const promptTopic = material?.trim()
    ? `Create a quiz based on this study material:\n${material.trim()}`
    : topic.trim();

  const { data, error } = await supabase.functions.invoke(
    'generate-quiz',
    {
      body: {
        topic: promptTopic,
        difficulty:
          difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        questionCount: Number(questionCount),
      },
    }
  );

  if (error) {
    console.error('Supabase function error:', error);
    throw new Error(error.message || 'Failed to call Gemini.');
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  if (!Array.isArray(data?.questions) || !data.questions.length) {
    throw new Error('Gemini returned no questions.');
  }

  return data;
}