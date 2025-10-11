"use client";

import React, { useState } from 'react';
import { provideWritingPrompts } from '@/ai/flows/ai-provide-writing-prompts';
import { askQuestion } from '@/ai/flows/ai-ask-question';
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
  const [answer, setAnswer] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAskQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    if (!question) return;

    setIsLoading(true);
    setAnswer('');
    try {
      const result = await askQuestion({ question });
      setAnswer(result.answer);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get an answer.', variant: 'destructive' });
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
        <Tabs defaultValue="ask" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ask">Ask Questions</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
          </TabsList>
          <TabsContent value="ask">
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <Textarea name="question" placeholder="Ask any question..." rows={6} className="glass-effect" />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Ask'}
              </Button>
            </form>
            {answer && (
              <Card className="mt-4 bg-primary/50">
                <CardContent className="p-4 text-sm">{answer}</CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="prompts">
            <form onSubmit={handleGetPrompts} className="space-y-4">
              <Input name="promptTopic" placeholder="Enter a topic, e.g., 'a rainy day'" className="glass-effect" />
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
