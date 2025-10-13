
'use server';

/**
 * @fileOverview A general question-answering AI agent.
 *
 * - askQuestion - A function that answers a question using Genkit.
 * - AskQuestionInput - The input type for the askQuestion function.
 * - AskQuestionOutput - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskQuestionInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
});
export type AskQuestionInput = z.infer<typeof AskQuestionInputSchema>;

const AskQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AskQuestionOutput = z.infer<typeof AskQuestionOutputSchema>;

export async function askQuestion(input: AskQuestionInput): Promise<AskQuestionOutput> {
  return askQuestionFlow(input);
}

const askQuestionPrompt = ai.definePrompt({
  name: 'askQuestionPrompt',
  input: AskQuestionInputSchema,
  output: AskQuestionOutputSchema,
  prompt: `You are a helpful assistant. Answer the following question: {{{question}}}`,
});

const askQuestionFlow = ai.defineFlow(
  {
    name: 'askQuestionFlow',
    inputSchema: AskQuestionInputSchema,
    outputSchema: AskQuestionOutputSchema,
  },
  async input => {
    const {output} = await askQuestionPrompt(input);
    return output!;
  }
);
