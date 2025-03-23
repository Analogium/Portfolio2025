/*
  # Add CV URL to profiles

  1. Changes
    - Add cv_url column to profiles table
    - Update existing profile with a default CV URL
  
  2. Security
    - Maintains existing RLS policies
*/

-- Add cv_url column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS cv_url TEXT;

-- Update the existing profile
DO $$ 
BEGIN 
  UPDATE profiles
  SET cv_url = 'https://your-project.supabase.co/storage/v1/object/public/documents/your-cv.pdf'
  WHERE id IS NOT NULL
  AND cv_url IS NULL;
END $$;