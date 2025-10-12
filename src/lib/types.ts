export type DiaryRow = {
  id: string;
  subject: string;
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
