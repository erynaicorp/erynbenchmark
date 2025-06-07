-- Create waitlist signups table
CREATE TABLE waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  company_size TEXT,
  industry TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create early access payments table
CREATE TABLE early_access_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  amount INTEGER DEFAULT 9900, -- $99.00 in cents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX idx_waitlist_created ON waitlist_signups(created_at);
CREATE INDEX idx_payments_email ON early_access_payments(email);
CREATE INDEX idx_payments_status ON early_access_payments(payment_status);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_access_payments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts (you can adjust these based on your needs)
CREATE POLICY "Allow public inserts" ON waitlist_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON early_access_payments FOR INSERT WITH CHECK (true);
