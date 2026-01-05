"use client";

import AdFit from '@/components/AdFit';
import React, { useState, useEffect } from 'react';

// 카카오 SDK 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "e83044bf41c6f1abb08e666366c3a43a";

type CategoryId = 'muscle' | 'money' | 'love' | 'quit' | 'godlife';
interface Category { id: CategoryId; name: string; icon: string; color: string; }

const CATEGORIES: Category[] = [
  { id: 'muscle', name: '근육뿜뿜 망상', icon: '💪', color: 'bg-rose-50' },
  { id: 'money', name: '돈벼락 망상', icon: '💰', color: 'bg-yellow-50' },
  { id: 'love', name: '연애성공 망상', icon: '❤️', color: 'bg-pink-50' },
  { id: 'quit', name: '초고속 퇴사 망상', icon: '🏃', color: 'bg-blue-50' },
  { id: 'godlife', name: '갓생살기 망상', icon: '✨', color: 'bg-purple-50' },
];

const QUESTIONS = {
  muscle: [
    { q: "올해 내 몸에 일어날 '기적' 같은 시나리오는?", a: ["오늘부터 굴러서 한 달 안에 바디프로필 찍고 선수 데뷔하기", "근육은 이미 있는데 지방이 잠시 '보호'하고 있는 상태 유지하기", "걷기랑 숨쉬기 운동만으로 병원 안 가고 무사히 생존하기", "단백질 쉐이크만 마셔도 헐크처럼 몸이 팽창하는 초능력 갖기"] },
    { q: "헬스장에 도착한 나의 행동은?", a: ["옆 사람과 기 싸움하며 오늘 죽어도 좋다는 마인드로 무게 치기", "기구 사용법 영상만 한 시간 보다가 샤워하고 뿌듯하게 나오기", "일단 앉아는 있는데 폰 보느라 근육보다 눈 근육이 더 발달하기", "호흡법만으로 지방을 태우는 명상에 잠겨 우주와 하나 되기"] },
    { q: "식단 관리에 임하는 나의 자세는?", a: ["닭가슴살 100kg 주문하고 오늘부터 무염 식단으로 지옥 맛보기", "맛있게 먹으면 0칼로리라며 일단 먹고 내일부터 시작하기", "요리하는 것도 기운 없어서 대충 편의점 삼각김밥으로 때우기", "공기 중의 질소를 흡수해 근육으로 변환하는 수련하기"] },
    { q: "운동 계획이 틀어졌을 때 나의 반응은?", a: ["의지가 쓰레기네라며 밤을 새워서라도 보충 운동하기", "근성장이 쉬어야 일어나는 법이라며 합리적인 휴식 취하기", "그럼 그렇지 운동은 무슨 하고 익숙하게 치킨 주문하기", "지구의 중력이 오늘따라 강해서 근육이 놀랐다고 위로하기"] },
    { q: "거울 속에 비친 내 모습을 볼 때?", a: ["아직 한참 멀었다며 근육이 터질 때까지 조질 생각만 하기", "조명 잘 받는 각도 찾아서 인스타에 올릴 사진 건지기", "그냥 사람 형체만 유지하고 있어도 다행이라고 생각하기", "투시 능력을 이용해 내 안의 잠재된 근육 신 보고 감탄하기"] },
  ],
  money: [
    { q: "내가 꿈꾸는 나의 자산 목표는?", a: ["24시간 풀가동해서 3년 안에 강남 빌딩주 되기", "돈은 있다가도 없는 것이라며 텅 빈 통장 잔고 무시하기", "이번 달 카드값만 안 밀리고 무사히 생존하기", "자고 일어났더니 비트코인 100억 돼서 전용기 계약하기"] },
    { q: "부자가 되기 위해 내가 지금 하고 있는 노력은?", a: ["잠 포기하고 투잡, 쓰리잡 뛰면서 몸값 미친 듯이 올리기", "재테크 서적 쇼핑만 잔뜩 하고 나는 공부 중이다라고 믿기", "누워서 로또 당첨되는 상상 하다가 그냥 잠들기", "우주의 풍요 에너지를 끌어당겨 통장에 숫자가 찍히길 기도하기"] },
    { q: "주식이나 코인이 폭락했을 때 나의 태도는?", a: ["이건 기회다라며 대출까지 영끌해서 풀매수 때리기", "이건 세력의 장난질이야라며 손절 안 하고 현실 부정하기", "내 팔자가 이렇지 뭐 하고 앱 삭제한 뒤 쳐다도 안 보기", "평행우주의 부유한 내가 이 손실을 메워줄 거라고 믿기"] },
    { q: "보너스나 공똔이 생겼을 때 나의 행동은?", a: ["1원도 안 쓰고 바로 투자 원금에 보태서 복리 노리기", "고생한 나를 위한 선물이라며 평소 갖고 싶던 명품 지르기", "일단 통장에 넣어두고 나중에 배달 음식 시켜 먹을 때 쓰기", "이 돈을 씨앗 삼아 마법처럼 100배로 불어날 의식 치르기"] },
    { q: "쇼핑몰에서 비싼 물건을 보았을 때?", a: ["내년엔 저거 색깔별로 다 산다며 전의를 불태우기", "디자인이 별로네라며 못 사는 게 아니라 안 사는 척하기", "가격표 보자마자 눈을 낮추고 제일 싼 할인 품목 찾기", "내 천재적인 아이디어 하나면 저 회사를 살 수 있다고 믿기"] },
  ],
  love: [
    { q: "마음에 드는 사람을 발견했을 때 나의 태도는?", a: ["오늘 고백하고 내일 결혼식장 예약까지 머릿속으로 풀코스 짜기", "아직 내 매력을 보여줄 타이밍이 아냐라며 멀리서 지켜만 보기", "저런 사람이 나를 좋아하겠어? 하고 바로 포기하기", "눈 마주치는 순간 우주의 운명이 결정됐다며 운명론자로 변신하기"] },
    { q: "연락하던 사람에게 답장이 안 올 때 나의 반응은?", a: ["답장 올 때까지 5분 단위로 톡 보내며 내 존재 각인시키기", "지금 너무 바빠서 못 보는 거겠지라고 행복 회로 돌리기", "그럼 그렇지 또 차였네 하고 그냥 대화방 나가기", "텔레파시를 보내서 상대방의 꿈에 내가 나타나도록 시도하기"] },
    { q: "소개팅이나 데이트를 앞둔 나의 자세는?", a: ["상대방의 SNS 싹 다 털어서 취향 분석하고 완벽한 시나리오 짜기", "옷 쇼핑만 3일 동안 하고 입을 게 없어서 못 가겠다고 하기", "나가는 것 자체가 기 빨려서 약속 취소될 방법 없나 고민하기", "데이트 장소의 기운과 나의 사주가 맞는지 확인하기"] },
    { q: "연애에 실패하거나 차였을 때 나의 행동은?", a: ["매력이 부족해서 그래라며 성형과 운동에 미친 듯이 투자하기", "상대방이 내 진가를 몰라본 것뿐이라며 남 탓하기", "인생 혼자 사는 거지 하고 익숙하게 연애 프로그램 보며 대리만족하기", "사실 우리는 전생에 원수였기에 현생에서 이어질 수 없다고 결론 내기"] },
    { q: "내가 생각하는 이상적인 연애란?", a: ["서로의 인생을 완벽하게 통제하고 함께 최고가 되는 연애", "싸울 일 전혀 없이 내 모든 것을 이해해 주는 천사 같은 사람과의 연애", "그냥 옆에만 있어도 아무 말 안 해도 편안한 연애", "시공간을 초월해 영혼으로 대화하는 차원이 다른 연애"] },
  ],
  quit: [
    { q: "출근하는 지하철 안에서의 내 생각은?", a: ["오늘 업무 성과 찢어버리고 승진해서 누구보다 빨리 탈출하기", "이 정도 직장이면 감사해야지라며 사표 던지고 싶은 마음 누르기", "로또 1등 되면 사표 던지는 상상만 무한 반복하며 좀비처럼 걷기", "사실 나는 은밀하게 파견된 재벌 3세인데 사회 경험 중이라고 믿기"] },
    { q: "상사에 업무 지적을 받았을 때 나의 태도는?", a: ["다시는 지적 못 하게 완벽하게 해주지라며 밤새서 수정하기", "상사가 나를 질투하는 거야라며 내 능력에는 문제없다고 믿기", "에휴 욕먹는 게 일이지 하고 한 귀로 듣고 한 귀로 흘리기", "상사의 에너지가 너무 낮아서 내 고차원적인 업무를 이해 못 한다고 생각하기"] },
    { q: "퇴사 후의 삶을 꿈꿀 때 나의 모습은?", a: ["퇴사하자마자 창업해서 1년 안에 유니콘 기업 만들기", "언젠가 나가야지 말만 하고 구체적인 준비는 하나도 안 하기", "그냥 아무것도 안 하고 하루 종일 잠만 자는 삶 꿈꾸기", "퇴사하면 전 세계를 유랑하며 도사처럼 살 것 같은 기분 느끼기"] },
    { q: "월급날 통장을 확인한 나의 반응은?", a: ["이 돈으론 부족해라며 부업과 투잡 아이디어 미친 듯이 짜내기", "적지만 소중해라며 이번 달도 회사의 노예가 되기로 다짐하기", "스쳐 지나가는 숫자를 보며 삶의 허무함 느끼기", "숫자는 허상일 뿐, 진정한 부는 내 마음속에 있다고 정신 승리하기"] },
    { q: "퇴사 준비를 위해 내가 하고 있는 노력은?", a: ["퇴근 후 새벽까지 강의 듣고 자격증 따느라 눈이 충혈된 상태", "퇴사 관련 유튜브만 정주행하며 대리 만족하기", "사표 양식만 다운로드받아 놓고 1년째 폴더에 방치하기", "우주가 나를 부르는 신호를 기다리며 명상하기"] },
  ],
  godlife: [
    { q: "새로 짠 나의 완벽한 루틴 계획표는?", a: ["새벽 4시 기상부터 밤 12시까지 10분 단위로 빼곡한 일정표", "내일부터 진짜 한다며 플래너만 예쁘게 꾸미고 만족하기", "누워 있는 시간을 제외하면 계획 자체가 거의 없는 상태", "생각만으로 하루의 모든 일과가 완료되는 4차원 계획"] },
    { q: "자기계발 강의를 결제한 나의 행동은?", a: ["강의 10개 동시 결제하고 코피 쏟을 때까지 배속으로 몰아 보기", "커리큘럼만 훑어보고 이미 다 안다 고 착각하며 미루기", "1강 듣다가 졸려서 그대로 노트북 덮고 잠들기", "자는 동안 뇌에 지식이 주입되는 기계가 발명되길 기다리기"] },
    { q: "작심삼일로 계획이 무너졌을 때 나의 반응은?", a: ["의지가 쓰레기네라며 나 자신을 미친 듯이 채찍질하고 더 빡세게 짜기", "갑자기 일이 생겨서 어쩔 수 없었어라고 환경 탓하기", "그럼 그렇지 내가 무슨 갓생이야 하고 익숙하게 숏츠 보기", "과거의 내가 실패한 건 미래의 내가 더 큰 도약을 하기 위함이라고 믿기"] },
    { q: "갓생 사는 사람들의 브이로그를 볼 때?", a: ["저 사람보다 내가 더 잘할 수 있어라며 경쟁심 불태우기", "저 사람은 원래 여유가 있으니까 가능한 거야라고 합리화하기", "화면 속 사람과 내 방 상태를 비교하며 깊은 무력감에 빠지기", "나도 사실 카메라만 켜면 저들보다 더 멋진 주인공이라고 상상하기"] },
    { q: "내가 생각하는 성공한 인생이란?", a: ["세상 모든 분야에서 1등을 찍고 정점에 서는 인생", "남들에게 인정받고 적당히 폼 나게 사는 인생", "아무 걱정 없이 하루 종일 누워서 쉴 수 있는 인생", "해탈의 경지에 올라 현실의 고통을 전혀 느끼지 않는 인생"] },
  ]
};

