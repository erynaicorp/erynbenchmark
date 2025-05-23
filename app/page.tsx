import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PricingSection } from "@/components/pricing-section"
import { DemoSection } from "@/components/demo-section"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20 md:py-32" style={{ backgroundColor: "#182654" }}>
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/10 animate-pulse"
            style={{ animationDuration: "6s" }}
          ></div>
          <div
            className="absolute top-3/4 left-1/2 w-40 h-40 rounded-full bg-white/10 animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Skip the Survey Hassle</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/95">
            Get premium compensation benchmarking data instantly—without months of internal coordination and complex job
            matching
          </p>
          <Link
            href="#"
            className="inline-block font-semibold uppercase tracking-wide px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{ backgroundColor: "#31E2EF", color: "#182654" }}
          >
            Get Instant Access
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#182654" }}>
            Tired of the Traditional Survey Burden?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 hover:-translate-y-1 transition-transform duration-300"
              style={{ borderLeftColor: "#2483A1" }}
            >
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#2483A1" }}>
                ⏰ Weeks of Preparation
              </h3>
              <p className="text-gray-600">
                Coordinating with Finance, HR, and department heads while managing complex job matching requirements and
                data validation processes.
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 hover:-translate-y-1 transition-transform duration-300"
              style={{ borderLeftColor: "#2483A1" }}
            >
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#2483A1" }}>
                📊 Data Quality Headaches
              </h3>
              <p className="text-gray-600">
                Follow-up inquiries, incomplete submissions, and missed deadlines that delay your access to critical
                market insights.
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 hover:-translate-y-1 transition-transform duration-300"
              style={{ borderLeftColor: "#2483A1" }}
            >
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#2483A1" }}>
                💸 Hidden Costs
              </h3>
              <p className="text-gray-600">
                Unpredictable expenses from data validation, submission support, and the opportunity cost of your team's
                time.
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 hover:-translate-y-1 transition-transform duration-300"
              style={{ borderLeftColor: "#2483A1" }}
            >
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#2483A1" }}>
                🔄 Resource Drain
              </h3>
              <p className="text-gray-600">
                Your HR team spending weeks on survey administration instead of strategic initiatives that drive
                business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#182654" }}>
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto mb-16 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 text-center w-full md:w-80 relative hover:-translate-y-2 transition-transform duration-300">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#31E2EF", color: "#182654" }}
              >
                1
              </div>
              <div className="text-5xl mb-6">📄</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#182654" }}>
                Upload & Ask
              </h3>
              <p className="text-gray-600">
                Upload your job description or simply chat with eryn about the role you need to benchmark. Our system
                understands natural language and job requirements.
              </p>
            </div>

            <ChevronRight className="hidden md:block w-8 h-8 mx-2 flex-shrink-0" style={{ color: "#2483A1" }} />
            <div className="md:hidden w-8 h-8 flex items-center justify-center">
              <ChevronRight className="w-8 h-8 transform rotate-90" style={{ color: "#2483A1" }} />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 text-center w-full md:w-80 relative hover:-translate-y-2 transition-transform duration-300">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#31E2EF", color: "#182654" }}
              >
                2
              </div>
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#182654" }}>
                AI Analysis
              </h3>
              <p className="text-gray-600">
                eryn instantly analyzes your job requirements and matches them to our comprehensive database of
                validated compensation data across industries.
              </p>
            </div>

            <ChevronRight className="hidden md:block w-8 h-8 mx-2 flex-shrink-0" style={{ color: "#2483A1" }} />
            <div className="md:hidden w-8 h-8 flex items-center justify-center">
              <ChevronRight className="w-8 h-8 transform rotate-90" style={{ color: "#2483A1" }} />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 text-center w-full md:w-80 relative hover:-translate-y-2 transition-transform duration-300">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#31E2EF", color: "#182654" }}
              >
                3
              </div>
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#182654" }}>
                Get Results
              </h3>
              <p className="text-gray-600">
                Receive detailed compensation benchmarks, market percentiles, and actionable insights within minutes—not
                months.
              </p>
            </div>
          </div>

          <DemoSection />
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#182654" }}>
            What You Get Instead
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: "⚡",
                title: "Instant Market Intelligence",
                description:
                  "Access current compensation data when you need it—make timely pay decisions for new hires, promotions, and retention challenges.",
              },
              {
                icon: "🎯",
                title: "AI-Powered Job Matching",
                description:
                  "Simply upload a job description or chat with eryn to get instant, accurate compensation data. No complex matching process required.",
              },
              {
                icon: "📈",
                title: "Premium Data Quality",
                description:
                  "The same high-quality compensation benchmarks that traditionally require months of survey participation—available instantly.",
              },
              {
                icon: "💰",
                title: "Predictable Investment",
                description:
                  "Know exactly what you're paying upfront—no hidden costs from data validation, follow-up queries, or submission support.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden text-white p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300"
                style={{ backgroundColor: "#2483A1" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-spin-slow"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#182654" }}>
            Perfect For Organizations That
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                title: "Need Speed",
                description:
                  "Require compensation data quickly for urgent hiring or retention decisions without waiting for survey cycles.",
              },
              {
                title: "Lack Resources",
                description:
                  "Don't have the internal bandwidth for complex survey participation and cross-departmental coordination.",
              },
              {
                title: "Want Flexibility",
                description:
                  "Need to supplement existing survey data with additional market insights or explore new markets and roles.",
              },
              {
                title: "Prefer Predictability",
                description:
                  "Want transparent, upfront costs instead of variable participation investments and hidden fees.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border-l-4 hover:translate-x-2 transition-transform duration-300"
                style={{ borderLeftColor: "#31E2EF" }}
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: "#31E2EF" }}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Final CTA Section */}
      <section className="py-20 text-white" style={{ backgroundColor: "#182654" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Access Premium Compensation Data in Minutes, Not Months
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90">
            Get the market intelligence you need to attract top talent and retain key employees—without the operational
            complexity.
          </p>
          <Link
            href="#"
            className="inline-block font-semibold uppercase tracking-wide px-10 py-5 rounded-full text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{ backgroundColor: "#31E2EF", color: "#182654" }}
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  )
}
