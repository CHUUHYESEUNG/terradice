
# 앱 이름 : 🌍 TerraDice

> **지구 어딘가에서 온, 오늘의 질문**
> TerraDice는 포춘쿠키를 열듯 버튼 하나로 질문을 받고,
> 오늘의 생각을 자유롭게 기록하는 감성 일기 앱입니다.

---

## 🪧 Project Overview

| 항목 | 내용 |
|------|------|
| **프로젝트명** | TerraDice |
| **의미** | Terra(지구) + Dice(주사위) → "지구 어딘가에서 온 질문" |
| **목표** | 사용자가 무작위 질문을 받아 자신의 생각을 기록하는 일상 저널링 앱 |
| **개발 기간** | MVP 기준 1일 |
| **플랫폼** | React Native (Expo) |
| **백엔드** | 없음 — 로컬 스토리지(AsyncStorage) 기반 오프라인 앱 |

---

## 🎯 Concept

> "오늘, 세상이 건네는 질문"
> TerraDice는 포춘쿠키처럼 매일 다른 질문을 선물한다.
> 가볍게 시작하지만, 깊이 있는 자기 성찰로 이어진다.
> 질문에 답하며 오늘을 기록하고, 기록은 오직 내 기기 속에만 남는다.

---

## 🧩 Core Features

| 기능 | 설명 | RN 요소 |
|------|------|----------|
| 🎲 **랜덤 좌표 생성** | `Math.random()`으로 위도·경도 생성 | useState, Math.random() |
| 🗺️ **지도 표시 (선택)** | react-native-maps로 해당 좌표 표시 | react-native-maps |
| ✍️ **여행 일기 작성** | 텍스트 입력 후 로컬 저장 | TextInput, AsyncStorage |
| 📚 **기록 보기** | 날짜순 리스트 뷰로 출력 | FlatList, JSON 파싱 |
| 🌌 **감성 UI 효과** | 배경 애니메이션, 카드 색 랜덤 | Lottie or Confetti |
| 🗓️ **날짜별 저장** | id(ISOTime) + 좌표 + 메모 | AsyncStorage |

---

## 💾 Data Structure

