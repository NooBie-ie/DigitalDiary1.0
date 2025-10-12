
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function ConfirmationDialog({ isOpen, onClose, title, description }: ConfirmationDialogProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Blur */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-background/30 backdrop-blur-sm",
          "animate-in fade-in-0"
        )}
        onClick={handleClose}
      />

      {/* Dialog Content */}
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-[150] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-6",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:duration-500",
        )}
        data-state={isClosing ? "closed" : "open"}
      >
        <div className="glass-effect rounded-lg border shadow-2xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <Button onClick={handleClose}>OK</Button>
        </div>
      </div>
    </>
  );
}
