// 한국어 번역 파일
export const ko = {
  // 헤더/네비게이션
  copy: "복사",
  paste: "붙여넣기",
  reset: "초기화",
  addDeck: "덱 추가",
  undo: "실행취소",
  redo: "다시실행",
  help: "도움말",
  
  // 검색 영역
  searchByDept: "학과별 검색",
  searchByCourse: "과목명 검색",
  customCourse: "직접 추가",
  search: "검색",
  courseName: "과목명",
  courseCode: "학수번호",
  credit: "학점",
  add: "추가",
  clear: "초기화",
  searchYearLabel: "검색기준",
  
  // 전공 선택 영역
  majorDiv: {
    major1: "제1전공",
    doubleMajor: "이중전공",
    multipleMajor: "복수전공",
    transfer: "학사편입",
    convergence: "융합전공",
    intensive: "심화전공",
    studentDesigned: "학생설계전공"
  },
  yearLabel: "기준년도",
  majorGpa: "전공 평점",
  
  // 학기 그리드
  semester: {
    first: "1학기",
    summer: "여름",
    second: "2학기",
    winter: "겨울"
  },
  year: "학년",
  credit: "학점",
  gpa: "평점",
  major: "전공",
  
  // 팝업/모달
  popup: {
    grade: "평점",
    majorCourse: "전공 과목",
    majorCourseDesc: "이 과목을 전공 평점 계산에 포함",
    save: "저장",
    delete: "삭제",
    close: "닫기",
    confirmDelete: "과목을 삭제하시겠습니까?"
  },
  
  // 도움말
  help: {
    title: "📚 사용법 안내",
    content: `<p>• PC나 태블릿 등 가로화면 기기 사용을 권장합니다.</p>
        <p>• 모든 기록은 브라우저에 저장되며, 브라우저 기록을 삭제하지 않는 한 그대로 유지됩니다.</p>
        <p>• 원하는 과목을 드래그하거나, 과목 클릭 후 학기 셀을 클릭해 배치하세요.</p>
        <p>• 배치된 과목을 클릭하여 평점을 설정할 수 있습니다.</p>
        <p>• 2018년부터 올해까지의 고려대 교육정보시스템 기준을 따릅니다.<br>
            졸업요건에 이상이 있을 시 메일로 문의해주세요.</p>
        <p>• 변동이 생긴 교양과목(ex. 자정진>학세탐)의 경우 자동으로 반영되도록 해 두었으나, 이상이 발생할 경우 '직접 추가' 기능을 이용해 학수번호를 직접 설정해주세요.</p>
        <p>• 일반교양과목(ex. 과어탈, 종영 등)의 경우 '직접 추가' 기능을 이용해 추가하세요.</p>
        <p>• 졸업요건의 '기준 년도'는 복수전공의 경우 진입년도로 설정해야 하며, 제1전공, 이중전공 등 나머지는 자신의 입학년도로 설정해야 합니다.</p>
        <p>• 심화전공을 이수하시는 경우, 졸업요건에서 제1전공을 고르지 말고 반드시 심화전공만 고르세요!</p>
        <p>• 여러 전공에 해당되는 강의는 위쪽 전공부터 순차 적용됩니다.</p>
        <p>• 일부 학과에서 적용되는 '전공필수 초과 이수시 전공선택으로 인정'은 구조상 구현이 어렵습니다. 양해 부탁드립니다.</p>
        <p>• 동일 강의코드는 재수강으로 간주되며 전체학점 계산에서 한 번만 반영됩니다.</p>
        <p>• 문의사항은 여기로 —> <a href="mailto:lemonplugin@gmail.com" target="_blank">lemonplugin@gmail.com</a></p>`
  },
  
  // 통계/차트
  stats: {
    totalCredit: "총이수학점",
    overallGpa: "평점",
    majorGpa: "전공평점",
    yearCredit: "학점",
    yearGpa: "평점",
    yearMajor: "전공"
  },
  
  // 검색 결과
  searchResult: {
    noResults: "검색 결과가 없습니다.",
    addedCourses: "추가된 교양과목",
    takenCourse: "이미 수강한 과목"
  },
  
  // 메시지
  messages: {
    confirmReset: "의 모든 과목을 초기화하시겠습니까?",
    loading: "강의 데이터가 로딩 중입니다. 잠시 후 다시 시도해주세요.",
    minLength: "2글자 이상 입력하세요.",
    fillAllFields: "모든 필드를 입력해주세요.",
    networkError: "네트워크 오류"
  }
}; 