# 🌍 TerraDice

> **지구 어딘가에서 온, 오늘의 질문**  
> 포춘쿠키를 여는 듯 질문을 받고, 오늘의 생각을 기록하는 감성 저널링 앱

TerraDice는 Expo 기반의 React Native 앱으로, 무작위 질문을 통해 자기 성찰을 돕고 기록을 완전히 오프라인으로 보관합니다. Confetti, Lottie 애니메이션, NativeWind 스타일링으로 감성적인 경험을 제공하며 사진 첨부와 다국어 지원까지 갖춘 것이 특징입니다.

---

## ✨ 주요 기능
- **랜덤 질문 생성**: 카테고리와 이모지가 포함된 40개의 질문 중 하나를 포춘쿠키 애니메이션과 함께 제공.
- **감성 UI/UX**: 지구 애니메이션(Lottie), Confetti, 카드 컬러 팔레트 등으로 몰입감 있는 인터랙션.
- **생각 기록 & 사진 첨부**: 텍스트 입력과 사진을 함께 저장하고 미리보기/삭제를 지원.
- **로컬 영구 저장**: `AsyncStorage` 기반으로 완전 오프라인 동작 및 개인정보 보호.
- **저장소 뷰 & 삭제**: 날짜별 카드 리스트, 이미지 썸네일, 스와이프 없이 간단 삭제.
- **다국어 지원**: 기기 언어에 따라 한국어/영어 자동 적용(`i18next + expo-localization`).
- **AdMob 배너**: 환경 변수 기반 ID로 iOS/Android에서 테스트·상용 광고 분리.

---

## 🧭 사용자 플로우
1. **홈** (`app/index.tsx`): 포춘쿠키 버튼 → Confetti + 스핀 애니메이션 → 질문 추첨.
2. **질문 화면** (`app/journal.tsx`): 질문 카드 확인 → 답변 작성 → 사진 선택/삭제 → 로컬 저장.
3. **기록 보기** (`app/records.tsx`): 날짜·카테고리·이모지와 함께 카드 목록 확인, 필요 시 삭제.

---

## 🛠 Tech Stack
- **Framework**: Expo 54 (React Native 0.81, React 19, TypeScript)
- **Navigation**: `expo-router` + `SafeAreaProvider`
- **State/Storage**: `AsyncStorage`, React hooks
- **Styling**: NativeWind/Tailwind, custom fonts (Inter)
- **Media & Effects**: `lottie-react-native`, `react-native-confetti-cannon`, `expo-image-picker`
- **Ads**: `react-native-google-mobile-ads`
- **Localization**: `i18next`, `expo-localization`

---

## 📁 주요 디렉터리
```text
app/            Expo Router screens (home, journal, records)
components/     Shared UI (e.g., AdMobBanner)
data/           질문 데이터 및 유틸 (`questions.ts`)
utils/          AsyncStorage 래퍼 등 비즈니스 로직
locales/        다국어 리소스 (en, ko)
assets/lottie/  Lottie 애니메이션 파일
types/          공유 타입 정의 (`JournalRecord` 등)
```

---

## 🚀 시작하기
### 1. 사전 준비
- Node.js 18+
- Expo CLI (`npm i -g expo` 선택 사항)
- iOS Simulator / Android Emulator / Expo Go

### 2. 설치
```bash
npm install
```

### 3. 환경 변수 설정
AdMob 배너 ID를 `.env`에 설정합니다.
```bash
EXPO_PUBLIC_ADMOB_IOS_BANNER_ID=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID=ca-app-pub-xxxxxxxxxxxxxxxx~zzzzzzzzzz
```
> 개발 단계에서는 구글이 제공하는 테스트 ID가 자동으로 사용됩니다. 실제 배포 시 위 값을 채워 주세요.

### 4. 실행 & 스크립트
| 명령 | 설명 |
|------|------|
| `npm run start` | Expo dev server 실행 (QR 코드/시뮬레이터) |
| `npm run android` | Android 디바이스/에뮬레이터에서 실행 |
| `npm run ios` | iOS 시뮬레이터 실행 |
| `npm run web` | Expo web 빌드 |
| `npm run lint` | ESLint + Prettier 체크 |
| `npm run format` | ESLint fix + Prettier 포맷 |

---

## 💾 데이터 & 개인정보
- AsyncStorage 키: `@terradice:records`
- 저장 구조 (`types/index.ts`):

```ts
interface JournalRecord {
  id: string;          // ISO timestamp
  questionId: number;
  question: string;
  category: string;
  emoji: string;
  note: string;
  date: string;        // YYYY-MM-DD
  color?: string;      // 카드 색상
  imageUri?: string;   // 선택 이미지
}
```

데이터는 기기 내에만 보관되며 서버로 전송되지 않습니다. 필요 시 `utils/storage.ts`의 `clearAllRecords`로 전체 삭제가 가능합니다.

---

## 🌐 다국어 확장
1. `locales/`에 `<언어코드>.json` 파일 추가.
2. `i18n.ts`의 `resources`에 등록.
3. 질문/카테고리 키(`data/questions.ts`)를 번역 파일에 추가.

`expo-localization`이 기기 언어를 감지하여 자동으로 적용합니다.

---

## 🔮 향후 아이디어
- 좌표 기반 여행지 설명 AI 생성
- 지도 핀 누적 및 클라우드 동기화
- 지역별 앰비언트 사운드 테마 추가

---

## 🤝 기여 & 문의
이 레포는 1인 개발용 MVP로 시작했지만, 아이디어와 기여를 언제든 환영합니다. PR 또는 Issue로 의견을 남겨 주세요.

