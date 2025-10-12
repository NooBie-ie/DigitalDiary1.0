"use client";

import React from 'react';
import Header from '@/components/app/header';
import NewDiaryDialog from '@/components/app/new-diary-dialog';
import SavedDiaries from '@/components/app/saved-diaries';
import AiChatbot from '@/components/app/ai-chatbot';
import TempNotes from '@/components/app/temp-notes';
import { Button } from '@/components/ui/button';
import { FilePlus2, Book, Bot, Notebook } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';

export default function Home() {
  const [newDiaryOpen, setNewDiaryOpen] = React.useState(false);
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 animated-gradient z-0"></div>
       <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {SUBJECTS.map(({ Icon }, index) => {
          const size = Math.random() * 80 + 40;
          const duration = Math.random() * 20 + 15;
          const delay = Math.random() * -20;
          
          // Constrain positions to be more spread out and avoid the center
          let top, left;
          if (index % 4 === 0) { // Top-left quadrant
            top = Math.random() * 40;
            left = Math.random() * 40;
          } else if (index % 4 === 1) { // Top-right quadrant
            top = Math.random() * 40;
            left = Math.random() * 40 + 60;
          } else if (index % 4 === 2) { // Bottom-left quadrant
            top = Math.random() * 40 + 60;
            left = Math.random() * 40;
          } else { // Bottom-right quadrant
            top = Math.random() * 40 + 60;
            left = Math.random() * 40 + 60;
          }

          return (
            <Icon
              key={index}
              className="absolute text-white/10 m-8"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `float ${duration}s ease-in-out infinite ${delay}s`,
                filter: 'blur(20%)',
                transform: 'translate(-50%, -50%)', // Center the icon on its coordinates
              }}
            />
          );
        })}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <Header />
        
        <main className="flex flex-col items-center justify-center text-center mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <NewDiaryDialog open={newDiaryOpen} onOpenChange={setNewDiaryOpen}>
              <Button size="lg" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect" onClick={() => setNewDiaryOpen(true)}>
                <FilePlus2 size={56} />
                <span className="text-lg">New Diary</span>
              </Button>
            </NewDiaryDialog>
            
            <SavedDiaries>
              <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect">
                <Book size={56} />
                <span className="text-lg">Saved Diaries</span>
              </Button>
            </SavedDiaries>

            <AiChatbot>
              <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect">
                <Bot size={56} />
                <span className="text-lg">Apna AI</span>
              </Button>
            </AiChatbot>
            
            <TempNotes>
               <Button size="lg" variant="secondary" className="w-full h-24 flex-col gap-2 shadow-lg glass-effect">
                <Notebook size={56} />
                <span className="text-lg">Temp Notes</span>
              </Button>
            </TempNotes>
          </div>
        </main>
      </div>
    </div>
  );
}
