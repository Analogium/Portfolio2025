/*
  # Add Initial Profile Data
  
  1. Changes
    - Insert initial profile data
    - Insert sample project data
  
  2. Data
    - Creates a default profile
    - Adds two sample projects
*/

-- Insert initial profile
INSERT INTO profiles (
  name,
  title,
  bio,
  github_username,
  email,
  skills
) VALUES (
  'John Doe',
  'Full Stack Developer',
  'Passionate developer with experience in web development and cloud technologies.',
  'johndoe',
  'john@example.com',
  ARRAY['React', 'TypeScript', 'Node.js', 'Supabase']
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (
  title,
  description,
  github_url,
  technologies
) VALUES 
(
  'Portfolio Website',
  'A personal portfolio website built with React and Supabase',
  'https://github.com/johndoe/portfolio',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase']
),
(
  'Task Manager',
  'A full-stack task management application',
  'https://github.com/johndoe/task-manager',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Express']
)
ON CONFLICT (id) DO NOTHING;