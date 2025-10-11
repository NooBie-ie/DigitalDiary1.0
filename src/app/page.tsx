"use client";

import React from 'react';
import Header from '@/components/app/header';
import NewDiaryDialog from '@/components/app/new-diary-dialog';
import SavedDiaries from '@/components/app/saved-diaries';
import AiChatbot from '@/components/app/ai-chatbot';
import TempNotes from '@/components/app/temp-notes';
import { Button } from '@/components/ui/button';
import { FilePlus2, Book, Bot, Notebook } from 'lucide-react';

export default function Home() {
  const [newDiaryOpen, setNewDiaryOpen] = React.useState(false);
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 animated-gradient z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <Header />
        
        <main className="flex flex-col items-center justify-center text-center mt-12">
          <p className="max-w-2xl text-lg text-foreground/80 mb-8">
            Welcome to your personal space. Create, reflect, and organize your thoughts with ease.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <NewDiaryDialog open={newDiaryOpen} onOpenChange={setNewDiaryOpen}>
              <Button size="lg" className="w-full h-24 flex-col gap-2 shadow-lg" onClick={() => setNewDiaryOpen(true)}>
                <FilePlus2 size={32} />
                <span>New Diary</span>
              </Button>
            </NewDiaryDialog>
            
            <SavedDiaries>
              <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg">
                <Book size={32} />
                <span>Saved Diaries</span>
              </Button>
            </SavedDiaries>

            <AiChatbot>
              <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg">
                <Bot size={32} />
                <span>Apna AI</span>
              </Button>
            </AiChatbot>
            
            <TempNotes>
               <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg">
                <Notebook size={32} />
                <span>Temp Notes</span>
              </Button>
            </TempNotes>
          </div>
        </main>
      </div>
    </div>
  );
}
