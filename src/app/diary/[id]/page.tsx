
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
import { ChevronLeft, Save, AlertTriangle, Bot, Notebook } from 'lucide-react';
import AiChatbot from '@/components/app/ai-chatbot';
import TempNotes from '@/components/app/temp-notes';
import SavedDiaries from '@/components/app/saved-diaries';
import InformationDialog from '@/components/app/information-dialog';
import ConfirmationDialog from '@/components/app/confirmation-dialog';

export default function DiaryPage() {
  const router = useRouter();
  const params = useParams();
  const { getDiary, updateDiary, setIsLoading, unsavedDiary, setUnsavedDiary, clearUnsavedDiary } = useDiary();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    // This effect should only run once on mount to trigger the intro animation.
    setShowAnimation(true);
    const fadeOutTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 3000); // Start fade-out after 3s
    const removeTimer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000); // Remove from DOM after 4s (3s hold + 1s fade-out)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []); // Empty dependency array ensures this runs only once.


  useEffect(() => {
    if (id) {
      const foundDiary = getDiary(id);
      if (foundDiary) {
        setDiary(foundDiary);
        setIsLoading(false); // Stop loading indicator once diary is found
      } else {
        // Retry logic in case context is not populated yet
        setTimeout(() => {
          const retryDiary = getDiary(id);
          if (retryDiary) {
            setDiary(retryDiary);
            setIsLoading(false);
          } else {
            router.push('/');
          }
        }, 500);
      }
    }
  }, [id, getDiary, router, setIsLoading]);

  useEffect(() => {
    // Sync with unsaved changes from context
    if (unsavedDiary && unsavedDiary.id === id) {
      setDiary(unsavedDiary);
    }
  }, [id, unsavedDiary]);


  const handleSave = () => {
    if (diary) {
      updateDiary(diary.id, diary.entries);
      clearUnsavedDiary();
      setShowSaveConfirmation(true);
    }
  };

  const handleUpdateEntries = (updatedEntries: Diary['entries']) => {
    const newDiaryState = diary ? {...diary, entries: updatedEntries} : null;
    setDiary(newDiaryState);
    if (newDiaryState) {
        setUnsavedDiary(newDiaryState);
    }
  };

  const closeConfirmation = () => {
    setShowSaveConfirmation(false);
  }

  if (!diary && !showAnimation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading diary...</p>
      </div>
    );
  }
  
  if (!diary && showAnimation) {
      return (
         <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-sm ${isAnimatingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
            <div className="text-center">Loading...</div>
        </div>
      )
  }


  return (
    <>
      {showAnimation && diary && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-sm ${isAnimatingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
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
       <ConfirmationDialog
        isOpen={showSaveConfirmation}
        onClose={closeConfirmation}
        title="Diary Saved"
        description='You Can Now Exit. If you want to edit then click on "view saved"'
      />
      <div className={`relative p-4 sm:p-6 md:p-8 ${showAnimation ? 'animate-fade-in animate-delay-3000' : ''}`}>
        <div className="absolute top-4 right-4 z-50">
          <InformationDialog />
        </div>
        <div className="flex justify-between items-center mb-4">
          {unsavedDiary ? (
             <SavedDiaries>
                <Button variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                    <span className="text-destructive">Unsaved Work</span>
                </Button>
            </SavedDiaries>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
              <ChevronLeft />
            </Button>
          )}

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
                onUpdate={handleUpdateEntries}
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
