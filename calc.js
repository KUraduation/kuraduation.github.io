//#region --- 언어 시스템 ---
// 전역 언어 상태
let currentLanguage = localStorage.getItem('preferredLanguage') || 'ko';

// 번역 객체 (3단계에서 확장)
const translations = {
    ko: {
        // 검색 관련
        "searchCriteria": "검색기준",
        "departmentSearch": "학과 검색",
        "courseNameSearch": "강의명 검색",
        "customAdd": "직접 추가",
        "search": "검색",
        "departmentSearchPlaceholder": "학과 이름 입력",
        "courseNamePlaceholder": "강의명 또는 학수번호 입력",
        "courseNameExample": "예: 학문세계의탐구I",
        "courseCodeExample": "예: GELI005",
        "creditExample": "예: 3",

        // 직접 추가 폼
        "courseName": "과목명",
        "courseCode": "학수번호",
        "credit": "학점",
        "add": "추가",
        "reset": "초기화",

        // 학점 표시
        "totalCredits": "총이수학점:",
        "majorCredits": "전공학점:",
        "gpa": "평점:",
        "majorGpa": "전공평점:",

        // 덱 관련
        "deck1": "1",
        "deck2": "2",
        "deck3": "3",
        "deck4": "4",
        "deck5": "5",
        "copy": "복사",
        "paste": "붙여넣기",
        "deckReset": "덱 초기화",
        "export": "내보내기",
        "import": "가져오기",
        "copyTitle": "현재 덱 복사",
        "pasteTitle": "복사된 덱 붙여넣기",
        "resetTitle": "현재 덱 초기화",
        "exportTitle": "데이터 내보내기",
        "importTitle": "데이터 가져오기",
        "undoTitle": "실행 취소",
        "redoTitle": "다시 실행",
        "helpTitle": "도움말",
        "shortcuts": "단축키 안내",
        "shortcutsTitle": "단축키 안내",
        "gpaScaleToggle": "100점",
        "gpaScaleToggleTitle": "평점 표시 기준 변경 (4.5 만점 ↔ 100점 만점)",

        // 도움말
        "helpContent": "졸업학점계산기 사용법입니다.",
        "helpPopupTitle": "📚 사용법 안내",
        "helpDevice": "• PC나 태블릿 등 가로화면 기기 사용을 권장합니다.",
        "helpStorage": "• 모든 기록은 브라우저에 저장되며, 브라우저 기록을 삭제하지 않는 한 그대로 유지됩니다.",
        "helpDragDrop": "• 원하는 과목을 드래그하거나, 과목 클릭 후 학기 셀을 클릭해 배치하세요.",
        "helpClickGrade": "• 배치된 과목을 클릭하여 평점을 설정할 수 있습니다.",
        "helpSystem": "• 2018년부터 올해까지의 고려대 교육정보시스템 자료를 따릅니다.<br>졸업요건에 이상이 있을 시 메일로 문의해주세요.",
        "helpChangedCourse": "• 변동이 생긴 과목(ex. 자정진>학세탐)의 경우 자동으로 반영되도록 해 두었으나, 이상이 발생할 경우 '직접 추가' 기능을 이용해 학수번호를 직접 설정해주세요.",
        "helpGeneralCourse": "• 일반교양과목(ex. 과어탈, 종영 등)의 경우 '직접 추가' 기능을 이용해 추가하세요.",
        "helpYearSetting": "• 졸업요건의 '기준 년도'는 복수전공의 경우 진입년도로 설정해야 하며, 제1전공, 이중전공 등 나머지는 자신의 입학년도로 설정해야 합니다.",
        "helpIntensiveMajor": "• 심화전공을 이수하시는 경우, 졸업요건에서 제1전공을 고르지 말고 반드시 심화전공만 고르세요!",
        "helpMultipleMajor": "• 여러 전공에 해당되는 강의는 위쪽 전공부터 순차 적용됩니다.",
        "helpExcessCredit": "• 일부 학과에서 적용되는 '전공필수 초과 이수시 전공선택으로 인정'은 구조상 구현이 어렵습니다. 양해 부탁드립니다.",
        "helpRetakeCourse": "• 동일 강의코드는 재수강으로 간주되며 전체학점 계산에서 한 번만 반영됩니다.",
        "helpContact": "• 문의사항은 여기로 —> <a href=\"mailto:lemonplugin@gmail.com\" target=\"_blank\">lemonplugin@gmail.com</a><br>• Instagram —> <a href=\"https://www.instagram.com/kuraduation.official/\" target=\"_blank\">@kuraduation.official</a>",
        "helpClose": "닫기",
        
        // 목표 평점 계산
        "gpaGoalCalc": "목표 평점 계산",
        "gpaGoalCalculator": "목표 평점 계산",
        "deckSimulation": "덱 비교",
        "deckComparison": "덱 비교",
        "totalCourses": "총 과목",
        "gradeDistribution": "성적 분포",
        "totalCreditsLabel": "총이수학점",
        "overallGpaLabel": "전체평점", 
        "majorGpaLabel": "전공평점",
        "graduationRequirements": "졸업요건",
        "noRequirementsSet": "졸업요건이 설정되지 않았습니다",
        "noCourseData": "과목 데이터가 없습니다",
        "gradeCoursesTitle": "성적 과목 목록",
        "noGradeCourses": "성적의 과목이 없습니다",
        "courses": "과목",
        "year": "학년",
        "targetGpa": "목표 평점:",
        "totalRemainingCredits": "총 남은 학점:",
        "requiredGpa": "필요 평점:",
        "addSemesterPlan": "학기별 계획 추가",
        "removeSemesterPlan": "학기별 계획 제거",
        "semesterPlan": "학기별 계획",
        "semesterPlanSummary": "",
        "addSemester": "+ 학기 추가",
        "removeSemester": "삭제",
        "semesterLabel": "학기",
        "semesterCreditPlaceholder": "학점",
        "semesterGpaPlaceholder": "평점",
        "saveGpaGoal": "저장",
        "savedGpaGoal": "저장됨",
        "reflectedGpa": "반영 평점:",

        // 검색 버튼 title
        "searchTitle": "검색",

        // 검색결과 과목 툴팁
        "courseTooltip": "드래그 또는 클릭 (다중선택 가능) 후 학기 클릭",

        // 전공별 평점 표시
        "majorGpaDisplay": "전공 평점:",

        // 전공 분류
        "major1": "제1전공",
        "major2": "이중전공",
        "major3": "복수전공",
        "major4": "학사편입",
        "major5": "융합전공",
        "major6": "심화전공",
        "major7": "학생설계전공",

        // 학기 관련
        "semester1": "1학기",
        "semester2": "2학기",
        "summer": "여름",
        "winter": "겨울",
        "semester1Short": "1학기",
        "semester2Short": "2학기",
        "summerShort": "여름",
        "winterShort": "겨울",
        "year": "학년",
        "yearSuffix": "학년",
        "yearEditTitle": "클릭하여 학년명 편집",
        "yearRemoveTitle": "학년 삭제",
        "yearLabel": "기준년도",
        "yearSuffixShort": "",

        // semester header 관련
        "creditHeader": "학점",
        "gpaHeader": "평점",
        "majorHeader": "전공",

        // semester cell 관련
        "creditUnit": "학점",
        "noCredit": "0학점",
        "average": "평균",

        // 학년 서수 (한국어)
        "year1": "1학년",
        "year2": "2학년",
        "year3": "3학년",
        "year4": "4학년",
        "year5": "5학년",
        "year6": "6학년",
        "year7": "7학년",
        "year8": "8학년",

        // 강의 클릭 팝업
        "grade": "평점",
        "selectGrade": "평점 선택",
        "majorCourse": "전공 과목",
        "isMajorCourse": "이 과목을 전공 평점 계산에 포함",
        "saveCourseSetting": "저장",
        "deleteCourse": "삭제",
        "confirmDeleteCourse": "이 과목을 삭제하시겠습니까?",
        "cancelSetting": "취소",

        // 재수강 계산기
        "retakeCourses": "재수강 과목",
        "retakeCalculator": "재수강 계산기",
        "retakeCourseName": "과목명",
        "retakeCurrentGrade": "현재 성적",
        "retakeTargetGrade": "목표 성적",
        "retakeCredit": "학점",
        "retakeEffect": "개선 효과",
        "noRetakeCourses": "재수강 대상 과목이 없습니다.",
        "retakeSummary": "재수강 요약",
        "retakeInstructions": "재수강 후 예상 성적을 입력하면 목표 평점 달성 가능성을 계산합니다.",
        "saveRetakeChanges": "재수강 변경사항 저장",
        "retakeChangesSaved": "재수강 변경사항이 저장되었습니다.",
    },
    en: {
        // Search related
        "searchCriteria": "Year",
        "departmentSearch": "Department",
        "courseNameSearch": "Course",
        "customAdd": "Custom",
        "search": "Search",
        "departmentSearchPlaceholder": "Department name",
        "courseNamePlaceholder": "Course name or code",
        "courseNameExample": "e.g. EXPLORATION OF THE ACADEMIC WORLD I",
        "courseCodeExample": "e.g. GELI005",
        "creditExample": "e.g. 3",

        // Custom add form
        "courseName": "Name",
        "courseCode": "Code",
        "credit": "Credit",
        "add": "Add",
        "reset": "Reset",

        // Credit display
        "totalCredits": "Credits:",
        "majorCredits": "Major:",
        "gpa": "GPA:",
        "majorGpa": "Major GPA:",

        // Deck related
        "deck1": "1",
        "deck2": "2",
        "deck3": "3",
        "deck4": "4",
        "deck5": "5",
        "copy": "Copy",
        "paste": "Paste",
        "deckReset": "Reset",
        "export": "Export",
        "import": "Import",
        "copyTitle": "Copy current deck",
        "pasteTitle": "Paste copied deck",
        "resetTitle": "Reset current deck",
        "exportTitle": "Export data",
        "importTitle": "Import data",
        "undoTitle": "Undo",
        "redoTitle": "Redo",
        "helpTitle": "Help",
        "shortcuts": "Keyboard Shortcuts",
        "shortcutsTitle": "Keyboard Shortcuts",
        "gpaScaleToggle": "100pt",
        "gpaScaleToggleTitle": "Toggle GPA scale (4.5 scale ↔ 100 scale)",

        // Help
        "helpContent": "How to use the graduation credit calculator.",
        "helpPopupTitle": "📚 Usage Guide",
        "helpDevice": "• Use PC or tablet in landscape mode for better experience.",
        "helpStorage": "• All data is saved in your browser and will persist unless you clear browser data.",
        "helpDragDrop": "• Drag and drop courses or click a course then click a semester cell to place it.",
        "helpClickGrade": "• Click on placed courses to set grades.",
        "helpSystem": "• Based on Korea University's educational information system from 2018 to present.<br>Please contact us if there are issues with graduation requirements.",
        "helpChangedCourse": "• Changed courses (e.g., 자정진>학세탐) are automatically reflected, but if issues occur, use the 'Add' feature to set the course code manually.",
        "helpGeneralCourse": "• For general liberal arts courses (e.g., 과어탈, 종영), use the 'Add' feature.",
        "helpYearSetting": "• For graduation requirements 'Criteria', set to entry year for multiple majors, and admission year for primary major, double major, etc.",
        "helpIntensiveMajor": "• If taking intensive major, do not select primary major in graduation requirements, only select intensive major!",
        "helpMultipleMajor": "• Courses applicable to multiple majors are applied sequentially from the top major.",
        "helpExcessCredit": "• 'Excess required major credits count as major electives' applied by some departments is difficult to implement structurally. Thank you for your understanding.",
        "helpRetakeCourse": "• Identical course codes are considered retakes and are only counted once in total credit calculation.",
        "helpContact": "• For inquiries —> <a href=\"mailto:lemonplugin@gmail.com\" target=\"_blank\">lemonplugin@gmail.com</a><br>• Instagram —> <a href=\"https://www.instagram.com/kuraduation.official/\" target=\"_blank\">@kuraduation.official</a>",
        "helpClose": "Close",
      
        // Retake Calculator
        "retakeCourses": "Retake Courses",
        "retakeCalculator": "Retake Calculator",
        "retakeCourseName": "Course Name",
        "retakeCurrentGrade": "Current Grade",
        "retakeTargetGrade": "Target Grade",
        "retakeCredit": "Credit",
        "retakeEffect": "Improvement",
        "noRetakeCourses": "No retake courses available.",
        "retakeSummary": "Retake Summary",
        "retakeInstructions": "Enter your expected grade after retaking the course to calculate the likelihood of achieving your target GPA.",
        "saveRetakeChanges": "Save Retake Changes",
        "retakeChangesSaved": "Retake changes have been saved.",
      
        // GPA Goal Calculator
        "gpaGoalCalc": "GPA Goal Calculator",
        "gpaGoalCalculator": "GPA Goal Calculator",
        "deckSimulation": "Comparison",
        "deckComparison": "Deck Comparison",
        "totalCourses": "Total Courses",
        "gradeDistribution": "Grade Distribution",
        "totalCreditsLabel": "Total Credits",
        "overallGpaLabel": "Overall GPA",
        "majorGpaLabel": "Major GPA", 
        "graduationRequirements": "Graduation Requirements",
        "noRequirementsSet": "Graduation requirements not set",
        "noCourseData": "No course data available",
        "gradeCoursesTitle": "Courses with Grade",
        "noGradeCourses": "No courses with grade",
        "courses": " courses",
        "year": " Year",
        "targetGpa": "Target GPA:",
        "totalRemainingCredits": "Total Remaining Credits:",
        "requiredGpa": "Required GPA:",
        "addSemesterPlan": "Add Semester Plan",
        "removeSemesterPlan": "Remove Semester Plan",
        "semesterPlan": "Semester Plan",
        "semesterPlanSummary": "",
        "addSemester": "+ Add Semester",
        "removeSemester": "Remove",
        "semesterLabel": "Sem",
        "semesterCreditPlaceholder": "Credit",
        "semesterGpaPlaceholder": "GPA",
        "saveGpaGoal": "Save",
        "savedGpaGoal": "Saved",
        "reflectedGpa": "Reflected GPA:",

        // 검색 버튼 title
        "searchTitle": "Search",

        // 검색결과 과목 툴팁
        "courseTooltip": "Drag or click (multiple selection available) then click semester",

        // 전공별 평점 표시
        "majorGpaDisplay": "Major GPA:",

        // 전공 분류
        "major1": "1st Major",
        "major2": "Double Major",
        "major3": "Dual Degree",
        "major4": "Undergraduate Transfer",
        "major5": "Relation Major",
        "major6": "Advanced Major",
        "major7": "Student's Planned Major",

        // 학기 관련
        "semester1": "1st Semester",
        "semester2": "2nd Semester",
        "summer": "Summer",
        "winter": "Winter",
        "semester1Short": "1st",
        "semester2Short": "2nd",
        "summerShort": "Sum",
        "winterShort": "Win",
        "year": "Year",
        "yearSuffix": "Year",
        "yearEditTitle": "Click to edit year name",
        "yearRemoveTitle": "Remove year",
        "yearLabel": "Criteria",
        "yearSuffixShort": "",

        // semester header 관련
        "creditHeader": "Credit",
        "gpaHeader": "GPA",
        "majorHeader": "Major",

        // semester cell 관련
        "creditUnit": " Credit",
        "noCredit": "0 Credit",
        "average": "Average",

        // 학년 서수 (영어)
        "year1": "1st",
        "year2": "2nd",
        "year3": "3rd",
        "year4": "4th",
        "year5": "5th",
        "year6": "6th",
        "year7": "7th",
        "year8": "8th",

        // 강의 클릭 팝업
        "grade": "Grade",
        "selectGrade": "Select Grade",
        "majorCourse": "Major Course",
        "isMajorCourse": "Include this course in Major GPA calculation",
        "saveCourseSetting": "Save",
        "deleteCourse": "Delete",
        "confirmDeleteCourse": "Are you sure you want to delete this course?",
        "cancelSetting": "Cancel",

        // 재수강 계산기
        "retakeCourses": "Retake Courses",
        "retakeCalculator": "Retake Calculator",
        "retakeCourseName": "Course Name",
        "retakeCurrentGrade": "Current Grade",
        "retakeTargetGrade": "Target Grade",
        "retakeCredit": "Credit",
        "retakeEffect": "Retake Effect",
        "noRetakeCourses": "No retake courses available.",
        "retakeSummary": "Retake Summary",
        "retakeInstructions": "Enter your expected grade after retaking the course to calculate the likelihood of achieving your target GPA.",
        "saveRetakeChanges": "Save Retake Changes",
        "retakeChangesSaved": "Retake changes have been saved.",
    }
};

// 언어 전환 함수 (3단계에서 업데이트)
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateAllTexts(); // 모든 텍스트 업데이트
    
    // 단축키 팝업이 열려있으면 다시 표시하여 언어 업데이트
    if (currentShortcutsPopup) {
        showShortcutsPopup();
    }
    
    // 평점 표시 기준 토글 버튼 텍스트 업데이트
    updateGpaScaleToggleButton();
    
    console.log(`언어가 ${lang}로 변경되었습니다.`);
}

// 번역 텍스트 가져오기 함수
function getText(key) {
    return translations[currentLanguage][key] || translations['ko'][key] || key;
}

// 텍스트 업데이트 함수들 (3단계에서 추가)
function updateAllTexts() {
    // data-i18n 속성을 가진 모든 요소 업데이트
    const elementsWithI18n = document.querySelectorAll('[data-i18n]');
    elementsWithI18n.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = getText(key);
        if (text) {
            element.textContent = text;
        }
    });

    // 복사 붙여넣기 버튼 업데이트
    updateCopyPasteButton();

    // placeholder 업데이트
    updatePlaceholders();

    // title 속성 업데이트
    updateTitles();

    // 덱 탭 텍스트 업데이트
    updateDeckTabTexts();

    // 언어 전환 버튼 상태 업데이트
    updateLanguageButtons();

    // 학과검색기 majorDivs 업데이트
    updateMajorDivs();

    // semester header 번역 업데이트
    updateSemesterHeader();
    
    // 목표 평점 계산 텍스트 업데이트
    updateGpaGoalTexts();
    
    // 재수강 계산기 텍스트 업데이트
    updateRetakeCalculatorTexts();

    // 평점 표시 기준 토글 버튼 업데이트
    updateGpaScaleToggleButton();

    loadDeck(currentDeck);
    updateChart({save: false}); // 차트 업데이트
}

function updatePlaceholders() {
    const deptSearchInput = document.getElementById('dept-search-input');
    if (deptSearchInput) {
        deptSearchInput.placeholder = getText('departmentSearchPlaceholder');
    }

    const courseSearchInput = document.getElementById('course-search-input');
    if (courseSearchInput) {
        courseSearchInput.placeholder = getText('courseNamePlaceholder');
    }

    const customCourseName = document.getElementById('custom-course-name');
    if (customCourseName) {
        customCourseName.placeholder = getText('courseNameExample');
    }

    const customCourseCode = document.getElementById('custom-course-code');
    if (customCourseCode) {
        customCourseCode.placeholder = getText('courseCodeExample');
    }

    const customCourseCredit = document.getElementById('custom-course-credit');
    if (customCourseCredit) {
        customCourseCredit.placeholder = getText('creditExample');
    }
}

function updateTitles() {
    const copyBtn = document.getElementById('deck-copy-paste-btn');
    if (copyBtn) {
        copyBtn.title = getText('copyTitle');
    }

    const resetBtn = document.getElementById('deck-reset-btn');
    if (resetBtn) {
        resetBtn.title = getText('resetTitle');
    }

    const exportBtn = document.getElementById('deck-export-btn');
    if (exportBtn) {
        exportBtn.title = getText('exportTitle');
    }

    const importBtn = document.getElementById('deck-import-btn');
    if (importBtn) {
        importBtn.title = getText('importTitle');
    }

    const undoBtn = document.getElementById('undo-btn');
    if (undoBtn) {
        undoBtn.title = getText('undoTitle');
    }

    const redoBtn = document.getElementById('redo-btn');
    if (redoBtn) {
        redoBtn.title = getText('redoTitle');
    }

    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
        helpBtn.title = getText('helpTitle');
    }

    const shortcutsBtn = document.getElementById('shortcuts-btn');
    if (shortcutsBtn) {
        shortcutsBtn.title = getText('shortcutsTitle');
    }

    // 검색 버튼 title 업데이트
    const deptSearchBtn = document.getElementById('dept-search-btn');
    const courseSearchBtn = document.getElementById('course-search-btn');
    if (deptSearchBtn) {
        deptSearchBtn.title = getText('searchTitle');
    }
    if (courseSearchBtn) {
        courseSearchBtn.title = getText('searchTitle');
    }
}

function updateDeckTabTexts() {
    const deckTabs = document.querySelectorAll('.deck-tab');
    deckTabs.forEach(tab => {
        const deckId = tab.dataset.deck;
        if (deckId) {
            const key = deckId; // deck1, deck2, deck3, deck4, deck5
            const text = getText(key);
            if (text) {
                tab.textContent = text;
            }
        }
    });

    // 덱 데이터의 name 속성도 업데이트
    Object.keys(decks).forEach(deckId => {
        if (decks[deckId]) {
            decks[deckId].name = getText(deckId);
        }
    });
}

// 언어 전환 버튼 상태 업데이트
function updateLanguageButtons() {
    const koBtn = document.getElementById('lang-ko-btn');
    const enBtn = document.getElementById('lang-en-btn');

    if (koBtn && enBtn) {
        // 모든 언어 버튼에서 active 클래스 제거
        koBtn.classList.remove('active');
        enBtn.classList.remove('active');

        // 현재 언어에 해당하는 버튼에 active 클래스 추가
        if (currentLanguage === 'ko') {
            koBtn.classList.add('active');
        } else if (currentLanguage === 'en') {
            enBtn.classList.add('active');
        }
    }
}

// 학과검색기 majorDivs 업데이트
function updateMajorDivs() {
    const majorDivSelect = document.getElementById('majorDiv-select');
    if (majorDivSelect) {
        const currentValue = majorDivSelect.value;
        majorDivSelect.innerHTML = '';
        getMajorDivs().forEach((majorDiv, idx) => {
            const option = document.createElement('option');
            option.value = idx;
            option.textContent = majorDiv;
            majorDivSelect.appendChild(option);
        });
        majorDivSelect.value = currentValue;
    }
}

// 학과 선택 드롭다운 업데이트
function updateDeptSelectList(select, year, majorDiv, deptToSelect) {
    select.innerHTML = ''; // 기존 옵션 제거
    const deptList = info[year] ? info[year][majorDiv] : [];
    if (deptList) {
        deptList.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.code; // 학과 코드로 설정
            option.textContent = getDeptName(dept); // 번역된 학과명 사용
            select.appendChild(option);
        });
    }
    if (deptToSelect) {
        select.value = deptToSelect; // 선택된 학과 코드 설정
    }

}

// 학기 헤더 업데이트
function updateSemesterHeader() {
    // row-header 업데이트 (학기명)
    const rowHeaders = document.querySelectorAll('.row-header');
    rowHeaders.forEach((header, index) => {
        if (index === 0) {
            header.textContent = getText('semester1Short');
        } else if (index === 1) {
            header.textContent = getText('summerShort');
        } else if (index === 2) {
            header.textContent = getText('semester2Short');
        } else if (index === 3) {
            header.textContent = getText('winterShort');
        }
    });
}

