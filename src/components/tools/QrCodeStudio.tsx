'use client'

import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { QrCode as QrIcon, Download, Copy, Check, RefreshCw, Palette } from 'lucide-react'

export function QrCodeStudio({ initialUrl }: { initialUrl?: string }) {
  const [text, setText] = useState(initialUrl || 'https://1mm.kr')
  const [colorDark, setColorDark] = useState('#0f172a')
  const [colorLight, setColorLight] = useState('#ffffff')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!text.trim()) {
      setQrDataUrl('')
      return
    }

    QRCode.toDataURL(text.trim(), {
      width: 400,
      margin: 2,
      color: {
        dark: colorDark,
        light: colorLight
      }
    })
      .then((url: string) => setQrDataUrl(url))
      .catch((err: any) => console.error('QR generation error:', err))
  }, [text, colorDark, colorLight])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `1mm-qr-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleCopy = () => {
    if (!qrDataUrl) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-left shadow-2xl">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold mb-1.5">
            <QrIcon className="w-3.5 h-3.5" />
            <span>고해상도 인쇄용 QR코드 스튜디오</span>
          </div>
          <h3 className="text-xl font-black text-white">
            📱 초고화질 QR코드 생성 & 다운로드
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            전단지, 명함, 테이블 스티커, 메뉴판에 인쇄할 수 있는 고해상도 QR코드를 즉시 다운로드하세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 좌측: 입력 및 스타일 설정 */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              QR코드로 연결할 URL 또는 텍스트
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예: https://1mm.kr/my-event"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-sm font-bold text-white focus:border-cyan-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Palette className="w-3 h-3 text-cyan-400" />
                QR 전경색 (패턴)
              </label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input
                  type="color"
                  value={colorDark}
                  onChange={(e) => setColorDark(e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300 font-bold">{colorDark}</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Palette className="w-3 h-3 text-slate-400" />
                배경색
              </label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input
                  type="color"
                  value={colorLight}
                  onChange={(e) => setColorLight(e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300 font-bold">{colorLight}</span>
              </div>
            </div>
          </div>

          {/* 퀵 프리셋 버튼 */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-slate-400 font-bold mr-1">인기 프리셋:</span>
            {[
              { name: '클래식 블랙', dark: '#0f172a', light: '#ffffff' },
              { name: '딥 인디고', dark: '#312e81', light: '#ffffff' },
              { name: '에메랄드', dark: '#064e3b', light: '#ffffff' },
              { name: '네온 사이언', dark: '#0891b2', light: '#ffffff' }
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setColorDark(p.dark)
                  setColorLight(p.light)
                }}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 우측: 실시간 QR 미리보기 및 다운로드 */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="relative p-3 bg-white rounded-2xl shadow-xl">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrDataUrl} alt="QR Code Preview" className="w-44 h-44 sm:w-48 sm:h-48 object-contain" />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center text-slate-400 text-xs font-bold">
                생성 중...
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 w-full max-w-xs">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>PNG 인쇄용 다운로드</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors"
              title="URL 복사"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 text-center">
            300 DPI 초고해상도로 인쇄 시 깨짐 없이 선명합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
