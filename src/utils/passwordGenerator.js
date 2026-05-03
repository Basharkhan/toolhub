const CHARACTER_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function getRandomCharacter(characters) {
  return characters[Math.floor(Math.random() * characters.length)]
}

function shuffleCharacters(characters) {
  const shuffled = [...characters]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

export function generatePassword(length, options) {
  const safeLength = Math.max(0, Number(length) || 0)

  if (safeLength === 0) {
    return ''
  }

  const enabledSets = Object.entries(options || {})
    .filter(([, isEnabled]) => isEnabled)
    .map(([key]) => CHARACTER_SETS[key])
    .filter(Boolean)

  if (enabledSets.length === 0) {
    return ''
  }

  const allCharacters = enabledSets.join('')

  // Try to include one character from each enabled set when length allows.
  const seedCharacters = enabledSets
    .slice(0, safeLength)
    .map((characters) => getRandomCharacter(characters))

  const randomCharacters = Array.from(
    { length: safeLength - seedCharacters.length },
    () => getRandomCharacter(allCharacters),
  )

  return shuffleCharacters([...seedCharacters, ...randomCharacters]).join('')
}