const RESULTS = {
  muscle: [
    { level: 10, title: "숨 쉬는 것만으로 칼로리 태우는 망상러", sub: "[침대 부착형 생물]", fact: "망상 따위 없음. 안 할 걸 너무 잘 알아서 계획도 안 세움. 오히려 건강함. 그냥 침대랑 한 몸이 된 상태.", pres: "솔직함에 박수! 근데 숨은 좀 더 크게 쉬어봐. 그것도 운동이다." },
    { level: 50, title: "헬스장 기부금 납부 실적 1위 망상러", sub: "[아가리 파이터]", fact: "관장님이 좋아하는 기부 천사. 딱 보름 불타오르다 사라질 운명. 네가 낸 돈으로 헬스장 정수기 한 대는 바꿨을걸?", pres: "1년 결제 금지. 무조건 1일권 끊어서 가라." },
    { level: 70, title: "근육 대신 관절만 박살 내는 망상러", sub: "[걸어 다니는 종합병원]", fact: "근육은 그대로인데 열정만 폭주해서 관절부터 박살 내는 중. 헬스장 뽕에 취해 브레이크 없이 달리는 기관차.", pres: "덤벨 내려놓고 제발 잠부터 자라. 근육은 쉴 때 생긴다." },
    { level: 99, title: "뇌 근육만 비대하게 발달한 망상러", sub: "[상상 속 올림피아 챔피언]", fact: "마음만은 이미 올림피아 챔피언. 근육 대신 상상력만 벌크업됨. 네 바디프로필은 뇌 속에서만 4K 고화질임.", pres: "인스타 끄고 신발장 가서 먼지 쌓인 운동화나 찾아라." },
  ],
  money: [
    { level: 10, title: "텅 빈 잔고에서 우주의 평화를 본 망상러", sub: "[강제 무소유 실천가]", fact: "무소유를 강제로 실천 중. 돈 벌 의지도, 쓸 기운도 없음. 빈 통장이 곧 네 마음의 평화라고 믿으며 해탈함.", pres: "해탈도 좋지만 배달 팁 낼 돈은 남겨둬야지?" },
    { level: 50, title: "장바구니에 세계 경제를 담은 망상러", sub: "[결제 버튼 공포증 환자]", fact: "사고 싶은 건 많지만 시기가 안 좋아 라며 공부만 무한 반복 중. 장바구니에만 100억치 담아둔 핑계왕.", pres: "분석은 그만! 일단 1만 원이라도 실제로 저축해봐." },
    { level: 70, title: "파란불 차트 보며 행복 회로 돌리는 망상러", sub: "[한강 수온 체크 전문가]", fact: "잠 줄여서 주식 보고 부업 뛰느라 눈이 항상 충혈됨. 돈 벌다 병원비로 다 나갈 기세. 조급함이 네 전 재산이야.", pres: "돈도 건강해야 쓰는 거다. 오늘 차트 끄고 8시간 꿀잠 자라." },
    { level: 99, title: "이미 화성 갈끄니까 지구 돈 필요 없는 망상러", sub: "[일론 머스크 숨겨진 자식]", fact: "현실 잔고 0원이지만, 마음은 이미 일론 머스크랑 화성에서 샴페인 따는 중. 떡상할 거라는 꿈속에서 살고 있네.", pres: "화성 갈 생각 말고 편의점 1+1 행사나 놓치지 마라." },
  ],
  love: [
    { level: 10, title: "연애 세포가 화석이 되어버린 망상러", sub: "[모태 솔로계의 시조새]", fact: "연애 에너지 마이너스 200%. 누가 고백해도 귀찮다 고 거절할 판. 사랑보다 뜨끈한 이불 속이 더 소중함.", pres: "일단 거울부터 보자. 연애 세포 심폐소생술이 시급하다." },
    { level: 50, title: "글로 연애 배워서 이론만 박사인 망상러", sub: "[방구석 연애 코치]", fact: "상처받기 싫어서 안 만나는 거다 라고 정신 승리 중. 연애 유튜브만 보며 완벽한 타이밍만 재는 핑계왕.", pres: "완벽한 인연은 없어. 혓바닥 말고 용기를 내서 일단 밖으로 나가!" },
    { level: 70, title: "혼자 썸 타고 이별까지 원스톱인 망상러", sub: "[급발진 폭주 기관차]", fact: "의욕은 넘치는데 상대 보폭 무시하고 혼자 달리는 중. 상대는 뒷걸음질 치는데 너만 직진하는 공포의 사랑꾼.", pres: "제발 진정해! 상대방 보폭에 좀 맞춰라. 오늘 연락 금지!" },
    { level: 99, title: "눈만 마주쳐도 손주 대학까지 보낸 망상러", sub: "[프로 김칫국 드링커]", fact: "상대는 네 이름도 모르는데 넌 이미 권태기 겪고 이혼 서류까지 썼음. 혼자 북 치고 장구 치는 망상의 신.", pres: "드라마 그만 보고 제발 진짜 사람이랑 말부터 섞어라." },
  ],
  quit: [
    { level: 10, title: "출근과 동시에 퇴근을 꿈꾸는 망상러", sub: "[영혼 없는 사무실 지박령]", fact: "퇴사할 기운도 없음. 그냥 월급날만 기다리는 정수기 부품 같은 존재. 영혼은 작년에 퇴근해서 몸만 남았어.", pres: "넌 지금 쉼표가 필요해. 주말에 폰 끄고 아무 생각 말고 쉬어라." },
    { level: 50, title: "365일 입으로만 사직서 쓰는 망상러", sub: "[말로만 파이어족]", fact: "매일 사표 쓰는 상상만 하며 실제론 누구보다 성실함. 나 없으면 회사 망하니까 라며 퇴사 못 하는 핑계만 만 개.", pres: "불평할 시간에 이력서나 고쳐라. 혓바닥 말고 몸을 움직여!" },
    { level: 70, title: "대책 없이 사표 던지는 상상만 하는 망상러", sub: "[상상 속 창업 신화 주인공]", fact: "당장 나갈 기세로 창업 아이템만 50개 짬. 준비 없이 나가면 회사 밖은 북극인 걸 모르는 무지성 폭주족.", pres: "사표 다시 주머니에 넣어. 밖은 진짜 추우니까 계획부터 다시 짜!" },
    { level: 99, title: "내가 회장 숨겨진 자식이라고 믿는 망상러", sub: "[세계관 최강자 언더커버 보스]", fact: "사장이 욕해도 너 우리 아빠한테 죽었어 라며 속으로 비웃는 중. 현실은 출근 5분 전 지하철에 끼어 있음.", pres: "꿈 깨! 너 내일 아침 9시까지 출근해서 복사해야 하는 그냥 대리야." },
  ],
  godlife: [
    { level: 10, title: "누워서 남의 갓생 숏츠만 보는 망상러", sub: "[프로 와식 생활러]", fact: "침대에 누워 남의 갓생 영상 보며 대리 만족하다 새벽에 잠듦. 변화할 기운조차 없는 완벽한 방전 상태.", pres: "디지털 디톡스부터 해라. 폰 내려놓고 이불 정리부터 하는 게 진짜 시작임." },
    { level: 50, title: "다이어리 꾸미기에 목숨 건 망상러", sub: "[문구점 VIP 호갱님]", fact: "다이어리 사고 펜 고르는 게 인생 최대 업적. 도구가 완벽해야 시작하지 라며 장비빨만 세우고 시작은 내일로.", pres: "장비 탓 그만하고 당장 굴러다니는 종이에 할 일 딱 1개만 써라." },
    { level: 70, title: "숨 쉴 틈 없이 계획만 짜다 지친 망상러", sub: "[스케줄 강박증 환자]", fact: "10분 단위로 계획 짜서 본인을 들볶는 중. 계획 하나 틀어지면 세상을 잃은 듯 자학하는 완벽주의 폭주족.", pres: "갓생 살려다 골로 간다. 계획 절반은 지우고 멍 때리는 시간부터 넣어!" },
    { level: 99, title: "뇌내 망상으로 이미 우주 정복한 망상러", sub: "[방구석 갓생 도인]", fact: "명상만 하면 우주 지식이 뇌로 꽂힌다고 믿음. 행동은 안 하면서 긍정 확언만 만 번 외치는 도인. 입만 갓생임.", pres: "상상 속에서 성공하지 말고 지금 당장 책 1페이지만이라도 읽어라." },
  ]
};