//#endregion

// 전공 분류 배열 (번역 시스템 사용)
function getMajorDivs() {
    return [
        getText('major1'),
        getText('major2'),
        getText('major3'),
        getText('major4'),
        getText('major5'),
        getText('major6'),
        getText('major7')
    ];
}

// 학번별 과목을 업데이트하려면 여기다가 년도 추가하고 파일 업로드하면 됨
const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const info = {}; // 연도별 졸업정보
let courses = {}; // 강의 정보
let similarCourseMap = {}; // 유사과목

//#region --- json 로드 ---
const dataPromises = years.map(year =>
    fetch(`info_${year}.json`)
        .then(response => {
            if (!response.ok) throw new Error(`네트워크 오류: ${year}.json`);
            return response.json();
        })
        .then(data => {
            info[year] = data;
        })
);

dataPromises.push(
    fetch('courses.json')
        .then(response => {
            if (!response.ok) throw new Error(`네트워크 오류: courses.json`);
            return response.json();
        })
        .then(data => {
            courses = data;
        })
);

dataPromises.push(
    fetch('similar_map.json')
        .then(response => {
            if (!response.ok) throw new Error(`네트워크 오류: similar_map.json`);
            return response.json();
        })
        .then(data => {
            similarCourseMap = data;
        })
);

Promise.all(dataPromises).then(() => {
    console.log('모든 강의 데이터와 대체과목 정보 로드 완료');
    window.dispatchEvent(new Event('coursesLoaded'));
}).catch(error => {
    console.error('JSON 파일 로딩 중 오류 발생:', error);
});
//#endregion

// 강의(과목) 코드가 같은지 확인하려면 모두 이 함수를 사용
function isEqualCourse(courseCode1, courseCode2) {
    if (courseCode1 === courseCode2) return true;

    return similarCourseMap[courseCode1] && similarCourseMap[courseCode1].includes(courseCode2)
        || similarCourseMap[courseCode2] && similarCourseMap[courseCode2].includes(courseCode1);
}

// 번역된 학과명 구하는 함수
function getDeptName(dept) {
    return dept['name'][currentLanguage || 'ko'];
}
// 강의코드로 번역된 강의명 구하는 함수
function getCourseName(code, lan = undefined) {
    return courses[code]['name'][lan || currentLanguage || 'ko'];
}
// 강의 Element로 번역된 강의명 구하는 함수(권장)
function getCourseNameFromElement(courseElement) {
    return courseElement.dataset.isCustom === 'true' ? courseElement.dataset.courseName
        : getCourseName(courseElement.dataset.courseCode);
}
// 강의 Element로 학점 구하는 함수(권장)
function getCourseCreditFromElement(courseElement) {
    return courseElement.dataset.isCustom === 'true' ? courseElement.dataset.courseCredit
        : courses[courseElement.dataset.courseCode]['credit'];
}

// 평점 시스템
const gradeSystem = {
    'A+': 4.5,
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0
    // P/NP는 평점 계산에서 제외
};

const gradeOptions = Object.keys(gradeSystem);
const pnpOptions = ['P', 'NP']; // P/NP 옵션 추가

// 덱 시스템 변수들
// --- 다중 선택 및 일괄 평점 변경 ---
let multiSelectedCourses = new Set();

function highlightMultiSelection(courseEl, selected) {
    if (!courseEl) return;
    if (selected) {
        courseEl.classList.add('multi-selected');
        courseEl.style.outline = '2px solid #dc143c';
        courseEl.style.outlineOffset = '1px';
        courseEl.style.borderRadius = '6px';
    } else {
        courseEl.classList.remove('multi-selected');
        courseEl.style.outline = '';
        courseEl.style.outlineOffset = '';
        courseEl.style.borderRadius = '';
    }
}

function toggleMultiCourseSelection(courseEl) {
    if (!courseEl || !courseEl.classList.contains('taken-course')) return false;
    if (multiSelectedCourses.has(courseEl)) {
        multiSelectedCourses.delete(courseEl);
        highlightMultiSelection(courseEl, false);
        return false;
    } else {
        multiSelectedCourses.add(courseEl);
        highlightMultiSelection(courseEl, true);
        return true;
    }
}

function clearMultiCourseSelection() {
    multiSelectedCourses.forEach(el => highlightMultiSelection(el, false));
    multiSelectedCourses.clear();
}

// Ctrl(또는 Meta) 누르고 과목 클릭 시 선택 토글
document.addEventListener('click', (e) => {
    const courseEl = e.target.closest && e.target.closest('.taken-course');
    if (!courseEl) return;
    // semester-cell 내부 클릭만 허용
    const inSemester = courseEl.closest && courseEl.closest('.semester-cell');
    if (!inSemester) return;

    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const added = toggleMultiCourseSelection(courseEl);
        // 2개 이상 선택되면 자동 팝업
        if (added && multiSelectedCourses.size >= 2) {
            openBulkGradePopup(e.clientX, e.clientY);
        }
    }
});

// 과목 이외를 클릭하면 팝업 즉시 해제 및 선택 해제
document.addEventListener('click', (e) => {
    const isCourse = e.target.closest && e.target.closest('.taken-course');
    const isPopup = currentPopup && currentPopup.contains(e.target);
    if (!isCourse && !isPopup) {
        if (currentPopup) closeCoursePopup();
        if (!e.ctrlKey && !e.metaKey) clearMultiCourseSelection();
    }
}, true);

// ESC로 선택 해제, Del로 선택된 과목 삭제
document.addEventListener('keydown', (e) => {
    // 입력 필드에 포커스가 있으면 단축키 무시
    const activeElement = document.activeElement;
    if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
    )) {
        return;
    }

    if (e.key === 'Escape') {
        clearMultiCourseSelection();
        if (currentPopup) closeCoursePopup();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
        // Del 또는 Backspace 키로 선택된 과목 삭제
        if (multiSelectedCourses.size > 0) {
            e.preventDefault();
            if (confirm(getText('confirmDeleteCourse') || `선택한 ${multiSelectedCourses.size}개의 과목을 삭제하시겠습니까?`)) {
                // 선택된 모든 과목 삭제
                multiSelectedCourses.forEach(courseEl => {
                    courseEl.remove();
                });
                updateChart();
                saveToHistory();
                clearMultiCourseSelection();
                if (currentPopup) closeCoursePopup();
                refreshSearchResults(); // 검색 결과의 취소선 업데이트
            }
        }
    }
});

function openBulkGradePopup(x = null, y = null) {
    if (multiSelectedCourses.size === 0) return;

    // 기존 팝업 닫기
    if (currentPopup) closeCoursePopup();

    const popup = document.createElement('div');
    popup.className = 'course-popup';
    popup.style.minWidth = '240px';

    const header = document.createElement('div');
    header.className = 'course-popup-header';
    header.textContent = `선택 과목 평점 일괄 적용 (${multiSelectedCourses.size})`;
    popup.appendChild(header);

    const gradeSection = document.createElement('div');
    gradeSection.className = 'course-popup-grade';
    gradeSection.style.marginTop = '10px';
    gradeSection.style.marginBottom = '12px';
    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'grade-select';
    gradeSelect.style.width = '100%';
    gradeSelect.style.padding = '6px';
    gradeSelect.style.marginTop = '8px';
    gradeSelect.style.marginBottom = '4px';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = getText('selectGrade');
    gradeSelect.appendChild(defaultOption);
    gradeOptions.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = `${grade} (${gradeSystem[grade]})`;
        gradeSelect.appendChild(option);
    });
    pnpOptions.forEach(pnp => {
        const option = document.createElement('option');
        option.value = pnp;
        option.textContent = pnp;
        gradeSelect.appendChild(option);
    });
    gradeSection.appendChild(gradeSelect);
    popup.appendChild(gradeSection);

    const buttons = document.createElement('div');
    buttons.className = 'course-popup-buttons';

    const applyBtn = document.createElement('button');
    applyBtn.className = 'course-popup-save-btn';
    applyBtn.textContent = '적용';
    applyBtn.style.backgroundColor = '#28a745';
    applyBtn.style.color = 'white';
    applyBtn.style.border = 'none';
    applyBtn.style.padding = '8px 16px';
    applyBtn.style.borderRadius = '4px';
    applyBtn.style.cursor = 'pointer';
    applyBtn.addEventListener('click', () => {
        const selectedGrade = gradeSelect.value;
        if (selectedGrade === '') { closeCoursePopup(); return; }
        // 적용
        multiSelectedCourses.forEach(courseEl => {
            courseEl.dataset.grade = selectedGrade;
            const courseName = getCourseNameFromElement(courseEl);
            const credit = getCourseCreditFromElement(courseEl);
            const gradeText = selectedGrade ? ` (${selectedGrade})` : '';
            courseEl.title = `${courseName} (${credit})${gradeText}`;
        });
        updateChart();
        saveToHistory();
        clearCourseSelection();
        closeCoursePopup();
    });
    buttons.appendChild(applyBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'course-popup-delete-btn';
    deleteBtn.textContent = getText('deleteCourse') || '삭제';
    deleteBtn.style.backgroundColor = '#dc3545';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '8px 16px';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginRight = '8px';
    deleteBtn.addEventListener('click', () => {
        if (confirm(getText('confirmDeleteCourse') || `선택한 ${multiSelectedCourses.size}개의 과목을 삭제하시겠습니까?`)) {
            // 선택된 모든 과목 삭제
            multiSelectedCourses.forEach(courseEl => {
                courseEl.remove();
            });
            updateChart();
            saveToHistory();
            clearMultiCourseSelection();
            closeCoursePopup();
            refreshSearchResults(); // 검색 결과의 취소선 업데이트
        }
    });
    buttons.appendChild(deleteBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'course-popup-close-btn';
    cancelBtn.textContent = getText('cancelSetting');
    cancelBtn.addEventListener('click', () => {
        closeCoursePopup();
    });
    buttons.appendChild(cancelBtn);

    popup.appendChild(buttons);

    document.body.appendChild(popup);
    const rect = popup.getBoundingClientRect();
    let px = x ?? (window.innerWidth / 2 - rect.width / 2);
    let py = y ?? (window.innerHeight / 2 - rect.height / 2);
    popup.style.left = Math.max(10, Math.min(px, window.innerWidth - rect.width - 10)) + 'px';
    popup.style.top = Math.max(10, Math.min(py, window.innerHeight - rect.height - 10)) + 'px';
    currentPopup = popup;

    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

// Ctrl+G 단축키: 선택된 과목이 있을 때 팝업 열기
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
        if (multiSelectedCourses.size > 0) {
            e.preventDefault();
            openBulkGradePopup();
        }
    }
});

// Ctrl+숫자 단축키: 덱 전환 (Ctrl+1, Ctrl+2, ... Ctrl+n)
document.addEventListener('keydown', (e) => {
    // 입력 필드에 포커스가 있으면 단축키 무시
    const activeElement = document.activeElement;
    if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
    )) {
        return;
    }

    if (e.ctrlKey || e.metaKey) {
        const key = e.key;
        // 숫자 키 1-5 확인
        if (key >= '1' && key <= '5') {
            const deckNumber = parseInt(key);
            const deckId = `deck${deckNumber}`;
            
            // 해당 덱이 존재하는지 확인
            if (decks[deckId]) {
                e.preventDefault();
                switchDeck(deckId);
            }
        }
    }
});

// 덱 관련 단축키: Ctrl+C(복사), Ctrl+V(붙여넣기), Ctrl+Del(초기화), Ctrl+E(내보내기), Ctrl+I(가져오기)
document.addEventListener('keydown', (e) => {
    // 입력 필드에 포커스가 있으면 단축키 무시
    const activeElement = document.activeElement;
    if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
    )) {
        return;
    }

    if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        
        if (key === 'c') {
            // Ctrl+C: 덱 복사
            e.preventDefault();
            if (!decks[currentDeck]) return;
            copiedDeckData = JSON.parse(JSON.stringify(decks[currentDeck])); // Deep copy
            updateCopyPasteButton();
        } else if (key === 'v') {
            // Ctrl+V: 덱 붙여넣기
            e.preventDefault();
            if (copiedDeckData) {
                pasteDeck(currentDeck);
                copiedDeckData = null;
                updateCopyPasteButton();
            }
        } else if (key === 'e') {
            // Ctrl+E: 내보내기
            e.preventDefault();
            exportData();
        } else if (key === 'i') {
            // Ctrl+I: 가져오기
            e.preventDefault();
            importData();
        }
    }
    
    // Ctrl+Del: 덱 초기화 (Delete 키는 별도로 처리)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
        e.preventDefault();
        resetDeck(currentDeck);
    }
});

let currentDeck = 'deck1';
let deckCount = 3;
const maxDeckCount = 5;

// 복사/붙여넣기 시스템 변수
let copiedDeckData = null;

// 히스토리 관리 시스템 변수
let historyStack = [];
let currentHistoryIndex = -1;
const maxHistorySize = 50; // 최대 히스토리 개수

// 클릭 이동 시스템 변수
let selectedCourses = new Set(); // 여러 과목 선택을 위한 Set
let isClickMoveMode = false;

// 도움말 팝업 변수
let currentHelpPopup = null;

// 단축키 안내 팝업 변수
let currentShortcutsPopup = null;

// 평점 표시 기준 변수 (false: 4.5 만점, true: 100점 만점)
let use100PointScale = localStorage.getItem('use100PointScale') === 'true' || false;

// 평점 변환 함수 (4.5 만점 <-> 100점 만점)
function formatGpa(gpa) {
    if (gpa === 'N/A' || gpa === null || gpa === undefined) return 'N/A';
    const gpaValue = parseFloat(gpa);
    if (isNaN(gpaValue)) return gpa;
    
    if (use100PointScale) {
        // 4.5 만점을 100점 만점으로 변환
        return ((gpaValue / 4.5) * 100).toFixed(1);
    } else {
        // 4.5 만점 그대로 표시
        return gpaValue.toFixed(2);
    }
}

// 평점 표시 기준 토글 함수
function toggleGpaScale() {
    use100PointScale = !use100PointScale;
    localStorage.setItem('use100PointScale', use100PointScale.toString());
    updateGpaScaleToggleButton();
    updateChart({ save: false }); // UI만 업데이트 (저장하지 않음)
}

// 평점 표시 기준 토글 버튼 업데이트
function updateGpaScaleToggleButton() {
    const toggleBtn = document.getElementById('gpa-scale-toggle-btn');
    if (toggleBtn) {
        // 현재 표시 기준을 버튼에 표시 (100점 만점이면 "100", 4.5 만점이면 "4.5")
        toggleBtn.textContent = use100PointScale ? '100' : '4.5';
        toggleBtn.title = getText('gpaScaleToggleTitle');
    }
}

// 덱 데이터 구조
let decks = {
    deck1: {
        name: "1", // 초기값, 언어 전환 시 업데이트됨
        years: { '1': {}, '2': {}, '3': {}, '4': {} }
    },
    deck2: {
        name: "2", // 초기값, 언어 전환 시 업데이트됨
        years: { '1': {}, '2': {}, '3': {}, '4': {} }
    },
    deck3: {
        name: "3", // 초기값, 언어 전환 시 업데이트됨
        years: { '1': {}, '2': {}, '3': {}, '4': {} }
    }
};

//#region --- localStorage 관련 함수 ---
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('localStorage 저장 오류:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('localStorage 로드 오류:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('localStorage 삭제 오류:', error);
    }
}


// --- 상태 저장 및 복원 (localStorage 사용) ---
function saveStateToLocalStorage() {
    // 현재 덱의 졸업요건 선택 정보 저장
    const majorSelections = [];
    document.querySelectorAll('.dept-select-container').forEach(container => {
        majorSelections.push({
            majorDiv: container.dataset.majorDiv,
            year: container.querySelector('.year-select').value,
            deptCd: container.querySelector('.dept-select').value
        });
    });

    // 현재 덱에 졸업요건 정보 저장
    if (decks[currentDeck]) {
        decks[currentDeck].majorSelections = majorSelections;
    }

    // 모든 데이터를 하나의 객체로 통합하여 저장
    const appState = {
        deckCount,
        currentDeck,
        decks,
        version: '2.1' // 덱별 졸업요건 지원 버전
    };

    saveToLocalStorage('graduationCalculatorData', appState);
}

function loadStateFromLocalStorage() {
    let savedState = loadFromLocalStorage('graduationCalculatorData');
    if (!savedState) {
        // 기본 덱 구조로 초기화
        decks = {
            deck1: { name: "1", years: { '1': {}, '2': {}, '3': {}, '4': {} } },
            deck2: { name: "2", years: { '1': {}, '2': {}, '3': {}, '4': {} } },
            deck3: { name: "3", years: { '1': {}, '2': {}, '3': {}, '4': {} } }
        };
    } else {
        try {
            // 메타데이터 복원
            deckCount = savedState.deckCount || 3;
            currentDeck = savedState.currentDeck || 'deck1';

            // 덱 데이터 복원 (기본값 설정)
            if (savedState.decks) {
                decks = savedState.decks;
            } else {
                // 기본 덱 구조로 초기화
                decks = {
                    deck1: { name: "1", years: { '1': {}, '2': {}, '3': {}, '4': {} }, majorSelections: [] },
                    deck2: { name: "2", years: { '1': {}, '2': {}, '3': {}, '4': {} }, majorSelections: [] },
                    deck3: { name: "3", years: { '1': {}, '2': {}, '3': {}, '4': {} }, majorSelections: [] }
                };
            }

            // 전공 선택 영역 복원 (덱별 졸업요건 지원)
            const selectContainer = document.getElementById('selectContainer');
            selectContainer.innerHTML = ''; // 기존 영역 초기화

            // 기존 버전 호환성 지원
            if (savedState.majorSelections) {
                // 이전 버전: 전역 졸업요건 설정
                savedState.majorSelections.forEach(selection => {
                    createDeptDropdown(selection.majorDiv, selection.year, selection.deptCd);
                });
            } else if (savedState.decks && savedState.decks[currentDeck] && savedState.decks[currentDeck].majorSelections) {
                // 새 버전: 덱별 졸업요건 설정
                savedState.decks[currentDeck].majorSelections.forEach(selection => {
                    createDeptDropdown(selection.majorDiv, selection.year, selection.deptCd);
                });
            }

        } catch (e) {
            console.error("localStorage 로드 오류:", e);
        }
    }

    // 덱 탭 UI 재생성
    const deckTabsContainer = document.querySelector('.deck-tabs');
    const addBtn = document.getElementById('add-deck-btn');
    deckTabsContainer.querySelectorAll('.deck-tab').forEach(tab => tab.remove());

    Object.keys(decks).forEach(deckId => {
        const newTab = document.createElement('button');
        newTab.className = 'deck-tab';
        newTab.dataset.deck = deckId;
        newTab.textContent = decks[deckId].name;
        newTab.addEventListener('click', () => switchDeck(deckId));
        deckTabsContainer.insertBefore(newTab, addBtn);
    });
    addBtn.style.display = Object.keys(decks).length >= maxDeckCount ? 'none' : 'flex';

    // 현재 덱의 과목들을 화면에 로드하고 전체 UI 업데이트
    loadDeck(currentDeck);
    updateDeckTabs();
    updateChart({ save: false }); // 첫 로드 시에는 다시 저장하지 않음
}
//#endregion


// 통합된 복사/붙여넣기 함수
function copyOrPasteDeck() {
    if (copiedDeckData) {
        pasteDeck(currentDeck);
        copiedDeckData = null;
        updateCopyPasteButton();
    } else {
        if (!decks[currentDeck]) return;
        copiedDeckData = JSON.parse(JSON.stringify(decks[currentDeck])); // Deep copy
        updateCopyPasteButton();
    }
}

// 덱 초기화 함수
function resetDeck(deckId) {
    if (!decks[deckId] || !confirm(`"${decks[deckId].name}"의 모든 과목을 초기화하시겠습니까?`)) return;

    decks[deckId].years = { '1': {}, '2': {}, '3': {}, '4': {} };
    decks[deckId].majorSelections = []; // 졸업요건 설정도 초기화

    if (currentDeck === deckId) {
        loadDeck(deckId);
        updateChart(); // UI 업데이트와 저장을 한 번에
    } else {
        saveStateToLocalStorage();
    }

    saveToHistory(); // 히스토리에 저장
}

// 덱 붙여넣기 함수
function pasteDeck(targetDeckId) {
    if (!copiedDeckData || !decks[targetDeckId]) return;

    const deckname = decks[targetDeckId].name;

    decks[targetDeckId] = JSON.parse(JSON.stringify(copiedDeckData));
    decks[targetDeckId].name = deckname; // 덱 이름 유지

    if (currentDeck === targetDeckId) {
        loadDeck(targetDeckId);
        updateChart(); // UI 업데이트와 저장을 한 번에
        saveToHistory(); // 히스토리에 저장
    } else {
        saveStateToLocalStorage();
    }
}

// 통합된 복사/붙여넣기 버튼 상태 업데이트
function updateCopyPasteButton() {
    const copyPasteBtn = document.getElementById('deck-copy-paste-btn');
    if (copyPasteBtn) {
        if (copiedDeckData) {
            copyPasteBtn.textContent = getText('paste');
            copyPasteBtn.title = getText('pasteTitle');
            copyPasteBtn.classList.add('paste-mode');
        } else {
            copyPasteBtn.textContent = getText('copy');
            copyPasteBtn.title = getText('copyTitle');
            copyPasteBtn.classList.remove('paste-mode');
        }
    }
}

