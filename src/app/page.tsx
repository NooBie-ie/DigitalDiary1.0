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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <NewDiaryDialog open={newDiaryOpen} onOpenChange={setNewDiaryOpen}>
              <Button size="lg" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect" onClick={() => setNewDiaryOpen(true)}>
                <FilePlus2 size={48} />
                <span className="text-lg">New Diary</span>
              </Button>
            </NewDiaryDialog>
            
            <SavedDiaries>
              <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect">
                <Book size={48} />
                <span className="text-lg">Saved Diaries</span>
              </Button>
            </SavedDiaries>

            <AiChatbot>
              <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect">
                <Bot size={48} />
                <span className="text-lg">Apna AI</span>
              </Button>
            </AiChatbot>
            
            <TempNotes>
               <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect">
                <Notebook size={48} />
                <span className="text-lg">Temp Notes</span>
              </Button>
            </TempNotes>
          </div>
        </main>
      </div>
    </div>
  );
}
