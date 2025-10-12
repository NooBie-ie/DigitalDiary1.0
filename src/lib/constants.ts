import React from 'react';
import {
  Calculator,
  Atom,
  Beaker,
  Microscope,
  Scroll,
  Scale,
  Globe,
  Landmark,
  BookText,
  ALargeSmall,
  BookOpen,
  Dumbbell,
  FlaskConical,
  Library,
  Laptop,
  Bot,
  type LucideProps,
} from 'lucide-react';

export type SubjectInfo = {
  name: string;
  Icon: React.FC<LucideProps>;
};

export const SUBJECTS: SubjectInfo[] = [
  { name: 'Maths', Icon: Calculator },
  { name: 'Physics', Icon: Atom },
  { name: 'Chemistry', Icon: Beaker },
  { name: 'Biology', Icon: Microscope },
  { name: 'History', Icon: Scroll },
  { name: 'Civics', Icon: Scale },
  { name: 'Geography', Icon: Globe },
  { name: 'Economics', Icon: Landmark },
  { name: 'English', Icon: BookText },
  { name: 'Hindi', Icon: ALargeSmall },
  { name: 'Sports', Icon: Dumbbell },
  { name: 'Phy/Chem/Bio Lab', Icon: FlaskConical },
  { name: 'Library', Icon: Library },
  { name: 'I.T.', Icon: Laptop },
  { name: 'Robotics/STEAM', Icon: Bot },
];