export default function DelusionTest() {
  const [step, setStep] = useState<'intro' | 'category' | 'quiz' | 'result'>('intro');
  const [category, setCategory] = useState<Category | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<{text: string, points: number}[]>([]);

  useEffect(() => {
    if (step === 'quiz' && category) {
      const currentQuestion = QUESTIONS[category.id][quizIdx];
      const optionsWithPoints = currentQuestion.a.map((text, index) => ({
        text,
        points: [10, 50, 70, 99][index]
      }));
      const shuffled = [...optionsWithPoints].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [quizIdx, category, step]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    };
  }, []);

  const getResult = () => {
    if (!category) return RESULTS.muscle[0];
    const avg = score / 5;
    const catResults = RESULTS[category.id];
    return catResults.reduce((prev, curr) => 
      Math.abs(curr.level - avg) < Math.abs(prev.level - avg) ? curr : prev
    );
  };

  const getResultEmoji = (result: any) => {
    const emojiMap: Record<string, string> = {
      '[침대 부착형 생물]': '🛏️', '[아가리 파이터]': '💬', '[걸어 다니는 종합병원]': '🏥', '[상상 속 올림피아 챔피언]': '🏆',
      '[강제 무소유 실천가]': '🧘', '[결제 버튼 공포증 환자]': '😰', '[한강 수온 체크 전문가]': '🌊', '[일론 머스크 숨겨진 자식]': '🚀',
      '[모태 솔로계의 시조새]': '🦕', '[방구석 연애 코치]': '📺', '[급발진 폭주 기관차]': '🚂', '[프로 김칫국 드링커]': '🥤',
      '[영혼 없는 사무실 지박령]': '👻', '[말로만 파이어족]': '🔥', '[상상 속 창업 신화 주인공]': '💼', '[세계관 최강자 언더커버 보스]': '👑',
      '[프로 와식 생활러]': '🛋️', '[문구점 VIP 호갱님]': '✏️', '[스케줄 강박증 환자]': '⏰', '[방구석 갓생 도인]': '🧘‍♂️',
    };
    return emojiMap[result.sub] || '🥴';
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://mangsang-2026.vercel.app');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const shareKakao = () => {
    if (typeof window === 'undefined' || !window.Kakao || !category) {
      alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      return;
    }
    const result = getResult();
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `새해 망상 레벨: ${result.title}`,
          description: "내 망상 지수는 과연 몇 레벨일까? 지금 확인!",
          link: { mobileWebUrl: 'https://mangsang-2026.vercel.app', webUrl: 'https://mangsang-2026.vercel.app' },
        },
        buttons: [{ title: '테스트 시작', link: { mobileWebUrl: 'https://mangsang-2026.vercel.app', webUrl: 'https://mangsang-2026.vercel.app' } }],
      });
    } catch (error) {
      console.error('카카오톡 공유 오류:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col font-handwriting relative overflow-hidden">
      
      {step === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <p className="bg-pink-100 px-4 py-2 text-xs font-bold text-gray-700 rounded-full mb-6 border border-pink-200">작년에도 그 소리 하셨죠?</p>
          <h1 className="text-4xl font-black mb-6 tracking-tight leading-tight text-gray-900"><span className="text-pink-500">새해 망상</span><br/><span>레벨</span> 테스트</h1>
          <div className="relative mb-10"><div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full flex items-center justify-center text-7xl shadow-lg">🐣</div></div>
          <button onClick={() => setStep('category')} className="w-full py-4 bg-gray-900 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-gray-800 active:scale-95 transition-all">내 망상 레벨 테스트하기</button>
        </div>
      )}

      {step === 'category' && (
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-black text-center mt-8 mb-8 text-gray-900 break-keep">올해는 어떤 망상에<br/>절여져 있나요?</h2>
          <div className="grid gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setCategory(cat); setQuizIdx(0); setScore(0); setStep('quiz'); }} className={`flex items-center justify-between p-5 ${cat.color} border border-gray-200 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all text-left`}>
                <div className="flex items-center"><span className="text-3xl mr-4">{cat.icon}</span><span className="text-lg font-bold text-gray-900">{cat.name}</span></div>
                <span className="text-gray-400">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'quiz' && category && (
        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3"><div className="bg-gradient-to-r from-pink-500 to-yellow-500 h-full rounded-full transition-all duration-300" style={{ width: `${((quizIdx + 1) / 5) * 100}%` }}></div></div>
            <div className="text-center"><span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">Q {quizIdx + 1} / 5</span></div>
          </div>
          <h2 key={`q-${quizIdx}`} className="text-xl font-bold mb-8 break-keep leading-relaxed text-center text-gray-900">&quot;{QUESTIONS[category.id][quizIdx].q}&quot;</h2>
          <div className="grid gap-3 flex-1">
            {shuffledOptions.map((opt) => (
              <button key={`ans-${quizIdx}-${opt.text}`} onClick={(e) => { setScore(score + opt.points); (e.currentTarget as HTMLButtonElement).blur(); if (quizIdx < 4) { setQuizIdx(quizIdx + 1); window.scrollTo(0, 0); } else { setStep('result'); } }} className="p-4 bg-white border border-gray-200 rounded-xl font-semibold text-left text-gray-900 md:hover:bg-gray-50 active:bg-pink-50 active:border-pink-200 transition-colors shadow-sm break-keep text-sm outline-none">
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && category && (
        <div className="flex-1 bg-white flex flex-col items-center pb-12 overflow-y-auto">
          
          {/* ✅ 상단 광고: 패딩 없이 상단에 밀착 */}
          <AdFit unit="DAN-5Z9kZtSOPQawYW0u" width="320" height="50" />

          {/* 내부 콘텐츠 영역 (p-6 패딩 유지) */}
          <div className="w-full p-6 flex flex-col items-center">
            <div className="mt-2 mb-4 bg-gradient-to-r from-pink-500 to-yellow-500 px-5 py-2 rounded-full font-bold text-white text-sm shadow-lg">
              {category.name} 레벨
            </div>

            {(() => {
              const result = getResult();
              const emoji = getResultEmoji(result);
              return (
                <>
                  <h2 className="text-2xl font-black text-center mb-6 leading-tight break-keep text-gray-900">Lv. {result.level} | {result.title}</h2>
                  <div className="w-full rounded-2xl p-5 bg-gradient-to-br from-gray-50 to-white mb-6 shadow-lg border border-gray-100">
                    <div className="w-40 h-40 mx-auto bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl flex items-center justify-center text-7xl mb-4">{emoji}</div>
                    <p className="text-center font-semibold text-gray-600 text-sm">{result.sub}</p>
                  </div>
                  <div className="w-full space-y-4 mb-8">
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 rounded-xl border border-rose-100 shadow-sm">
                      <h4 className="font-bold text-rose-600 mb-2 text-base flex items-center gap-2"><span>⚡️</span> 팩트 폭격</h4>
                      <p className="text-sm leading-relaxed break-keep text-gray-800">{result.fact}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100 shadow-sm">
                      <h4 className="font-bold text-green-600 mb-2 text-base flex items-center gap-2"><span>💊</span> 처방전</h4>
                      <p className="text-sm leading-relaxed break-keep text-gray-800">{result.pres}</p>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* 버튼 영역: mb-4 간격 적용 */}
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
              <button onClick={shareKakao} className="py-4 bg-[#FEE500] rounded-xl font-bold text-gray-900 shadow-md active:scale-95 transition-all text-sm">카톡 공유</button>
              <button onClick={copyLink} className="py-4 bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-900 shadow-sm active:scale-95 transition-all text-sm">링크 복사</button>
            </div>
            
            {/* 다시 테스트하기: mb-4 간격으로 하단 배너와 동일하게 맞춤 */}
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-gray-900 text-white text-base font-bold rounded-xl shadow-lg hover:bg-gray-800 active:scale-95 transition-all mb-4">
              다시 테스트하기
            </button>

            {/* ✅ 하단 광고: 상단 버튼과 동일한 mb-4 간격 유지 */}
            <AdFit unit="DAN-Xp0kA4ImcKSQrg7f" width="300" height="250" />

            <footer className="w-full py-12 mt-8 border-t border-gray-50 text-center">
              <button 
                onClick={() => window.location.href='/privacy'}
                className="text-[12px] text-gray-400 underline decoration-gray-200 hover:text-gray-600 transition-colors"
              >
                개인정보 처리방침
              </button>
              <p className="text-[10px] text-gray-300 mt-2">© 2026 mangsang_2026</p>
            </footer>
          </div>
        </div>
      )}

      {(step === 'intro' || step === 'category') && (
        <footer className="py-8 text-center border-t border-gray-50 mt-auto">
          <button 
            onClick={() => window.location.href='/privacy'}
            className="text-[12px] text-gray-400 underline decoration-gray-200 hover:text-gray-600 transition-colors"
          >
            개인정보 처리방침
          </button>
          <p className="text-[10px] text-gray-300 mt-2">© 2026 mangsang_2026</p>
        </footer>
      )}

{/* 토스트 메시지: 레이어 분리로 중앙 정렬 충돌 해결 */}
      {showToast && (
        <div className="fixed bottom-12 inset-x-0 flex justify-center z-[9999] pointer-events-none">
          <div className="bg-gray-900/95 text-white px-6 py-3 rounded-full font-bold shadow-2xl animate-bounce text-sm whitespace-nowrap backdrop-blur-sm pointer-events-auto">
            링크 복사 완료! 🚀
          </div>
        </div>
      )}
    </div>
  );
}
