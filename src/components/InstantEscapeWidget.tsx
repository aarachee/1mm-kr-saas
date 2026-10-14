'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Link2, QrCode as QrIcon, Copy, Check, ExternalLink, 
  Sparkles, Download, ShieldCheck, ArrowRight, RefreshCw, Zap
} from 'lucide-react'
import QRCode from 'qrcode'
import { createShortLink } from '@/app/actions'

export function InstantEscapeWidget() {
  const [activeTab, setActiveTab] = useState<'shortener' | 'qr'>('shortener')

  // Shortener States
  const [inputUrl, setInputUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [isEscapingEnabled, setIsEscapingEnabled] = useState(true)
  const [isShortening, setIsShortening] = useState(false)
  const [shortResult, setShortResult] = useState<{
    shortUrl: string
    shortCode: string
    longUrl: string
  } | null>(null)
  const [copiedShort, setCopiedShort] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // QR Studio States
  const [qrInput, setQrInput] = useState('https://1mm.kr')
  const [qrFgColor, setQrFgColor] = useState('#030712')
  const [qrBgColor, setQrBgColor] = useState('#ffffff')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate QR Code
  useEffect(() => {
    const target = qrInput.trim() || 'https://1mm.kr'
    QRCode.toDataURL(target, {
      width: 400,
      margin: 2,
      color: {
        dark: qrFgColor,
        light: qrBgColor
      }
    }).then(url => {
      setQrDataUrl(url)
    }).catch(err => {
      console.error(err)
    })
  }, [qrInput, qrFgColor, qrBgColor])

  // Handle URL Shorten
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputUrl.trim()) return

    setIsShortening(true)
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append('longUrl', inputUrl)
      if (customCode.trim()) {
        formData.append('customCode', customCode.trim())
      }

      const res = await createShortLink(formData)
      if (res.error) {
        setErrorMessage(res.error)
      } else if (res.shortCode) {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://1mm.kr'
        const fullShortUrl = `${origin}/${res.shortCode}`
        setShortResult({
          shortUrl: fullShortUrl,
          shortCode: res.shortCode,
          longUrl: res.longUrl || inputUrl
        })
        setQrInput(fullShortUrl)
      }
    } catch (err: any) {
      setErrorMessage(err.message || '단축 링크 생성 중 오류가 발생했습니다.')
    } finally {
      setIsShortening(false)
    }
  }

  const handleCopy = () => {
    if (!shortResult) return
    navigator.clipboard.writeText(shortResult.shortUrl)
    setCopiedShort(true)
    setTimeout(() => setCopiedShort(false), 2000)
  }

  const handleDownloadQr = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `1mm_qr_${Date.now()}.png`
    a.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border border-slate-800/90 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
      
      {/* 1. 상단 탭 스위처 */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('shortener')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'shortener'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>인앱 탈출 13자 단축주소</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'qr'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrIcon className="w-3.5 h-3.5" />
            <span>300 DPI QR 스튜디오</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>무료 무제한 이용</span>
        </div>
      </div>

      {/* 2. TAB A: 인앱 탈출 단축주소 */}
      {activeTab === 'shortener' && (
        <div className="space-y-4">
          <form onSubmit={handleShorten} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1">
                <input
                  type="url"
                  required
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="단축 및 인앱 탈출할 URL 입력 (https://...)"
                  className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="w-full sm:w-44">
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="단축어 (선택)"
                  className="w-full h-12 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isShortening}
                className="h-12 px-5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all active:scale-95 shrink-0 disabled:opacity-50"
              >
                {isShortening ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>1초 단축 생성</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* 인앱 탈출 가이드라인 배지 */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>인스타·카톡 인앱브라우저 감지 시 쿠팡/네이버 앱 자동 딥링크 발동</span>
              </div>
              <span className="text-slate-500 font-mono text-[10px]">13-char ultra short</span>
            </div>
          </form>

          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
              {errorMessage}
            </div>
          )}

          {/* 단축 생성 결과 카드 */}
          {shortResult && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-500/30 space-y-3 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5 truncate">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>생성 완료 · 인앱 탈출 활성화</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white font-mono truncate">
                    {shortResult.shortUrl}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedShort ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedShort ? '복사됨' : '링크 복사'}</span>
                  </button>

                  <a
                    href={shortResult.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>테스트</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveTab('qr')}
                    className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-1 transition-colors"
                    title="QR 코드 보기"
                  >
                    <QrIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 truncate border-t border-slate-900 pt-2">
                도착지: <span className="text-slate-400 font-mono">{shortResult.longUrl}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. TAB B: 300 DPI QR 코드 스튜디오 */}
      {activeTab === 'qr' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            
            {/* 좌측: QR 설정 인풋 (7 cols) */}
            <div className="sm:col-span-7 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  QR 연결 대상 URL / 텍스트
                </label>
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  placeholder="https://1mm.kr"
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    코드 색상 (Foreground)
                  </label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5 px-2.5">
                    <input
                      type="color"
                      value={qrFgColor}
                      onChange={(e) => setQrFgColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-300">{qrFgColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    배경 색상 (Background)
                  </label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5 px-2.5">
                    <input
                      type="color"
                      value={qrBgColor}
                      onChange={(e) => setQrBgColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-300">{qrBgColor}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>300 DPI 인쇄용 PNG 다운로드</span>
                </button>
              </div>
            </div>

            {/* 우측: 고해상도 QR 미리보기 (5 cols) */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
              {qrDataUrl ? (
                <div className="p-3 bg-white rounded-xl shadow-inner">
                  <img 
                    src={qrDataUrl} 
                    alt="1mm QR Code" 
                    className="w-36 h-36 object-contain"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-xs">
                  생성 중...
                </div>
              )}
              <span className="text-[10px] text-slate-500 font-mono mt-2">300 DPI Vector Output</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
