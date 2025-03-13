export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  github_username: string;
  linkedin_url?: string;
  email: string;
  skills_by_category: {
    frontend: string[];
    backend: string[];
    devops: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  github_url: string;
  live_url?: string;
  technologies: string[];
  created_at: string;
  updated_at: string;
}