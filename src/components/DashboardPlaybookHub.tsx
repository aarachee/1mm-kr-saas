'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, Copy, Check, ExternalLink, Zap, 
  MessageSquare, Smartphone, ArrowRight, Share2, 
  Flame, BookOpen, Layers, ShieldCheck, HeartHandshake,
  DollarSign
} from 'lucide-react'
import { DigitalProductRecord } from '@/lib/digitalProducts'

interface DashboardPlaybookHubProps {
  products: DigitalProductRecord[]
}

export function DashboardPlaybookHub({ products }: DashboardPlaybookHubProps) {
  const [selectedProductSlug, setSelectedProductSlug] = useState(
    products[0]?.slug || 'side-income-guide'
  )
  
  const currentProduct = products.find(p => p.slug === selectedProductSlug) || products[0]

  const [title, setTitle] = useState(currentProduct?.title || '월 200 부업 치트키 실전서')
  const [slug, setSlug] = useState(currentProduct?.slug || 'side-income-guide')
  const [triggerKeyword, setTriggerKeyword] = useState(currentProduct?.triggerKeyword || '신청')
  const [price, setPrice] = useState(currentProduct?.price || 14900)

  const [activeTab, setActiveTab] = useState<'threads' | 'reels' | 'x' | 'dm' | 'sms' | 'email' | 'funnel'>('threads')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenSlug = e.target.value
    setSelectedProductSlug(chosenSlug)
    const p = products.find(prod => prod.slug === chosenSlug)
    if (p) {
      setTitle(p.title)
      setSlug(p.slug)
      setTriggerKeyword(p.triggerKeyword || '신청')
      setPrice(p.price || 14900)
    }
  }

  const handleCopy = (id: string, text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2500)
    }
  }

  const cleanLink = `https://pay.1mm.kr/p/${slug}`

  // 템플릿 정의
  const templates = {
    threads: [
      {
        id: 'th-1',
        title: '경험 인증 & 솔직 고백형',
        badge: '추천 (도달률 1위)',
        desc: '개인의 솔직한 시행착오와 경험을 진정성 있게 털어놓으며 댓글을 유도하는 템플릿',
        content: `퇴근하고 1시간씩 투자해서 3달 동안 월 150만 원 만든 노하우를 딱 12페이지 요약본으로 정리했습니다.\n\n솔직히 시중에 5만 원짜리 전자책들보다 실전 서식은 더 알차게 넣었습니다.\n\n반응 좋으면 주말 지나고 유료로 전환할 예정입니다.\n오늘 밤 12시까지만 무료로 배포합니다.\n\n필요하신 분은 댓글로 [${triggerKeyword}] 남겨주시면 링크 DM으로 0.5초 만에 쏴드릴게요!\n(팔로우는 예의인 거 아시죠? 😊)`
      },
      {
        id: 'th-2',
        title: '역발상 & 상식 깨부수기형',
        badge: '호기심 자극',
        desc: '대중이 잘못 알고 있는 편견을 깨면서 내 방법론의 신뢰도를 높이는 카피',
        content: `인스타그램 팔로워 1만 명 모으느라 6개월 낭비하지 마세요.\n\n팔로워 150명일 때 전자책으로 첫 주에 120만 원 벌었던 방법 공유합니다.\n진짜 돈이 되는 건 팔로워 수가 아니라 "댓글 자동화 퍼널"이었습니다.\n\n제가 실제로 썼던 [${title}] 핵심 요약본을 무료로 만들었습니다.\n\n댓글에 [${triggerKeyword}]이라고 남겨주시면 봇이 바로 DM으로 보내드립니다.`
      },
      {
        id: 'th-3',
        title: '단칼 요약 & 손실 회피형',
        badge: '직장인 타겟',
        desc: '시간과 노력을 아껴주는 도구/템플릿 나눔에 가장 적합한 카피',
        content: `더 이상 혼자 엑셀 붙잡고 밤새 야근하지 마세요.\n\n클릭 한 번으로 [${title}] 완성되는 치트키 템플릿을 무료로 풉니다.\n주변 지인들한테만 공유하던 자료인데, 딱 오늘 하루만 공개합니다.\n\n👉 댓글로 [${triggerKeyword}] 남겨주시면 즉시 다운로드 링크 전송됩니다.`
      },
      {
        id: 'th-4',
        title: '선착순 타임어택형',
        badge: '긴급 마감 (전환율 1위)',
        desc: '가격 인상 전 한정 수량 무료 배포로 즉각적인 행동을 유발하는 카피',
        content: `오늘 자정에 [유료 완판본 49,000원]으로 가격이 올라갑니다.\n\n그전에 핵심만 맛보실 수 있는 [무료 요약본]을 선착순 100분께만 오픈합니다.\n이미 60분이 받아가셨습니다.\n\n댓글로 [${triggerKeyword}] 남겨주시면 링크 DM 보내드립니다.`
      }
    ],
    reels: [
      {
        id: 'reels-1',
        title: '체크리스트 & 엑셀 무료 나눔형',
        badge: '릴스 저장율 폭발',
        desc: '영상 자막에서 핵심을 짚고 캡션에서 무료 파일 다운로드를 유도하는 릴스 본문',
        content: `"나만 알고 싶었던 [${title}] 5가지 치트키"\n\n영상에 나온 핵심 서식과 요약 PDF를 무료로 나눔합니다!\n\n👉 자료 수령 방법:\n1. @내계정아이디 팔로우 (맞팔 환영)\n2. 댓글로 [${triggerKeyword}] 작성하기\n\n댓글 감지되면 봇이 0.5초 만에 다운로드 링크를 DM으로 자동 전송해 드립니다! ⚡`
      },
      {
        id: 'reels-2',
        title: '문제 해결 & 노하우 공개형',
        badge: '전문가 포지셔닝',
        desc: '고객의 가장 아픈 고민(Pain Point)을 건드려 해결책으로 연결하는 카피',
        content: `릴스 조회수는 나오는데 왜 통장에 돈은 안 꽂힐까요?\n답은 '댓글 결제창 퍼널'의 부재입니다.\n\n초보자도 10분 만에 세팅하는 [${title}]를 배포합니다.\n\n댓글에 [${triggerKeyword}]를 적어주시면 즉시 링크를 보내드릴게요!\n(DM 확인해 주세요!)`
      },
      {
        id: 'reels-3',
        title: '소셜 프루프 & 후기 공유형',
        badge: '신뢰도 극대화',
        desc: '실제 구매자의 감사 후기를 인용하여 구매 저항을 완전히 허무는 카피',
        content: `"대표님 덕분에 런칭 이틀 만에 80만 원 벌었어요 ㅠㅠ"\n수강생분의 실제 감사 카톡입니다.\n\n이분이 첫날 그대로 따라 했던 [실전 로드맵 요약본]을 오늘만 무료로 드립니다.\n\n댓글로 [${triggerKeyword}] 남기시면 DM으로 바로 쏴드립니다.`
      }
    ],
    x: [
      {
        id: 'x-1',
        title: 'RT + 마음(Like) 조건 배포형',
        badge: '바이럴 확산 최적',
        desc: '리트윗과 좋아요를 조건으로 걸어 타임라인 전체에 바이럴을 유도하는 템플릿',
        content: `[무료 배포] ${title} (PDF 요약본)\n\n제가 수백만 원짜리 강의 듣고 직접 검증한 알짜 템플릿만 모았습니다.\n\n📌 참여 방법:\n1. 이 트윗 RT(리트윗) + 마음(♥)\n2. 댓글로 [${triggerKeyword}] 작성\n\n확인되는 즉시 DM으로 다운로드 링크 전송해 드립니다.\n#부업 #지식창업 #노션템플릿`
      },
      {
        id: 'x-2',
        title: '스레드 타래 연결형',
        badge: '팔로워 급증',
        desc: '정보성 타래(Thread)를 푼 뒤 마지막 타래에서 전자책 링크를 배포하는 방식',
        content: `대부분의 사람들이 인스타로 1원도 못 버는 결정적인 이유 (타래로 👇)\n1/7 ...\n...\n7/7 이 모든 세팅을 10분 만에 끝내는 [${title}]를 무료로 드립니다.\n댓글로 [${triggerKeyword}] 남겨주시면 DM 드릴게요.`
      }
    ],
    dm: [
      {
        id: 'dm-1',
        title: '3단계 표준 완판 자동 회신 DM',
        badge: '결제 전환율 80%',
        desc: '손님이 댓글을 달았을 때 ManyChat 또는 수동으로 발송하는 1mm Pay 직통 DM',
        content: `안녕하세요 OO님! 😊 \n게시물 보시고 댓글 남겨주셔서 진심으로 감사드립니다.\n\n요청하신 [${title}] 즉시 다운로드 링크입니다. 👇\n\n👉 ${cleanLink}\n(스마트폰 카카오페이/토스로 1초 만에 확인 후 즉시 소장 가능합니다.)\n\n💡 안내:\n현재 얼리버드 한정 혜택으로 제공 중이며, 준비된 수량이 마감되면 정가(${price * 3}원)로 인상될 수 있으니 꼭 혜택 챙겨가세요!\n\n궁금한 점이 있으시면 언제든 편하게 DM 남겨주세요.\n감사합니다!`
      }
    ],
    sms: [
      {
        id: 'sms-1',
        title: '3일 뒤 유료 완판본 리마인드 알림톡',
        badge: '미결제자 회수',
        desc: '0원 무료본만 수령한 고객의 연락처로 3일 뒤 보내는 업셀 구매 전환 메시지',
        content: `[1mm Pay] OO님, 무료로 받으신 요약본은 도움 되셨나요?\n\n핵심 10페이지만으로도 실행이 가능하지만,\n실제 엑셀 서식과 완전판 분량의 [${title}]를 원하시는 분들을 위해\n독자 전용 ${price.toLocaleString()}원 특별 할인 링크를 안내해 드립니다.\n\n👉 완판본 소장하기: ${cleanLink}\n\n본 혜택은 오늘 자정(24:00)에 마감됩니다.\n감사합니다.`
      }
    ],
    email: [
      {
        id: 'em-1',
        title: '[Day 0] 무료 요약본 전달 & 환영 이메일',
        badge: '신청 즉시 발송',
        desc: '약속한 무료 PDF 링크를 전달하고, 저자 스토리와 질문을 던져 스팸함을 탈출하는 첫 메일',
        content: `제목: [다운로드] 요청하신 [${title}] 요약본이 도착했습니다.\n\n안녕하세요, 구독자님! 저자입니다. 😊\n\n인스타/스레드에서 신청해 주신 [${title} 핵심 요약본]을 보내드립니다.\n아래 링크를 누르시면 스마트폰과 PC에서 즉시 PDF로 열람 및 다운로드하실 수 있습니다.\n\n👉 무료 요약본 즉시 다운로드: ${cleanLink}\n\n이 10페이지 요약본에는 제가 3년간 직접 부딪히며 검증한 알짜 노하우만 압축해 담았습니다.\n퇴근 후 커피 한 잔 마시며 10분만 투자해서 읽어보세요.\n\n💡 작은 부탁 하나:\n이 메일이 스팸함으로 빠지지 않도록, "잘 받았습니다"라고 가볍게 답장을 한 번 남겨주시면 감사하겠습니다!\n\n내일은 "대부분의 사람들이 이 자료를 읽고도 1원도 못 버는 결정적인 이유"에 대해 솔직하게 털어놓겠습니다.\n\n감사합니다.\n저자 드림`
      },
      {
        id: 'em-2',
        title: '[Day 1] 대부분 실패하는 결정적인 실수 1가지',
        badge: '문제 제기 (24시간 뒤)',
        desc: '원리는 알았지만 실전 서식이 없는 결핍(Aha-Moment)을 자극하여 완판본의 필요성을 각인',
        content: `제목: 솔직히 말씀드리면, 90%의 사람들은 이 실수를 합니다.\n\n안녕하세요, 저자입니다.\n\n어제 보내드린 요약본 3페이지는 읽어보셨나요?\n\n오늘은 조금 불편하지만 꼭 알아야 할 진실을 말씀드리려고 합니다.\n많은 분들이 무료 전자책을 받고 "와 내용 좋다!" 감탄하지만, 일주일 뒤 통장 잔고는 단 1원도 바뀌지 않습니다.\n\n왜 그럴까요?\n"원리는 알았지만, 당장 오늘 밤 복사해서 쓸 실전 템플릿 서식이 없기 때문"입니다.\n\n축구 교본을 100번 읽어도 공을 차보지 않으면 골을 못 넣듯,\n콘텐츠 비즈니스도 [검증된 엑셀 계산기]와 [복사해 쓰는 카피 양식]이 손에 쥐어져 있어야 첫 수익이 터집니다.\n\n내일은 제 평범한 수강생 한 분이 어떻게 이 서식 하나로 런칭 3일 만에 80만 원을 벌었는지, 그 구체적인 과정을 보여드리겠습니다.\n\n내일 아침 메일함을 꼭 확인해 주세요!`
      },
      {
        id: 'em-3',
        title: '[Day 2] “3일 만에 첫 수익 났어요” 실제 성공 후기',
        badge: '사회적 증거 (48시간 뒤)',
        desc: '실제 구매자 카톡 감사 후기를 인용하여 무료본과 유료 완판본의 결정적 격차를 체감시킴',
        content: `제목: “솔직히 반신반의했는데 3일 만에 첫 수익 났어요”\n\n안녕하세요, 저자입니다.\n\n"대표님, 솔직히 무료 요약본만 보고도 대단하다 생각했는데...\n완판본에 들어있는 엑셀 서식 그대로 따라 했더니 첫 주에 120만 원 입금됐습니다 ㅠㅠ"\n\n지난달 제 완판본을 구매하신 평범한 직장인 OO님의 실제 카톡 후기입니다.\n\n무료 10페이지 요약본이 "길을 알려주는 지도"라면,\n완전판 [${title}]는 "목적지까지 대신 태워다 주는 KTX 열차"입니다.\n\n• 팔로워 0명으로 시작하는 스레드 알고리즘 세팅법\n• 댓글 100개 터지는 30가지 검증된 후킹 카피\n• 카카오페이/토스로 1초 만에 돈을 받는 1mm Pay 연동 서식\n• 환불율 0%를 만드는 고가치 PDF 구조화 템플릿\n\n내일, 요약본을 신청해 주신 소중한 구독자님께만 드리는 '깜짝 70% 얼리버드 혜택'을 메일로 보내드리겠습니다.`
      },
      {
        id: 'em-4',
        title: '[Day 3] [48시간 한정] 완판본 70% 특별 할인 제안',
        badge: '거부할 수 없는 오퍼 (72시간 뒤)',
        desc: '정가 대비 파격 할인가와 3대 보너스를 묶어 결제를 유도하는 핵심 세일즈 이메일',
        content: `제목: [48시간 한정] 완판본 70% 특별 할인 링크를 드립니다.\n\n안녕하세요, 저자입니다!\n\n요약본을 다운로드받아 주신 분들 중 80%가 넘는 분들이 "완판본은 언제, 어디서 구매할 수 있냐"고 문의를 주셨습니다.\n\n진심으로 실행하고자 하는 분들을 위해, 정가 ${(price * 3).toLocaleString()}원의 완전판을 딱 48시간 동안만 커피 세 잔 값(${price.toLocaleString()}원)에 소장하실 수 있는 비밀 링크를 열어드립니다.\n\n👉 완판본 70% 할인받고 소장하기: ${cleanLink}\n\n🎁 지금 신청하시는 분께만 드리는 3대 보너스:\n1. 즉시 복사해 쓰는 인스타 바이럴 릴스 카피 30선\n2. 실전 마진 계산 엑셀 시트 원본 파일\n3. 평생 무료 업데이트 권한\n\n⚠️ 이 특별 할인은 구독자 전용 혜택이며, 48시간 뒤 정가로 자동 인상됩니다.\n기회를 놓치지 마세요!`
      },
      {
        id: 'em-5',
        title: '[Day 4] [마감 6시간 전] 할인 링크가 오늘 자정에 종료됩니다',
        badge: '긴급 마감 (손실 회피)',
        desc: '할인 종료 6시간 전 발송하여 망설이던 고객의 결제를 끌어내는 최종 마감 이메일',
        content: `제목: [마감 6시간 전] 이 할인 링크는 오늘 자정에 종료됩니다.\n\n안녕하세요, 저자입니다.\n\n알려드린 대로, [${title} 실전 완판본]의 70% 얼리버드 할인 혜택이 오늘 밤 12시(자정)에 완전히 마감됩니다.\n\n👉 자정 마감! 마지막 혜택 잡기: ${cleanLink}\n\n자정이 지나면 정상 가격(${(price * 3).toLocaleString()}원)으로 자동 복구되며, 추가 할인은 진행되지 않습니다.\n\n망설이는 동안에도 누군가는 이 템플릿으로 첫 주에 50만 원, 100만 원의 수익을 만들어내고 있습니다.\n커피 세 잔 값으로 당신의 퇴근 후 1시간을 현금 흐름으로 바꿔보세요.\n\n오늘 밤 자정, 링크가 닫히기 전에 결정하세요.\n감사합니다.\n\n저자 드림`
      },
      {
        id: 'em-6',
        title: '[구매 14일 뒤] [선착순 5명] 1:1 줌(Zoom) 코칭 선착순 오픈',
        badge: '💎 고단가(15만 원) 업셀',
        desc: '완판본을 구매한 상위 1% 진성 고객에게 2주 뒤 고단가 1:1 컨설팅을 제안하는 템플릿',
        content: `제목: [선착순 5명] 이번 달 딱 5분만 1:1로 직접 피드백해 드립니다.\n\n안녕하세요 OO님! 저자입니다.\n\n[${title} 완판본]을 구매하신 지 어느덧 2주가 지났습니다.\n서식을 적용하시면서 궁금하거나 막히는 부분은 없으셨나요?\n\n전자책으로 혼자 공부하다 보면 "내가 쓴 릴스 대본이 맞나?", "왜 내 글은 댓글이 덜 달릴까?" 벽에 부딪힐 때가 있습니다.\n\n그래서 이번 달, 제 일정이 허락하는 선에서 딱 5분만 선정하여 60분간 1:1 줌(Zoom) 화면 공유 컨설팅을 진행해 드리고자 합니다.\n\n🔍 60분 1:1 코칭에서 진행하는 내용:\n• OO님의 인스타/스레드 계정 프로필 & 바이오 실시간 첨삭\n• 다음 주에 터질 릴스 주제 3가지 직접 기획 및 대본 교정\n• 1mm Pay 결제 퍼널 셋업 1:1 원격 점검\n\n• 비용: 150,000원 (선착순 5명 마감 시 폼 자동 마감)\n👉 1:1 코칭 신청하기: ${cleanLink}\n\n혼자 6개월 동안 삽질할 시간을 단 1시간 만에 압축해 드리겠습니다.\n열정이 있으신 분들의 신청을 기다립니다.`
      }
    ]
  }

  return (
    <div className="space-y-8 pb-12 max-w-6xl">
      
      {/* 1. 상단 타이틀 & 상품 셀렉터 */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>1mm Pay 셀러 완판 치트키 센터</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              완판 카피라이팅 & 퍼널 치트키
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
              인스타·스레드·X에 그대로 복사해서 쓸 수 있는 실전 떡상 카피 템플릿입니다. <br className="hidden sm:inline" />
              아래에서 내 상품을 선택하면 <strong>내 1mm Pay 링크가 본문에 자동 합성</strong>됩니다!
            </p>
          </div>

          {/* 상품 선택 컨트롤러 */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 min-w-[280px]">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>적용할 내 판매 상품 선택:</span>
            </span>

            <select
              value={selectedProductSlug}
              onChange={handleProductChange}
              className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
            >
              {products.map(p => (
                <option key={p.slug} value={p.slug}>
                  {p.title} ({p.price.toLocaleString()}원)
                </option>
              ))}
            </select>

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>합성 주소:</span>
              <span className="text-indigo-400 font-mono font-bold truncate max-w-[170px]">
                pay.1mm.kr/p/{slug}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 채널별 네비게이션 탭 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('threads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'threads'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🧵 스레드 (Threads) 4종</span>
          <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px]">추천</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reels')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'reels'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>📸 인스타 릴스 3종</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('x')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'x'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>✖️ 엑스 (Twitter) 2종</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dm')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'dm'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>💬 자동 회신 DM 표준본</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'sms'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>📱 3일 뒤 리마인드 알림톡</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('email')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'email'
              ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>📧 이메일 업셀 5일 시퀀스</span>
          <span className="px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold">수익 1위</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('funnel')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'funnel'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
              : 'bg-slate-900/60 hover:bg-slate-900 text-pink-400 hover:text-pink-300 border border-slate-800'
          }`}
        >
          <span>🔄 DB 수익화 플라이휠</span>
        </button>
      </div>

      {/* 3. 탭별 템플릿 카드 렌더링 */}
      {activeTab !== 'funnel' ? (
        <div className="grid grid-cols-1 gap-6">
          {templates[activeTab].map((item) => {
            const isCopied = copiedId === item.id

            return (
              <div 
                key={item.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.content)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>복사 완료! 인스타에 붙여넣기 하세요</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>내 링크 포함 원클릭 복사</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 템플릿 본문 박스 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap select-all">
                  {item.content}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* 4. 플라이휠 전략 안내 탭 */
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8">
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Strategy Guide</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              팔로워와 연락처 DB를 결합한 영구적 현금 흐름 플라이휠
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              15,000원짜리 전자책은 시작일 뿐입니다. 인스타 팔로워(유입)와 고객 연락처 DB(깊은 돈)를 결합하여 고단가 코칭으로 이어지는 5단계 완판 공식입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 font-black text-xs flex items-center justify-center">1</div>
              <h4 className="text-xs font-bold text-white">릴스/스레드 떡상</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                위 템플릿으로 무료 요약본 나눔 글 작성 ➔ 댓글 500개 폭발
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 font-black text-xs flex items-center justify-center">2</div>
              <h4 className="text-xs font-bold text-white">0.5초 자동 DM</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                댓글 감지 즉시 pay.1mm.kr 수령 링크를 0.5초 만에 자동 전송
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-400 font-black text-xs flex items-center justify-center">3</div>
              <h4 className="text-xs font-bold text-white">0원 수령 & DB 수집</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                이메일 입력받고 0원 다운로드 ➔ 실전 완판본(14,900원) 원클릭 업셀
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-black text-xs flex items-center justify-center">4</div>
              <h4 className="text-xs font-bold text-white">연락처 엑셀 축적</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                유료 구매자 100% 휴대폰 번호 확보 (평생 자산 축적)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2 bg-emerald-950/10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center">5</div>
              <h4 className="text-xs font-bold text-emerald-300">고단가 코칭 완판</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                1:1 줌 코칭(15만 원), 부트캠프(49만 원) 문자 1통으로 완판!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
