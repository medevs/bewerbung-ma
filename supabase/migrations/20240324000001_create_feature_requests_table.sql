-- Create feature_requests table
CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feature_votes table for tracking upvotes
CREATE TABLE IF NOT EXISTS feature_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feature_id UUID REFERENCES feature_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_id, user_id)
);

-- Enable RLS
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for feature_requests
DROP POLICY IF EXISTS "Anyone can view feature requests" ON feature_requests;
CREATE POLICY "Anyone can view feature requests"
  ON feature_requests FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create feature requests" ON feature_requests;
CREATE POLICY "Users can create feature requests"
  ON feature_requests FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Create policies for feature_votes
DROP POLICY IF EXISTS "Anyone can view feature votes" ON feature_votes;
CREATE POLICY "Anyone can view feature votes"
  ON feature_votes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can vote once per feature" ON feature_votes;
CREATE POLICY "Users can vote once per feature"
  ON feature_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their own votes" ON feature_votes;
CREATE POLICY "Users can remove their own votes"
  ON feature_votes FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table feature_requests;
alter publication supabase_realtime add table feature_votes;
