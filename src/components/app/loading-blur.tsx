"use client";

import React from 'react';
import { useDiary } from '@/context/diary-context';
import { cn } from '@/lib/utils';

export default function LoadingBlur() {
  const { isLoading } = useDiary();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] bg-background/30 backdrop-blur-sm transition-opacity duration-500 pointer-events-none",
        isLoading ? "opacity-100" : "opacity-0"
      )}
    />
  );
}
