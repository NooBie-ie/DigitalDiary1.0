"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Diary, DiaryRow } from '@/lib/types';

interface DiaryContextType {
  diaries: Diary[];
  addDiary: (diary: Omit<Diary, 'id' | 'createdAt' | 'entries'>) => Diary;
  updateDiary: (id: string, updatedEntries: DiaryRow[]) => void;
  getDiary: (id: string) => Diary | undefined;
  deleteDiary: (id: string) => void;
  updateDiaryDetails: (id: string, className: string, section: string, teacherName: string) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

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
    <DiaryContext.Provider value={{ diaries, addDiary, updateDiary, getDiary, deleteDiary, updateDiaryDetails }}>
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
