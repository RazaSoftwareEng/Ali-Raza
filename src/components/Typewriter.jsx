import { useEffect, useState } from 'react'

// Types each word, pauses, deletes it, then moves on to the next one.
export default function Typewriter({ words, typeSpeed = 90, deleteSpeed = 45, pause = 1600 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let delay = deleting ? deleteSpeed : typeSpeed

    if (!deleting && text === word) delay = pause
    else if (deleting && text === '') delay = 300

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return (
    <>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-indigo-400 align-middle" style={{ height: '1.1em' }} />
    </>
  )
}
