import { useState } from 'react'
import DatePickerField from '../components/ui/DatePickerField'

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function calculateAgeParts(dateOfBirth) {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)

  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months -= 1
    const previousMonth =
      today.getMonth() === 0 ? 11 : today.getMonth() - 1
    const previousMonthYear =
      today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear()

    days += getDaysInMonth(previousMonthYear, previousMonth)
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months, days }
}

function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const isValid = Boolean(dateOfBirth)

  function handleDateChange(date) {
    setDateOfBirth(date)
    if (date) {
      setError('')
    }
  }

  function handleCalculateAge() {
    if (!dateOfBirth) {
      setError('Please select your date of birth')
      setResult(null)
      return
    }

    setError('')
    setResult(calculateAgeParts(dateOfBirth))
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-[600px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Age Calculator
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Select a date of birth to calculate age in years, months, and days.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div className="space-y-4">
            <DatePickerField
              id="date-of-birth"
              label="Date of Birth"
              selected={dateOfBirth}
              onChange={handleDateChange}
              maxDate={new Date()}
              error={error}
            />

            <button
              type="button"
              onClick={handleCalculateAge}
              disabled={!isValid}
              className={`w-full rounded-xl px-4 py-3 text-sm font-medium text-white shadow-sm transition-all ${
                isValid
                  ? 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950'
                  : 'cursor-not-allowed bg-slate-300'
              }`}
            >
              Calculate Age
            </button>
          </div>

          {result ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-opacity duration-200">
              <h2 className="text-sm font-medium text-slate-700">Your age</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {result.years}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    Years
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {result.months}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    Months
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {result.days}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    Days
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default AgeCalculatorPage
