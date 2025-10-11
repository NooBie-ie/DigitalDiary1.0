"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { DiaryRow } from '@/lib/types';
import { SUBJECTS } from '@/lib/constants';

interface DiaryTableProps {
  entries: DiaryRow[];
  onUpdate: (entries: DiaryRow[]) => void;
}

export default function DiaryTable({ entries, onUpdate }: DiaryTableProps) {
  
  const handleSubjectChange = (rowId: string, value: string) => {
    const updatedEntries = entries.map((row) =>
      row.id === rowId ? { ...row, subject: value as DiaryRow['subject'] } : row
    );
    onUpdate(updatedEntries);
  };

  const handleTextChange = (rowId: string, field: 'topic' | 'cw' | 'hw', value: string) => {
    const updatedEntries = entries.map((row) =>
      row.id === rowId ? { ...row, [field]: value } : row
    );
    onUpdate(updatedEntries);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Subjects</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>C.W.</TableHead>
            <TableHead>H.W.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Select
                  value={row.subject}
                  onValueChange={(value) => handleSubjectChange(row.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Textarea
                  value={row.topic}
                  onChange={(e) => handleTextChange(row.id, 'topic', e.target.value)}
                  placeholder="Topic covered..."
                  className="min-h-[80px]"
                />
              </TableCell>
              <TableCell>
                <Textarea
                  value={row.cw}
                  onChange={(e) => handleTextChange(row.id, 'cw', e.target.value)}
                  placeholder="Classwork details..."
                  className="min-h-[80px]"
                />
              </TableCell>
              <TableCell>
                <Textarea
                  value={row.hw}
                  onChange={(e) => handleTextChange(row.id, 'hw', e.target.value)}
                  placeholder="Homework assigned..."
                  className="min-h-[80px]"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
