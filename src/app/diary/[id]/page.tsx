"use client";

import React, { useEffect, useState } from 'react';
import { useDiary } from '@/context/diary-context';
import { useParams, useRouter } from 'next/navigation';
import type { Diary } from '@/lib/types';
import Header from '@/components/app/header';
import DiaryTable from '@/components/app/diary-table';
import DigitalClock from '@/components/app/digital-clock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';
import AiChatbot from '@/components/app/ai-chatbot';
import TempNotes from '@/components/app/temp-notes';
import { Bot, Notebook } from 'lucide-react';
import SavedDiaries from '@/components/app/saved-diaries';

export default function DiaryPage() {
  const router = useRouter();
  const params = useParams();
  const { getDiary, updateDiary, setIsLoading } = useDiary();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    // Turn off blur effect when the page starts loading
    setIsLoading(false);
    
    if (id) {
      const foundDiary = getDiary(id);
      if (foundDiary) {
        setDiary(foundDiary);
        setShowAnimation(true);
        const timer = setTimeout(() => {
          setShowAnimation(false);
        }, 4000); // 1s fade-in + 3s hold
        return () => clearTimeout(timer);
      } else {
        // If diary not found, maybe it's still loading from storage
        setTimeout(() => {
          const retryDiary = getDiary(id);
          if (retryDiary) {
            setDiary(retryDiary);
          } else {
            router.push('/');
          }
        }, 500);
      }
    }
  }, [id, getDiary, router, setIsLoading]);


  const handleSave = () => {
    if (diary) {
      updateDiary(diary.id, diary.entries);
      alert('Diary Saved!');
    }
  };

  if (!diary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading diary...</p>
      </div>
    );
  }

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-sm animate-fade-in animate-duration-1000 animate-fill-forwards">
           <div className="glass-effect rounded-lg p-8 shadow-2xl animate-slide-in-from-top animate-duration-1000 animate-delay-100 animate-fill-forwards animate-once">
            <h2 className="text-3xl font-bold text-center">
              {diary.className} &lsquo;{diary.section}&rsquo;
            </h2>
            <p className="text-xl text-center text-muted-foreground mt-2">
              {diary.teacherName}
            </p>
          </div>
        </div>
      )}
      <div className={`p-4 sm:p-6 md:p-8 ${showAnimation ? 'animate-fade-in animate-delay-3000' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <ChevronLeft />
          </Button>
          <div className="flex gap-2">
            <AiChatbot>
              <Button variant="outline" size="icon"><Bot /></Button>
            </AiChatbot>
            <TempNotes>
              <Button variant="outline" size="icon"><Notebook /></Button>
            </TempNotes>
          </div>
        </div>
        
        <Header />

        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="glass-effect">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-3xl">
                {diary.className} {diary.section} - {diary.teacherName}
              </CardTitle>
              <DigitalClock />
            </CardHeader>
            <CardContent>
              <DiaryTable
                entries={diary.entries}
                onUpdate={(updatedEntries) => {
                  setDiary(d => d ? {...d, entries: updatedEntries} : null)
                }}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
              <SavedDiaries>
                  <Button variant="secondary">View Saved</Button>
              </SavedDiaries>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Diary
              </Button>
          </div>
        </div>
      </div>
    </>
  );
}
