
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDiary } from '@/context/diary-context';
import type { Diary } from '@/lib/types';
import Header from '@/components/app/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MoreVertical, Pen, Trash2, BookOpen, ChevronLeft, Search } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DatePicker } from '@/components/ui/date-picker';

export default function ManageDiariesPage() {
  const router = useRouter();
  const { diaries, deleteDiary, updateDiaryDetails } = useDiary();
  const [renameDiary, setRenameDiary] = useState<Diary | null>(null);
  const [newName, setNewName] = useState({ className: '', section: '', teacherName: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState<Date | undefined>();

  const handleOpen = (id: string) => {
    router.push(`/diary/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteDiary(id);
  };

  const openRenameDialog = (diary: Diary) => {
    setRenameDiary(diary);
    setNewName({ className: diary.className, section: diary.section, teacherName: diary.teacherName });
  };

  const handleRename = () => {
    if (renameDiary) {
      updateDiaryDetails(renameDiary.id, newName.className, newName.section, newName.teacherName);
      setRenameDiary(null);
    }
  };

  const filteredDiaries = diaries.filter(diary => {
    const diaryDate = new Date(diary.createdAt);
    const nameMatch = `${diary.className} ${diary.section} ${diary.teacherName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = searchDate ? isSameDay(diaryDate, searchDate) : true;
    return nameMatch && dateMatch;
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 animated-gradient z-0"></div>
        <div className="relative z-10 p-4 sm:p-6 md:p-8">

            <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="glass-effect rounded-full active:outline-primary">
                <ChevronLeft />
                </Button>
                <div className="absolute top-4 right-4 z-50">
                    {/* ThemeToggle can be placed here if needed */}
                </div>
            </div>
            
            <Header />

            <main className="max-w-4xl mx-auto mt-8">
                <Card className="glass-effect">
                <CardHeader>
                    <CardTitle>Manage Diaries</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-10 w-full glass-effect"
                            />
                        </div>
                        <DatePicker date={searchDate} setDate={setSearchDate} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {filteredDiaries.length > 0 ? (
                        filteredDiaries.map((diary) => (
                        <div key={diary.id} className="flex items-center justify-between p-4 rounded-lg glass-effect">
                            <div>
                            <p className="font-semibold">{diary.className} {diary.section} - {diary.teacherName}</p>
                            <p className="text-sm text-muted-foreground">
                                Created on: {format(new Date(diary.createdAt), 'MMMM dd, yyyy')}
                            </p>
                            </div>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 glass-effect">
                                <DropdownMenuItem onSelect={() => handleOpen(diary.id)}>
                                <BookOpen className="mr-2 h-4 w-4" />
                                <span>Open</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => openRenameDialog(diary)}>
                                <Pen className="mr-2 h-4 w-4" />
                                <span>Rename</span>
                                </DropdownMenuItem>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                            <span className="text-destructive">Delete</span>
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="glass-effect">
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this diary.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(diary.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                            Delete
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-8">No diaries found.</p>
                    )}
                    </div>
                </CardContent>
                </Card>
            </main>

            {renameDiary && (
                <Dialog open={!!renameDiary} onOpenChange={() => setRenameDiary(null)}>
                <DialogContent className="glass-effect">
                    <DialogHeader>
                    <DialogTitle>Rename Diary</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input
                            value={newName.className}
                            onChange={(e) => setNewName(prev => ({...prev, className: e.target.value}))}
                            placeholder="Class Name"
                        />
                        <Input
                            value={newName.section}
                            onChange={(e) => setNewName(prev => ({...prev, section: e.target.value}))}
                            placeholder="Section"
                        />
                        <Input
                            value={newName.teacherName}
                            onChange={(e) => setNewName(prev => ({...prev, teacherName: e.target.value}))}
                            placeholder="Teacher's Name"
                        />
                    </div>
                    <Button onClick={handleRename}>Save Changes</Button>
                </DialogContent>
                </Dialog>
            )}
        </div>
    </div>
  );
}
