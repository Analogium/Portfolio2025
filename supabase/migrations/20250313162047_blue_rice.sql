/*
  # Add skill categories

  1. Changes
    - Add skill categories to profiles table
    - Update existing profiles table structure
    - Modify the skills column to be an object with categories
  
  2. Data Structure
    - skills_by_category: JSONB column storing categorized skills
      {
        "frontend": ["React", "TypeScript", ...],
        "backend": ["Node.js", "PostgreSQL", ...],
        "devops": ["Docker", "AWS", ...]
      }
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS skills_by_category JSONB DEFAULT '{
  "frontend": [],
  "backend": [],
  "devops": []
}'::jsonb;

-- Update existing profiles to use the new structure
UPDATE profiles
SET skills_by_category = jsonb_build_object(
  'frontend', ARRAY['React', 'TypeScript', 'Tailwind CSS']::text[],
  'backend', ARRAY['Node.js', 'PostgreSQL', 'Supabase']::text[],
  'devops', ARRAY['Git', 'Docker', 'CI/CD']::text[]
)
WHERE id IS NOT NULL;