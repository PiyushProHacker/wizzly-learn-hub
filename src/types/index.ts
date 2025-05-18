
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

export interface Question {
  question: string;
  answer: string;
  timestamp: string;
}

export interface Note {
  doc_title: string;
  doc_url: string;
  manual_note: string;
  transcript_note: string;
}

export interface VideoInteraction {
  id?: string;
  user_id?: string;
  video_id: string;
  video_title: string;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
  questions: Question[];
  notes: Note;
}

export interface Goal {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  created_at?: string;
}

export interface Reminder {
  id?: string;
  user_id?: string;
  title: string;
  due_datetime: string;
  completed: boolean;
  created_at?: string;
}

export interface Feedback {
  id?: string;
  user_id?: string;
  message: string;
  created_at?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
}

export interface DashboardSection {
  id: string;
  title: string;
  component: React.ReactNode;
}
