import { useState, useCallback } from "react"

/**
 * useCopy - A reusable hook for copying text to clipboard with UI feedback.
 * @returns [copyToClipboard, { copied, error }]
 *
 * Usage:
 * const [copyToClipboard, { copied, error }] = useCopy();
 * copyToClipboard("text");
 */
export default function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  const copyToClipboard = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        setError("Clipboard API not supported")
        setCopied(false)
        return
      }
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        setTimeout(() => setCopied(false), timeout)
      } catch (err) {
        setError("Failed to copy")
        setCopied(false)
      }
    },
    [timeout]
  )

  return [copyToClipboard, { copied, error }]
}