// 데이터 내보내기 함수
function exportData() {
    try {
        // 1. 현재 덱 저장
        saveCurrentDeck();
        
        // 2. 현재 덱 데이터 확인
        if (!decks[currentDeck]) {
            alert('현재 덱 데이터를 찾을 수 없습니다.');
            return;
        }
        
        // 3. 내보낼 데이터 구조 생성
        const currentDate = new Date();
        const exportData = {
            // 메타데이터
            exportType: "single-deck",
            exportDate: currentDate.toISOString(),
            version: "2.1",
            
            // 덱 정보
            deckName: decks[currentDeck].name || currentDeck,
            
            // 핵심 데이터
            years: decks[currentDeck].years || {},
            majorSelections: decks[currentDeck].majorSelections || [],
            
            // 추가 설정 (있다면)
            customYearNames: decks[currentDeck].customYearNames || {}
        };
        
        // 4. JSON 문자열로 변환
        const jsonString = JSON.stringify(exportData, null, 2);
        
        // 5. 파일명 생성
        const dateStr = currentDate.getFullYear() + '-' + 
                       String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(currentDate.getDate()).padStart(2, '0');
        const timeStr = String(currentDate.getHours()).padStart(2, '0') + '-' + 
                       String(currentDate.getMinutes()).padStart(2, '0');
        const fileName = `졸업계산기_${exportData.deckName}_${dateStr}_${timeStr}.json`;
        
        // 6. 파일 다운로드
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // 성공 메시지
        alert(`"${exportData.deckName}" 덱 데이터가 성공적으로 내보내졌습니다!\n파일명: ${fileName}`);
        
    } catch (error) {
        console.error('내보내기 오류:', error);
        alert('데이터 내보내기 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
}

// 데이터 가져오기 함수
function importData() {
    // 파일 입력 요소 생성
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // 파일 읽기
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // 데이터 검증
                if (!validateImportData(importedData)) {
                    return;
                }
                
                // 현재 덱에 데이터 적용하기 전 확인
                const deckName = importedData.deckName || '알 수 없음';
                const confirmMessage = `"${deckName}" 덱 데이터를 현재 덱("${decks[currentDeck].name}")에 불러오시겠습니까?\n\n⚠️ 현재 덱의 모든 데이터가 덮어쓰여집니다.`;
                
                if (!confirm(confirmMessage)) {
                    return;
                }
                
                // 백업 생성 (히스토리에 현재 상태 저장)
                saveToHistory();
                
                // 가져온 데이터를 현재 덱에 적용
                applyImportedData(importedData);
                
                // 성공 메시지
                alert(`"${deckName}" 덱 데이터가 성공적으로 불러와졌습니다!`);
                
            } catch (error) {
                console.error('가져오기 오류:', error);
                alert('파일을 읽는 중 오류가 발생했습니다.\nJSON 형식이 올바른지 확인해주세요.');
            }
        };
        
        reader.onerror = function() {
            alert('파일을 읽을 수 없습니다.');
        };
        
        reader.readAsText(file);
    });
    
    // 파일 선택 대화상자 열기
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// 가져온 데이터 검증 함수
function validateImportData(data) {
    try {
        // 필수 필드 검사
        if (!data || typeof data !== 'object') {
            alert('올바르지 않은 파일 형식입니다.');
            return false;
        }
        
        // exportType 확인
        if (data.exportType !== 'single-deck') {
            alert('이 파일은 단일 덱 데이터 파일이 아닙니다.\n올바른 내보내기 파일을 선택해주세요.');
            return false;
        }
        
        // version 확인 (호환성)
        if (data.version && data.version !== '2.1') {
            const continueImport = confirm(`다른 버전(${data.version})의 데이터 파일입니다.\n호환성 문제가 발생할 수 있습니다.\n계속 진행하시겠습니까?`);
            if (!continueImport) {
                return false;
            }
        }
        
        // 필수 데이터 구조 확인
        if (!data.years || typeof data.years !== 'object') {
            alert('과목 데이터가 없거나 올바르지 않습니다.');
            return false;
        }
        
        return true;
        
    } catch (error) {
        console.error('데이터 검증 오류:', error);
        alert('데이터 검증 중 오류가 발생했습니다.');
        return false;
    }
}

// 가져온 데이터를 현재 덱에 적용하는 함수
function applyImportedData(importedData) {
    try {
        // 현재 덱 데이터 업데이트
        decks[currentDeck].years = importedData.years || {};
        decks[currentDeck].majorSelections = importedData.majorSelections || [];
        
        // 커스텀 학년명이 있다면 적용
        if (importedData.customYearNames) {
            decks[currentDeck].customYearNames = importedData.customYearNames;
        }
        
        // UI 업데이트
        loadDeck(currentDeck);
        
        // 졸업요건 UI 업데이트
        loadDeckGraduationRequirements(currentDeck);
        
        // localStorage에 저장
        saveStateToLocalStorage();
        
    } catch (error) {
        console.error('데이터 적용 오류:', error);
        alert('데이터를 적용하는 중 오류가 발생했습니다.');
    }
}

// 덱 시뮬레이션 팝업 표시
function showDeckSimulationPopup() {
    const popup = document.getElementById('deck-simulation-popup');
    if (popup) {
        popup.style.display = 'flex';
        
        // 덱 선택 드롭다운 초기화
        initializeDeckSelectors();
        
        // ESC 키로 팝업 닫기
        document.addEventListener('keydown', handleDeckSimulationEscKey);
    }
}

// 덱 시뮬레이션 팝업 숨김
function closeDeckSimulationPopup() {
    const popup = document.getElementById('deck-simulation-popup');
    if (popup) {
        popup.style.display = 'none';
        
        // ESC 키 이벤트 리스너 제거
        document.removeEventListener('keydown', handleDeckSimulationEscKey);
        
        // 차트 인스턴스 정리
        if (gradeChartA) {
            gradeChartA.destroy();
            gradeChartA = null;
        }
        if (gradeChartB) {
            gradeChartB.destroy();
            gradeChartB = null;
        }
    }
}

// ESC 키 처리
function handleDeckSimulationEscKey(e) {
    if (e.key === 'Escape') {
        closeDeckSimulationPopup();
    }
}

// 덱 선택 드롭다운 초기화
function initializeDeckSelectors() {
    const selectA = document.getElementById('deck-select-a');
    const selectB = document.getElementById('deck-select-b');
    
    if (!selectA || !selectB) return;
    
    // 기존 옵션 초기화
    selectA.innerHTML = '';
    selectB.innerHTML = '';
    
    // 현재 존재하는 덱들로 옵션 생성
    for (let i = 1; i <= deckCount; i++) {
        const deckId = `deck${i}`;
        const deckName = decks[deckId] ? decks[deckId].name : `덱${i}`;
        
        // A 영역 옵션
        const optionA = document.createElement('option');
        optionA.value = deckId;
        optionA.textContent = deckName;
        if (deckId === 'deck1') optionA.selected = true;
        selectA.appendChild(optionA);
        
        // B 영역 옵션
        const optionB = document.createElement('option');
        optionB.value = deckId;
        optionB.textContent = deckName;
        if (deckId === 'deck2') optionB.selected = true;
        selectB.appendChild(optionB);
    }
    
    // 이벤트 리스너 추가
    selectA.addEventListener('change', (e) => {
        updateDeckSimulationData();
    });
    
    selectB.addEventListener('change', (e) => {
        updateDeckSimulationData();
    });
    
    // 초기 데이터 로드
    updateDeckSimulationData();
}

// 덱 이름 표시 업데이트 (더 이상 사용하지 않음)
// function updateDeckNameDisplay(section, deckId) {
//     const displayElement = document.getElementById(`deck-name-${section}`);
//     if (displayElement && decks[deckId]) {
//         displayElement.textContent = decks[deckId].name;
//     }
// }

// 덱 데이터 계산
function calculateDeckStats(deckId) {
    if (!decks[deckId] || !decks[deckId].years) {
        return {
            totalCredits: 0,
            overallGpa: 0,
            majorGpa: 0,
            gradeDistribution: {}
        };
    }

    let totalCredits = 0;
    let totalGradePoints = 0;
    let totalGradedCredits = 0;
    let majorGradePoints = 0;
    let majorGradedCredits = 0;
    let gradeDistribution = {};

    // 성적 분포 초기화
    const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'P', 'NP'];
    grades.forEach(grade => {
        gradeDistribution[grade] = 0;
    });

    // 각 학년의 각 학기를 순회
    Object.keys(decks[deckId].years).forEach(year => {
        const yearData = decks[deckId].years[year];
        Object.keys(yearData).forEach(semester => {
            const courses = yearData[semester];
            courses.forEach(course => {
                const credit = parseFloat(course.credit) || 0;
                const grade = course.grade;
                const isMajor = course.isMajor === true;

                // 총 학점 계산
                totalCredits += credit;

                // 성적 분포 계산
                if (grade && gradeDistribution.hasOwnProperty(grade)) {
                    gradeDistribution[grade]++;
                }

                // 평점 계산 (P/NP 제외)
                if (grade && gradeSystem[grade] !== undefined) {
                    const gradePoint = gradeSystem[grade];
                    totalGradePoints += gradePoint * credit;
                    totalGradedCredits += credit;

                    // 전공 평점 계산
                    if (isMajor) {
                        majorGradePoints += gradePoint * credit;
                        majorGradedCredits += credit;
                    }
                }
            });
        });
    });

    return {
        totalCredits: totalCredits,
        overallGpa: totalGradedCredits > 0 ? (totalGradePoints / totalGradedCredits) : 0,
        majorGpa: majorGradedCredits > 0 ? (majorGradePoints / majorGradedCredits) : 0,
        gradeDistribution: gradeDistribution
    };
}

// 덱 시뮬레이션 데이터 업데이트
function updateDeckSimulationData() {
    const selectA = document.getElementById('deck-select-a');
    const selectB = document.getElementById('deck-select-b');
    
    if (!selectA || !selectB) return;
    
    const deckA = selectA.value;
    const deckB = selectB.value;
    
    // 동일한 덱 선택 방지
    if (deckA === deckB) {
        // B 영역을 다른 덱으로 자동 변경
        const availableDecks = [];
        for (let i = 1; i <= deckCount; i++) {
            const deckId = `deck${i}`;
            if (deckId !== deckA) {
                availableDecks.push(deckId);
            }
        }
        if (availableDecks.length > 0) {
            selectB.value = availableDecks[0];
        }
    }
    
    // 각 덱의 데이터 계산
    const statsA = calculateDeckStats(selectA.value);
    const statsB = calculateDeckStats(selectB.value);
    
    // 학점/평점 비교 업데이트
    updateStatsComparison(statsA, statsB);
    
    // 도넛 차트 업데이트
    updateGradeCharts(statsA, statsB);
    
    // 졸업요건 막대그래프 업데이트
    updateRequirementsCharts(selectA.value, selectB.value);
}

// 학점/평점 비교 업데이트
function updateStatsComparison(statsA, statsB) {
    // A 영역 값 업데이트
    const totalCreditsA = document.getElementById('total-credits-a');
    const overallGpaA = document.getElementById('overall-gpa-a');
    const majorGpaA = document.getElementById('major-gpa-a');
    
    if (totalCreditsA) totalCreditsA.textContent = Math.round(statsA.totalCredits);
    if (overallGpaA) overallGpaA.textContent = statsA.overallGpa.toFixed(2);
    if (majorGpaA) majorGpaA.textContent = statsA.majorGpa.toFixed(2);
    
    // B 영역 값 업데이트
    const totalCreditsB = document.getElementById('total-credits-b');
    const overallGpaB = document.getElementById('overall-gpa-b');
    const majorGpaB = document.getElementById('major-gpa-b');
    
    if (totalCreditsB) totalCreditsB.textContent = Math.round(statsB.totalCredits);
    if (overallGpaB) overallGpaB.textContent = statsB.overallGpa.toFixed(2);
    if (majorGpaB) majorGpaB.textContent = statsB.majorGpa.toFixed(2);
    
    // 비교 색상 적용
    applyComparisonColors('total-credits', statsA.totalCredits, statsB.totalCredits);
    applyComparisonColors('overall-gpa', statsA.overallGpa, statsB.overallGpa);
    applyComparisonColors('major-gpa', statsA.majorGpa, statsB.majorGpa);
}

// 비교 색상 적용
function applyComparisonColors(statType, valueA, valueB) {
    const elementA = document.getElementById(`${statType}-a`);
    const elementB = document.getElementById(`${statType}-b`);
    
    if (!elementA || !elementB) return;
    
    // 기존 클래스 제거
    elementA.classList.remove('higher', 'lower', 'equal');
    elementB.classList.remove('higher', 'lower', 'equal');
    
    if (Math.abs(valueA - valueB) < 0.01) {
        // 거의 같은 값
        elementA.classList.add('equal');
        elementB.classList.add('equal');
    } else if (valueA > valueB) {
        // A가 더 높음
        elementA.classList.add('higher');
        elementB.classList.add('lower');
    } else {
        // B가 더 높음
        elementA.classList.add('lower');
        elementB.classList.add('higher');
    }
}

// 차트 인스턴스 저장
let gradeChartA = null;
let gradeChartB = null;

// semester-container와 동일한 성적 색상 팔레트
const gradeColors = {
    'A+': '#044400',      // 진한 초록 (최고 성적)
    'A':  '#4CAF50',      // 초록
    'B+': '#D4E157',      // 연한 초록/노랑
    'B':  '#FFEE58',      // 노랑
    'C+': '#FFB74D',      // 주황
    'C':  '#FF8A65',      // 연한 빨강
    'D+': '#C62828',      // 빨강
    'D':  '#800000',      // 진한 빨강
    'F':  '#E0E0E0',      // 회색 (F)
    'P':  '#BDBDBD',      // 회색 (P)
    'NP': '#E0E0E0'       // 연한 회색 (NP)
};

// 도넛 차트 업데이트
function updateGradeCharts(statsA, statsB) {
    // A 영역 차트 업데이트
    updateGradeChart('grade-chart-a', statsA.gradeDistribution, 'A');
    updateGradeDataList('grade-data-a', statsA.gradeDistribution);
    
    // B 영역 차트 업데이트  
    updateGradeChart('grade-chart-b', statsB.gradeDistribution, 'B');
    updateGradeDataList('grade-data-b', statsB.gradeDistribution);
}

// 개별 도넛 차트 업데이트
function updateGradeChart(canvasId, gradeDistribution, section) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 기존 차트 제거
    if (section === 'A' && gradeChartA) {
        gradeChartA.destroy();
        gradeChartA = null;
    }
    if (section === 'B' && gradeChartB) {
        gradeChartB.destroy();
        gradeChartB = null;
    }
    
    // 데이터 준비 (0이 아닌 성적만 포함)
    const labels = [];
    const data = [];
    const colors = [];
    
    Object.keys(gradeDistribution).forEach(grade => {
        const count = gradeDistribution[grade];
        if (count > 0) {
            labels.push(grade);
            data.push(count);
            colors.push(gradeColors[grade] || 'rgba(150, 150, 150, 0.5)');
        }
    });
    
    // 데이터가 없는 경우 처리
    if (data.length === 0) {
        labels.push(getText('noCourseData'));
        data.push(1);
        colors.push('rgba(200, 200, 200, 0.3)');
    }
    
    // 총 과목 수 계산
    const totalCourses = data.reduce((sum, count) => sum + count, 0);
    
    // 차트 생성
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/0\.\d+\)$/, '1)')), // 테두리는 불투명하게
                borderWidth: 2,
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%', // 도넛 홀 크기
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 12,
                            family: 'Cafe24OhsquareAir-v2.0'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    titleFont: {
                        family: 'Cafe24OhsquareAir-v2.0',
                        size: 13
                    },
                    bodyFont: {
                        family: 'Cafe24OhsquareAir-v2.0',
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            const grade = context.label;
                            const count = context.parsed;
                            const percentage = ((count / totalCourses) * 100).toFixed(1);
                            return `${grade}: ${count}과목 (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: false,
                duration: 800
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const elementIndex = elements[0].index;
                    const clickedGrade = labels[elementIndex];
                    showGradeCoursesPopup(clickedGrade, section);
                }
            }
        },
        plugins: [{
            beforeDraw: function(chart) {
                if (totalCourses > 0 && labels[0] !== getText('noCourseData')) {
                    const ctx = chart.ctx;
                    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                    
                    ctx.save();
                    // 메인 텍스트 (과목 수) - 크기 증가
                    ctx.font = 'bold 24px Cafe24OhsquareAir-v2.0';
                    ctx.fillStyle = '#dc143c';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${totalCourses}${getText('courses') || '과목'}`, centerX, centerY - 8);
                    
                    // 서브 텍스트 (설명)
                    ctx.font = '16px Cafe24OhsquareAir-v2.0';
                    ctx.fillStyle = '#666';
                    ctx.fillText(getText('totalCourses'), centerX, centerY + 14);
                    ctx.restore();
                }
            }
        }]
    });
    
    // 차트 인스턴스 저장
    if (section === 'A') {
        gradeChartA = chart;
    } else if (section === 'B') {
        gradeChartB = chart;
    }
}

// 성적별 데이터 목록 업데이트
function updateGradeDataList(containerId, gradeDistribution) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 기존 내용 초기화
    container.innerHTML = '';
    
    // 총 과목 수 계산
    const totalCourses = Object.values(gradeDistribution).reduce((sum, count) => sum + count, 0);
    
    if (totalCourses === 0) {
        container.innerHTML = `<div class="no-data-message">${getText('noCourseData')}</div>`;
        return;
    }
    
    // 성적 순서대로 정렬 (A+부터 NP까지)
    const gradeOrder = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'P', 'NP'];
    
    gradeOrder.forEach(grade => {
        const count = gradeDistribution[grade] || 0;
        if (count > 0) {
            const percentage = ((count / totalCourses) * 100).toFixed(1);
            
            const gradeItem = document.createElement('div');
            gradeItem.className = 'grade-data-item';
            
            gradeItem.innerHTML = `
                <div class="grade-label">
                    <div class="grade-color-dot" style="background-color: ${gradeColors[grade]}"></div>
                    <span>${grade}</span>
                </div>
                <div class="grade-info">${count}과목 (${percentage}%)</div>
            `;
            
            container.appendChild(gradeItem);
        }
    });
}

// 졸업요건 막대그래프 업데이트
function updateRequirementsCharts(deckIdA, deckIdB) {
    // A 영역 졸업요건 차트 업데이트
    updateRequirementsChart('requirements-chart-a', deckIdA);
    
    // B 영역 졸업요건 차트 업데이트
    updateRequirementsChart('requirements-chart-b', deckIdB);
}

// 개별 졸업요건 차트 업데이트
function updateRequirementsChart(containerId, deckId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 기존 내용 초기화
    container.innerHTML = '';
    
    // 해당 덱의 졸업요건 정보 확인
    if (!decks[deckId] || !decks[deckId].majorSelections || decks[deckId].majorSelections.length === 0) {
        container.innerHTML = `<div class="no-requirements-message">${getText('noRequirementsSet')}</div>`;
        return;
    }
    
    // 덱의 과목 데이터 수집
    const deckCourses = [];
    if (decks[deckId].years) {
        Object.keys(decks[deckId].years).forEach(year => {
            const yearData = decks[deckId].years[year];
            Object.keys(yearData).forEach(semester => {
                const courses = yearData[semester];
                courses.forEach(course => {
                    deckCourses.push(course);
                });
            });
        });
    }
    
    // 각 전공별로 졸업요건 진행률 계산
    decks[deckId].majorSelections.forEach((selection, index) => {
        const majorDiv = selection.majorDiv;
        const year = selection.year;
        const deptCd = selection.deptCd;
        
        // 해당 전공의 졸업요건 정보 가져오기
        const deptInfo = getDepartmentInfo(majorDiv, year, deptCd);
        if (!deptInfo) return;
        
        // 전공 제목 추가
        const majorTitle = document.createElement('div');
        majorTitle.className = 'requirements-major-title';
        
        // 전공명 처리 (다양한 형태 지원)
        let majorName = `전공 ${index + 1}`;
        if (deptInfo.name) {
            if (typeof deptInfo.name === 'string') {
                majorName = deptInfo.name;
            } else if (typeof deptInfo.name === 'object') {
                majorName = deptInfo.name.ko || deptInfo.name.kr || deptInfo.name.korean || JSON.stringify(deptInfo.name);
            }
        }
        
        majorTitle.textContent = majorName;
        container.appendChild(majorTitle);
        
        // 각 그룹별 진행률 계산 및 표시
        deptInfo.groups.forEach(group => {
            const groupElement = createRequirementGroupElement(group, deckCourses);
            container.appendChild(groupElement);
        });
        
        // 전공 구분선 (마지막 전공이 아닌 경우)
        if (index < decks[deckId].majorSelections.length - 1) {
            const divider = document.createElement('hr');
            divider.className = 'requirements-divider';
            container.appendChild(divider);
        }
    });
}

// 졸업요건 그룹 요소 생성
function createRequirementGroupElement(group, deckCourses) {
    const groupElement = document.createElement('div');
    groupElement.className = 'requirements-group-item';
    
    // 해당 그룹에 속하는 과목들 찾기
    let currentCredit = 0;
    const matchedCourses = [];
    
    deckCourses.forEach(course => {
        const courseCode = course.code;
        const grade = course.grade;
        
        // 그룹에 속하는 과목인지 확인
        const isInGroup = group.courses.some(groupCourse => isEqualCourse(groupCourse, courseCode));
        
        if (isInGroup) {
            // F나 NP가 아닌 경우만 학점 인정
            if (grade !== 'F' && grade !== 'NP') {
                currentCredit += parseFloat(course.credit) || 0;
            }
            matchedCourses.push(course);
        }
    });
    
    // 기준 학점 (최소 또는 최대)
    const minCredit = parseFloat(group.minCredit) || 0;
    const maxCredit = parseFloat(group.maxCredit) || 0;
    const stdCredit = minCredit > 0 ? minCredit : maxCredit > 0 ? maxCredit : 0;
    
    // 진행률 계산
    const progress = (stdCredit > 0) ? Math.min(100, (currentCredit / stdCredit * 100)) : 0;
    
    // HTML 구조 생성
    groupElement.innerHTML = `
        <div class="requirements-group-label">${group.name}</div>
        <div class="requirements-group-progress">
            <div class="requirements-progress-bar">
                <div class="requirements-progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="requirements-progress-text">${currentCredit.toFixed(1)}/${stdCredit.toFixed(1)} (${progress.toFixed(0)}%)</div>
        </div>
    `;
    
    return groupElement;
}

// 부서 정보 가져오기 (기존 함수 활용)
function getDepartmentInfo(majorDiv, year, deptCd) {
    if (!info[year] || !info[year][majorDiv]) return null;
    
    const deptList = info[year][majorDiv];
    return deptList.find(d => d.code === deptCd) || null;
}

