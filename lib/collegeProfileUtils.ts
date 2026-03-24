export function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase()

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = parsed.searchParams.get('v')
      if (v) return v

      const parts = parsed.pathname.split('/').filter(Boolean)
      const embedIdx = parts.indexOf('embed')
      if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1]

      const shortsIdx = parts.indexOf('shorts')
      if (shortsIdx !== -1 && parts[shortsIdx + 1]) return parts[shortsIdx + 1]
    }
  } catch {
    return null
  }

  return null
}

export function isValidSocialUrl(url: string): boolean {
  const trimmed = url.trim()
  if (!trimmed) return false

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
    return Boolean(parsed.hostname)
  } catch {
    return false
  }
}

export function formatPhoneDisplay(phone: string): string {
  const raw = phone.trim()
  if (!raw) return ''

  const hasPlus = raw.startsWith('+')
  const digits = raw.replace(/[^\d]/g, '')

  if (!digits) return raw

  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }

  if (hasPlus) {
    return `+${digits}`
  }

  return raw
}

