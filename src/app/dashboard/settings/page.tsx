'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { 
  CreditCard, ShieldCheck, CheckCircle2, 
  Building2, Save, Sparkles, AlertCircle, 
  Zap, ExternalLink, KeyRound 
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 정산 계좌 상태
  const [bankName, setBankName] = useState('카카오뱅크')
  const [accountNumber, setAccountNumber] = useState('3333-01-9876543')
  const [accountHolder, setAccountHolder] = useState('김민우')
  const [isAccountSaved, setIsAccountSaved] = useState(false)

  // PG 결제 모드 상태
  const [pgMode, setPgMode] = useState<'integrated' | 'custom'>('integrated')
  const [portoneStoreId, setPortoneStoreId] = useState('')
  const [tossClientKey, setTossClientKey] = useState('')
  const [isPgSaved, setIsPgSaved] = useState(false)

  // hydration error 방지
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAccountSaved(true)
    setTimeout(() => setIsAccountSaved(false), 2500)
  }

  const handleSavePg = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPgSaved(true)
    setTimeout(() => setIsPgSaved(false), 2500)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div>
        <h1 className="text-2xl font-bold">환경 설정</h1>
        <p className="text-slate-500 text-sm mt-1">대시보드 테마, 정산 계좌, 결제사(PG) 연동을 설정하세요.</p>
      </div>

      {/* 1. 신용카드 및 간편결제(PG) 연동 설정 */}
      <Card className="border-indigo-500/30 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-500 mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Payment Gateway & Easy Pay</span>
              </div>
              <CardTitle className="text-lg">신용카드 & 간편결제(PG) 연동</CardTitle>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>연동 활성화됨</span>
            </span>
          </div>
          <CardDescription>
            고객이 전자책을 구매할 때 사용할 4대 결제 수단과 결제 처리 방식을 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* 지원 결제수단 4종 안내 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              현재 활성화된 4대 원클릭 결제 수단:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-[#FEE500]/10 border border-[#FEE500]/30 text-center">
                <div className="text-xs font-black text-amber-700 dark:text-[#FEE500]">카카오페이</div>
                <div className="text-[10px] text-slate-500 mt-0.5">지문인식 1초 결제</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#03C75A]/10 border border-[#03C75A]/30 text-center">
                <div className="text-xs font-black text-emerald-600 dark:text-[#03C75A]">네이버페이</div>
                <div className="text-[10px] text-slate-500 mt-0.5">포인트 & 카드 연동</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0064FF]/10 border border-[#0064FF]/30 text-center">
                <div className="text-xs font-black text-blue-600 dark:text-[#0064FF]">토스페이</div>
                <div className="text-[10px] text-slate-500 mt-0.5">토스 앱 원클릭 승인</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-center">
                <div className="text-xs font-black text-slate-800 dark:text-slate-200">신용/체크카드</div>
                <div className="text-[10px] text-slate-500 mt-0.5">국내 전 카드사</div>
              </div>
            </div>
          </div>

          {/* 결제 처리 모드 선택 */}
          <form onSubmit={handleSavePg} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                결제 처리 및 정산 방식 선택
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 모드 1: 1mm Pay 통합 정산 (기본 / 추천) */}
                <div 
                  onClick={() => setPgMode('integrated')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    pgMode === 'integrated' 
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-1 ring-indigo-600' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">1mm Pay 통합 안심 정산</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold">추천 ⭐</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    사업자등록증 없이도 개인/직장인 누구나 즉시 판매 가능. 1mm Pay가 토스페이먼츠·포트원 가맹점으로 결제받아 3.5% 실비만 떼고 주 단위 자동 입금해 드립니다.
                  </p>
                </div>

                {/* 모드 2: 내 PG사 직접 연동 */}
                <div 
                  onClick={() => setPgMode('custom')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    pgMode === 'custom' 
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-1 ring-indigo-600' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">내 포트원 / 토스 직연동</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-semibold">사업자용</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    사업자등록증이 있고 본인 명의의 포트원(PortOne) 또는 토스페이먼츠 가맹점 계약이 있는 경우 직접 API 키를 연동해 본인 계좌로 직결제받습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 개별 PG 키 입력란 (custom 모드일 때만) */}
            {pgMode === 'custom' && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-500" />
                  <span>개별 PG사 API 키 입력</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-500 text-[11px] block mb-1">포트원 Store ID</label>
                    <input
                      type="text"
                      value={portoneStoreId}
                      onChange={(e) => setPortoneStoreId(e.target.value)}
                      placeholder="store-xxxxxxxx-xxxx"
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 text-[11px] block mb-1">토스페이먼츠 Client Key</label>
                    <input
                      type="text"
                      value={tossClientKey}
                      onChange={(e) => setTossClientKey(e.target.value)}
                      placeholder="test_ck_xxxxxxx..."
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isPgSaved ? 'PG 설정 저장 완료!' : '결제 설정 저장'}</span>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 2. 판매 수익 정산 계좌 관리 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Creator Payout Account</span>
              </div>
              <CardTitle className="text-lg">판매 대금 정산 계좌</CardTitle>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full font-medium">
              매주 월요일 정기 자동 정산
            </span>
          </div>
          <CardDescription>
            카카오페이, 네이버페이, 신용카드로 결제된 판매 금액을 입금받을 은행 계좌입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveAccount} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-500 text-[11px] block mb-1">입금 은행</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="카카오뱅크">카카오뱅크</option>
                  <option value="토스뱅크">토스뱅크</option>
                  <option value="KB국민은행">KB국민은행</option>
                  <option value="신한은행">신한은행</option>
                  <option value="우리은행">우리은행</option>
                  <option value="하나은행">하나은행</option>
                  <option value="NH농협은행">NH농협은행</option>
                  <option value="IBK기업은행">IBK기업은행</option>
                  <option value="케이뱅크">케이뱅크</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 text-[11px] block mb-1">계좌번호 (하이픈 포함 가능)</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="1234-56-789012"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-500 text-[11px] block mb-1">예금주명</label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="홍길동"
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>투명한 3.5% 실비 공제 정산 원칙</span>
              </div>
              <div>
                크몽처럼 20%를 공제하지 않으며, 결제대행 실비 수수료(3.5%)만 공제된 전액이 대표님의 계좌로 정기 송금됩니다.
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isAccountSaved ? '정산 계좌 저장 완료!' : '정산 계좌 저장하기'}</span>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 3. 테마 색상 변경 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">테마 색상 변경</CardTitle>
          <CardDescription>
            내 비즈니스 브랜드와 가장 잘 어울리는 색상 팔레트를 선택하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => setTheme('trust')}
            className={`flex flex-col items-start p-4 border rounded-xl text-left transition-all ${theme === 'trust' ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'hover:border-slate-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 mb-3 shadow-sm"></div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Trust Blue</div>
            <div className="text-[11px] text-slate-500 mt-1">신뢰감 높은 기본 테마</div>
          </button>

          <button 
            onClick={() => setTheme('modern')}
            className={`flex flex-col items-start p-4 border rounded-xl text-left transition-all ${theme === 'modern' ? 'border-slate-900 ring-1 ring-slate-900 bg-slate-50 dark:border-white dark:ring-white dark:bg-slate-800' : 'hover:border-slate-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white mb-3 shadow-sm border"></div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Modern Black</div>
            <div className="text-[11px] text-slate-500 mt-1">모던하고 미니멀한 테마</div>
          </button>

          <button 
            onClick={() => setTheme('creative')}
            className={`flex flex-col items-start p-4 border rounded-xl text-left transition-all ${theme === 'creative' ? 'border-purple-600 ring-1 ring-purple-600 bg-purple-50/50 dark:bg-purple-900/20' : 'hover:border-slate-300'}`}
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 mb-3 shadow-sm"></div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Creative Purple</div>
            <div className="text-[11px] text-slate-500 mt-1">창의적이고 세련된 테마</div>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
