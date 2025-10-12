
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Info, Lock, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SECRET_CODE = 'pi@3.142';

const CreditsInfo = () => (
  <div className="space-y-3 text-sm text-foreground">
    <p><span className="font-semibold">Created by:</span> Rishi, Satyam, Utkarsh, Raghav</p>
    <p><span className="font-semibold">Fx by:</span> Rishi</p>
    <p><span className="font-semibold">Animations:</span> Raghav</p>
    <p><span className="font-semibold">Idea by:</span> Ritesh</p>
    <p><span className="font-semibold">Extra Idea by:</span> Satyam and Utkarsh</p>
  </div>
);

export default function InformationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      setIsUnlocked(true);
      toast({ title: 'Access Granted', description: 'Showing project credits.' });
    } else {
      toast({ title: 'Access Denied', description: 'Incorrect code.', variant: 'destructive' });
      setCode('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // Reset state when dialog is closed
    if (!open) {
      setCode('');
      setIsUnlocked(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-background/30 backdrop-blur-[7.8px]">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass-effect bg-card/60 backdrop-blur-[11.2px]">
        <DialogHeader>
          <DialogTitle>Information</DialogTitle>
        </DialogHeader>
        {isUnlocked ? (
          <CreditsInfo />
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter the access code to view information.</p>
            <div className="flex items-center space-x-2">
              <Input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code..."
                className="glass-effect"
              />
              <Button type="submit" size="icon" variant="secondary">
                {isUnlocked ? <Unlock /> : <Lock />}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