// 성적별 과목 목록 팝업 표시
function showGradeCoursesPopup(grade, section) {
    // 현재 선택된 덱 확인
    const selectElement = document.getElementById(`deck-select-${section.toLowerCase()}`);
    if (!selectElement) return;
    
    const deckId = selectElement.value;
    if (!decks[deckId] || !decks[deckId].years) return;
    
    // 해당 성적의 과목들 수집
    const gradeCoursesData = [];
    Object.keys(decks[deckId].years).forEach(year => {
        const yearData = decks[deckId].years[year];
        Object.keys(yearData).forEach(semester => {
            const courses = yearData[semester];
            courses.forEach(course => {
                if (course.grade === grade) {
                    gradeCoursesData.push({
                        ...course,
                        year: year,
                        semester: semester
                    });
                }
            });
        });
    });
    
    if (gradeCoursesData.length === 0) {
        alert(`${grade} ${getText('noGradeCourses')}`);
        return;
    }
    
    // 기존 팝업 제거
    const existingPopup = document.getElementById('grade-courses-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // 팝업 생성
    const popup = document.createElement('div');
    popup.id = 'grade-courses-popup';
    popup.className = 'grade-courses-popup';
    
    // 팝업 내용 생성
    const popupContent = `
        <div class="grade-courses-popup-content">
            <div class="grade-courses-popup-header">
                <h4>${grade} ${getText('gradeCoursesTitle')}</h4>
                <button class="grade-courses-close-btn">×</button>
            </div>
            <div class="grade-courses-popup-body">
                <div class="grade-courses-list" id="grade-courses-list">
                    ${gradeCoursesData.map(course => `
                        <div class="grade-course-item">
                            <div class="course-info">
                                <div class="course-name">${course.name}</div>
                                <div class="course-details">${course.code} | ${course.credit}${getText('credit') || '학점'} | ${course.year}${getText('year') || '학년'} ${course.semester}</div>
                            </div>
                            <div class="course-grade" style="background-color: ${gradeColors[grade]}; color: ${['A+', 'A', 'C+', 'C', 'D+', 'D'].includes(grade) ? 'white' : '#333'}">${grade}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    popup.innerHTML = popupContent;
    
    // 팝업을 body에 추가
    document.body.appendChild(popup);
    
    // 팝업 표시
    popup.style.display = 'flex';
    
    // 닫기 버튼 이벤트
    const closeBtn = popup.querySelector('.grade-courses-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });
    }
    
    // 배경 클릭 시 닫기
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
    
    // ESC 키로 닫기
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            popup.remove();
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    document.addEventListener('keydown', handleEscKey);
}

// 덱 전환 함수
function switchDeck(deckId) {
    if (!decks[deckId]) return;

    // 현재 덱의 졸업요건 정보 저장
    saveCurrentDeck();

    currentDeck = deckId;
    updateDeckTabs();
    loadDeck(deckId);

    updateChart(); // UI 업데이트와 저장을 한 번에
}

// 덱별 졸업요건 로드 함수
function loadDeckGraduationRequirements(deckId) {
    const selectContainer = document.getElementById('selectContainer');
    selectContainer.innerHTML = ''; // 기존 졸업요건 영역 초기화

    if (decks[deckId] && decks[deckId].majorSelections) {
        decks[deckId].majorSelections.forEach(selection => {
            createDeptDropdown(selection.majorDiv, selection.year, selection.deptCd);
        });
    }
}

// 현재 덱 저장
function saveCurrentDeck() {
    if (!decks[currentDeck]) return;

    const newYearsData = {};
    const yearColumns = document.querySelectorAll('.year-column');

    yearColumns.forEach(yearColumn => {
        const year = yearColumn.dataset.year;
        const yearData = {};

        yearColumn.querySelectorAll('.semester-cell').forEach(cell => {
            const semester = cell.dataset.semester;
            const coursesInSemester = [];

            cell.querySelectorAll('.taken-course').forEach(course => {
                const courseData = {
                    code: course.dataset.courseCode,
                    name: course.dataset.courseName,
                    credit: course.dataset.credit,
                    grade: course.dataset.grade || '',
                    isMajor: course.dataset.isMajor === 'undefined' ? undefined : course.dataset.isMajor === 'true', // 전공 여부 저장
                    isCustom: course.dataset.isCustom === 'true' // 커스텀 과목 여부 저장
                };
                coursesInSemester.push(courseData);
            });

            // 빈 학기도 저장하여 구조를 유지
            yearData[semester] = coursesInSemester;
        });

        // 빈 학년도 저장하여 구조를 유지
        newYearsData[year] = yearData;
    });

    decks[currentDeck].years = newYearsData;

    // 현재 덱의 졸업요건 정보도 저장
    const majorSelections = [];
    document.querySelectorAll('.dept-select-container').forEach(container => {
        majorSelections.push({
            majorDiv: container.dataset.majorDiv,
            year: container.querySelector('.year-select').value,
            deptCd: container.querySelector('.dept-select').value
        });
    });
    decks[currentDeck].majorSelections = majorSelections;
}

// 히스토리에 현재 상태 저장
function saveToHistory() {
    const decksData = JSON.parse(JSON.stringify(decks));

    const currentState = {
        decks: decksData,
        timestamp: Date.now()
    };

    historyStack = historyStack.slice(0, currentHistoryIndex + 1);
    historyStack.push(currentState);
    currentHistoryIndex++;

    if (historyStack.length > maxHistorySize) {
        historyStack.shift();
        currentHistoryIndex--;
    }
    updateHistoryButtons();
}

// 히스토리에서 상태 복원
function restoreFromHistory(historyIndex) {
    if (historyIndex < 0 || historyIndex >= historyStack.length) return;

    const state = historyStack[historyIndex];
    if (state.decks) { // 새로운 데이터 구조
        decks = JSON.parse(JSON.stringify(state.decks));
        loadDeck(currentDeck);
    }

    currentHistoryIndex = historyIndex;
    updateHistoryButtons();
    updateChart({ save: false }); // UI 업데이트만 수행 (저장은 별도로)
    
    // 히스토리 복원 후 현재 화면 상태를 decks 객체에 반영하고 localStorage에 저장
    // 이렇게 하면 새로고침해도 Undo/Redo 결과가 유지됨
    saveCurrentDeck();
    saveStateToLocalStorage();
}

function undo() {
    if (currentHistoryIndex > 0) restoreFromHistory(currentHistoryIndex - 1);
    refreshSearchResults(); // 히스토리 복원 후 검색 결과도 초기화
}

function redo() {
    if (currentHistoryIndex < historyStack.length - 1) restoreFromHistory(currentHistoryIndex + 1);
    refreshSearchResults(); // 히스토리 복원 후 검색 결과도 초기화
}

function updateHistoryButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    if (undoBtn) undoBtn.disabled = currentHistoryIndex <= 0;
    if (redoBtn) redoBtn.disabled = currentHistoryIndex >= historyStack.length - 1;
}

// 덱 데이터 로드
function loadDeck(deckId) {
    const semesterGridContainer = document.getElementById('semester-grid-container');
    semesterGridContainer.innerHTML = ''; // 기존 학년 컬럼 초기화

    if (!decks[deckId] || !decks[deckId].years) return;

    // 1~4학년이 없는 경우 기본 생성
    for (let year = 1; year <= 4; year++) {
        if (!decks[deckId].years[year]) {
            decks[deckId].years[year] = {};
        }
    }

    const years = Object.keys(decks[deckId].years).sort((a, b) => a - b);
    years.forEach(year => {
        const newYearColumn = createYearColumn(year);
        semesterGridContainer.appendChild(newYearColumn);

        // 커스텀 학년명이 있으면 복원
        if (decks[deckId].customYearNames && decks[deckId].customYearNames[year]) {
            const yearTitle = newYearColumn.querySelector('.year-title');
            if (yearTitle) {
                yearTitle.textContent = decks[deckId].customYearNames[year];
            }
        }
    });

    Object.keys(decks[deckId].years).forEach(year => {
        const yearData = decks[deckId].years[year];
        Object.keys(yearData).forEach(semester => {
            const semesterData = yearData[semester];
            const targetCell = document.querySelector(
                `.semester-cell[data-year="${year}"][data-semester="${semester}"]`
            );
            if (targetCell) {
                semesterData.forEach(courseData => {
                    const newCourse = createTakenCourseElement(courseData);
                    targetCell.appendChild(newCourse);
                });
            }
        });
    });

    // 덱의 졸업요건도 함께 로드
    loadDeckGraduationRequirements(deckId);

    refreshSearchResults(); // 덱 로드 후 검색 결과 초기화
}

// 덱 탭 UI 업데이트
function updateDeckTabs() {
    document.querySelectorAll('.deck-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.deck === currentDeck) {
            tab.classList.add('active');
        }
    });
}

// 새 덱 추가
function addNewDeck() {
    if (deckCount >= maxDeckCount) return;

    deckCount++;
    const newDeckId = `deck${deckCount}`;

    decks[newDeckId] = {
        name: getText(newDeckId), // 번역 시스템 사용
        years: { '1': {}, '2': {}, '3': {}, '4': {} },
        majorSelections: [] // 빈 졸업요건 설정으로 초기화
    };

    const deckTabs = document.querySelector('.deck-tabs');
    const newTab = document.createElement('button');
    newTab.className = 'deck-tab';
    newTab.dataset.deck = newDeckId;
    newTab.textContent = getText(newDeckId); // 번역 시스템 사용
    newTab.addEventListener('click', () => switchDeck(newDeckId));

    const addBtn = document.getElementById('add-deck-btn');
    deckTabs.insertBefore(newTab, addBtn);

    if (deckCount >= maxDeckCount) {
        if (addBtn) addBtn.style.display = 'none';
    }
    switchDeck(newDeckId);
}

let draggedCourse = null;
let currentPopup = null; // 현재 열린 팝업 추적

// 과목 팝업 표시 함수
function showCoursePopup(courseElement, event) {//todo
    // 기존 팝업이 있으면 제거
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
    }

    const courseCode = courseElement.dataset.courseCode;
    const courseName = getCourseNameFromElement(courseElement);
    const credit = getCourseCreditFromElement(courseElement);
    const currentGrade = courseElement.dataset.grade || '';

    // 팝업 생성
    const popup = document.createElement('div');
    popup.className = 'course-popup';

    // 제목
    const title = document.createElement('div');
    title.className = 'course-popup-title';
    title.textContent = `[${courseCode}] ${courseName}`;
    popup.appendChild(title);

    // 상세 정보
    const info = document.createElement('div');
    info.className = 'course-popup-info';
    info.innerHTML = `<div><strong>${getText('credit')}:</strong> ${credit}</div>`;
    popup.appendChild(info);

    // 평점 선택 영역
    const gradeSection = document.createElement('div');
    gradeSection.className = 'course-popup-grade';
    gradeSection.innerHTML = `<div><strong>${getText('grade')}:</strong></div>`;
    gradeSection.style.marginTop = '10px';
    gradeSection.style.marginBottom = '12px';

    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'grade-select';
    gradeSelect.style.width = '100%';
    gradeSelect.style.padding = '6px';
    gradeSelect.style.marginTop = '8px';
    gradeSelect.style.marginBottom = '4px';

    // 기본 옵션 (평점 미입력)
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = getText('selectGrade'); // "평점 선택"
    gradeSelect.appendChild(defaultOption);

    // 평점 옵션들 추가
    gradeOptions.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = `${grade} (${gradeSystem[grade]})`;
        gradeSelect.appendChild(option);
    });

    // P/NP 옵션들 추가
    pnpOptions.forEach(pnp => {
        const option = document.createElement('option');
        option.value = pnp;
        option.textContent = pnp;
        gradeSelect.appendChild(option);
    });

    gradeSelect.value = currentGrade;
    gradeSection.appendChild(gradeSelect);
    popup.appendChild(gradeSection);

    // 전공 여부 체크박스 영역
    const majorSection = document.createElement('div');
    majorSection.className = 'course-popup-major';
    majorSection.style.marginTop = '12px';
    majorSection.style.marginBottom = '20px'; // 버튼과의 간격 추가
    majorSection.innerHTML = `<div><strong>${getText('majorCourse')}:</strong></div>`;

    const majorCheckbox = document.createElement('input');
    majorCheckbox.type = 'checkbox';
    majorCheckbox.id = 'major-checkbox';

    // 전공 여부 판단 (설정 결과를 우선하고 없을 시 자동 판단)
    let isMajor = isMajorCourse(courseElement);

    majorCheckbox.checked = isMajor;
    majorCheckbox.style.marginTop = '4px';
    majorCheckbox.style.marginRight = '8px';

    const majorLabel = document.createElement('label');
    majorLabel.htmlFor = 'major-checkbox';
    majorLabel.textContent = getText("isMajorCourse");
    majorLabel.style.cursor = 'pointer';

    const majorContainer = document.createElement('div');
    majorContainer.style.marginTop = '4px';
    majorContainer.appendChild(majorCheckbox);
    majorContainer.appendChild(majorLabel);
    majorSection.appendChild(majorContainer);
    popup.appendChild(majorSection);

    // 버튼 영역
    const buttons = document.createElement('div');
    buttons.className = 'course-popup-buttons';

    // 저장 버튼
    const saveBtn = document.createElement('button');
    saveBtn.className = 'course-popup-save-btn';
    saveBtn.textContent = getText('saveCourseSetting'); // "저장"
    saveBtn.style.backgroundColor = '#28a745';
    saveBtn.style.color = 'white';
    saveBtn.style.border = 'none';
    saveBtn.style.padding = '8px 16px';
    saveBtn.style.borderRadius = '4px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.addEventListener('click', () => {
        const selectedGrade = gradeSelect.value;
        const isMajor = majorCheckbox.checked;

        courseElement.dataset.grade = selectedGrade;
        courseElement.dataset.isMajor = isMajor;

        // 제목 업데이트
        const gradeText = selectedGrade ? ` (${selectedGrade})` : '';
        courseElement.title = `${courseName} (${credit})${gradeText}`;
        updateChart(); // UI 업데이트와 저장을 한 번에
        closeCoursePopup();
        saveToHistory();
    });
    buttons.appendChild(saveBtn);

    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'course-popup-delete-btn';
    deleteBtn.textContent = getText('deleteCourse'); // "삭제"
    deleteBtn.addEventListener('click', () => {
        if (confirm(`${getText('confirmDeleteCourse')}:\n${courseName}`)) {
            deleteCourse(courseElement);
        }
    });
    buttons.appendChild(deleteBtn);

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.className = 'course-popup-close-btn';
    closeBtn.textContent = getText('cancelSetting'); // "취소"
    closeBtn.addEventListener('click', closeCoursePopup);
    buttons.appendChild(closeBtn);

    popup.appendChild(buttons);

    // 팝업 위치 설정 (마우스 위치 기준)
    document.body.appendChild(popup);

    let x = event.clientX;
    let y = event.clientY;

    // 화면을 벗어나지 않도록 조정
    const popupRect = popup.getBoundingClientRect();
    if (x + popupRect.width > window.innerWidth) {
        x = window.innerWidth - popupRect.width - 10;
    }
    if (y + popupRect.height > window.innerHeight) {
        y = window.innerHeight - popupRect.height - 10;
    }

    popup.style.left = x + 'px';
    popup.style.top = y + 'px';

    currentPopup = popup;

    // 외부 클릭 시 팝업 닫기
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

// 팝업 닫기 함수
function closeCoursePopup() {
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
        document.removeEventListener('click', handleOutsideClick);
    }
}

// 외부 클릭 처리
function handleOutsideClick(event) {
    if (currentPopup && !currentPopup.contains(event.target)) {
        closeCoursePopup();
    }
    if (currentHelpPopup && !currentHelpPopup.contains(event.target)) {
        closeHelpPopup();
    }
    if (currentShortcutsPopup && !currentShortcutsPopup.contains(event.target)) {
        closeShortcutsPopup();
    }
}

// 과목 삭제 함수
function deleteCourse(courseElement) {
    courseElement.remove();
    updateChart(); // UI 업데이트와 저장을 한 번에
    closeCoursePopup();
    saveToHistory();

    refreshSearchResults();
}

// 도움말 팝업 표시 함수
function showHelpPopup() {
    // 기존 팝업이 있으면 제거
    if (currentHelpPopup) {
        currentHelpPopup.remove();
        currentHelpPopup = null;
    }

    // 팝업 생성
    const popup = document.createElement('div');
    popup.className = 'help-popup';

    // 제목
    const title = document.createElement('div');
    title.className = 'help-popup-title';
    title.textContent = getText('helpPopupTitle');
    popup.appendChild(title);

    // 도움말 내용
    const content = document.createElement('div');
    content.className = 'help-popup-content';
    content.innerHTML = `
        <p>${getText('helpDevice')}</p>
        <p>${getText('helpStorage')}</p>
        <p>${getText('helpDragDrop')}</p>
        <p>${getText('helpClickGrade')}</p>
        <p>${getText('helpSystem')}</p>
        <p>${getText('helpChangedCourse')}</p>
        <p>${getText('helpGeneralCourse')}</p>
        <p>${getText('helpYearSetting')}</p>
        <p>${getText('helpIntensiveMajor')}</p>
        <p>${getText('helpMultipleMajor')}</p>
        <p>${getText('helpExcessCredit')}</p>
        <p>${getText('helpRetakeCourse')}</p>
        <p>${getText('helpContact')}</p>
    `;
    popup.appendChild(content);

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.className = 'help-popup-close-btn';
    closeBtn.textContent = getText('helpClose');
    closeBtn.addEventListener('click', closeHelpPopup);
    popup.appendChild(closeBtn);

    // 팝업 위치 설정 (화면 중앙)
    document.body.appendChild(popup);

    const rect = popup.getBoundingClientRect();
    const x = (window.innerWidth - rect.width) / 2;
    const y = (window.innerHeight - rect.height) / 2;

    popup.style.left = x + 'px';
    popup.style.top = y + 'px';

    currentHelpPopup = popup;

    // 외부 클릭 시 팝업 닫기
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

// 도움말 팝업 닫기 함수
function closeHelpPopup() {
    if (currentHelpPopup) {
        currentHelpPopup.remove();
        currentHelpPopup = null;
        document.removeEventListener('click', handleOutsideClick);
    }
}

// 단축키 안내 팝업 표시 함수
function showShortcutsPopup() {
    // 기존 팝업이 있으면 제거
    if (currentShortcutsPopup) {
        currentShortcutsPopup.remove();
        currentShortcutsPopup = null;
    }

    // 팝업 생성
    const popup = document.createElement('div');
    popup.className = 'help-popup';

    // 제목
    const title = document.createElement('div');
    title.className = 'help-popup-title';
    title.textContent = currentLanguage === 'ko' ? '⌨ 단축키 안내' : '⌨ Keyboard Shortcuts';
    popup.appendChild(title);

    // 단축키 내용
    const content = document.createElement('div');
    content.className = 'help-popup-content';
    
    const shortcutsList = currentLanguage === 'ko' 
        ? `
            <p><strong>Ctrl+1, 2, ...:</strong> 1, 2, ...번 덱 변경</p>
            <p><strong>Ctrl+C:</strong> 덱 복사</p>
            <p><strong>Ctrl+V:</strong> 덱 붙여넣기</p>
            <p><strong>Ctrl+Del:</strong> 덱 초기화</p>
            <p><strong>Ctrl+E:</strong> 내보내기</p>
            <p><strong>Ctrl+I:</strong> 가져오기</p>
            <p><strong>Ctrl+Z:</strong> 실행취소</p>
            <p><strong>Ctrl+X:</strong> 다시실행</p>
        `
        : `
            <p><strong>Ctrl+1, 2, ...:</strong> Switch to deck 1, 2, ...</p>
            <p><strong>Ctrl+C:</strong> Copy deck</p>
            <p><strong>Ctrl+V:</strong> Paste deck</p>
            <p><strong>Ctrl+Del:</strong> Reset deck</p>
            <p><strong>Ctrl+E:</strong> Export data</p>
            <p><strong>Ctrl+I:</strong> Import data</p>
            <p><strong>Ctrl+Z:</strong> Undo</p>
            <p><strong>Ctrl+X:</strong> Redo</p>
        `;
    
    content.innerHTML = shortcutsList;
    popup.appendChild(content);

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.className = 'help-popup-close-btn';
    closeBtn.textContent = getText('helpClose');
    closeBtn.addEventListener('click', closeShortcutsPopup);
    popup.appendChild(closeBtn);

    // 팝업 위치 설정 (화면 중앙)
    document.body.appendChild(popup);

    const rect = popup.getBoundingClientRect();
    const x = (window.innerWidth - rect.width) / 2;
    const y = (window.innerHeight - rect.height) / 2;

    popup.style.left = x + 'px';
    popup.style.top = y + 'px';

    currentShortcutsPopup = popup;

    // 외부 클릭 시 팝업 닫기
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

// 단축키 안내 팝업 닫기 함수
function closeShortcutsPopup() {
    if (currentShortcutsPopup) {
        currentShortcutsPopup.remove();
        currentShortcutsPopup = null;
        document.removeEventListener('click', handleOutsideClick);
    }
}

//#region --- 검색 알고리즘 ---

// 이미 수강한 과목인지 확인하는 함수
function isCourseAlreadyTaken(courseCode) {
    const takenCourses = getTakenCourses();
    return takenCourses.some(course => isEqualCourse(course.dataset.courseCode, courseCode));
}

// 검색된 강의 셀을 생성하는 함수(code만 주면 courses에서 찾아 넣기)
function createSearchResultCourse(code, name = undefined, credit = undefined, isCustom = false) {
    if (!name) {
        name = getCourseName(code);
        credit = courses[code]['credit'];
    }
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    // 강의 툴팁 추가 (언어에 따라 다르게 표시)
    courseItem.title = getText('courseTooltip');
    if (isCourseAlreadyTaken(code)) {
        courseItem.classList.add('taken-in-search');
    }
    courseItem.textContent = `[${code}] ${name} (${credit})`;
    courseItem.dataset.courseCode = code;
    courseItem.dataset.courseName = name;
    courseItem.dataset.credit = credit;
    courseItem.dataset.isCustom = isCustom;
    courseItem.draggable = true;
    courseItem.addEventListener('dragstart', handleDragStart);
    courseItem.addEventListener('click', handleCourseClick);

    return courseItem;
}

// 교양과목을 검색 결과에 추가하는 함수
function addCustomCourse(name, code, credit) {
    const searchResult = document.getElementById('search-result');

    clearCourseSelection();

    // 검색 결과 영역 초기화
    searchResult.innerHTML = '';

    // 교양과목 헤더 추가
    const header = document.createElement('div');
    header.className = 'result-group-header';
    header.innerHTML = '<span>추가된 교양과목</span>';
    searchResult.appendChild(header);

    // 교양과목 컨테이너 추가
    const content = document.createElement('div');
    content.className = 'result-group-content';

    // 과목 아이템 생성
    const courseItem = createSearchResultCourse(code, name, credit, true);

    content.appendChild(courseItem);
    searchResult.appendChild(content);
}
// 커스텀 입력란 기반으로 교양과목 생성
function createCustomCourse() {
    const name = document.getElementById('custom-course-name').value.trim();
    const code = document.getElementById('custom-course-code').value.trim();
    const credit = parseFloat(document.getElementById('custom-course-credit').value);

    if (name && code && credit) {
        addCustomCourse(name, code, credit);
        document.getElementById('custom-course-name').value = '';
        document.getElementById('custom-course-code').value = '';
        document.getElementById('custom-course-credit').value = '';
    }
}

// 검색 결과를 다시 렌더링하는 함수
function refreshSearchResults() {
    const searchResult = document.getElementById('search-result');
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');

    // 현재 활성화된 검색 타입 확인
    let currentSearchType = null;
    searchTypeRadios.forEach(radio => {
        if (radio.checked) currentSearchType = radio.value;
    });

    // 검색 결과가 있고, 검색어가 있는 경우에만 다시 렌더링
    if (searchResult.children.length > 0) {
        if (currentSearchType === 'byDept') {
            // 직접 검색 함수 호출
            window.searchDept();
        } else if (currentSearchType === 'byCourseName') {
            // 직접 검색 함수 호출
            window.searchCourseByName();
        } else if (currentSearchType === 'customCourse') {
            createCustomCourse();
        }
    }
    else clearCourseSelection();
}

//#endregion

function handleDragStart(e) {
    // 드래그 시작 시 팝업 닫기
    if (currentPopup) {
        closeCoursePopup();
    }

    draggedCourse = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({
        code: draggedCourse.dataset.courseCode,
        name: draggedCourse.dataset.courseName,
        credit: draggedCourse.dataset.credit,
        groupNm: draggedCourse.dataset.groupNm || '',
        isTakenCourse: draggedCourse.classList.contains('taken-course')
    }));
    setTimeout(() => {
        draggedCourse.classList.add('dragging');
    }, 0);
}

// 과목 클릭 핸들러
function handleCourseClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // 팝업 닫기
    if (currentPopup) {
        closeCoursePopup();
    }

    const courseItem = e.currentTarget;

    // 과목 선택/해제 토글
    toggleCourseSelection(courseItem);
}

// 과목 선택 해제
function clearCourseSelection() {
    selectedCourses.forEach(course => {
        course.classList.remove('selected');
    });
    selectedCourses.clear();
    isClickMoveMode = false;
    document.body.classList.remove('click-mode');
}

// 특정 과목 선택 토글
function toggleCourseSelection(courseElement) {
    if (selectedCourses.has(courseElement)) {
        // 이미 선택된 과목이면 선택 해제
        courseElement.classList.remove('selected');
        selectedCourses.delete(courseElement);
    } else {
        // 새로운 과목 선택
        courseElement.classList.add('selected');
        selectedCourses.add(courseElement);
    }

    // 선택된 과목이 있으면 클릭 모드 활성화, 없으면 비활성화
    if (selectedCourses.size > 0) {
        isClickMoveMode = true;
        document.body.classList.add('click-mode');
    } else {
        isClickMoveMode = false;
        document.body.classList.remove('click-mode');
    }
}

