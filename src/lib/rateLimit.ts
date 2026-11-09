/**
 * 1mm.kr 매크로 및 비정상 트래픽 방지용 Rate Limiter 모듈
 * 
 * 메모리 기반 슬라이딩 윈도우 알고리즘으로 IP 및 액션별 요청 빈도를 제어합니다.
 * 오래된 타임스탬프는 메모리 누수 방지를 위해 자동으로 정리됩니다.
 */

interface RateLimitConfig {
  windowMs: number // 허용 시간 범위 (밀리초)
  max: number      // 시간 범위 내 최대 허용 횟수
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds?: number
}

// Map<key, timestamps[]>
const rateLimitStore = new Map<string, number[]>()

// 주기적 가비지 컬렉션 (5분마다 오래된 엔트리 삭제)
let lastCleanup = Date.now()
function cleanupExpiredEntries() {
  const now = Date.now()
  if (now - lastCleanup < 5 * 60 * 1000) return
  lastCleanup = now

  for (const [key, timestamps] of rateLimitStore.entries()) {
    // 30분 이상 지난 타임스탬프 제거
    const valid = timestamps.filter(t => now - t < 30 * 60 * 1000)
    if (valid.length === 0) {
      rateLimitStore.delete(key)
    } else {
      rateLimitStore.set(key, valid)
    }
  }
}

/**
 * IP와 액션 식별자를 기반으로 속도 제한을 검사합니다.
 * @param ip 클라이언트 IP 주소
 * @param action 검사 대상 액션 (예: 'auth_callback', 'create_link')
 * @param config { windowMs, max }
 */
export function checkRateLimit(
  ip: string,
  action: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanupExpiredEntries()

  // IP가 없거나 로컬 개발 테스트인 경우 기본 통과하되 로컬 키 할당
  const clientKey = `${action}:${ip || 'unknown'}`
  const now = Date.now()

  const timestamps = rateLimitStore.get(clientKey) || []
  // 현재 윈도우 내의 타임스탬프만 유지
  const windowStart = now - config.windowMs
  const activeTimestamps = timestamps.filter(t => t > windowStart)

  if (activeTimestamps.length >= config.max) {
    const oldest = activeTimestamps[0]
    const resetTime = oldest + config.windowMs
    const retryAfterSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000))

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    }
  }

  // 요청 허용 및 타임스탬프 기록
  activeTimestamps.push(now)
  rateLimitStore.set(clientKey, activeTimestamps)

  return {
    allowed: true,
    remaining: config.max - activeTimestamps.length,
  }
}