```json
{
  "records": [
    {
      "id": "2025-10-27T14:22:00Z",
      "latitude": 48.8566,
      "longitude": 2.3522,
      "note": "파리의 가을 냄새 속에서 커피 한 모금.",
      "date": "2025-10-27"
    }
  ]
}


⸻

🖼️ Screen Design (MVP)

화면	구성	주요 요소
🏠 Home	“지구를 던지기 🎲” 버튼	랜덤 좌표 생성
🌍 Travel	지도뷰 + 좌표 + 메모 입력	지도, TextInput, 저장 버튼
📔 Record	FlatList로 기록 표시	카드형 UI, 날짜순 정렬


⸻

🎨 Design Direction

요소	스타일
색상	Midnight Blue #0B1E38, Cream #F8F6F0, Sky Accent #4CAEFF
폰트	Pretendard / SF Pro Rounded
아이콘	Dice 🎲 / Planet 🌍 / Note ✍️
분위기	감성적, 고요한 지구의 이미지
애니메이션	별똥별, 지구 회전, 페이드 카드 전환


⸻

⚙️ Tech Stack
	•	React Native (Expo)
	•	TypeScript
    •	Expo-router
    •	Nativewind
	•	AsyncStorage → 로컬 데이터 저장
	•	react-native-maps → 지도 표시
	•	react-native-lottie / confetti-cannon → 감성 애니메이션
	•	react-navigation → 화면 전환 관리

⸻

🧱 MVP Development Plan

단계	범위	예상 소요
1️⃣ MVP Core	좌표 생성 / 메모 작성 / 로컬 저장 / 리스트 출력	1일
2️⃣ UI Polish	카드 뷰, 배경색 랜덤, 별똥별 효과	+0.5일
3️⃣ 지도·애니메이션	지도뷰, Lottie 연동	+0.5일


⸻

💡 Future Ideas
	•	🪐 AI 여행지 설명: Claude 또는 GPT API로 좌표 기반 여행 설명 자동 생성
	•	📍 핀 누적 지도: 기록한 좌표를 지도에 누적 표시
	•	☁️ 클라우드 동기화: 향후 로그인 기능 시 데이터 백업
	•	🎧 사운드 테마: 지역별 랜덤 환경음 (파도, 바람 등)

⸻

🧭 Development Notes
	•	100% 오프라인 작동
	•	UI 중심의 간결한 구조
	•	Hook 기반 모듈형 설계 (storage, map, ui 분리 권장)
	•	향후 서버 연동 대비 데이터 모듈화 유지

⸻

🧑‍💻 Contributors
	•	PM / 기획: Jay
	•	CTO / 개발: Claude Code
	•	Design: TBD (감성 UI 중심으로 최소한의 컴포넌트 디자인)

⸻

🪐 Tagline

"지구 어딘가에서 온, 오늘의 질문"
— TerraDice

⸻

---

## 📅 Development History

### 2025-10-27 - Initial Development

#### Phase 1: MVP Core Implementation ✅
- ✅ Expo + TypeScript 프로젝트 셋업
- ✅ expo-router 네비게이션 구조 구축
- ✅ AsyncStorage 기반 로컬 스토리지 구현
- ✅ 3개 화면 구성 (Home, Travel, Records)
- ✅ 랜덤 좌표 생성 기능
- ✅ 여행 일기 작성 및 저장
- ✅ 기록 리스트 뷰 (FlatList)
- ✅ 기본 카드 UI 및 랜덤 색상

**Tech Stack:**
- React Native (Expo 54)
- TypeScript
- expo-router
- NativeWind (Tailwind CSS)
- AsyncStorage

#### Phase 2: UI Polish ✅
- ✅ Lottie 및 Confetti 패키지 설치
- ✅ 커스텀 별똥별 애니메이션 컴포넌트 생성
- ✅ Home 화면에 별똥별 배경 4개 추가
- ✅ 주사위 굴릴 때 Confetti 효과
- ✅ 버튼 스케일 애니메이션 (누르는 피드백)
- ✅ 화면 전환 애니메이션 개선 (fade, slide)
- ✅ Inter 폰트 패밀리 적용 (Regular, SemiBold, Bold)
- ✅ 스플래시 스크린 개선

**추가 패키지:**
- lottie-react-native
- react-native-confetti-cannon
- expo-font
- @expo-google-fonts/inter
- expo-splash-screen

#### Phase 3: Technical Issues & Solutions ⚠️
**문제점:**
- react-native-reanimated/worklets 설정 충돌
- babel plugin 중복 에러
- Google Maps API 비용 문제

**해결:**
- ✅ react-native-reanimated 제거 (기본 Animated API로 충분)
- ✅ babel.config.js 정리
- ✅ 불필요한 의존성 제거

#### Phase 4: Pivot Decision 🔄
**결정 사항:**
- Google Maps API 비용 문제로 지도 기능 재검토
- **데일리 저널링 앱으로 피봇 결정**
- TerraDice 이름 유지
- 컨셉 변경: "랜덤 좌표 → 랜덤 질문"

**다음 작업:**
- 랜덤 질문 데이터베이스 생성
- UI 재구성 (좌표 → 질문 중심)
- Travel → Journal 화면 리네이밍
- 타입 정의 업데이트

#### Phase 5: Pivot Implementation - Daily Journaling App ✅
**완료 사항:**
- ✅ 40개 질문 데이터베이스 생성 (7개 카테고리)
  - 자기 성찰, 과거 회상, 미래 상상, 관계, 일상, 가치관, 창의적 질문, 도전과 성장
- ✅ 타입 정의 변경: `TravelRecord` → `JournalRecord`
- ✅ Home 화면: 좌표 생성 → 질문 생성
- ✅ Travel → Journal 화면 리네이밍 및 전체 UI 변경
- ✅ Records 화면: 질문 기반 카드 UI로 재구성
- ✅ 모든 텍스트 여행 → 저널로 변경

**새로운 데이터 구조:**
```typescript
interface JournalRecord {
  id: string;
  questionId: number;
  question: string;
  category: string;
  emoji: string;
  note: string;
  date: string;
  color?: string;
}
```

**변경된 사용자 플로우:**
1. 주사위 던지기 → 랜덤 질문 생성
2. 질문 카드 표시 (카테고리, 이모지 포함)
3. 답변 작성 및 저장
4. 저널 기록 리스트에서 확인

**앱 특징:**
- 📝 매일 다른 질문으로 자기 성찰
- 🎨 감성적인 UI 유지 (별똥별, Confetti 등)
- 💾 완전 오프라인 (AsyncStorage)
- 🎲 랜덤성으로 예측 불가능한 질문

#### Phase 6: UX Refinement - Fortune Cookie Concept ✅
**문제 인식:**
- "저널"이라는 용어가 너무 진지하고 부담스러움
- "주사위"가 컨셉에 잘 안 맞음

**해결책:**
- ✅ 태그라인 변경: "지구 어딘가에서 온, 오늘의 질문"
- ✅ 주사위 🎲 → 포춘쿠키 🥠 아이콘 변경
- ✅ "저널" → "생각 기록"으로 부드럽게 변경
- ✅ 전반적인 톤 앤 매너 조정 (가볍고 친근하게)

**변경된 주요 문구:**
- "주사위를 던져보세요" → "포춘쿠키를 열어보세요"
- "내 저널 기록 보기" → "내 생각 모아보기"
- "저널 저장하기" → "생각 저장하기"
- "오늘의 저널" → "오늘의 질문"

**컨셉 개선:**
- 포춘쿠키 = 지구 어딘가의 지혜
- 예측 불가능한 질문을 "받는다"는 느낌
- 가볍고 재미있게 시작, 깊이있게 작성
- 부담 없는 일상 기록

#### Phase 7: Photo Attachment Feature ✅
**사용자 요청:**
> "textarea 작성할때 사진도 같이 첨부할수 있으면 좋을것같아. 그래서 내 생각 모아보기 했을때 썸네일도 같이 볼수있으면 좋을듯"

**구현 내용:**
- ✅ expo-image-picker 패키지 설치
- ✅ JournalRecord 타입에 imageUri 필드 추가
- ✅ journal 화면에 사진 선택 기능 구현
  - 갤러리 접근 권한 요청
  - 이미지 편집 기능 (4:3 비율)
  - 이미지 품질 최적화 (0.8)
- ✅ 선택한 사진 미리보기
  - 전체 화면 프리뷰
  - 삭제 버튼 (X) 제공
- ✅ records 화면에 이미지 썸네일 표시
  - 카드 내부에 이미지 표시
  - rounded-xl 스타일로 감성적인 디자인

**사용자 흐름:**
1. 질문에 답변 작성 중 "📷 사진 추가하기" 버튼 터치
2. 갤러리에서 사진 선택 및 편집
3. 선택한 사진 미리보기 확인
4. 답변과 함께 사진 저장
5. "내 생각 모아보기"에서 이미지와 텍스트 함께 확인

**기술 상세:**
```typescript
// 이미지 선택
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
});

// 저장 시 imageUri 포함
const record: JournalRecord = {
  // ... other fields
  imageUri: imageUri || undefined,
};
```

**추가 패키지:**
- expo-image-picker

---
