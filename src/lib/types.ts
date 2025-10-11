import { SUBJECTS } from "./constants";

export type Subject = typeof SUBJECTS[number];

export type DiaryRow = {
  id: string;
  subject: Subject | '';
  topic: string;
  cw: string;
  hw: string;
};

export type Diary = {
  id: string;
  className: string;
  section: string;
  teacherName: string;
  createdAt: string;
  entries: DiaryRow[];
};
