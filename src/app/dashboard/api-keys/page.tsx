'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  KeyRound, Copy, Check, Eye, EyeOff, RefreshCw, 
  Terminal, ShieldCheck, Zap, ArrowUpRight, CheckCircle2 
} from "lucide-react"
import Link from 'next/link'

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState('1mm_live_8f39a7b92c4e5108d96b34')
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerate = () => {
    if (!confirm('API 키를 재발급하시겠습니까? 기존 키를 사용하던 모든 시스템에서 즉시 인증이 실패합니다.')) {
      return
    }
    setIsRegenerating(true)
    setTimeout(() => {
      const randomHex = Array.from({ length: 22 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setApiKey(`1mm_live_${randomHex}`)
      setIsRegenerating(false)
    }, 600)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. 상단 타이틀 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>B2B Developer API Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">API 키 및 플랜 관리</h1>
          <p className="text-slate-500 text-sm mt-1">
            대량 단축 링크 생성과 통계 조회를 위한 REST API 토큰과 사용량을 관리합니다.
          </p>
        </div>

        <Link
          href="/#api-docs"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-all shadow-sm w-fit"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>API 문서 & 플레이그라운드</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </Link>
      </div>

      {/* 2. 내 API 키 발급 & 복사 카드 */}
      <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <span>내 프로덕션 API Secret Key</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-full font-black">
                  활성 상태
                </span>
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                이 키는 HTTP Header <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">Authorization: Bearer 1mm_live_...</code> 로 전송해야 합니다.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 font-mono text-sm flex items-center justify-between">
              <span className="truncate">
                {showKey ? apiKey : `${apiKey.slice(0, 13)}••••••••••••••••••••`}
              </span>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2"
                title={showKey ? '숨기기' : '표시하기'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="button"
              onClick={handleCopy}
              className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 shrink-0 h-11"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '키 복사'}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="px-3 text-slate-500 hover:text-red-600 text-xs gap-1.5 shrink-0 h-11 border-slate-200 dark:border-slate-800"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>재발급</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>보안 암호화 전송 (TLS 1.3)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>호출 지연 시간: 0.01초 (Edge Routing)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-400">Endpoint:</span>
              <code className="text-slate-700 dark:text-slate-300 font-mono">POST /api/v1/links</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. 플랜 현황 및 이번 달 사용량 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 사용량 게이지 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">이번 달 API 사용량</CardTitle>
                <CardDescription className="text-xs">
                  2026년 10월 청구 주기 (매월 1일 리셋)
                </CardDescription>
              </div>
              <span className="text-xs font-bold text-slate-500">
                142 / 1,000 건 (14.2%)
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: '14.2%' }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-slate-500 font-medium">잔여 요청 수</div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">858 건</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-slate-500 font-medium">초당 처리 한도</div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">60 req/min</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-slate-500 font-medium">성공률</div>
                <div className="text-lg font-black text-emerald-500 mt-0.5">100.0%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 현재 구독 플랜 요약 */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Current Tier</div>
            <CardTitle className="text-xl font-black mt-1">Free Developer</CardTitle>
            <CardDescription className="text-xs">
              기본 제공되는 개발자 무료 티어입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>월 1,000개 단축 링크 API 생성</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>실시간 클릭 수 조회 API</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>개발자 커뮤니티 지원</span>
              </li>
            </ul>

            <Link
              href="/#api-docs"
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-all flex items-center justify-center gap-1 shadow-md shadow-indigo-500/20"
            >
              <span>Starter 플랜으로 업그레이드</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 4. 빠른 연동 cURL 스니펫 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span>터미널 1초 테스트 (cURL)</span>
          </CardTitle>
          <CardDescription className="text-xs">
            아래 명령어를 복사하여 터미널에 붙여넣으면 즉시 단축 URL이 생성됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
            <pre className="text-indigo-300">
              {`curl -X POST https://1mm.kr/api/v1/links \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/long-page-path", "customCode": "my-promo"}'`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
