import { Clock3, KeyRound, Type, Weight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  const tools = [
    {
      icon: Clock3,
      name: 'Age Calculator',
      description: 'Calculate age in years, months, and days from a date of birth.',
      href: '/age-calculator',
    },
    {
      icon: Type,
      name: 'Word Counter',
      description: 'Count words and characters instantly',
      href: '/word-counter',
    },
    {
      icon: Weight,
      name: 'BMI Calculator',
      description: 'Calculate your body mass index in metric or imperial units.',
      href: '/bmi-calculator',
    },
    {
      icon: KeyRound,
      name: 'Password Generator',
      description: 'Create strong passwords with customizable rules.',
      href: '/password-generator',
    },
  ]

  return (
    <section className="py-8 sm:py-12">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Free Online Tools
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Simple, fast, and useful tools for everyday tasks
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md"
            >
              <div className="flex-1">
                <div className="mb-4 inline-flex rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition-colors group-hover:text-slate-700">
                  <tool.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to={tool.href}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-medium !text-white shadow-sm transition-colors hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                >
                  Use Tool
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
