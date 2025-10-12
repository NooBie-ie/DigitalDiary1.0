"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Diary, DiaryRow } from '@/lib/types';

interface DiaryContextType {
  diaries: Diary[];
  addDiary: (diary: Omit<Diary, 'id' | 'createdAt' | 'entries'>) => Diary;
  updateDiary: (id: string, updatedEntries: DiaryRow[]) => void;
  getDiary: (id: string) => Diary | undefined;
  deleteDiary: (id: string) => void;
  updateDiaryDetails: (id: string, className: string, section: string, teacherName: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

const DIARY_STORAGE_KEY = 'digitalis-diaries';

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const storedDiaries = window.localStorage.getItem(DIARY_STORAGE_KEY);
      if (storedDiaries) {
        setDiaries(JSON.parse(storedDiaries));
      }
    } catch (error) {
      console.error("Failed to load diaries from local storage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(diaries));
      } catch (error) {
        console.error("Failed to save diaries to local storage", error);
      }
    }
  }, [diaries, isLoaded]);

  const addDiary = (diaryData: Omit<Diary, 'id' | 'createdAt' | 'entries'>): Diary => {
    const newDiary: Diary = {
      ...diaryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      entries: Array.from({ length: 6 }, (_, i) => ({
        id: `row-${Date.now()}-${i}`,
        subject: '',
        topic: '',
        cw: '',
        hw: '',
      })),
    };
    setDiaries((prev) => [...prev, newDiary]);
    return newDiary;
  };

  const updateDiary = (id: string, updatedEntries: DiaryRow[]) => {
    setDiaries((prev) =>
      prev.map((diary) =>
        diary.id === id ? { ...diary, entries: updatedEntries } : diary
      )
    );
  };
  
  const getDiary = (id: string) => {
    return diaries.find((diary) => diary.id === id);
  };

  const deleteDiary = (id: string) => {
    setDiaries((prev) => prev.filter((diary) => diary.id !== id));
  };

  const updateDiaryDetails = (id: string, className: string, section: string, teacherName: string) => {
    setDiaries((prev) =>
      prev.map((diary) =>
        diary.id === id ? { ...diary, className, section, teacherName } : diary
      )
    );
  };

  return (
    <DiaryContext.Provider value={{ diaries, addDiary, updateDiary, getDiary, deleteDiary, updateDiaryDetails, isLoading, setIsLoading }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};
