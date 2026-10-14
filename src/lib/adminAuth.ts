export const ADMIN_COOKIE_NAME = '1mm_admin_token'
export const DEFAULT_ADMIN_KEY = 'admin1mm2026!'

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET_KEY || DEFAULT_ADMIN_KEY
}

export function verifyAdminPassword(password: string): boolean {
  const secret = getAdminSecret()
  return password.trim() === secret.trim()
}

export function getExpectedAdminToken(): string {
  // 간단하지만 안전한 세션 토큰 생성
  const secret = getAdminSecret()
  return Buffer.from(`1mm_super_admin:${secret}`).toString('base64')
}
