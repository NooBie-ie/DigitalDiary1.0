'use server';
/**
 * @fileOverview An AI agent that provides writing prompts for diary entries.
 *
 * - provideWritingPrompts - A function that generates writing prompts.
 * - WritingPromptsInput - The input type for the provideWritingPrompts function.
 * - WritingPromptsOutput - The return type for the provideWritingPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WritingPromptsInputSchema = z.object({
  topic: z
    .string()
    .describe('The general topic or theme the user wants to write about.'),
});
export type WritingPromptsInput = z.infer<typeof WritingPromptsInputSchema>;

const WritingPromptsOutputSchema = z.object({
  prompts: z
    .array(z.string())
    .describe('An array of writing prompts related to the topic.'),
});
export type WritingPromptsOutput = z.infer<typeof WritingPromptsOutputSchema>;

export async function provideWritingPrompts(input: WritingPromptsInput): Promise<WritingPromptsOutput> {
  return provideWritingPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'writingPromptsPrompt',
  input: {schema: WritingPromptsInputSchema},
  output: {schema: WritingPromptsOutputSchema},
  prompt: `You are a helpful AI assistant designed to provide creative writing prompts for diary entries.

  Generate 5 unique and engaging writing prompts based on the following topic:

  Topic: {{{topic}}}

  Format the output as a JSON array of strings.  Each string should be a complete sentence.  The array should be called \"prompts\".  Don't include any other preamble or postamble.  Only the JSON.  Make them suitable for use in a personal diary.
  `,
});

const provideWritingPromptsFlow = ai.defineFlow(
  {
    name: 'provideWritingPromptsFlow',
    inputSchema: WritingPromptsInputSchema,
    outputSchema: WritingPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