// 클릭 또는 드래그 드롭으로 선택된 과목들을 특정 학기 셀에 추가/이동하는 통합 함수
function addSelectedCoursesToCell(targetCell) {
    if (selectedCourses.size === 0) {
        return;
    }

    const processedCourses = [];

    selectedCourses.forEach(selectedCourse => {
        let takenCourse;
        let originalCell = null;

        if (selectedCourse.classList.contains('taken-course')) {
            // 이동인 경우 원래 셀 기록
            originalCell = selectedCourse.parentElement && selectedCourse.parentElement.classList.contains('semester-cell')
                ? selectedCourse.parentElement
                : null;
            takenCourse = selectedCourse;
        } else {
            // 새 과목인 경우 새로운 taken-course 요소 생성
            const courseData = {
                code: selectedCourse.dataset.courseCode,
                name: selectedCourse.dataset.courseName,
                credit: selectedCourse.dataset.credit,
                isCustom: selectedCourse.dataset.isCustom === 'true', // 커스텀 과목 여부
            };
            // 전공 여부는 createTakenCourseElement에서 자동으로 판단됨
            takenCourse = createTakenCourseElement(courseData);
        }

        targetCell.appendChild(takenCourse);

        processedCourses.push({
            element: takenCourse,
            originalCell: originalCell,
        });
    });

    refreshSearchResults();

    if (processedCourses.length > 0) {
        const cellsToUpdate = new Set([targetCell]);
        processedCourses.forEach(processed => {
            if (processed.originalCell) {
                cellsToUpdate.add(processed.originalCell);
            }
        });
        cellsToUpdate.forEach(cell => updateCellCredit(cell));
        updateChart();
    }

    saveToHistory();
}

// 셀 클릭 핸들러 (클릭 이동 모드)
function handleCellClick(e) {
    // 클릭 모드가 아니거나 선택된 과목이 없으면 무시
    if (!isClickMoveMode || selectedCourses.size === 0) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    const targetCell = e.target.closest('.semester-cell');
    if (!targetCell) return;

    addSelectedCoursesToCell(targetCell);
}

function createTakenCourseElement(courseData) {
    const courseCode = courseData.code;
    const grade = courseData.grade || '';
    const isCustom = courseData.isCustom || false;
    const courseName = isCustom ? courseData.name : getCourseName(courseCode);
    const courseCredit = isCustom ? courseData.credit : courses[courseCode]['credit'];

    const takenCourse = document.createElement('div');
    takenCourse.className = 'taken-course';
    takenCourse.textContent = courseName;
    takenCourse.dataset.courseCode = courseCode;
    takenCourse.dataset.courseName = courseName;
    takenCourse.dataset.credit = courseCredit;
    takenCourse.dataset.grade = grade; // 평점 정보 추가
    takenCourse.dataset.isMajor = courseData.isMajor; // 전공 여부 기본값은 undefined
    takenCourse.dataset.isCustom = isCustom; // 커스텀 과목 여부

    // 제목에 평점 정보도 포함
    const gradeText = grade ? ` (${grade})` : '';
    takenCourse.title = `${courseName} (${courseCredit})${gradeText}`;

    takenCourse.draggable = true;
    takenCourse.addEventListener('dragstart', handleDragStart);
    takenCourse.addEventListener('dragend', handleDragEnd);

    // 클릭 이벤트 추가 (팝업 표시)
    let clickTimeout;
    takenCourse.addEventListener('mousedown', () => {
        // 드래그와 클릭을 구분하기 위한 타이머
        clickTimeout = setTimeout(() => {
            clickTimeout = null;
        }, 200);
    });

    // 태블릿 롱프레스 감지를 위한 변수
    let longPressTimer = null;
    let isLongPress = false;
    let touchStartX = 0;
    let touchStartY = 0;
    const LONG_PRESS_DURATION = 500; // 500ms

    // 터치 시작
    takenCourse.addEventListener('touchstart', (e) => {
        isLongPress = false;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        
        longPressTimer = setTimeout(() => {
            isLongPress = true;
            // 롱프레스 시각적 피드백 (선택적으로)
            takenCourse.style.opacity = '0.7';
        }, LONG_PRESS_DURATION);
    }, { passive: true });

    // 터치 이동 (드래그 감지)
    takenCourse.addEventListener('touchmove', (e) => {
        if (longPressTimer) {
            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - touchStartX);
            const deltaY = Math.abs(touch.clientY - touchStartY);
            // 일정 거리 이상 이동하면 롱프레스 취소
            if (deltaX > 10 || deltaY > 10) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
                isLongPress = false;
                takenCourse.style.opacity = '';
            }
        }
    }, { passive: true });

    // 터치 종료
    takenCourse.addEventListener('touchend', (e) => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
        
        takenCourse.style.opacity = '';
        
        // 롱프레스가 감지되었으면 다중선택 처리
        if (isLongPress) {
            e.preventDefault();
            e.stopPropagation();
            const added = toggleMultiCourseSelection(takenCourse);
            if (added && multiSelectedCourses.size >= 2) {
                const touch = e.changedTouches[0];
                openBulkGradePopup(touch.clientX, touch.clientY);
            }
            isLongPress = false;
            return;
        }
    }, { passive: false });

    takenCourse.addEventListener('click', (e) => {
        // 드래그 중이면 클릭 이벤트 무시
        if (draggedCourse === takenCourse) {
            return;
        }
        // 느린 클릭으로 clickTimeout이 만료된 경우라도, Ctrl/Cmd 클릭이면 계속 처리
        if (!clickTimeout && !(e.ctrlKey || e.metaKey)) {
            return;
        }

        // Ctrl/Cmd 클릭: 멀티 선택 토글 및 필요 시 일괄 팝업
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
        const added = toggleMultiCourseSelection(takenCourse);
            if (added && multiSelectedCourses.size >= 2) {
                openBulkGradePopup(e.clientX, e.clientY);
            }
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        // 일반 클릭이면 팝업 표시
        showCoursePopup(takenCourse, e);
    });

    return takenCourse;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    const targetCell = e.target.closest('.semester-cell');
    if (!targetCell || !draggedCourse) return;

    // 기존 선택 초기화 (드래그 소스 선택 상태 제거)
    clearCourseSelection();

    // 드래그된 항목만 즉시 처리 (선택 토글 불필요)
    const prevDragged = draggedCourse;

    // 통합된 추가/이동 로직 호출을 위해 임시로 선택 집합에 추가
    selectedCourses.add(prevDragged);
    addSelectedCoursesToCell(targetCell);

    // 처리 후 선택 상태 정리
    selectedCourses.clear();
    document.body.classList.remove('click-mode');

    // 드래그오버 태그 제거
    targetCell.classList.remove('dragover');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedCourse = null;
}

const semesterNames = [getText('semester1'), getText('summer'), getText('semester2'), getText('winter')];

function createYearColumn(year) {
    const yearColumn = document.createElement('div');
    yearColumn.className = 'year-column';
    yearColumn.dataset.year = year;

    const header = document.createElement('div');
    header.className = 'semester-header';
    const yearInfo = document.createElement('div');
    yearInfo.className = 'year-info';

    const yearTitle = document.createElement('span');
    yearTitle.className = 'year-title';
    const yearKey = `year${year}`;
    if (translations[currentLanguage][yearKey]) {
        yearTitle.textContent = getText(yearKey);
    } else {
        // 8학년 이상인 경우 n'th 형태로 생성
        yearTitle.textContent = `${year}${getText('yearSuffix')}`;
    }

    // 추가 학년(5학년 이상)인 경우 클릭 편집 가능하도록 설정
    if (year > 4) {
        yearTitle.style.cursor = 'pointer';
        yearTitle.title = getText('yearEditTitle');
        yearTitle.addEventListener('click', function (e) {
            e.stopPropagation();
            editYearTitle(yearTitle, year);
        });
    }

    const yearStats = document.createElement('span');
    yearStats.className = 'year-stats';
    yearStats.textContent = `${getText('creditHeader')}: 0, ${getText('gpaHeader')}: N/A, ${getText('majorHeader')}: N/A`;

    yearInfo.appendChild(yearTitle);
    yearInfo.appendChild(yearStats);
    header.appendChild(yearInfo);

    if (year > 4) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-year-btn';
        removeBtn.textContent = '✕';
        removeBtn.title = getText('yearRemoveTitle');
        removeBtn.addEventListener('click', () => {
            yearColumn.remove();
            delete decks[currentDeck].years[year];
            // 커스텀 학년명도 함께 삭제
            if (decks[currentDeck].customYearNames && decks[currentDeck].customYearNames[year]) {
                delete decks[currentDeck].customYearNames[year];
            }
            updateChart(); // UI 업데이트와 저장을 한 번에
            saveToHistory();
        });
        header.appendChild(removeBtn);
    }

    yearColumn.appendChild(header);

    semesterNames.forEach((name, index) => {
        const cell = document.createElement('div');
        cell.className = 'semester-cell';
        cell.dataset.year = year;
        cell.dataset.semester = index + 1;
        cell.addEventListener('dragover', handleDragOver);
        cell.addEventListener('dragleave', handleDragLeave);
        cell.addEventListener('drop', handleDrop);
        cell.addEventListener('click', handleCellClick);

        const creditTotalElement = document.createElement('div');
        creditTotalElement.className = 'semester-credit-total';
        creditTotalElement.textContent = getText('noCredit');
        cell.appendChild(creditTotalElement);

        yearColumn.appendChild(cell);
    });

    return yearColumn;
}

// 학년명 편집 함수
function editYearTitle(yearTitleElement, year) {
    const currentText = yearTitleElement.textContent;

    // 입력 필드 생성
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'year-title-input';
    input.style.background = 'transparent';
    input.style.border = '1px solid rgba(255, 255, 255, 0.5)';
    input.style.borderRadius = '2px';
    input.style.color = 'white';
    input.style.fontSize = '1.0em';
    input.style.fontWeight = 'bold';
    input.style.fontFamily = 'inherit';
    input.style.padding = '2px 4px';
    input.style.width = '80px';
    input.style.textAlign = 'center';

    // 기존 텍스트를 입력 필드로 교체
    yearTitleElement.style.display = 'none';
    yearTitleElement.parentNode.insertBefore(input, yearTitleElement);

    // 입력 필드에 포커스하고 텍스트 선택
    input.focus();
    input.select();

    // 편집 완료 함수
    function finishEdit() {
        const yearKey = `year${year}`;
        const defaultText = translations[currentLanguage][yearKey] ? getText(yearKey) : `${year}${getText('yearSuffix')}`;
        const newText = input.value.trim() || defaultText; // 빈 값이면 기본값으로 복원
        yearTitleElement.textContent = newText;
        yearTitleElement.style.display = '';
        input.remove();

        // 변경된 학년명을 localStorage에 저장
        if (!decks[currentDeck].customYearNames) {
            decks[currentDeck].customYearNames = {};
        }
        decks[currentDeck].customYearNames[year] = newText;
        saveCurrentDeck();
        saveStateToLocalStorage();
        saveToHistory();
    }

    // Enter 키로 편집 완료
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishEdit();
        } else if (e.key === 'Escape') {
            // ESC 키로 편집 취소
            yearTitleElement.style.display = '';
            input.remove();
        }
    });

    // 포커스를 잃으면 편집 완료
    input.addEventListener('blur', finishEdit);
}

document.addEventListener('DOMContentLoaded', function () {

    // === 이벤트 위임 시스템 구축 ===
    function setupEventDelegation() {
        // 전역 클릭 이벤트 위임
        document.addEventListener('click', function (e) {
            // 덱 탭 클릭
            if (e.target.classList.contains('deck-tab')) {
                e.preventDefault();
                const deckId = e.target.dataset.deck;
                switchDeck(deckId);
                return;
            }

            // 언어 전환 버튼 클릭 (3단계에서 추가될 예정)
            if (e.target.classList.contains('lang-btn')) {
                e.preventDefault();
                const newLang = e.target.dataset.lang;
                switchLanguage(newLang);
                return;
            }

            // 덱 관련 버튼들
            if (e.target.id === 'deck-copy-paste-btn') {
                e.preventDefault();
                copyOrPasteDeck();
                return;
            }

            if (e.target.id === 'deck-reset-btn') {
                e.preventDefault();
                resetDeck(currentDeck);
                return;
            }

            if (e.target.id === 'deck-export-btn') {
                e.preventDefault();
                exportData();
                return;
            }

            if (e.target.id === 'deck-import-btn') {
                e.preventDefault();
                importData();
                return;
            }

            if (e.target.id === 'add-deck-btn') {
                e.preventDefault();
                addNewDeck();
                return;
            }

            if (e.target.id === 'undo-btn') {
                e.preventDefault();
                undo();
                return;
            }

            if (e.target.id === 'redo-btn') {
                e.preventDefault();
                redo();
                return;
            }

            if (e.target.id === 'help-btn') {
                e.preventDefault();
                showHelpPopup();
                return;
            }

            if (e.target.id === 'shortcuts-btn') {
                e.preventDefault();
                showShortcutsPopup();
                return;
            }

            if (e.target.id === 'gpa-scale-toggle-btn') {
                e.preventDefault();
                toggleGpaScale();
                return;
            }
            
            // 목표 평점 계산 버튼
            if (e.target.id === 'gpa-goal-btn') {
                e.preventDefault();
                showGpaGoalPopup();
                return;
            }

            if (e.target.id === 'deck-simulation-btn') {
                e.preventDefault();
                showDeckSimulationPopup();
                return;
            }
          
            // 검색 관련 버튼들
            if (e.target.id === 'dept-search-btn') {
                e.preventDefault();
                searchDept();
                return;
            }

            if (e.target.id === 'course-search-btn') {
                e.preventDefault();
                searchCourseByName();
                return;
            }

            // 직접 추가 폼 버튼들
            if (e.target.id === 'custom-course-add-btn') {
                e.preventDefault();
                createCustomCourse();
                return;
            }

            if (e.target.id === 'custom-course-clear-btn') {
                e.preventDefault();
                document.getElementById('custom-course-name').value = '';
                document.getElementById('custom-course-code').value = '';
                document.getElementById('custom-course-credit').value = '';
                return;
            }

            // 연도 추가 버튼
            if (e.target.id === 'add-year-btn') {
                e.preventDefault();
                addYearColumn();
                return;
            }

            // 컨테이너 토글 버튼
            if (e.target.id === 'container-toggle-btn') {
                e.preventDefault();
                const courseContainer = document.querySelector('.course-container');
                const toggleBtn = document.getElementById('container-toggle-btn');
                courseContainer.classList.toggle('collapsed');
                toggleBtn.classList.toggle('collapsed');
                return;
            }

            // 연도 제거 버튼
            if (e.target.classList.contains('remove-year-btn')) {
                e.preventDefault();
                const yearColumn = e.target.closest('.year-column');
                if (yearColumn) {
                    yearColumn.remove();
                    updateYearStats();
                }
                return;
            }

            // plus 버튼 (전공 추가)
            if (e.target.id === 'major-add-btn') {
                e.preventDefault();
                e.stopPropagation();

                // 기존 메뉴가 있으면 제거
                if (menu) {
                    menu.remove();
                    menu = null;
                    document.removeEventListener('click', closeMenu);
                    return;
                }

                // 새 메뉴 생성
                menu = document.createElement('div');
                menu.className = 'plus-popup-menu';
                menu.style.position = 'fixed';
                menu.style.minWidth = '140px';
                menu.style.padding = '4px 0';
                menu.style.background = '#fff';
                menu.style.border = '1px solid #aaa';
                menu.style.borderRadius = '8px';
                menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                menu.style.zIndex = 1000;

                let mouseX = e.clientX;
                let mouseY = e.clientY;
                menu.style.left = mouseX + 'px';
                menu.style.top = mouseY + 'px';

                getMajorDivs().forEach((div, idx) => {
                    const item = document.createElement('div');
                    item.textContent = div;
                    item.style.padding = '8px 16px';
                    item.style.cursor = 'pointer';
                    item.style.whiteSpace = 'nowrap';
                    item.addEventListener('mouseenter', () => item.style.background = '#f0f0f0');
                    item.addEventListener('mouseleave', () => item.style.background = '');
                    item.addEventListener('click', function (ev) {
                        ev.stopPropagation();
                        closeMenu();
                        createDeptDropdown(idx);
                        saveToHistory();
                    });
                    menu.appendChild(item);
                });

                document.body.appendChild(menu);

                const menuRect = menu.getBoundingClientRect();
                if (menuRect.right > window.innerWidth) {
                    menu.style.left = (window.innerWidth - menuRect.width - 8) + 'px';
                }
                if (menuRect.bottom > window.innerHeight) {
                    menu.style.top = (window.innerHeight - menuRect.height - 8) + 'px';
                }

                // 즉시 이벤트 리스너 추가
                document.addEventListener('click', closeMenu);
                return;
            }

            // 과목 팝업 관련 버튼들
            if (e.target.classList.contains('course-popup-save-btn')) {
                e.preventDefault();
                const popup = e.target.closest('.course-popup');
                if (popup) {
                    const courseElement = popup.dataset.courseElement;
                    const gradeSelect = popup.querySelector('.grade-select');
                    const majorCheckbox = popup.querySelector('.major-checkbox');

                    if (courseElement && gradeSelect) {
                        const courseEl = document.querySelector(`[data-course-id="${courseElement}"]`);
                        if (courseEl) {
                            courseEl.dataset.grade = gradeSelect.value;
                            courseEl.dataset.major = majorCheckbox ? majorCheckbox.checked : 'false';
                            updateCellCredit(courseEl.closest('.semester-cell'));
                            updateChart();
                        }
                    }
                    closeCoursePopup();
                }
                return;
            }

            if (e.target.classList.contains('course-popup-delete-btn')) {
                e.preventDefault();
                const popup = e.target.closest('.course-popup');
                if (popup) {
                    const courseElement = popup.dataset.courseElement;
                    const courseEl = document.querySelector(`[data-course-id="${courseElement}"]`);
                    if (courseEl) {
                        deleteCourse(courseEl);
                    }
                    closeCoursePopup();
                }
                return;
            }

            if (e.target.classList.contains('course-popup-close-btn')) {
                e.preventDefault();
                closeCoursePopup();
                return;
            }

            if (e.target.classList.contains('help-popup-close-btn')) {
                e.preventDefault();
                closeHelpPopup();
                return;
            }
            
            // 목표 평점 계산 팝업 닫기 버튼
            if (e.target.id === 'gpa-goal-close-btn') {
                e.preventDefault();
                closeGpaGoalPopup();
                return;
            }

            // 덱 시뮬레이션 팝업 닫기 버튼
            if (e.target.id === 'deck-simulation-close-btn') {
                e.preventDefault();
                closeDeckSimulationPopup();
                return;
            }
          
            // 메뉴 외부 클릭 시 메뉴 닫기
            if (menu && !menu.contains(e.target) && e.target.id !== 'major-add-btn') {
                closeMenu();
                return;
            }
        });



        // 전역 키보드 이벤트 위임
        document.addEventListener('keydown', function (e) {
            // 입력 필드에 포커스가 있으면 단축키 무시
            const activeElement = document.activeElement;
            if (activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.isContentEditable
            )) {
                // Ctrl+Z와 Ctrl+X는 입력 필드에서도 작동하도록 허용 (일반적인 동작)
                if (!((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z' || e.key === 'x' || e.key === 'X'))) {
                    return;
                }
            }

            // Ctrl+Z (실행 취소)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
                e.preventDefault();
                undo();
                return;
            }

            // Ctrl+X (다시 실행)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'x' || e.key === 'X')) {
                e.preventDefault();
                redo();
                return;
            }

            // ESC 키 (팝업 닫기)
            if (e.key === 'Escape') {
                closeCoursePopup();
                closeHelpPopup();
                if (menu) {
                    closeMenu();
                }
                if (isClickMoveMode) {
                    clearCourseSelection();
                }
                return;
            }

            // Enter 키 (검색)
            if (e.key === 'Enter') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.id === 'course-search-input') {
                    e.preventDefault();
                    searchCourseByName();
                    return;
                }
                if (activeElement && activeElement.id === 'dept-search-input') {
                    e.preventDefault();
                    searchDept();
                    return;
                }
            }

            // 과목 팝업 상태에서 delete 버튼 클릭
            if (currentPopup && e.key === 'Delete') {
                currentPopup.querySelector('.course-popup-delete-btn')?.click();
            }
        });
    }

    // 이벤트 위임 시스템 초기화
    setupEventDelegation();
    
    // 목표 평점 계산 이벤트 리스너 설정
    setupGpaGoalEventListeners();
    
    // 재수강 계산기 이벤트 리스너 설정
    setupRetakeCalculatorEventListeners();

    // 평점 표시 기준 토글 버튼 초기화
    updateGpaScaleToggleButton();

    window.addEventListener('coursesLoaded', () => {
        loadStateFromLocalStorage();
        updateDeptDatalist();
        saveToHistory(); // 초기 상태 저장
    });

    const majorDivSelect = document.getElementById('majorDiv-select');
    const searchYearSelect = document.getElementById('search-year-select');

    getMajorDivs().forEach((majorDiv, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = majorDiv;
        majorDivSelect.appendChild(option);
    });

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        searchYearSelect.appendChild(option);
    });
    searchYearSelect.value = years[years.length - 1];

    const searchResult = document.getElementById('search-result');
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    const deptSearchContainer = document.getElementById('dept-search-container');
    const courseSearchContainer = document.getElementById('course-search-container');

    const customCourseContainer = document.getElementById('custom-course-container');

    searchTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'byDept') {
                deptSearchContainer.style.display = 'flex';
                courseSearchContainer.style.display = 'none';
                customCourseContainer.style.display = 'none';
            } else if (this.value === 'byCourseName') {
                deptSearchContainer.style.display = 'none';
                courseSearchContainer.style.display = 'flex';
                customCourseContainer.style.display = 'none';
            } else if (this.value === 'customCourse') {
                deptSearchContainer.style.display = 'none';
                courseSearchContainer.style.display = 'none';
                customCourseContainer.style.display = 'flex';
            }
            searchResult.innerHTML = '';
            clearCourseSelection();
        });
    });

    const deptDatalist = document.getElementById('dept-suggestions');
    const courseDatalist = document.getElementById('course-suggestions');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');

    function updateDeptDatalist() {
        const selectedYear = searchYearSelect.value;
        if (!info[selectedYear]) return;

        const selectedMajorDiv = majorDivSelect.value;
        const deptList = info[selectedYear][selectedMajorDiv];
        deptDatalist.innerHTML = '';
        if (deptList) {
            deptList.forEach(dept => {
                const option = document.createElement('option');
                option.value = getDeptName(dept);
                deptDatalist.appendChild(option);
            });
        }
    }

    function updateCourseDatalist() {
        const selectedYear = searchYearSelect.value;
        if (!info[selectedYear]) return;

        const keyword = courseSearchInput.value.trim().toUpperCase();
        courseDatalist.innerHTML = '';
        if (keyword.length < 2) return;

        const suggestions = new Set();
        const maxSuggestions = 50;

        for (const divList of info[selectedYear]) {
            if (suggestions.size >= maxSuggestions) break;
            for (const dept of divList) {
                if (suggestions.size >= maxSuggestions) break;
                if (dept.groups) {
                    for (const group of dept.groups) {
                        if (suggestions.size >= maxSuggestions) break;
                        if (group.courses) {
                            for (const courseCode of group.courses) {
                                const courseName = getCourseName(courseCode).toUpperCase();
                                if (courseName.includes(keyword) || courseCode.includes(keyword)) {
                                    suggestions.add(`[${courseCode}] ${getCourseName(courseCode)}`);
                                    if (suggestions.size >= maxSuggestions) break;
                                }
                            }
                        }
                    }
                }
            }
        }

        suggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            courseDatalist.appendChild(option);
        });
    }

    majorDivSelect.addEventListener('change', () => {
        deptSearchInput.value = '';
        updateDeptDatalist();
    });
    searchYearSelect.addEventListener('change', () => {
        deptSearchInput.value = '';
        updateDeptDatalist();
    });

    window.addEventListener('coursesLoaded', updateDeptDatalist);

    deptSearchInput.addEventListener('input', function () {
        updateDeptDatalist();
        const inputValue = this.value;
        const options = deptDatalist.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === inputValue) {
                searchDept();
                return;
            }
        }
    });

    courseSearchInput.addEventListener('input', function () {
        updateCourseDatalist();
        const inputValue = this.value;
        const options = courseDatalist.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === inputValue) {
                searchCourseByName();
                return;
            }
        }
    });

    const deptSearchBtn = document.getElementById('dept-search-btn');

    function renderDeptSearchResult(dept) {
        clearCourseSelection();

        searchResult.innerHTML = '';
        if (!dept) {
            searchResult.textContent = '해당 학과를 찾을 수 없습니다.';
            return;
        }

        dept.groups.forEach(group => {
            const groupContainer = document.createElement('div');
            groupContainer.className = 'result-group';
            const groupHeader = document.createElement('div');
            groupHeader.className = 'result-group-header';
            groupHeader.innerHTML = `<span>${group.name}</span>`;
            const groupContent = document.createElement('div');
            groupContent.className = 'result-group-content';

            group.courses.forEach(code => {
                const courseItem = createSearchResultCourse(code);
                groupContent.appendChild(courseItem);
            });

            groupContainer.appendChild(groupHeader);
            groupContainer.appendChild(groupContent);
            searchResult.appendChild(groupContainer);
        });
    }

    function searchDept() {
        const keyword = deptSearchInput.value.trim();
        const selectedMajorDiv = majorDivSelect.value;
        const selectedYear = searchYearSelect.value;

        if (!keyword || !info[selectedYear]) {
            searchResult.textContent = '학과 이름을 입력하세요.';
            return;
        }

        const deptList = info[selectedYear][selectedMajorDiv];
        const foundDept = deptList ? deptList.find(dept => dept.name.ko === keyword || dept.name.en == keyword) : null;

        renderDeptSearchResult(foundDept);
    }

    // 전역 함수로 등록
    window.searchDept = searchDept;

    deptSearchBtn.addEventListener('click', searchDept);
    deptSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchDept();
        }
    });

    function renderCourseSearchResult(foundCourses) {
        clearCourseSelection();

        searchResult.innerHTML = '';
        if (foundCourses.length === 0) {
            searchResult.textContent = '해당 강의를 찾을 수 없습니다.';
            return;
        }
        foundCourses.forEach(code => {
            const courseItem = createSearchResultCourse(code);
            searchResult.appendChild(courseItem);
        });
    }

    function searchCourseByName() {
        let keyword = courseSearchInput.value.trim().toUpperCase();
        const selectedYear = searchYearSelect.value;

        if (keyword.length < 2) {
            searchResult.textContent = '2글자 이상 입력하세요.';
            return;
        }
        if (!info[selectedYear]) {
            searchResult.textContent = '강의 데이터가 로딩 중입니다. 잠시 후 다시 시도해주세요.';
            return;
        }

        const foundCourses = new Set();
        for (const divList of info[selectedYear]) {
            for (const dept of divList) {
                if (dept.groups) {
                    for (const group of dept.groups) {
                        if (group.courses) {
                            for (const courseCode of group.courses) {
                                if (('[' + courseCode + '] ' + getCourseName(courseCode, 'ko')).includes(keyword)
                                    || ('[' + courseCode + '] ' + getCourseName(courseCode, 'en')).includes(keyword)) {
                                    foundCourses.add(courseCode);
                                }
                            }
                        }
                    }
                }
            }
        }
        renderCourseSearchResult(foundCourses);
    }

    // 전역 함수로 등록
    window.searchCourseByName = searchCourseByName;

    // 이벤트 위임으로 대체되었으므로 개별 이벤트 리스너 제거

    const plusBtn = document.getElementById('major-add-btn');
    let menu = null;
    
    // 전역 메뉴 닫기 함수
    function closeMenu() {
        if (menu) {
            menu.remove();
            menu = null;
        }
        document.removeEventListener('click', closeMenu);
    }

    // plus 버튼과 divider 이벤트는 이벤트 위임으로 대체되었으므로 제거

    const semesterScrollContainer = document.getElementById('semester-scroll-container');
    const semesterGridContainer = document.getElementById('semester-grid-container');
    const addYearBtn = document.getElementById('add-year-btn');
    const semesterRowHeaders = document.getElementById('semester-row-headers');

    const semesterHeader = document.createElement('div');
    semesterHeader.innerHTML = `<span>ㅤ</span>`;
    semesterRowHeaders.appendChild(semesterHeader);
    semesterNames.forEach(name => {
        const header = document.createElement('div');
        header.className = 'row-header';
        header.textContent = name;
        semesterRowHeaders.appendChild(header);
    });

    function getNextYearNumber() {
        const existingYears = Object.keys(decks[currentDeck].years)
            .map(year => parseInt(year, 10))
            .sort((a, b) => a - b);
        let nextYear = 1;
        for (const year of existingYears) {
            if (year === nextYear) {
                nextYear++;
            } else {
                break;
            }
        }
        return nextYear;
    }



    function addYearColumn() {
        const nextYear = getNextYearNumber();
        decks[currentDeck].years[nextYear] = {};

        const newYearColumn = createYearColumn(nextYear);

        const columns = Array.from(semesterGridContainer.querySelectorAll('.year-column'));
        const insertionIndex = columns.findIndex(col => parseInt(col.dataset.year, 10) > nextYear);

        if (insertionIndex === -1) {
            semesterGridContainer.appendChild(newYearColumn);
        } else {
            semesterGridContainer.insertBefore(newYearColumn, columns[insertionIndex]);
        }
        saveCurrentDeck();
        saveStateToLocalStorage();
        saveToHistory();
    }

    // 이벤트 위임으로 처리되므로 직접 이벤트 리스너 제거
    // addYearBtn.addEventListener('click', addYearColumn);

    semesterScrollContainer.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            semesterScrollContainer.scrollLeft += evt.deltaY;
        }
    });



    // 이벤트 위임으로 대체되었으므로 개별 이벤트 리스너 제거
    updateCopyPasteButton();
    updateHistoryButtons();

    // 3단계: 초기 텍스트 업데이트
    updateAllTexts();
});

