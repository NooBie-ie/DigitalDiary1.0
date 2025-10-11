"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface TempNotesProps {
  children: React.ReactNode;
}

export default function TempNotes({ children }: TempNotesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[50vh] sm:h-auto sm:max-w-lg glass-effect flex flex-col">
        <DialogHeader>
          <DialogTitle>Temporary Notes</DialogTitle>
        </DialogHeader>
        <div className="flex-grow">
          <Textarea
            placeholder="Note down your thoughts..."
            className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
