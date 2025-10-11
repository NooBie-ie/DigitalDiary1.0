"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDiary } from '@/context/diary-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  className: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  teacherName: z.string().min(1, "Teacher's name is required"),
});

type NewDiaryFormValues = z.infer<typeof formSchema>;

interface NewDiaryDialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewDiaryDialog({ children, open, onOpenChange }: NewDiaryDialogProps) {
  const router = useRouter();
  const { addDiary } = useDiary();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewDiaryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      section: '',
      teacherName: '',
    },
  });

  const onSubmit = (data: NewDiaryFormValues) => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const newDiary = addDiary(data);
      form.reset();
      setIsLoading(false);
      onOpenChange(false);
      router.push(`/diary/${newDiary.id}`);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-effect">
        <DialogHeader>
          <DialogTitle>Create New Diary</DialogTitle>
          <DialogDescription>
            Fill in the details for your new diary entry. Click load when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10th" {...field} className="glass-effect" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., B" {...field} className="glass-effect" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mr. Smith" {...field} className="glass-effect" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Load
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
