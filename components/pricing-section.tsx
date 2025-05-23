import Link from "next/link"

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: "#182654" }}>
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Choose the plan that fits your organization's needs
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                href="#"
                className="block w-full py-3 px-4 text-center rounded-lg border-2 font-semibold hover:bg-gray-50 transition-colors duration-300"
                style={{ borderColor: "#2483A1", color: "#2483A1" }}
              >
                Get Started
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Access to over 1,000 benchmark jobs</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Coverage in all 50 US states and territories</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">4 job levels: Technical, Support, Professional, Management</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Basic compensation data</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Standard market percentiles (25th, 50th, 75th)</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">1 user account</span>
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
                href="#"
                className="block w-full py-3 px-4 text-center rounded-lg font-semibold hover:opacity-90 transition-colors duration-300 shadow-md"
                style={{ backgroundColor: "#31E2EF", color: "#182654" }}
              >
                Subscribe Now
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">
                    <strong>Everything in Free</strong>, plus:
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Unlimited job benchmarks</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Advanced compensation data with industry insights</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Custom percentiles and detailed breakdowns</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Priority email and chat support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Up to 10 user accounts</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">Data export capabilities</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#31E2EF" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600">API access for integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need a custom enterprise solution?{" "}
            <Link href="#" className="font-medium hover:underline" style={{ color: "#2483A1" }}>
              Contact our sales team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
