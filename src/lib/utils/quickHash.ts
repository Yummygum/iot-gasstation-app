/* eslint-disable no-bitwise */
/**
 * Creates a simple hash from a string for use as React keys
 */
export function quickHash(text: string): string {
  let hash = 0

  if (text.length === 0) {
    return hash.toString()
  }

  for (let idx = 0; idx < text.length; idx += 1) {
    const char = text.charCodeAt(idx)
    hash = (hash << 5) - hash + char
    // Convert to 32-bit integer
    hash = hash & hash
  }

  return Math.abs(hash).toString()
}
