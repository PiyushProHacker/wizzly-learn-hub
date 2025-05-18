
import { VideoInteraction, Goal, Reminder, Feedback } from "@/types";

export const sampleVideoInteractions: VideoInteraction[] = [
  {
    video_id: "abc123",
    video_title: "Python Basics Tutorial",
    video_url: "https://youtube.com/watch?v=abc123",
    thumbnail_url: "https://img.youtube.com/vi/abc123/0.jpg",
    created_at: "2025-05-18T10:00:00Z",
    questions: [
      {
        question: "What's a for loop?",
        answer: "A for loop iterates over a sequence, like a list.",
        timestamp: "2025-05-18T10:05:00Z"
      },
      {
        question: "How to use range?",
        answer: "Range generates numbers, e.g., range(5).",
        timestamp: "2025-05-18T10:10:00Z"
      }
    ],
    notes: {
      doc_title: "Wizzly Notes - Python Basics",
      doc_url: "https://docs.google.com/document/d/xyz",
      manual_note: "Need to practice loops",
      transcript_note: "For loop: Iterates over sequences."
    }
  },
  {
    video_id: "def456",
    video_title: "DIY Woodworking Guide",
    video_url: "https://youtube.com/watch?v=def456",
    thumbnail_url: "https://img.youtube.com/vi/def456/0.jpg",
    created_at: "2025-05-17T15:00:00Z",
    questions: [
      {
        question: "What's a dovetail joint?",
        answer: "A dovetail joint is a strong woodworking joint.",
        timestamp: "2025-05-17T15:05:00Z"
      }
    ],
    notes: {
      doc_title: "Wizzly Notes - Woodworking",
      doc_url: "https://docs.google.com/document/d/uvw",
      manual_note: "",
      transcript_note: "Dovetail joint: Used for durability."
    }
  },
  {
    video_id: "ghi789",
    video_title: "JavaScript Advanced Concepts",
    video_url: "https://youtube.com/watch?v=ghi789",
    thumbnail_url: "https://img.youtube.com/vi/ghi789/0.jpg",
    created_at: "2025-05-16T09:30:00Z",
    questions: [
      {
        question: "How does closure work?",
        answer: "A closure gives access to an outer function's scope from an inner function.",
        timestamp: "2025-05-16T09:35:00Z"
      },
      {
        question: "What is the prototype chain?",
        answer: "The prototype chain is how JavaScript implements inheritance between objects.",
        timestamp: "2025-05-16T09:40:00Z"
      }
    ],
    notes: {
      doc_title: "Wizzly Notes - JavaScript Advanced",
      doc_url: "https://docs.google.com/document/d/jkl",
      manual_note: "Review closures again",
      transcript_note: "Closures: Inner functions accessing outer scope variables."
    }
  }
];

export const sampleGoals: Goal[] = [
  {
    id: "1",
    user_id: "user123",
    title: "Learn Python Loops",
    description: "Understand for and while loops",
    due_date: "2025-05-30",
    completed: false,
    created_at: "2025-05-15T10:00:00Z"
  },
  {
    id: "2",
    user_id: "user123",
    title: "Master JavaScript Promises",
    description: "Practice async/await patterns",
    due_date: "2025-06-15",
    completed: false,
    created_at: "2025-05-16T14:30:00Z"
  },
  {
    id: "3",
    user_id: "user123",
    title: "Complete Woodworking Project",
    description: "Apply dovetail joint technique",
    due_date: "2025-06-01",
    completed: true,
    created_at: "2025-05-10T09:15:00Z"
  }
];

export const sampleReminders: Reminder[] = [
  {
    id: "1",
    user_id: "user123",
    title: "Review Woodworking Video",
    due_datetime: "2025-05-19T09:00:00Z",
    completed: false,
    created_at: "2025-05-17T16:30:00Z"
  },
  {
    id: "2",
    user_id: "user123",
    title: "Practice Python Loops",
    due_datetime: "2025-05-20T14:00:00Z",
    completed: false,
    created_at: "2025-05-18T11:00:00Z"
  },
  {
    id: "3",
    user_id: "user123",
    title: "JavaScript Closure Exercise",
    due_datetime: "2025-05-18T18:00:00Z",
    completed: true,
    created_at: "2025-05-16T10:45:00Z"
  }
];

export const sampleFeedback: Feedback[] = [
  {
    id: "1",
    user_id: "user123",
    message: "Love the voice feature! Would be great to have language translation.",
    created_at: "2025-05-15T14:20:00Z"
  }
];

export const sampleUser: { user: { id: string; name: string; email: string; avatar_url: string } } = {
  user: {
    id: "user123",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  }
};
