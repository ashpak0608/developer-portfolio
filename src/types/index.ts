export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  sentAt: Date;
}