-- Create applications table for tracking job applications
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row-level security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own applications
DROP POLICY IF EXISTS "Users can only see their own applications" ON applications;
CREATE POLICY "Users can only see their own applications"
  ON applications
  FOR ALL
  USING (auth.uid() = user_id);

-- Add to realtime publication
alter publication supabase_realtime add table applications;
