# 새해 망상 레벨 테스트 🐣

B급 감성과 병맛 코드가 가득한 심리테스트 웹앱입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```
NEXT_PUBLIC_KAKAO_JS_KEY=your_kakao_js_key_here
```

카카오톡 JavaScript SDK 키는 [카카오 개발자 센터](https://developers.kakao.com)에서 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 프로젝트를 연결
2. 환경 변수 `NEXT_PUBLIC_KAKAO_JS_KEY` 추가
3. 배포 완료!

## 🎨 디자인 컨셉

- **배경색**: #FDFCF0 (미색)
- **테두리**: border-4 border-black (굵은 검정 테두리)
- **섀도우**: shadow-[8px_8px_0_rgba(0,0,0,1)] (하드 섀도우)
- **폰트**: Gowun Batang (손글씨 느낌)

## 📱 기능

- 5가지 망상 카테고리 (근육, 돈, 연애, 퇴사, 갓생)
- 각 카테고리별 5개 질문
- 레벨별 결과 제공 (Lv.10, 50, 70, 99)
- 카카오톡 공유 기능
- 링크 복사 기능

## 🛠 기술 스택

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