function getTakenCourses() {
    const takenCourses = [];
    const allCourses = document.getElementById('semester-grid-container').querySelectorAll('.taken-course');
    allCourses.forEach(course => {
        const courseCode = course.dataset.courseCode;
        takenCourses.some((addedCourse, index) => {
            const equals = isEqualCourse(addedCourse.dataset.courseCode, courseCode);
            if (!equals) return false; // 같지 않은 과목이라면 넘기기
            // 같은 과목이라면 이전 걸 제거하기
            takenCourses.splice(index, 1);
            return true;
        });
        takenCourses.push(course);
    });
    return takenCourses;
}

function createDeptDropdown(majorDiv, selectedYear, selectedDeptCd) {
    const yearToUse = selectedYear || years[years.length - 1];
    if (!info[yearToUse] || !info[yearToUse][majorDiv]) {
        console.error('courses 데이터가 아직 로드되지 않았습니다.');
        return;
    }

    const container = document.createElement('div');
    container.className = 'dept-select-container';
    container.dataset.majorDiv = majorDiv;

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '4px 0';

    // 왼쪽: 전공 제목
    const label = document.createElement('div');
    label.textContent = getMajorDivs()[majorDiv];
    label.style.fontWeight = 'bold';
    header.appendChild(label);

    // 오른쪽: 기준년도 라벨 + 드롭다운 + 삭제 버튼
    const rightSection = document.createElement('div');
    rightSection.style.display = 'flex';
    rightSection.style.alignItems = 'center';
    rightSection.style.gap = '6px';

    // 기준년도 라벨
    const yearLabel = document.createElement('span');
    yearLabel.textContent = getText('yearLabel');
    yearLabel.style.fontSize = '0.85em';
    yearLabel.style.color = '#666';
    rightSection.appendChild(yearLabel);

    // 년도 선택 드롭다운
    const yearSelect = document.createElement('select');
    yearSelect.className = 'year-select';
    yearSelect.style.position = 'static'; // absolute 제거
    yearSelect.style.fontSize = '0.9em';
    yearSelect.style.padding = '2px 4px';
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
    yearSelect.value = yearToUse;
    rightSection.appendChild(yearSelect);

    // 삭제 버튼
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '1em';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '2px 4px';
    closeBtn.style.lineHeight = '1';
    closeBtn.style.color = '#666';
    closeBtn.setAttribute('aria-label', '닫기');
    closeBtn.onclick = () => {
        container.remove();
        updateChart(); // UI 업데이트와 저장을 한 번에
        saveToHistory();
    };
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = '#000';
        closeBtn.style.backgroundColor = '#f0f0f0';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = '#666';
        closeBtn.style.backgroundColor = 'transparent';
    });
    rightSection.appendChild(closeBtn);

    header.appendChild(rightSection);
    container.appendChild(header);

    const select = document.createElement('select');
    select.className = 'dept-select';
    container.appendChild(select);

    updateDeptSelectList(select, yearToUse, majorDiv, selectedDeptCd);

    yearSelect.addEventListener('change', () => {
        updateDeptSelectList(select, yearSelect.value, majorDiv, null);
        updateChart(); // UI 업데이트와 저장을 한 번에
        saveToHistory();
    });

    const groupToggleArea = document.createElement('div');
    groupToggleArea.className = 'group-toggle-area';
    const hr = document.createElement('hr');
    groupToggleArea.appendChild(hr);
    const groupListDiv = document.createElement('div');
    groupListDiv.className = 'group-list';
    groupToggleArea.appendChild(groupListDiv);
    container.appendChild(groupToggleArea);

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'group-toggle-btn';
    toggleBtn.textContent = '△';
    container.appendChild(toggleBtn);

    let expanded = true;
    toggleBtn.addEventListener('click', () => {
        expanded = !expanded;
        groupToggleArea.classList.toggle('collapsed', !expanded);
        toggleBtn.textContent = expanded ? '△' : '▽';
    });

    container.appendChild(document.createElement('hr'));
    select.addEventListener('change', () => {
        updateChart(); // UI 업데이트와 저장을 한 번에
        saveToHistory();
    });
    document.getElementById('selectContainer').appendChild(container);

    // 초기 로드 시에는 업데이트하지 않음
    if (!selectedYear) {
        updateChart();
    }
}

function initGroups(selectContainer) {
    const year = selectContainer.querySelector('.year-select').value;
    const majorDiv = selectContainer.dataset.majorDiv;
    if (!info[year] || !info[year][majorDiv]) return;
    const deptList = info[year][majorDiv];
    const groupListDiv = selectContainer.querySelector('.group-list');

    groupListDiv.innerHTML = '';
    const selectedDeptCd = selectContainer.querySelector('.dept-select').value;
    const dept = deptList.find(d => d.code === selectedDeptCd);
    if (dept) {
        // 제외 토글 저장소 초기화
        decks[currentDeck].excludedGroupRequirements = decks[currentDeck].excludedGroupRequirements || {};

        // 현재 선택 컨텍스트 키 생성 함수
        const getExcludeKey = (groupCode) => {
            return [
                selectContainer.dataset.majorDiv,
                year,
                selectedDeptCd,
                groupCode || ''
            ].join('|');
        };

        dept.groups.forEach(group => {
            const groupContainer = document.createElement('div');
            const groupLabel = document.createElement('span');
            groupLabel.textContent = group.name;
            groupLabel.className = 'group-label';
            groupContainer.appendChild(groupLabel);
            const groupProgress = document.createElement('span');
            groupProgress.className = 'group-progress';
            groupContainer.appendChild(groupProgress);

            groupContainer.className = 'group-container';
            groupContainer.dataset.groupCd = group.code || '';
            groupContainer.dataset.currentCredit = 0;
            groupContainer.dataset.minCredit = group.minCredit;
            groupContainer.dataset.maxCredit = group.maxCredit;
            groupContainer._takenCourses = [];

            // Academic English 졸업요건 제외 토글
            const groupName = (group.name || '').toString();
            const isAcademicEnglishGroup = /academic english/i.test(groupName)
                || groupName.includes('학문의기초(고급영어)')
                || groupName.includes('고급영어')
                || groupName.includes('Academic English 영역');

            if (isAcademicEnglishGroup) {
                const excludeWrap = document.createElement('label');
                excludeWrap.style.marginLeft = '8px';
                excludeWrap.style.display = 'inline-flex';
                excludeWrap.style.verticalAlign = 'middle';
                const excludeChk = document.createElement('input');
                excludeChk.type = 'checkbox';

                const key = getExcludeKey(group.code);
                if (decks[currentDeck].excludedGroupRequirements[key]) {
                    groupContainer.dataset.excluded = 'true';
                    excludeChk.checked = true;
                }

                excludeChk.addEventListener('change', () => {
                    const checked = excludeChk.checked;
                    if (checked) {
                        groupContainer.dataset.excluded = 'true';
                        decks[currentDeck].excludedGroupRequirements[key] = true;
                    } else {
                        delete decks[currentDeck].excludedGroupRequirements[key];
                        groupContainer.dataset.excluded = 'false';
                    }
                    updateGroupProgress(groupContainer);
                    saveStateToLocalStorage();
                });

                excludeWrap.appendChild(excludeChk);
                // 라벨 바로 오른쪽에 토글 배치 (진행률 바 앞)
                groupContainer.insertBefore(excludeWrap, groupProgress);
            }

            groupContainer.addEventListener('mouseenter', () => {
                groupContainer._takenCourses.forEach(courseEl => courseEl.classList.add('highlight'));
            });
            groupContainer.addEventListener('mouseleave', () => {
                groupContainer._takenCourses.forEach(courseEl => courseEl.classList.remove('highlight'));
            });

            updateGroupProgress(groupContainer);
            groupListDiv.appendChild(groupContainer);
        });
    }
}

