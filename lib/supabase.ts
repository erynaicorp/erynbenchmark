// Supabase connections removed - using local storage/mock data instead

export const mockWaitlistData = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    company: "Tech Corp",
    job_title: "HR Director",
    company_size: "201-500",
    industry: "technology",
    phone: "+1 (555) 123-4567",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    company: "Healthcare Inc",
    job_title: "Compensation Manager",
    company_size: "501-1000",
    industry: "healthcare",
    phone: "+1 (555) 987-6543",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

export const mockPaymentData = [
  {
    id: "1",
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    company: "Finance Co",
    job_title: "VP of People",
    payment_status: "completed",
    amount: 9900,
    created_at: new Date().toISOString(),
  },
]
