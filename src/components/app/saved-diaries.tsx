"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDiary } from '@/context/diary-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, NotebookText } from 'lucide-react';
import { format } from 'date-fns';

interface SavedDiariesProps {
  children: React.ReactNode;
}

export default function SavedDiaries({ children }: SavedDiariesProps) {
  const { diaries } = useDiary();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass-effect">
        <DropdownMenuLabel>Saved Diaries</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {diaries.length > 0 ? (
          diaries.map((diary) => (
            <DropdownMenuItem key={diary.id} onSelect={() => router.push(`/diary/${diary.id}`)}>
              <NotebookText className="mr-2 h-4 w-4" />
              <span>
                {diary.className} {diary.section} - {format(new Date(diary.createdAt), 'MMM dd')}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No saved diaries yet.</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push('/')}>
          <Home className="mr-2 h-4 w-4" />
          <span>Back to Home</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
