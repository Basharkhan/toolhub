import { useState } from 'react'
import { generatePassword } from '../utils/passwordGenerator'

function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const selectedOptionCount = Object.values(options).filter(Boolean).length
  const minimumLength = Math.max(selectedOptionCount, 4)
  const hasEnabledOption = selectedOptionCount > 0

  function handleLengthChange(event) {
    const nextLength = Number(event.target.value)
    setLength(Math.max(minimumLength, nextLength))
  }

  function handleOptionChange(optionName) {
    setOptions((currentOptions) => {
      const nextOptions = {
        ...currentOptions,
        [optionName]: !currentOptions[optionName],
      }

      const nextSelectedCount = Object.values(nextOptions).filter(Boolean).length
      const nextMinimumLength = Math.max(nextSelectedCount, 4)

      setLength((currentLength) => Math.max(currentLength, nextMinimumLength))

      if (nextSelectedCount === 0) {
        setPassword('')
      }

      return nextOptions
    })
  }

  function handleGeneratePassword() {
    setPassword(generatePassword(length, options))
    setCopied(false)
  }

  async function handleCopyPassword() {
    if (!password) {
      return
    }

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-[720px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Password Generator
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Generate secure passwords instantly
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-300">Generated password</p>
              <button
                type="button"
                onClick={handleCopyPassword}
                disabled={!password}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  password
                    ? 'bg-white/15 text-white hover:bg-white/25'
                    : 'cursor-not-allowed bg-white/10 text-slate-400'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="min-h-20 break-all font-mono text-base leading-7 tracking-[0.03em] text-white sm:text-lg">
                {password || 'Your generated password will appear here.'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label
                  htmlFor="password-length"
                  className="text-sm font-medium text-slate-700"
                >
                  Password length
                </label>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm">
                  {length}
                </span>
              </div>

              <input
                id="password-length"
                type="range"
                min={minimumLength}
                max="64"
                value={length}
                onChange={handleLengthChange}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900"
              />

              <input
                type="number"
                min={minimumLength}
                max="64"
                value={length}
                onChange={handleLengthChange}
                className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="mt-6 space-y-3">
              <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <span>Include uppercase</span>
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={() => handleOptionChange('uppercase')}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <span>Include lowercase</span>
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={() => handleOptionChange('lowercase')}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <span>Include numbers</span>
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={() => handleOptionChange('numbers')}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <span>Include symbols</span>
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={() => handleOptionChange('symbols')}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={handleGeneratePassword}
              disabled={!hasEnabledOption}
              className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-medium text-white shadow-sm transition-all ${
                hasEnabledOption
                  ? 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950'
                  : 'cursor-not-allowed bg-slate-300'
              }`}
            >
              Generate Password
            </button>
          </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold tracking-tight">{length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Length
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold tracking-tight">
                  {selectedOptionCount}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Rules On
                </p>
              </div>
            </div>

            {!hasEnabledOption ? (
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Enable at least one character type to generate a password.
              </p>
            ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PasswordGeneratorPage
