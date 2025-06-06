import Link from "next/link"

export function PricingSection() {
  const features = [
    {
      category: "Core Features",
      items: [
        { name: "Audio Input - Speak job descriptions or search queries", free: true, paid: true },
        { name: "Job Description Upload - Upload JDs (PDF, DOCX, TXT)", free: true, paid: true },
        { name: "Filter by State - View state-level compensation data", free: true, paid: true },
        { name: "Basic Job Family Access - Support, Professional, Management (entry levels)", free: true, paid: true },
        { name: "AI-Assisted Job Matching", free: "Basic", paid: "Advanced, AI-powered" },
      ],
    },
    {
      category: "Analysis & Insights",
      items: [
        {
          name: "Job Analysis Questionnaire by eryn - Conducted via phone, Slack, Teams, SMS, email, or chat",
          free: false,
          paid: true,
        },
        { name: "Job Description Scoring - Quantitative complexity and level score", free: false, paid: true },
        { name: "Full Job Level Access - 4 Support, 6 Professional, 6 Management levels", free: false, paid: true },
        { name: "Advanced Filters - Revenue, FTE, Industry, Location, Org Type", free: false, paid: true },
        { name: "Explainable Match Rationale - AI-generated logic for market match", free: false, paid: true },
        { name: "Percentile Insights - 10th, 25th, 50th, 75th, 90th", free: false, paid: true },
      ],
    },
    {
      category: "Advanced Tools",
      items: [
        { name: "Custom Peer Group Builder - Upload or filter by comparator orgs", free: false, paid: true },
        { name: "AI-Generated Salary Ranges - Min/Mid/Max based on benchmarks", free: false, paid: true },
        { name: "Market Trend Visualizations - Historic rate trends across roles", free: false, paid: true },
        { name: "Role Comparison Tool - Compare jobs across levels & industries", free: false, paid: true },
        { name: "Predictive Market Forecasting - Future pay trends based on labor data", free: false, paid: true },
        { name: "Justifiable Pay Recommendations - Exportable rationale for stakeholders", free: false, paid: true },
      ],
    },
    {
      category: "Data & Integration",
      items: [
        { name: "Report Exports - Downloadable PDF or Excel", free: false, paid: true },
        { name: "Saved Jobs & Filters", free: false, paid: true },
        { name: "Custom Benchmark Library", free: false, paid: true },
        {
          name: "3rd Party Data Import - WTW, Mercer, Radford, Culpepper, PayScale integration",
          free: false,
          paid: true,
        },
        { name: "Rosetta Stone for Survey Mapping - Map jobs across survey sources", free: false, paid: true },
        { name: "Total Rewards (Industry Specific) - Qualitative RSS Feed", free: false, paid: true },
        { name: "HRBP/Recruiter Views - Condensed summaries for quick action", free: false, paid: true },
      ],
    },
  ]

  const CheckIcon = ({ color }: { color: string }) => (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color === "#31E2EF" ? "#182654" : color }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  )

  const XIcon = () => (
    <svg
      className="w-5 h-5 flex-shrink-0 text-red-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  )

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#182654" }}>
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Choose the plan that fits your organization's needs
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#182654" }}>
                Free
              </h3>
              <p className="text-gray-600 mb-6">Essential benchmarking data</p>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold" style={{ color: "#182654" }}>
                  $0
                </span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <Link
                href="/waitlist"
                className="block w-full py-3 px-4 text-center rounded-lg border-2 font-semibold hover:bg-gray-50 transition-colors duration-300"
                style={{ borderColor: "#2483A1", color: "#2483A1" }}
              >
                Join Waitlist
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Access to over 1,000 benchmark jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Coverage in all 50 US states and territories</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">
                    4 job levels: Technical, Support, Professional, Management
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Basic AI-assisted job matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Audio input and job description upload</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Benchmark Plan - Highlighted */}
          <div
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform md:scale-105 relative transition-transform duration-300 hover:-translate-y-2 border-2"
            style={{ borderColor: "#31E2EF" }}
          >
            <div
              className="absolute top-0 left-0 right-0 text-center py-1 text-sm font-semibold"
              style={{ backgroundColor: "#31E2EF", color: "#182654" }}
            >
              PREMIUM
            </div>
            <div className="p-8 border-b border-gray-200 mt-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#182654" }}>
                Benchmark
              </h3>
              <p className="text-gray-600 mb-6">Complete compensation intelligence</p>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold" style={{ color: "#182654" }}>
                  $99
                </span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <Link
                href="/early-access"
                className="block w-full py-3 px-4 text-center rounded-lg font-semibold hover:opacity-90 transition-colors duration-300 shadow-md"
                style={{ backgroundColor: "#31E2EF", color: "#182654" }}
              >
                Get Early Access
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">
                    <strong>Everything in Free</strong>, plus:
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Advanced AI-powered job matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Job analysis questionnaire by eryn</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Full job level access (16 total levels)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Advanced filters & percentile insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">AI-generated salary ranges & market forecasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon color="#31E2EF" />
                  <span className="text-gray-600 text-sm">Report exports & 3rd party integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Feature Comparison */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: "#182654" }}>
            Detailed Feature Comparison
          </h3>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200" style={{ backgroundColor: "#182654" }}>
              <div className="text-white font-semibold">Features</div>
              <div className="text-center text-white font-semibold">Free</div>
              <div className="text-center text-white font-semibold">Benchmark</div>
            </div>

            {/* Feature Categories */}
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div
                  className="p-4 font-semibold text-lg border-b border-gray-100"
                  style={{ backgroundColor: "#f8fafc", color: "#182654" }}
                >
                  {category.category}
                </div>
                {category.items.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div className="text-gray-700 text-sm">{feature.name}</div>
                    <div className="flex justify-center">
                      {feature.free === true ? (
                        <CheckIcon color="#31E2EF" />
                      ) : feature.free === false ? (
                        <XIcon />
                      ) : (
                        <span className="text-xs text-gray-600 text-center">{feature.free}</span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {feature.paid === true ? (
                        <CheckIcon color="#31E2EF" />
                      ) : feature.paid === false ? (
                        <XIcon />
                      ) : (
                        <span className="text-xs text-gray-600 text-center">{feature.paid}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need a custom enterprise solution?{" "}
            <Link href="#" className="font-medium hover:underline" style={{ color: "#0891b2" }}>
              Contact our sales team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
