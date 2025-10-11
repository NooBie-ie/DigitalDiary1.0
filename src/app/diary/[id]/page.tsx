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
  const { getDiary, updateDiary } = useDiary();
  const [diary, setDiary] = useState<Diary | null>(null);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      const foundDiary = getDiary(id);
      if (foundDiary) {
        setDiary(foundDiary);
      } else {
        // redirect to home if diary not found after a short delay
        setTimeout(() => router.push('/'), 1000);
      }
    }
  }, [id, getDiary, router]);

  const handleSave = () => {
    if (diary) {
      updateDiary(diary.id, diary.entries);
      // In a real app, you would show a toast message
      alert('Diary Saved!');
    }
  };

  if (!diary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading diary or diary not found...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
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
            <CardTitle>
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
  );
}
