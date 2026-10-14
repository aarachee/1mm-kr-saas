'use client'

import React, { useState } from 'react'
import { Terminal, Copy, Check, Play, Zap, ShieldCheck, ExternalLink, Code2, Layers } from 'lucide-react'

export function DeveloperApiHub() {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python'>('curl')
  const [testUrl, setTestUrl] = useState('https://shopping.naver.com/v2/products/1049283921')
  const [testCustomSlug, setTestCustomSlug] = useState('super-deal')
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [calling, setCalling] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const codeSnippets = {
    curl: `curl -X POST https://1mm.kr/api/v1/links \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "url": "${testUrl}",
    "customCode": "${testCustomSlug}"
  }'`,
    node: `// npm install axios
import axios from 'axios';

const res = await axios.post('https://1mm.kr/api/v1/links', {
  url: '${testUrl}',
  customCode: '${testCustomSlug}'
}, {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});

console.log('Short URL:', res.data.shortUrl);
// -> https://1mm.kr/${testCustomSlug}`,
    python: `# pip install requests
import requests

res = requests.post(
  'https://1mm.kr/api/v1/links',
  headers={'Authorization': 'Bearer YOUR_API_KEY'},
  json={
    'url': '${testUrl}',
    'customCode': '${testCustomSlug}'
  }
)

print(res.json()['shortUrl'])`
  }

  const handleTestApi = async () => {
    setCalling(true)
    setApiResponse(null)
    try {
      const res = await fetch('/api/v1/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: testUrl,
          customCode: testCustomSlug || undefined
        })
      })
      const data = await res.json()
      setApiResponse(JSON.stringify(data, null, 2))
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message || '네트워크 오류' }, null, 2))
    } finally {
      setCalling(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang])
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 text-left shadow-2xl space-y-8">
      {/* 1. 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>초저지연 고가용성 REST API</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            ⚡ 1mm.kr 단축 URL 개발자 API
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            단 3줄의 코드로 알림톡, 대량 마케팅 문자, 사내 시스템에 13자 초단축 링크를 즉시 연동하세요.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            99.99% 가용성 보증
          </span>
        </div>
      </div>

      {/* 2. 인터랙티브 코드 연동 & 실시간 플레이그라운드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 좌측: 코드 스니펫 */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveLang('curl')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  activeLang === 'curl' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                cURL
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('node')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  activeLang === 'node' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Node.js
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('python')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  activeLang === 'python' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Python
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? '복사됨!' : '코드 복사'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
            <pre>{codeSnippets[activeLang]}</pre>
          </div>
        </div>

        {/* 우측: 라이브 API 테스터 (Playground) */}
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
              브라우저 즉시 API 테스트 (Playground)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">POST /api/v1/links</span>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">
              단축할 긴 URL (url)
            </label>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-indigo-400 outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">
              커스텀 단축어 (customCode, 선택)
            </label>
            <input
              type="text"
              value={testCustomSlug}
              onChange={(e) => setTestCustomSlug(e.target.value)}
              placeholder="비워두면 랜덤 6자리 발급"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-indigo-400 outline-none font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleTestApi}
            disabled={calling}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{calling ? '호출 중...' : 'API 호출 테스트 실행 (200 OK)'}</span>
          </button>

          {apiResponse && (
            <div className="mt-2 p-3 bg-slate-900 border border-emerald-500/40 rounded-xl font-mono text-[11px] text-emerald-300 overflow-x-auto animate-fadeIn">
              <pre>{apiResponse}</pre>
            </div>
          )}
        </div>
      </div>

      {/* 3. 투명한 API 요금제 테이블 */}
      <div className="pt-4 border-t border-slate-800">
        <h3 className="text-lg font-black text-white text-center mb-6">
          💳 비즈니스 규모에 맞춘 투명한 API 요금제
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Free */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black text-slate-400 uppercase">Developer Free</div>
              <div className="text-2xl font-black text-white mt-1">월 0원</div>
              <p className="text-xs text-slate-400 mt-2">개발 테스트 및 사이드 프로젝트용</p>
              <ul className="text-xs text-slate-300 space-y-1.5 mt-4">
                <li className="flex items-center gap-1.5">✓ 월 500건 생성</li>
                <li className="flex items-center gap-1.5">✓ 기본 리다이렉트 통계</li>
                <li className="flex items-center gap-1.5">✓ 커뮤니티 지원</li>
              </ul>
            </div>
            <a
              href="/dashboard"
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl text-center block transition-colors"
            >
              무료 키 발급
            </a>
          </div>

          {/* Starter */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black text-indigo-400 uppercase">Starter</div>
              <div className="text-2xl font-black text-white mt-1">월 19,000원</div>
              <p className="text-xs text-slate-400 mt-2">중소 쇼핑몰 및 알림톡 서비스용</p>
              <ul className="text-xs text-slate-300 space-y-1.5 mt-4">
                <li className="flex items-center gap-1.5">✓ 월 10,000건 생성</li>
                <li className="flex items-center gap-1.5">✓ 클릭 통계 API 제공</li>
                <li className="flex items-center gap-1.5">✓ 세금계산서 자동 발행</li>
              </ul>
            </div>
            <a
              href="/dashboard"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl text-center block transition-colors"
            >
              스타터 시작하기
            </a>
          </div>

          {/* Pro */}
          <div className="bg-slate-950 p-5 rounded-2xl border-2 border-indigo-500 space-y-3 flex flex-col justify-between relative shadow-xl shadow-indigo-500/10">
            <div className="absolute -top-3 right-4 bg-indigo-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
              BEST 인기
            </div>
            <div>
              <div className="text-xs font-black text-indigo-300 uppercase">Business Pro</div>
              <div className="text-2xl font-black text-white mt-1">월 49,000원</div>
              <p className="text-xs text-slate-400 mt-2">마케팅 대행사 및 대규모 SaaS</p>
              <ul className="text-xs text-slate-300 space-y-1.5 mt-4">
                <li className="flex items-center gap-1.5">✓ 월 100,000건 생성</li>
                <li className="flex items-center gap-1.5">✓ 커스텀 슬러그 무제한</li>
                <li className="flex items-center gap-1.5">✓ 실시간 웹훅 (Webhooks)</li>
                <li className="flex items-center gap-1.5">✓ 전담 기술 지원</li>
              </ul>
            </div>
            <a
              href="/dashboard"
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs rounded-xl text-center block transition-all"
            >
              비즈니스 프로 시작
            </a>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-black text-amber-400 uppercase">Enterprise</div>
              <div className="text-2xl font-black text-white mt-1">종량제 맞춤</div>
              <p className="text-xs text-slate-400 mt-2">대량 문자 발송사 & 대기업</p>
              <ul className="text-xs text-slate-300 space-y-1.5 mt-4">
                <li className="flex items-center gap-1.5">✓ 월 수백만 건 대량 처리</li>
                <li className="flex items-center gap-1.5">✓ 건당 0.5원 초저가 종량제</li>
                <li className="flex items-center gap-1.5">✓ 전용 독립 엣지 인프라</li>
                <li className="flex items-center gap-1.5">✓ 99.99% SLA 계약</li>
              </ul>
            </div>
            <a
              href="mailto:contact@1mm.kr"
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl text-center block transition-colors"
            >
              도입 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