function updateGroupProgress(groupContainer) {
    const excluded = groupContainer.dataset.excluded === 'true';
    const minCredit = excluded ? 0 : parseFloat(groupContainer.dataset.minCredit);
    const maxCredit = parseFloat(groupContainer.dataset.maxCredit);
    let currentCredit = parseFloat(groupContainer.dataset.currentCredit);
    currentCredit = maxCredit > 0 ? Math.min(maxCredit, currentCredit) : currentCredit;

    // 최소학점이 양수가 아니면 최대학점 기준으로 진행률 체크
    const stdCredit = minCredit > 0 ? minCredit : maxCredit > 0 ? maxCredit : 0;

    const progress = (stdCredit > 0) ? (currentCredit / stdCredit * 100).toFixed(0) : 0;
    const groupProgress = groupContainer.querySelector('.group-progress');

    if (excluded) {
        groupProgress.textContent = `제외됨`;
    } else {
        groupProgress.textContent = `${Number.isInteger(currentCredit) ? currentCredit.toString() : currentCredit.toFixed(1)}/${Number.isInteger(stdCredit) ? stdCredit.toString() : stdCredit.toFixed(1)} (${progress}%)`;
    }

    const progressPercent = Math.min(100, parseFloat(progress));

    // 둥근 모서리를 위한 배경 설정
    if (excluded) {
        groupProgress.style.background = 'linear-gradient(135deg, #f1f3f5, #e9ecef)';
        groupProgress.style.border = '1px dashed #adb5bd';
        groupProgress.style.color = '#495057';
        groupProgress.style.boxShadow = 'none';
    } else if (progressPercent > 0) {
        groupProgress.style.background = `linear-gradient(to right, #dc143c ${progressPercent}%, rgba(220, 20, 60, 0.15) ${progressPercent}%)`;
        groupProgress.style.border = '1px solid rgba(220, 20, 60, 0.3)';
    } else {
        groupProgress.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        groupProgress.style.border = '1px solid #dee2e6';
    }

    if (!excluded && progressPercent >= 100) {
        groupProgress.style.color = 'white';
        groupProgress.style.background = 'linear-gradient(135deg, #dc143c, #b22222)';
        groupProgress.style.border = '1px solid #b22222';
        groupProgress.style.boxShadow = '0 2px 6px rgba(220, 20, 60, 0.4)';
    } else {
        groupProgress.style.color = '#333';
        groupProgress.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
}

function addCourese(groupContainer, course) {
    groupContainer._takenCourses.push(course);
    const grade = course.dataset.grade;
    // F나 NP면 진행도 포함 x
    if (grade !== 'F' && grade !== 'NP')
        groupContainer.dataset.currentCredit
            = parseInt(groupContainer.dataset.currentCredit) + parseInt(course.dataset.credit);
    updateGroupProgress(groupContainer);
}

// 셀의 학점 업데이트
function updateCellCredit(cell) {
    const creditTotalElement = cell.querySelector('.semester-credit-total');
    if (!creditTotalElement) return;

    let totalCredit = 0;
    let totalGradePoints = 0;
    let gradedCourseCount = 0;

    cell.querySelectorAll('.taken-course').forEach(courseEl => {
        const credit = parseFloat(courseEl.dataset.credit) || 0;
        const grade = courseEl.dataset.grade;
        totalCredit += credit;

        // 평점 계산 (P/NP 제외)
        if (grade && gradeSystem[grade] !== undefined) {
            totalGradePoints += gradeSystem[grade] * credit;
            gradedCourseCount += credit;
        }
    });

    // 셀의 학점 표시 업데이트
    let displayText = `${Number.isInteger(totalCredit) ? totalCredit.toString() : totalCredit.toFixed(1)}${getText('creditUnit')}`;

    // 평균 평점 계산 및 표시
    if (gradedCourseCount > 0) {
        const gpa = (totalGradePoints / gradedCourseCount).toFixed(2);
        displayText += ` (${getText('average')}: ${formatGpa(gpa)})`;
    } else if (cell.querySelectorAll('.taken-course').length > 0) {
        displayText += ` (${getText('average')}: N/A)`;
    }

    creditTotalElement.textContent = displayText;
}

// 특정 전공의 평점을 계산하는 함수
function calculateMajorGPA(majorContainer) {
    let totalGradePoints = 0;
    let totalGradedCredits = 0;
    let totalMajorCredits = 0; // 전공 총 학점 (평점 상관없이)

    majorContainer.querySelectorAll('.group-container').forEach(groupContainer => {
        groupContainer._takenCourses.forEach(course => {
            // 전공 여부는 설정값이 없을 수 있으므로, 항상 판별 함수 사용
            const isMajor = isMajorCourse(course);
            if (!isMajor) return;
            const grade = course.dataset.grade;
            const credit = parseFloat(course.dataset.credit) || 0;
            
            // 전공 과목이면 평점 상관없이 총 학점에 포함
            totalMajorCredits += credit;
            
            // 평점이 입력된 과목만 평점 계산에 포함
            if (grade && gradeSystem[grade] !== undefined) {
                totalGradePoints += gradeSystem[grade] * credit;
                totalGradedCredits += credit;
            }
        });
    });

    if (totalGradedCredits > 0) {
        const gpa = (totalGradePoints / totalGradedCredits).toFixed(2);
        return { gpa, credit: totalMajorCredits }; // 총 전공 학점 반환
    } else {
        return { gpa: 'N/A', credit: totalMajorCredits }; // 총 전공 학점 반환
    }
}

// 전공별 평점 표시를 업데이트하는 함수
function updateMajorGPADisplay() {
    const majorContainers = document.querySelectorAll('.dept-select-container');

    majorContainers.forEach(container => {
        // 기존 평점 표시 요소 제거
        const existingGPAElement = container.querySelector('.major-gpa-display');
        if (existingGPAElement) {
            existingGPAElement.remove();
        }

        // 새로운 평점 계산
        const { gpa, credit } = calculateMajorGPA(container);

        // 평점 표시 요소 생성
        const gpaElement = document.createElement('div');
        gpaElement.className = 'major-gpa-display';
        gpaElement.textContent = `${getText('majorGpaDisplay')} ${formatGpa(gpa)}`;
        gpaElement.style.cssText = `
            font-size: 0.9em;
            color: #dc143c;
            font-weight: bold;
            margin-top: 8px;
            padding: 4px 8px;
            background: rgba(220, 20, 60, 0.1);
            border-radius: 4px;
            text-align: center;
        `;

        // 드롭다운과 그래프 사이에 삽입
        const deptSelect = container.querySelector('.dept-select');
        if (deptSelect) {
            deptSelect.parentNode.insertBefore(gpaElement, deptSelect.nextSibling);
        }
    });
}

// 체크 표시 전체 업데이트
function updateMajorCheckMarks() {
    const courseElements = document.querySelectorAll('.taken-course');
    courseElements.forEach(courseElement => {
        updateMajorCheckMark(courseElement);
    });
}
// 전공 여부에 따라 체크 표시를 업데이트하는 함수
function updateMajorCheckMark(courseElement) {
    // 기존 체크 표시 제거
    const existingCheck = courseElement.querySelector('.major-check');
    if (existingCheck) {
        existingCheck.remove();
    }

    const isMajor = isMajorCourse(courseElement);

    // 전공과목이면 체크 표시 추가
    if (isMajor) {
        const checkMark = document.createElement('span');
        checkMark.className = 'major-check';
        //checkMark.textContent = '✓';
        checkMark.textContent = 'M';
        courseElement.appendChild(checkMark);
    }
}

// 과목이 졸업요건의 전공 영역에 속하는지 확인하는 함수
function isCourseInMajorRequirements(courseCode) {
    // 모든 전공 컨테이너를 확인
    const majorContainers = document.querySelectorAll('.dept-select-container');
    
    for (const majorContainer of majorContainers) {
        const year = majorContainer.querySelector('.year-select')?.value;
        const majorDiv = majorContainer.dataset.majorDiv;
        const selectedDeptCd = majorContainer.querySelector('.dept-select')?.value;
        
        if (!year || majorDiv === undefined || !selectedDeptCd) continue;
        
        const deptList = info[year] ? info[year][majorDiv] : [];
        const dept = deptList ? deptList.find(d => d.code === selectedDeptCd) : null;
        
        if (!dept) continue;
        
        // 해당 학과의 모든 그룹에서 전공 그룹을 찾아 과목이 포함되어 있는지 확인
        for (const group of dept.groups) {
            if (group.name.includes('전공')) {
                if (group.courses.some(courseCd => isEqualCourse(courseCd, courseCode))) {
                    return true;
                }
            }
        }
    }
    
    return false;
}
// 과목이 전공 과목인지 확인하는 함수
function isMajorCourse(courseElement) {
    // 설정값이 있으면 그대로 설정
    if (courseElement.dataset.isMajor !== undefined && courseElement.dataset.isMajor !== 'undefined')
        return courseElement.dataset.isMajor === 'true';
    // 설정값이 없으면 졸업요건에 따라 확인
    return isCourseInMajorRequirements(courseElement.dataset.courseCode);
}

// UI 업데이트만 담당 (저장 로직 제외)
function updateChart(options = { save: true }) {
    const myMajors = document.querySelectorAll('.dept-select-container');
    myMajors.forEach(initGroups);

    const takenCourses = getTakenCourses();
    let currentCredit = 0;
    let totalGradePoints = 0;
    let totalGradedCredits = 0;

    takenCourses.forEach(course => {
        const credit = parseFloat(course.dataset.credit) || 0;
        const grade = course.dataset.grade;

        // F학점이거나 NP이면 학점 인정 안함
        // if (grade !== 'F' && grade !== 'NP') // 임시 제거
        currentCredit += credit;

        // 평점 계산 (평점이 입력된 과목만, P/NP 제외)
        if (grade && gradeSystem[grade] !== undefined) {
            totalGradePoints += gradeSystem[grade] * credit;
            totalGradedCredits += credit;
        }
    });

    // 전체 학점 업데이트
    document.getElementById('current-credit').textContent = Number.isInteger(currentCredit) ? currentCredit.toString() : currentCredit.toFixed(1);

    // 전체 평점 업데이트
    const overallGpaElement = document.getElementById('overall-gpa');
    if (totalGradedCredits > 0) {
        const overallGpa = (totalGradePoints / totalGradedCredits).toFixed(2);
        overallGpaElement.textContent = formatGpa(overallGpa);
    } else {
        overallGpaElement.textContent = 'N/A';
    }

    // 전공 학점/평점 계산
    let majorGradePoints = 0;
    let majorGradedCredits = 0;
    let majorTotalCredits = 0; // 전공 총 학점 (평점 상관없이)

    takenCourses.forEach(courseEl => {
        const credit = parseFloat(courseEl.dataset.credit) || 0;
        const grade = courseEl.dataset.grade;
        const isMajor = isMajorCourse(courseEl);

        if (isMajor) {
            // 전공 과목이면 평점 상관없이 총 학점에 포함
            majorTotalCredits += credit;
            
            // 평점이 입력된 과목만 평점 계산에 포함
            if (grade && gradeSystem[grade] !== undefined) {
                majorGradePoints += gradeSystem[grade] * credit;
                majorGradedCredits += credit;
            }
        }
    });
    
    // 전공 총 학점 표시 (평점 상관없이)
    document.getElementById('major-credit').textContent = Number.isInteger(majorTotalCredits) ? majorTotalCredits.toString() : majorTotalCredits.toFixed(1);

    const majorGpaElement = document.getElementById('major-gpa');
    if (majorGradedCredits > 0) {
        const majorGpa = (majorGradePoints / majorGradedCredits).toFixed(2);
        majorGpaElement.textContent = formatGpa(majorGpa);
    } else {
        majorGpaElement.textContent = 'N/A';
    }

    // 각 전공별 그룹 업데이트(한 과목이 여러 졸업요건에 중복 적용 가능)
    myMajors.forEach(myMajor => {
        const year = myMajor.querySelector('.year-select').value;
        const majorDiv = myMajor.dataset.majorDiv;
        const selectedDeptCd = myMajor.querySelector('.dept-select').value;
        const deptList = info[year] ? info[year][majorDiv] : [];
        const dept = deptList ? deptList.find(d => d.code === selectedDeptCd) : null;

        if (!dept) return;

        const groupContainers = myMajor.querySelectorAll('.group-container');
        groupContainers.forEach(groupContainer => {
            groupContainer._takenCourses = [];
            groupContainer.dataset.currentCredit = 0;
        });

        takenCourses.forEach(takenCourse => {
            const courseCode = takenCourse.dataset.courseCode;

            // 모든 그룹에서 해당 과목을 찾아서 추가
            dept.groups.forEach(group => {
                const isInGroup = group.courses.some(courseCd => isEqualCourse(courseCd, courseCode));
                
                if (isInGroup) {
                    // 그룹 코드 일치하는 곳에 추가
                    const groupContainer = Array.from(groupContainers).find(gc =>
                        gc.dataset.groupCd === group.code
                    );
                    if (groupContainer) {
                        addCourese(groupContainer, takenCourse);
                    }
                }
            });
        });
    });

    // 전공별 평점 표시 업데이트
    updateMajorGPADisplay();

    // 모든 과목의 전공 체크 표시 업데이트
    updateMajorCheckMarks();

    // 각 셀의 학점 업데이트
    document.querySelectorAll('.semester-cell').forEach(cell => {
        updateCellCredit(cell);
    });

    // 학년별 통계 업데이트
    updateYearStats();

    // 저장 옵션이 true인 경우에만 저장
    if (options.save) {
        saveCurrentDeck();
        saveStateToLocalStorage();
    }
}

// 학년별 학점과 평점을 계산하고 업데이트하는 함수
function updateYearStats() {
    document.querySelectorAll('.year-column').forEach(yearColumn => {
        const yearStatsElement = yearColumn.querySelector('.year-stats');

        if (!yearStatsElement) return;

        let totalCredits = 0;
        let totalGradePoints = 0;
        let gradedCourseCount = 0;
        let majorGradePoints = 0;
        let majorGradedCredits = 0;

        // 해당 학년의 모든 semester-cell에서 과목들을 가져와서 계산
        yearColumn.querySelectorAll('.semester-cell .taken-course').forEach(courseEl => {
            const credit = parseFloat(courseEl.dataset.credit) || 0;
            const grade = courseEl.dataset.grade;
            const isMajor = isMajorCourse(courseEl);

            // F학점이거나 NP이면 학점 인정 안함, 그 외에는 학점 인정
            if (grade !== 'F' && grade !== 'NP') {
                totalCredits += credit;
            }

            // 평점 계산 (평점이 입력된 과목만, P/NP 제외)
            if (grade && gradeSystem[grade] !== undefined) {
                totalGradePoints += gradeSystem[grade] * credit;
                gradedCourseCount += credit;

                // 전공 평점 계산
                if (isMajor) {
                    majorGradePoints += gradeSystem[grade] * credit;
                    majorGradedCredits += credit;
                }
            }
        });

        // 전체 평점 평균 계산
        let gpaText = 'N/A';
        if (gradedCourseCount > 0) {
            const gpa = (totalGradePoints / gradedCourseCount).toFixed(2);
            gpaText = formatGpa(gpa);
        }

        // 전공 평점 평균 계산
        let majorGpaText = 'N/A';
        if (majorGradedCredits > 0) {
            const majorGpa = (majorGradePoints / majorGradedCredits).toFixed(2);
            majorGpaText = formatGpa(majorGpa);
        }

        // 학점, 평점, 전공평점 업데이트 (한 줄로 표시)
        yearStatsElement.textContent = `${getText('creditHeader')}: ${Number.isInteger(totalCredits) ? totalCredits.toString() : totalCredits.toFixed(1)}, ${getText('gpaHeader')}: ${gpaText}, ${getText('majorHeader')}: ${majorGpaText}`;
    });
}

// 목표 평점 계산 기능
let gpaGoalPopup = null;
let isGpaGoalDataSaved = false; // 목표 평점 데이터 저장 상태 추적

// 목표 평점 계산 팝업 표시
function showGpaGoalPopup() {
    const popup = document.getElementById('gpa-goal-popup');
    if (popup) {
        popup.style.display = 'block';
        gpaGoalPopup = popup;
        centerGpaGoalPopup();
        enableGpaGoalPopupDrag();
        
        // 현재 총학점과 평점을 가져와서 표시
        updateGpaGoalInputs();
        
        // 저장된 데이터 불러오기
        const dataLoaded = loadGpaGoalData();
        
        // 저장된 데이터가 없으면 입력 필드에 포커스
        if (!dataLoaded) {
            document.getElementById('target-gpa-input').focus();
        }
        
        // 저장 전에는 재수강 변경사항을 반영평점에 반영, 저장 후에는 반영하지 않음
        if (!isGpaGoalDataSaved) {
            updateGpaGoalWithRetakeChanges();
        }
    }
}

// 목표 평점 계산 팝업 숨김
function closeGpaGoalPopup() {
    const popup = document.getElementById('gpa-goal-popup');
    if (popup) {
        popup.style.display = 'none';
        gpaGoalPopup = null;
        
        // 저장 버튼 상태 초기화
        updateSaveButtonState(false);
        
        // 저장 상태 초기화 (다음에 팝업을 열 때 재수강 변경사항을 반영할 수 있도록)
        isGpaGoalDataSaved = false;
        
        // 재수강 계산기 변경 사항 초기화
        resetRetakeChanges();
    }
}

// 현재 총학점과 평점을 가져와서 입력 필드에 표시
function updateGpaGoalInputs() {
    const currentCredit = document.getElementById('current-credit').textContent;
    const currentGpa = document.getElementById('overall-gpa').textContent;
    
    // 현재 상태를 팝업에 표시 (선택사항)
    console.log(`현재 총학점: ${currentCredit}, 현재 평점: ${currentGpa}`);
}

// 기존 목표 평점 계산 함수 (이제 사용되지 않음)
function calculateRequiredGpaOld() {
    const targetGpa = parseFloat(document.getElementById('target-gpa-input').value);
    const remainingCredits = parseInt(document.getElementById('remaining-credits-input').value);
    const currentCredit = parseFloat(document.getElementById('current-credit').textContent);
    const currentGpa = parseFloat(document.getElementById('overall-gpa').textContent);
    
    const resultElement = document.getElementById('required-gpa-result');
    
    // 유효성 검사
    if (isNaN(targetGpa) || isNaN(remainingCredits) || isNaN(currentCredit) || isNaN(currentGpa)) {
        resultElement.textContent = '-';
        resultElement.className = 'gpa-goal-result';
        return;
    }
    
    if (targetGpa < 0 || targetGpa > 4.5) {
        showGpaGoalError('목표 평점은 0.0 ~ 4.5 사이여야 합니다.');
        return;
    }
    
    if (remainingCredits <= 0 || remainingCredits > 200) {
        showGpaGoalError('남은 학점은 1 ~ 200 사이여야 합니다.');
        return;
    }
    
    // 계산 공식: 필요 평점 = (목표 총 평점 × (현재 총학점 + 남은 학점) - 현재 총 평점 × 현재 총학점) ÷ 남은 학점
    const totalCredits = currentCredit + remainingCredits;
    const requiredGpa = ((targetGpa * totalCredits) - (currentGpa * currentCredit)) / remainingCredits;
    
    // 결과 표시
    const requiredGpaFormatted = requiredGpa.toFixed(2);
    resultElement.textContent = requiredGpaFormatted;
    resultElement.className = 'gpa-goal-result calculated';
    
    // 결과에 따른 스타일 적용
    if (requiredGpa <= 4.5 && requiredGpa >= 0) {
        resultElement.classList.add('success');
        resultElement.classList.remove('error');
    } else {
        resultElement.classList.add('error');
        resultElement.classList.remove('success');
    }
    
    // 에러 메시지 숨김
    hideGpaGoalError();
}

// 에러 메시지 표시
function showGpaGoalError(message) {
    const resultElement = document.getElementById('required-gpa-result');
    resultElement.textContent = '오류';
    resultElement.className = 'gpa-goal-result error';
    
    // 에러 메시지를 팝업에 표시 (선택사항)
    console.error(message);
}

// 에러 메시지 숨김
function hideGpaGoalError() {
    // 에러 메시지 숨김 로직 (필요시 구현)
}



// 목표 평점 계산 이벤트 리스너 설정
function setupGpaGoalEventListeners() {
    // 버튼 클릭 이벤트
    const gpaGoalBtn = document.getElementById('gpa-goal-btn');
    if (gpaGoalBtn) {
        gpaGoalBtn.addEventListener('click', showGpaGoalPopup);
    }
    
    // 닫기 버튼 이벤트
    const closeBtn = document.getElementById('gpa-goal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeGpaGoalPopup);
    }
    
    // 입력 필드 실시간 계산
    const targetGpaInput = document.getElementById('target-gpa-input');
    const totalRemainingCreditsInput = document.getElementById('total-remaining-credits');
    
    if (targetGpaInput) {
        targetGpaInput.addEventListener('input', calculateRequiredGpa);
    }
    
    if (totalRemainingCreditsInput) {
        totalRemainingCreditsInput.addEventListener('input', calculateRequiredGpa);
        totalRemainingCreditsInput.addEventListener('input', updateSemesterPlanSummary);
    }
    
    // 학기별 계획 토글 버튼
    const toggleSemesterBtn = document.getElementById('toggle-semester-plan');
    if (toggleSemesterBtn) {
        toggleSemesterBtn.addEventListener('click', toggleSemesterPlan);
    }
    
    // 학기 추가 버튼
    const addSemesterBtn = document.getElementById('add-semester-btn');
    if (addSemesterBtn) {
        addSemesterBtn.addEventListener('click', addSemesterPlan);
    }
    
    // 학기별 계획 닫기 버튼
    const semesterPlanCloseBtn = document.getElementById('semester-plan-close-btn');
    if (semesterPlanCloseBtn) {
        semesterPlanCloseBtn.addEventListener('click', toggleSemesterPlan);
    }
    
    // 저장 버튼
    const saveBtn = document.getElementById('gpa-goal-save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveGpaGoalData);
    }
    

}

// 다국어 지원을 위한 텍스트 업데이트
function updateGpaGoalTexts() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// 재수강 계산기 다국어 지원을 위한 텍스트 업데이트
function updateRetakeCalculatorTexts() {
    // 재수강 팝업 헤더 제목 업데이트 (팝업이 열려있지 않아도)
    const retakePopup = document.getElementById('retake-courses-popup');
    if (retakePopup) {
        const popupTitle = retakePopup.querySelector('h3');
        if (popupTitle) {
            popupTitle.textContent = getText('retakeCalculator');
        }
        
        // 저장 버튼 텍스트 업데이트 (팝업이 열려있지 않아도)
        const saveBtn = retakePopup.querySelector('#retake-save-btn');
        if (saveBtn) {
            saveBtn.textContent = getText('saveRetakeChanges');
        }
        
        // 재수강 팝업이 열려있다면 테이블 내용도 업데이트
        if (retakePopup.style.display !== 'none') {
            const retakeCoursesList = retakePopup.querySelector('#retake-courses-list');
            if (retakeCoursesList) {
                updateRetakeCoursesList();
            }
        }
    }
    
    // 목표 평점 계산기 내의 재수강 과목 버튼 텍스트 업데이트
    const retakeBtn = document.getElementById('retake-courses-btn');
    if (retakeBtn) {
        retakeBtn.textContent = getText('retakeCourses');
    }
}

// 학기별 계획 관련 변수
let semesterPlanCount = 0;
let isSemesterPlanActive = false;

// 학기별 계획 토글
function toggleSemesterPlan() {
    const toggleBtn = document.getElementById('toggle-semester-plan');
    const planSection = document.getElementById('semester-plan-section');
    
    if (isSemesterPlanActive) {
        // 학기별 계획 비활성화
        planSection.style.display = 'none';
        toggleBtn.classList.remove('active');
        toggleBtn.textContent = getText('addSemesterPlan');
        isSemesterPlanActive = false;
        
        // 학기 목록 초기화
        clearSemesterPlans();
    } else {
        // 학기별 계획 활성화
        planSection.style.display = 'block';
        toggleBtn.classList.add('active');
        toggleBtn.textContent = getText('addSemesterPlan');
        isSemesterPlanActive = true;
        
        // 첫 번째 학기 추가
        addSemesterPlan();
    }
    
    // 계산 업데이트
    calculateRequiredGpa();
}

// 학기별 계획 추가
function addSemesterPlan() {
    semesterPlanCount++;
    const semesterList = document.getElementById('semester-plan-list');
    
    const semesterItem = document.createElement('div');
    semesterItem.className = 'semester-item';
    semesterItem.dataset.semesterId = semesterPlanCount;
    
    const semesterText = getText('semesterLabel');
    const creditPlaceholder = getText('semesterCreditPlaceholder');
    const gpaPlaceholder = getText('semesterGpaPlaceholder');
    semesterItem.innerHTML = `
        <span class="semester-item-label">${semesterText}${semesterPlanCount}:</span>
        <input type="number" class="semester-item-input semester-credits" 
               placeholder="${creditPlaceholder}" min="1" data-semester-id="${semesterPlanCount}">
        <input type="number" class="semester-item-input semester-gpa" 
               placeholder="${gpaPlaceholder}" min="0" max="4.5" step="0.1" data-semester-id="${semesterPlanCount}">
        <button class="semester-item-remove" data-semester-id="${semesterPlanCount}">×</button>
    `;
    
    semesterList.appendChild(semesterItem);
    
    // 이벤트 리스너 추가
    const creditInput = semesterItem.querySelector('.semester-credits');
    const gpaInput = semesterItem.querySelector('.semester-gpa');
    const removeBtn = semesterItem.querySelector('.semester-item-remove');
    
    creditInput.addEventListener('input', updateSemesterPlanSummary);
    creditInput.addEventListener('input', calculateRequiredGpa);
    creditInput.addEventListener('input', calculateReflectedGpa);
    gpaInput.addEventListener('input', calculateRequiredGpa);
    gpaInput.addEventListener('input', calculateReflectedGpa);
    removeBtn.addEventListener('click', handleRemoveSemesterPlan);
    
    updateSemesterPlanSummary();
}

// 학기별 계획 삭제
function removeSemesterPlan(semesterId) {
    const semesterItem = document.querySelector(`[data-semester-id="${semesterId}"]`);
    if (semesterItem) {
        semesterItem.remove();
        
        // 남은 학기들의 번호를 재정렬
        reorderSemesterNumbers();
        
        updateSemesterPlanSummary();
        calculateRequiredGpa();
    }
}

// 학기 번호 재정렬
function reorderSemesterNumbers() {
    const semesterItems = document.querySelectorAll('.semester-item');
    let newIndex = 1;
    
    semesterItems.forEach(item => {
        const label = item.querySelector('.semester-item-label');
        if (label) {
            const semesterText = getText('semesterLabel');
            label.textContent = `${semesterText}${newIndex}:`;
        }
        
        // data-semester-id도 업데이트
        item.setAttribute('data-semester-id', newIndex);
        
        // 삭제 버튼의 data-semester-id도 업데이트
        const removeBtn = item.querySelector('.semester-item-remove');
        if (removeBtn) {
            removeBtn.setAttribute('data-semester-id', newIndex);
        }
        
        newIndex++;
    });
    
    // 전체 학기 개수 업데이트
    semesterPlanCount = newIndex - 1;
}

// 학기별 계획 삭제 이벤트 핸들러 (이벤트 전파 방지)
function handleRemoveSemesterPlan(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const semesterId = event.target.getAttribute('data-semester-id');
    if (semesterId) {
        removeSemesterPlan(parseInt(semesterId));
    }
}

// 학기별 계획 초기화
function clearSemesterPlans() {
    const semesterList = document.getElementById('semester-plan-list');
    semesterList.innerHTML = '';
    semesterPlanCount = 0;
    updateSemesterPlanSummary();
}

// 학기별 계획 요약 업데이트
function updateSemesterPlanSummary() {
    const plannedCredits = getPlannedCredits();
    const totalCredits = parseInt(document.getElementById('total-remaining-credits').value) || 0;
    
    document.getElementById('planned-credits').textContent = plannedCredits;
    document.getElementById('total-credits').textContent = totalCredits;
    
    // 학점 초과 경고
    const planSection = document.getElementById('semester-plan-section');
    const summary = document.querySelector('.semester-plan-summary');
    
    if (plannedCredits > totalCredits) {
        planSection.classList.add('warning');
        summary.classList.add('warning');
    } else {
        planSection.classList.remove('warning');
        summary.classList.remove('warning');
    }
    
    // 학기 추가 버튼 활성화/비활성화
    const addBtn = document.getElementById('add-semester-btn');
    if (addBtn) {
        addBtn.disabled = plannedCredits >= totalCredits;
    }
}

// 계획된 학점 계산
function getPlannedCredits() {
    const creditInputs = document.querySelectorAll('.semester-credits');
    let total = 0;
    
    creditInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        total += value;
    });
    
    return total;
}

// 학기별 계획 데이터 가져오기
function getSemesterPlans() {
    const plans = [];
    const semesterItems = document.querySelectorAll('.semester-item');
    
    semesterItems.forEach(item => {
        const credits = parseInt(item.querySelector('.semester-credits').value) || 0;
        const gpa = parseFloat(item.querySelector('.semester-gpa').value) || 0;
        
        if (credits > 0) {
            plans.push({
                credits: credits,
                gpa: gpa
            });
        }
    });
    
    return plans;
}

// 수정된 목표 평점 계산 함수
function calculateRequiredGpa() {
    const targetGpa = parseFloat(document.getElementById('target-gpa-input').value);
    const totalRemainingCredits = parseInt(document.getElementById('total-remaining-credits').value);
    const currentCredit = parseFloat(document.getElementById('current-credit').textContent);
    const currentGpa = parseFloat(document.getElementById('overall-gpa').textContent);
    
    const resultElement = document.getElementById('required-gpa-result');
    
    // 유효성 검사
    if (isNaN(targetGpa) || isNaN(totalRemainingCredits) || isNaN(currentCredit) || isNaN(currentGpa)) {
        resultElement.textContent = '-';
        resultElement.className = 'gpa-goal-result';
        return;
    }
    
    if (targetGpa < 0 || targetGpa > 4.5) {
        showGpaGoalError('목표 평점은 0.0 ~ 4.5 사이여야 합니다.');
        return;
    }
    
    if (totalRemainingCredits <= 0 || totalRemainingCredits > 200) {
        showGpaGoalError('총 남은 학점은 1 ~ 200 사이여야 합니다.');
        return;
    }
    
    // 학기별 계획이 있는지 확인
    const semesterPlans = getSemesterPlans();
    
    if (semesterPlans.length > 0) {
        // 학기별 계획이 있는 경우
        const plannedCredits = semesterPlans.reduce((sum, plan) => sum + plan.credits, 0);
        const plannedGradePoints = semesterPlans.reduce((sum, plan) => {
            return sum + (plan.gpa * plan.credits);
        }, 0);
        
        const remainingCredits = totalRemainingCredits - plannedCredits;
        
        if (remainingCredits <= 0) {
            showGpaGoalError('계획된 학점이 총 남은 학점을 초과했습니다.');
            return;
        }
        
        const requiredGpa = ((targetGpa * (currentCredit + totalRemainingCredits)) - 
                            (currentGpa * currentCredit) - plannedGradePoints) / remainingCredits;
        
        // 결과 표시
        const requiredGpaFormatted = requiredGpa.toFixed(2);
        resultElement.textContent = requiredGpaFormatted;
        resultElement.className = 'gpa-goal-result calculated';
        
        // 결과에 따른 스타일 적용
        if (requiredGpa <= 4.5 && requiredGpa >= 0) {
            resultElement.classList.add('success');
            resultElement.classList.remove('error');
        } else {
            resultElement.classList.add('error');
            resultElement.classList.remove('success');
        }
    } else {
        // 기존 계산 방식 (학기별 계획 없음)
        const requiredGpa = ((targetGpa * (currentCredit + totalRemainingCredits)) - 
                            (currentGpa * currentCredit)) / totalRemainingCredits;
        
        // 결과 표시
        const requiredGpaFormatted = requiredGpa.toFixed(2);
        resultElement.textContent = requiredGpaFormatted;
        resultElement.className = 'gpa-goal-result calculated';
        
        // 결과에 따른 스타일 적용
        if (requiredGpa <= 4.5 && requiredGpa >= 0) {
            resultElement.classList.add('success');
            resultElement.classList.remove('error');
        } else {
            resultElement.classList.add('error');
            resultElement.classList.remove('success');
        }
    }
    
    // 에러 메시지 숨김
    hideGpaGoalError();
    
    // 반영 평점도 함께 계산
    calculateReflectedGpa();
}

