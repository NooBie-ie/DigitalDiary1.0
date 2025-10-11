"use client";

import React, { useState } from 'react';
import { provideWritingPrompts } from '@/ai/flows/ai-provide-writing-prompts';
import { summarizeText } from '@/ai/flows/ai-summarize-text';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useToast } from '@/hooks/use-toast';

interface AiChatbotProps {
  children: React.ReactNode;
}

export default function AiChatbot({ children }: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSummarize = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('textToSummarize') as string;
    if (!text) return;

    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeText({ text });
      setSummary(result.summary);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to generate summary.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetPrompts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const topic = formData.get('promptTopic') as string;
    if (!topic) return;

    setIsLoading(true);
    setPrompts([]);
    try {
      const result = await provideWritingPrompts({ topic });
      setPrompts(result.prompts);
    } catch (error) {
       toast({ title: 'Error', description: 'Failed to generate prompts.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md glass-effect">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 />
            Apna AI Assistant
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="summarize" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summarize">Summarizer</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
          </TabsList>
          <TabsContent value="summarize">
            <form onSubmit={handleSummarize} className="space-y-4">
              <Textarea name="textToSummarize" placeholder="Paste your text here to summarize..." rows={6} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Summarize'}
              </Button>
            </form>
            {summary && (
              <Card className="mt-4 bg-primary/50">
                <CardContent className="p-4 text-sm">{summary}</CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="prompts">
            <form onSubmit={handleGetPrompts} className="space-y-4">
              <Input name="promptTopic" placeholder="Enter a topic, e.g., 'a rainy day'" />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Get Prompts'}
              </Button>
            </form>
            {prompts.length > 0 && (
              <Card className="mt-4 bg-primary/50">
                <CardContent className="p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {prompts.map((prompt, i) => <li key={i}>{prompt}</li>)}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
