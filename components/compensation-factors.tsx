export default function CompensationFactors() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Geographic Location</h3>
        <p className="text-gray-700">
          Salaries vary significantly by location due to cost of living differences, local market conditions, and
          regional talent availability. Major tech hubs like San Francisco and New York typically offer higher
          compensation than smaller markets.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>San Francisco, CA</span>
            <span className="font-medium">100% (Baseline)</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>New York, NY</span>
            <span className="font-medium">95-100%</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Seattle, WA</span>
            <span className="font-medium">90-95%</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Austin, TX</span>
            <span className="font-medium">80-85%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Remote</span>
            <span className="font-medium">75-90%</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Experience Level</h3>
        <p className="text-gray-700">
          Experience significantly impacts compensation, with senior roles commanding premium salaries. Career
          progression typically follows a non-linear growth curve, with larger increases occurring during promotions or
          role changes.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Entry-Level (0-2 years)</span>
            <span className="font-medium">40-60% of Senior</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Mid-Level (3-5 years)</span>
            <span className="font-medium">60-80% of Senior</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Senior (6-10 years)</span>
            <span className="font-medium">100% (Baseline)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Lead/Principal (10+ years)</span>
            <span className="font-medium">120-150% of Senior</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Industry Variations</h3>
        <p className="text-gray-700">
          Compensation varies widely across industries, with technology, finance, and healthcare typically offering
          higher salaries than retail, education, or non-profit sectors for comparable roles and experience levels.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Technology</span>
            <span className="font-medium">100-120%</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Finance</span>
            <span className="font-medium">100-130%</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Healthcare</span>
            <span className="font-medium">90-110%</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Manufacturing</span>
            <span className="font-medium">80-100%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Non-Profit</span>
            <span className="font-medium">70-85%</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Company Size</h3>
        <p className="text-gray-700">
          Company size often correlates with compensation levels. Larger organizations typically offer higher base
          salaries, while startups may offer lower base pay but more equity. Mid-size companies often balance both
          approaches.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Startup (&lt;50 employees)</span>
            <span className="font-medium">80-90% base, higher equity</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Small (50-500 employees)</span>
            <span className="font-medium">85-95% base, moderate equity</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Mid-size (500-5,000)</span>
            <span className="font-medium">90-105% base, some equity</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Enterprise (5,000+)</span>
            <span className="font-medium">100-110% base, limited equity</span>
          </div>
        </div>
      </div>
    </div>
  )
}
