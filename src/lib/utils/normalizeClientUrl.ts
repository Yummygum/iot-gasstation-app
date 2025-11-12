// eslint-disable-next-line max-statements
export function normalizeClientUrl(raw: string): string {
  const input = (raw || '').trim()
  if (!input) {
    return ''
  }

  const schemeMatch = input.match(/^(?:https?:\/\/)/i)
  const scheme = schemeMatch ? schemeMatch[0].toLowerCase() : ''
  const withoutScheme = input.replace(/^https?:\/\//i, '')

  const [firstPart] = withoutScheme.split('/')
  const [noQuery] = firstPart.split('?')
  const [hostOnly] = noQuery.split('#')

  if (!hostOnly) {
    return input
  }

  const hadSlashAfterHost = withoutScheme.startsWith(`${hostOnly}/`)
  return `${scheme}${hostOnly}${hadSlashAfterHost ? '/' : ''}`
}

