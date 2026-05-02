import { useEffect, useState } from 'react'

function getWords(text) {
  const trimmedText = text.trim()

  if (!trimmedText) {
    return []
  }

  return trimmedText.split(/\s+/)
}

function getWordCount(text) {
  return getWords(text).length
}

function getCharacterCount(text) {
  return text.length
}

function getCharacterCountWithoutSpaces(text) {
  return text.replace(/\s/g, '').length
}

function getSentenceCount(text) {
  const sentences = text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  return sentences.length
}

function getParagraphCount(text) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return paragraphs.length
}

function getReadingTime(wordCount) {
  if (wordCount === 0) {
    return '0 min'
  }

  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min`
}

function WordCounterPage() {
  const [text, setText] = useState('')
  const [debouncedText, setDebouncedText] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedText(text)
    }, 100)

    return () => window.clearTimeout(timeoutId)
  }, [text])

  const wordCount = getWordCount(debouncedText)
  const characterCount = getCharacterCount(debouncedText)
  const characterCountWithoutSpaces = getCharacterCountWithoutSpaces(
    debouncedText,
  )
  const sentenceCount = getSentenceCount(debouncedText)
  const paragraphCount = getParagraphCount(debouncedText)
  const readingTime = getReadingTime(wordCount)
  const isEmpty = text.trim().length === 0

  return (
    <section className="py-8">
      <div className="mx-auto max-w-[600px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Word Counter
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Count words and characters instantly
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="word-counter-text"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Text
            </label>
            <textarea
              id="word-counter-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-56 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
            {isEmpty ? (
              <p className="mt-2 text-sm text-slate-500">
                Start typing to see results
              </p>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {wordCount}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                Words
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {characterCount}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                Characters
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {characterCountWithoutSpaces}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                Characters (No Spaces)
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {sentenceCount}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                Sentences
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {paragraphCount}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                Paragraphs
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {readingTime}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                Reading Time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WordCounterPage
