
"use client";

import React from 'react';
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
import { NotebookText, Settings, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface SavedDiariesProps {
  children: React.ReactNode;
}

export default function SavedDiaries({ children }: SavedDiariesProps) {
  const { diaries, unsavedDiary } = useDiary();
  const router = useRouter();

  // Sort diaries by creation date, newest first
  const sortedDiaries = [...diaries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass-effect">
        <DropdownMenuLabel>Saved Diaries</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {unsavedDiary && (
            <>
                <DropdownMenuItem onSelect={() => router.push(`/diary/${unsavedDiary.id}`)}>
                    <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                    <span className="text-destructive">Left off Diary</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </>
        )}

        {sortedDiaries.length > 0 ? (
          <>
            {sortedDiaries.map((diary) => (
               <DropdownMenuItem key={diary.id} onSelect={() => router.push(`/diary/${diary.id}`)}>
                  <NotebookText className="mr-2 h-4 w-4" />
                  <span>
                    {diary.className} {diary.section}
                  </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.push('/manage-diaries')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Manage All</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem disabled>No saved diaries yet.</DropdownMenuItem>
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
