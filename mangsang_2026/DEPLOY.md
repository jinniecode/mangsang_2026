# 배포 가이드

## Vercel 배포 방법

### 1. GitHub에 저장소 생성 및 푸시

```bash
# GitHub에서 새 저장소 생성 (예: mangsang-2026)

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/mangsang-2026.git

# 푸시
git branch -M main
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com)에 로그인 (GitHub 계정으로 연결)
2. "Add New Project" 클릭
3. GitHub 저장소 선택 (mangsang-2026)
4. 프로젝트 설정:
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: ./
5. **환경 변수 추가**:
   - Name: `NEXT_PUBLIC_KAKAO_JS_KEY`
   - Value: `203ef9e6613c1e84a888fbf05b814fab`
6. "Deploy" 클릭

### 3. 카카오톡 개발자 센터 설정

배포 후 Vercel에서 제공하는 도메인을 카카오톡 개발자 센터에 등록해야 합니다:

1. [카카오톡 개발자 센터](https://developers.kakao.com) 접속
2. 내 애플리케이션 선택
3. **앱 설정 > 플랫폼** 에서:
   - Web 플랫폼 등록
   - 사이트 도메인: `https://your-project.vercel.app` (Vercel 배포 URL)
4. 저장

### 4. 완료!

이제 배포된 사이트에서 카카오톡 공유 기능이 정상 작동합니다.

