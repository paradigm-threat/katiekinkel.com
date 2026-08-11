export function isMobileClient(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}

/** Desktop Google Chrome (WebMCP testing flag lives here). */
export function isDesktopChrome(): boolean {
  if (typeof navigator === 'undefined') return false
  if (isMobileClient()) return false
  const ua = navigator.userAgent
  return /Chrome\/\d+/i.test(ua) && !/Edg\/|OPR\/|CriOS\//i.test(ua)
}

export class TimeoutError extends Error {
  constructor(label: string) {
    super(`${label} timed out`)
    this.name = 'TimeoutError'
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new TimeoutError(label)), ms)
      }),
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}
