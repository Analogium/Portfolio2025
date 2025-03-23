/*
  # Update profile avatar URL

  1. Changes
    - Updates the avatar_url for the existing profile
  
  2. Notes
    - Ensures the profile exists before updating
    - Uses a safe update operation
*/

DO $$ 
BEGIN 
  UPDATE profiles
  SET avatar_url = 'https://your-project.supabase.co/storage/v1/object/public/avatars/your-image.jpg'
  WHERE id IS NOT NULL
  AND avatar_url IS NULL;
END $$;