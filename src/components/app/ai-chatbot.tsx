
"use client";

import React, { useState, useEffect } from 'react';
import { askQuestion } from '@/ai/flows/ai-ask-question';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Trash2, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AiChatbotProps {
  children: React.ReactNode;
}

type HistoryItem = {
  id: string;
  question: string;
  answer: string;
};

const AI_HISTORY_STORAGE_KEY = 'ai-chat-history';

export default function AiChatbot({ children }: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedHistory = window.localStorage.getItem(AI_HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load AI history from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(AI_HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save AI history to local storage", error);
    }
  }, [history]);

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
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        question,
        answer: result.answer,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get an answer.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
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
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="ask">
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <Textarea name="question" placeholder="Ask any question..." rows={6} className="glass-effect" />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Ask'}
              </Button>
            </form>
            {answer && (
              <ScrollArea className="h-48 mt-4">
                <Card className="bg-primary/50">
                  <CardContent className="p-4 text-sm whitespace-pre-wrap">{answer}</CardContent>
                </Card>
              </ScrollArea>
            )}
          </TabsContent>
          <TabsContent value="history">
            <ScrollArea className="h-96">
                {history.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {history.map((item) => (
                            <AccordionItem value={item.id} key={item.id} className="glass-effect rounded-md mb-2 px-2">
                                <AccordionTrigger className="text-sm text-left hover:no-underline">
                                  <span className="truncate flex-1 pr-4">{item.question}</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                      <p className="text-xs text-muted-foreground whitespace-pre-wrap">{item.answer}</p>
                                      <div className="flex justify-end">
                                          <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => deleteHistoryItem(item.id)}>
                                            <Trash2 size={16} />
                                          </Button>
                                      </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="text-center text-muted-foreground py-10">
                        No history yet. Ask a question to get started!
                    </div>
                )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