// 목표 평점 계산 데이터 저장
function saveGpaGoalData() {
    const targetGpa = document.getElementById('target-gpa-input').value;
    const totalRemainingCredits = document.getElementById('total-remaining-credits').value;
    const semesterPlans = getSemesterPlans();
    const isSemesterPlanActive = document.getElementById('semester-plan-section').style.display !== 'none';
    
    const gpaGoalData = {
        targetGpa: targetGpa,
        totalRemainingCredits: totalRemainingCredits,
        semesterPlans: semesterPlans,
        isSemesterPlanActive: isSemesterPlanActive,
        timestamp: Date.now()
    };
    
    saveToLocalStorage('gpaGoalData', gpaGoalData);
    
    // 저장 버튼 상태 업데이트
    updateSaveButtonState(true);
    
    // 저장 완료 메시지 (선택사항)
    console.log('목표 평점 계산 데이터가 저장되었습니다.');
    
    // 저장 상태 업데이트
    isGpaGoalDataSaved = true;
}

// 목표 평점 계산 데이터 불러오기
function loadGpaGoalData() {
    const gpaGoalData = loadFromLocalStorage('gpaGoalData');
    
    if (gpaGoalData && gpaGoalData.timestamp) {
        // 데이터가 30일 이내인지 확인 (선택사항)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        if (gpaGoalData.timestamp < thirtyDaysAgo) {
            // 30일이 지난 데이터는 삭제
            removeFromLocalStorage('gpaGoalData');
            return false;
        }
        
        // 기본 입력 필드 복원
        if (gpaGoalData.targetGpa) {
            document.getElementById('target-gpa-input').value = gpaGoalData.targetGpa;
        }
        
        if (gpaGoalData.totalRemainingCredits) {
            document.getElementById('total-remaining-credits').value = gpaGoalData.totalRemainingCredits;
        }
        
        // 학기별 계획 복원
        if (gpaGoalData.isSemesterPlanActive) {
            // 학기별 계획 활성화
            const toggleBtn = document.getElementById('toggle-semester-plan');
            if (toggleBtn && !isSemesterPlanActive) {
                toggleSemesterPlan();
            }
            
            // 저장된 학기별 계획 복원
            if (gpaGoalData.semesterPlans && gpaGoalData.semesterPlans.length > 0) {
                restoreSemesterPlans(gpaGoalData.semesterPlans);
            }
        }
        
            // 계산 실행
        calculateRequiredGpa();
        calculateReflectedGpa();
        updateSemesterPlanSummary();
        
        // 저장된 데이터가 있으면 저장 상태를 true로 설정
        isGpaGoalDataSaved = true;
        
        return true;
    }
    
    return false;
}

// 학기별 계획 복원
function restoreSemesterPlans(plans) {
    // 기존 학기들 제거
    clearSemesterPlans();
    
    // 저장된 계획들 복원
    plans.forEach((plan, index) => {
        addSemesterPlan();
        
        const semesterItem = document.querySelector(`[data-semester-id="${index + 1}"]`);
        if (semesterItem) {
            const creditInput = semesterItem.querySelector('.semester-credits');
            const gpaInput = semesterItem.querySelector('.semester-gpa');
            
            if (creditInput) creditInput.value = plan.credits;
            if (gpaInput) gpaInput.value = plan.gpa;
        }
    });
}

// 저장 버튼 상태 업데이트
function updateSaveButtonState(isSaved = false) {
    const saveBtn = document.getElementById('gpa-goal-save-btn');
    if (saveBtn) {
        if (isSaved) {
            saveBtn.textContent = getText('savedGpaGoal');
            saveBtn.classList.add('saved');
            saveBtn.disabled = true;
            
            // 3초 후 원래 상태로 복원
            setTimeout(() => {
                saveBtn.textContent = getText('saveGpaGoal');
                saveBtn.classList.remove('saved');
                saveBtn.disabled = false;
            }, 3000);
        } else {
            saveBtn.textContent = getText('saveGpaGoal');
            saveBtn.classList.remove('saved');
            saveBtn.disabled = false;
        }
    }
}

// 저장된 데이터가 있는지 확인
function hasSavedGpaGoalData() {
    const gpaGoalData = loadFromLocalStorage('gpaGoalData');
    return gpaGoalData && gpaGoalData.timestamp;
}

// 반영 평점 계산
function calculateReflectedGpa() {
    const currentCredit = parseFloat(document.getElementById('current-credit').textContent);
    const currentGpa = parseFloat(document.getElementById('overall-gpa').textContent);
    const semesterPlans = getSemesterPlans();
    
    const resultElement = document.getElementById('reflected-gpa-result');
    
    // 유효성 검사
    if (isNaN(currentCredit) || isNaN(currentGpa)) {
        resultElement.textContent = '-';
        resultElement.className = 'gpa-goal-result';
        return;
    }
    
    if (semesterPlans.length === 0) {
        // 학기별 계획이 없으면 현재 평점 표시
        resultElement.textContent = currentGpa.toFixed(2);
        resultElement.className = 'gpa-goal-result calculated';
        return;
    }
    
    // 학기별 계획이 있는 경우 반영 평점 계산
    const plannedCredits = semesterPlans.reduce((sum, plan) => sum + plan.credits, 0);
    const plannedGradePoints = semesterPlans.reduce((sum, plan) => {
        return sum + (plan.gpa * plan.credits);
    }, 0);
    
    // 현재 총 평점 계산
    const currentTotalGradePoints = currentGpa * currentCredit;
    
    // 반영 평점 계산: (현재 총 평점 + 계획된 평점) / (현재 총학점 + 계획된 학점)
    const totalCredits = currentCredit + plannedCredits;
    const totalGradePoints = currentTotalGradePoints + plannedGradePoints;
    
    if (totalCredits > 0) {
        const reflectedGpa = totalGradePoints / totalCredits;
        const reflectedGpaFormatted = reflectedGpa.toFixed(2);
        
        resultElement.textContent = reflectedGpaFormatted;
        resultElement.className = 'gpa-goal-result calculated';
        
        // 결과에 따른 스타일 적용
        if (reflectedGpa <= 4.5 && reflectedGpa >= 0) {
            resultElement.classList.add('success');
            resultElement.classList.remove('error');
        } else {
            resultElement.classList.add('error');
            resultElement.classList.remove('success');
        }
    } else {
        resultElement.textContent = '-';
        resultElement.className = 'gpa-goal-result';
    }
}

let isDraggingGpaPopup = false;
let isDraggingRetakePopup = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

function centerGpaGoalPopup() {
    const popup = document.getElementById('gpa-goal-popup');
    if (!popup) return;
    // CSS와 동일한 위치 설정
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '35%';
    popup.style.transform = 'translate(-50%, -50%)';
}

function enableGpaGoalPopupDrag() {
    const popup = document.getElementById('gpa-goal-popup');
    const headerEl = document.querySelector('#gpa-goal-popup .gpa-goal-popup-header') || document.querySelector('.gpa-goal-popup-header');
    if (!popup || !headerEl) return;

    if (headerEl.dataset.dragEnabled === 'true') {
        return; // 이미 드래그 리스너가 연결됨
    }

    const onMouseDown = (e) => {
        isDraggingGpaPopup = true;
        const rect = popup.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        popup.style.position = 'fixed';
        popup.style.transform = 'none';
        popup.style.left = `${rect.left}px`;
        popup.style.top = `${rect.top}px`;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (!isDraggingGpaPopup) return;
        const newLeft = e.clientX - dragOffsetX;
        const newTop = e.clientY - dragOffsetY;
        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
        isDraggingGpaPopup = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    headerEl.addEventListener('mousedown', onMouseDown);
    headerEl.dataset.dragEnabled = 'true';
}

//#region --- 재수강 계산기 기능 ---

// 재수강 후보자 목록을 전역 변수로 관리
let currentRetakeCandidates = [];

// 재수강 대상 과목 찾기 (C+ 이하)
function getRetakeCandidates() {
    // 이미 로드된 후보자가 있다면 반환
    if (currentRetakeCandidates.length > 0) {
        return currentRetakeCandidates;
    }
    
    const retakeCandidates = [];
    
    // 모든 덱에서 과목들을 수집
    Object.keys(decks).forEach(deckKey => {
        const deck = decks[deckKey];
        Object.keys(deck.years).forEach(yearKey => {
            const year = deck.years[yearKey];
            Object.keys(year).forEach(semesterKey => {
                const semester = year[semesterKey];
                // semester는 배열이므로 forEach로 순회
                if (Array.isArray(semester)) {
                    semester.forEach((course, courseIndex) => {
                        if (course.grade && course.credit) {
                            const gradePoint = gradeSystem[course.grade];
                            // C+ 이하 (2.5 이하)인 과목만 재수강 대상으로 분류
                            if (gradePoint !== undefined && gradePoint <= 2.5) {
                                // 디버깅: 덱 데이터 구조 확인
                                console.log('덱 과목 데이터:', course);
                                
                                // 과목명 가져오기
                                let courseName = course.name || `과목${courseIndex + 1}`;
                                if (course.code && courses[course.code]) {
                                    courseName = getCourseName(course.code);
                                }
                                
                                console.log('최종 과목명:', courseName);
                                
                                retakeCandidates.push({
                                    deck: deckKey,
                                    year: yearKey,
                                    semester: semesterKey,
                                    courseIndex: courseIndex,
                                    courseName: courseName,
                                    courseCode: course.code || '',
                                    credit: course.credit,
                                    currentGrade: course.grade,
                                    currentGradePoint: gradePoint,
                                    targetGrade: course.grade, // 기본값은 현재 성적
                                    targetGradePoint: gradePoint // 기본값은 현재 평점
                                });
                            }
                        }
                    });
                }
            });
        });
    });
    
    // 전역 변수에 저장
    currentRetakeCandidates = retakeCandidates;
    return retakeCandidates;
}

// 재수강 팝업 표시
function showRetakeCoursesPopup() {
    const popup = document.getElementById('retake-courses-popup');
    if (popup) {
        popup.style.display = 'block';
        updateRetakeCoursesList();
        centerRetakeCoursesPopup();
        enableRetakeCoursesPopupDrag();
    }
}

// 재수강 팝업 숨김
function closeRetakeCoursesPopup() {
    const popup = document.getElementById('retake-courses-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// 재수강 팝업 위치 설정
function centerRetakeCoursesPopup() {
    const popup = document.getElementById('retake-courses-popup');
    if (!popup) return;
    
    popup.style.position = 'fixed';
    popup.style.top = '20%';
    popup.style.left = '75%';
    popup.style.transform = 'translateX(-50%)';
}

// 재수강 팝업 드래그 기능 활성화
function enableRetakeCoursesPopupDrag() {
    const popup = document.getElementById('retake-courses-popup');
    const headerEl = popup.querySelector('.retake-courses-popup-header');
    if (!popup || !headerEl) return;

    if (headerEl.dataset.dragEnabled === 'true') {
        return; // 이미 드래그 리스너가 연결됨
    }

    const onMouseDown = (e) => {
        isDraggingRetakePopup = true;
        const rect = popup.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        popup.style.position = 'fixed';
        popup.style.transform = 'none';
        popup.style.left = `${rect.left}px`;
        popup.style.top = `${rect.top}px`;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (!isDraggingRetakePopup) return;
        const newLeft = e.clientX - dragOffsetX;
        const newTop = e.clientY - dragOffsetY;
        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
        isDraggingRetakePopup = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    headerEl.addEventListener('mousedown', onMouseDown);
    headerEl.dataset.dragEnabled = 'true';
}

// 재수강 과목 목록 업데이트
function updateRetakeCoursesList() {
    const retakeCandidates = getRetakeCandidates();
    const listContainer = document.getElementById('retake-courses-list');
    
    if (!listContainer) return;
    
    if (retakeCandidates.length === 0) {
        listContainer.innerHTML = `
            <div class="no-retake-courses">
                <p>${getText('noRetakeCourses')}</p>
            </div>
        `;
        return;
    }
    
    // 재수강 과목 목록 생성
    let html = `
        <div class="retake-instructions">
            <p>${getText('retakeInstructions')}</p>
        </div>
        <div class="retake-courses-table">
            <div class="retake-courses-header">
                <div class="retake-course-name">${getText('retakeCourseName')}</div>
                <div class="retake-current-grade">${getText('retakeCurrentGrade')}</div>
                <div class="retake-target-grade">${getText('retakeTargetGrade')}</div>
                <div class="retake-credit">${getText('retakeCredit')}</div>
                <div class="retake-effect">${getText('retakeEffect')}</div>
            </div>
    `;
    
    retakeCandidates.forEach((course, index) => {
        let improvementText;
        let effectClass;
        
        if (course.targetGrade === 'abandon') {
            // 학점 포기인 경우
            improvementText = '제외';
            effectClass = 'abandon';
        } else {
            // 일반 재수강인 경우
            const improvement = course.targetGradePoint - course.currentGradePoint;
            improvementText = improvement > 0 ? `+${improvement.toFixed(1)}` : improvement.toFixed(1);
            effectClass = improvement > 0 ? 'positive' : 'neutral';
        }
        
        // 언어 전환 시 과목명을 다시 가져오기
        let courseName = course.courseName;
        if (course.courseCode && courses[course.courseCode]) {
            courseName = getCourseName(course.courseCode);
        }
        
        html += `
            <div class="retake-course-row" data-index="${index}">
                <div class="retake-course-name">${courseName}</div>
                <div class="retake-current-grade">${course.currentGrade} (${course.currentGradePoint})</div>
                <div class="retake-target-grade">
                    <select class="retake-grade-select" onchange="updateRetakeGrade(${index}, this.value)">
                        <option value="abandon" ${course.targetGrade === 'abandon' ? 'selected' : ''}>학점 포기</option>
                        ${Object.keys(gradeSystem).map(grade => 
                            `<option value="${grade}" ${grade === course.targetGrade ? 'selected' : ''}>${grade} (${gradeSystem[grade]})</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="retake-credit">${course.credit}</div>
                <div class="retake-effect ${effectClass}">${improvementText}</div>
            </div>
        `;
    });
    
    html += '</div>';
            listContainer.innerHTML = html;
    }

// 재수강 성적 업데이트
function updateRetakeGrade(index, newGrade) {
    if (currentRetakeCandidates[index]) {
        currentRetakeCandidates[index].targetGrade = newGrade;
        
        // 학점 포기인 경우 특별 처리
        if (newGrade === 'abandon') {
            currentRetakeCandidates[index].targetGradePoint = 'abandon';
        } else {
            currentRetakeCandidates[index].targetGradePoint = gradeSystem[newGrade];
        }
        
        // 해당 행의 개선 효과 업데이트
        const row = document.querySelector(`[data-index="${index}"]`);
        if (row) {
            const effectElement = row.querySelector('.retake-effect');
            
            if (newGrade === 'abandon') {
                // 학점 포기인 경우: 현재 평점과 학점을 모두 제거하는 효과
                effectElement.textContent = '제외';
                effectElement.className = 'retake-effect abandon';
            } else {
                const improvement = currentRetakeCandidates[index].targetGradePoint - currentRetakeCandidates[index].currentGradePoint;
                const improvementText = improvement > 0 ? `+${improvement.toFixed(1)}` : improvement.toFixed(1);
                
                effectElement.textContent = improvementText;
                effectElement.className = `retake-effect ${improvement > 0 ? 'positive' : 'neutral'}`;
            }
        }
    }
}



// 재수강 계산기 이벤트 리스너 설정
function setupRetakeCalculatorEventListeners() {
    // 재수강 과목 버튼 클릭 이벤트
    const retakeBtn = document.getElementById('retake-courses-btn');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', showRetakeCoursesPopup);
    }
    
    // 재수강 팝업 닫기 버튼 이벤트
    const closeBtn = document.getElementById('retake-courses-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeRetakeCoursesPopup);
    }
    
    // 재수강 팝업 외부 클릭 시 닫기
    const popup = document.getElementById('retake-courses-popup');
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closeRetakeCoursesPopup();
            }
        });
    }
    
    // 재수강 저장 버튼 이벤트
    const saveBtn = document.getElementById('retake-save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveRetakeChanges);
    }
}

// 재수강 변경 사항 초기화
function resetRetakeChanges() {
    // 재수강 팝업이 열려있다면 닫기
    const retakePopup = document.getElementById('retake-courses-popup');
    if (retakePopup && retakePopup.style.display !== 'none') {
        closeRetakeCoursesPopup();
    }
    
    // 재수강 변경 사항 localStorage에서 제거
    localStorage.removeItem('retakeChanges');
    
    // 전역 변수 초기화
    currentRetakeCandidates = [];
    
    // 목표 평점 팝업의 반영 평점을 원래 값으로 복원
    updateGpaGoalDisplay();
}

// 목표 평점 팝업의 반영 평점을 현재 GPA로 복원
function updateGpaGoalDisplay() {
    const reflectedGpaElement = document.getElementById('reflected-gpa-result');
    if (reflectedGpaElement) {
        const currentGpaElement = document.getElementById('overall-gpa');
        if (currentGpaElement) {
            const currentGpa = currentGpaElement.textContent;
            reflectedGpaElement.textContent = currentGpa;
            reflectedGpaElement.className = 'gpa-goal-result';
        }
    }
    
    // 필요 평점도 초기화
    const requiredGpaElement = document.getElementById('required-gpa-result');
    if (requiredGpaElement) {
        requiredGpaElement.textContent = '-';
        requiredGpaElement.className = 'gpa-goal-result';
    }
}

//#endregion

// 재수강 변경사항 저장
function saveRetakeChanges() {
    console.log('재수강 후보자 목록:', currentRetakeCandidates);
    
    // 모든 재수강 후보자 정보를 저장 (변경사항 여부와 관계없이)
    const retakeData = {
        timestamp: Date.now(),
        changes: currentRetakeCandidates.map(course => ({
            deck: course.deck,
            year: course.year,
            semester: course.semester,
            courseIndex: course.courseIndex,
            courseCode: course.code || '',
            currentGrade: course.currentGrade,
            targetGrade: course.targetGrade,
            credit: course.credit
        }))
    };
    
    localStorage.setItem('retakeChanges', JSON.stringify(retakeData));
    
    // 목표평점계산기의 반영평점 업데이트
    updateGpaGoalWithRetakeChanges();
    
    // 성공 메시지 표시
    alert(getText('retakeChangesSaved'));
    
    // 재수강 팝업은 닫지 않음 (사용자가 직접 닫을 수 있도록)
}

// 목표평점계산기에 재수강 변경사항 반영
function updateGpaGoalWithRetakeChanges() {
    const retakeData = localStorage.getItem('retakeChanges');
    if (!retakeData) return;
    
    try {
        const data = JSON.parse(retakeData);
        const changes = data.changes;
        
        if (changes.length === 0) return;
        
        // 현재 평점과 학점 가져오기
        const currentGpaElement = document.getElementById('overall-gpa');
        const currentCreditElement = document.getElementById('current-credit');
        
        if (!currentGpaElement || !currentCreditElement) return;
        
        const currentGpa = parseFloat(currentGpaElement.textContent);
        const currentCredit = parseFloat(currentCreditElement.textContent);
        
        if (isNaN(currentGpa) || isNaN(currentCredit)) return;
        
        // 재수강 변경사항을 반영한 평점 계산
        let totalGradePoints = currentGpa * currentCredit;
        let adjustedTotalCredit = currentCredit;
        
        changes.forEach(change => {
            if (change.targetGrade === 'abandon') {
                // 학점 포기인 경우: 해당 과목의 학점과 평점을 완전히 제거
                const currentGradePoint = gradeSystem[change.currentGrade];
                const removedGradePoints = currentGradePoint * change.credit;
                totalGradePoints -= removedGradePoints;
                adjustedTotalCredit -= change.credit;
            } else {
                // 일반 재수강인 경우: 평점만 변경
                const currentGradePoint = gradeSystem[change.currentGrade];
                const targetGradePoint = gradeSystem[change.targetGrade];
                const gradePointDifference = targetGradePoint - currentGradePoint;
                
                if (gradePointDifference !== 0) {
                    totalGradePoints += gradePointDifference * change.credit;
                }
            }
        });
        
        const adjustedGpa = adjustedTotalCredit > 0 ? totalGradePoints / adjustedTotalCredit : 0;
        
        // 목표평점계산기 팝업이 열려있다면 반영평점과 필요평점 업데이트
        const gpaGoalPopup = document.getElementById('gpa-goal-popup');
        if (gpaGoalPopup && gpaGoalPopup.style.display !== 'none') {
            // 반영평점 업데이트
            const reflectedGpaElement = document.getElementById('reflected-gpa-result');
            if (reflectedGpaElement) {
                reflectedGpaElement.textContent = adjustedGpa.toFixed(2);
                reflectedGpaElement.className = 'gpa-goal-result calculated success';
            }
            
            // 필요평점 재계산
            const targetGpaInput = document.getElementById('target-gpa-input');
            const totalRemainingCreditsInput = document.getElementById('total-remaining-credits');
            
            if (targetGpaInput && totalRemainingCreditsInput) {
                const targetGpa = parseFloat(targetGpaInput.value);
                const remainingCredits = parseInt(totalRemainingCreditsInput.value);
                
                if (!isNaN(targetGpa) && !isNaN(remainingCredits)) {
                    // 필요평점 계산: (목표 총 평점 × (조정된 총학점 + 남은 학점) - 조정된 총 평점 × 조정된 총학점) ÷ 남은 학점
                    const totalCredits = adjustedTotalCredit + remainingCredits;
                    const requiredGpa = ((targetGpa * totalCredits) - (adjustedGpa * adjustedTotalCredit)) / remainingCredits;
                    
                    const requiredGpaElement = document.getElementById('required-gpa-result');
                    if (requiredGpaElement) {
                        const requiredGpaFormatted = requiredGpa.toFixed(2);
                        requiredGpaElement.textContent = requiredGpaFormatted;
                        requiredGpaElement.className = 'gpa-goal-result calculated';
                        
                        // 결과에 따른 스타일 적용
                        if (requiredGpa <= 4.5 && requiredGpa >= 0) {
                            requiredGpaElement.classList.add('success');
                            requiredGpaElement.classList.remove('error');
                        } else {
                            requiredGpaElement.classList.add('error');
                            requiredGpaElement.classList.remove('success');
                        }
                    }
                }
            }
        }
        
        console.log('재수강 변경사항이 목표평점계산기에 반영되었습니다:', {
            originalGPA: currentGpa,
            adjustedGPA: adjustedGpa,
            changes: changes
        });
        
    } catch (error) {
        console.error('재수강 변경사항 반영 중 오류:', error);
    }
}