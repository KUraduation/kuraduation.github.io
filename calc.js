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
        "courseNamePlaceholder": "강의명 또는 학수번호 입력",
        "courseNameExample": "예: 학문세계의탐구I",
        "courseCodeExample": "예: GELI005",
        "creditExample": "예: 3",

        // 직접 추가 폼
        "courseName": "과목명:",
        "courseCode": "학수번호:",
        "credit": "학점:",
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
        "copyTitle": "현재 덱 복사",
        "pasteTitle": "복사된 덱 붙여넣기",
        "resetTitle": "현재 덱 초기화",
        "undoTitle": "실행 취소",
        "redoTitle": "다시 실행",
        "helpTitle": "도움말",

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
        "helpContact": "• 문의사항은 여기로 —> <a href=\"mailto:lemonplugin@gmail.com\" target=\"_blank\">lemonplugin@gmail.com</a>",
        "helpClose": "닫기",
        
        // 목표 평점 계산
        "gpaGoalCalc": "목표 평점 계산",
        "gpaGoalCalculator": "목표 평점 계산",
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
      
        // 기타
        "noData": "N/A",

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
        "year8": "8학년"
    },
    en: {
        // Search related
        "searchCriteria": "Year",
        "departmentSearch": "Department",
        "courseNameSearch": "Course",
        "customAdd": "Custom",
        "search": "Search",
        "courseNamePlaceholder": "Course name or code",
        "courseNameExample": "e.g. EXPLORATION OF THE ACADEMIC WORLD I",
        "courseCodeExample": "e.g. GELI005",
        "creditExample": "e.g. 3",

        // Custom add form
        "courseName": "Name:",
        "courseCode": "Code:",
        "credit": "Credit:",
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
        "copyTitle": "Copy current deck",
        "pasteTitle": "Paste copied deck",
        "resetTitle": "Reset current deck",
        "undoTitle": "Undo",
        "redoTitle": "Redo",
        "helpTitle": "Help",

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
        "helpContact": "• For inquiries —> <a href=\"mailto:lemonplugin@gmail.com\" target=\"_blank\">lemonplugin@gmail.com</a>",
        "helpClose": "Close",
      
        // GPA Goal Calculator
        "gpaGoalCalc": "GPA Goal Calculator",
        "gpaGoalCalculator": "GPA Goal Calculator",
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
        
        // 기타
        "noData": "N/A",

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
        "year8": "8th"
    }
};

// 언어 전환 함수 (3단계에서 업데이트)
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateAllTexts(); // 모든 텍스트 업데이트
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

    // 특수한 요소들 업데이트
    updateSpecialElements();

    // 언어 전환 버튼 상태 업데이트
    updateLanguageButtons();

    // semester header 번역 업데이트
    updateYearStats();

    // semester cell 번역 업데이트
    updateSemesterCells();

    // 검색 결과 새로고침
    refreshSearchResults();
    
    // 목표 평점 계산 텍스트 업데이트
    updateGpaGoalTexts();
}

function updatePlaceholders() {
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

function updateSpecialElements() {
    // N/A 텍스트 업데이트
    const overallGpa = document.getElementById('overall-gpa');
    const majorGpa = document.getElementById('major-gpa');

    if (overallGpa && overallGpa.textContent === 'N/A') {
        overallGpa.textContent = getText('noData');
    }
    if (majorGpa && majorGpa.textContent === 'N/A') {
        majorGpa.textContent = getText('noData');
    }

    // 덱 탭 텍스트 업데이트
    updateDeckTabTexts();

    // 전공별 평점 표시 업데이트
    updateMajorGPADisplay();

    // 전공 드롭다운 업데이트
    updateMajorDropdowns();

    // 학과 선택 드롭다운 업데이트
    updateDeptSelects();

    // 학기 관련 업데이트
    updateSemesterElements();
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

// 전공 드롭다운 업데이트
function updateMajorDropdowns() {
    // majorDiv-select 업데이트
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

    // 전공별 라벨 업데이트
    const majorLabels = document.querySelectorAll('.dept-select-container > div:first-child > div:first-child');
    majorLabels.forEach((label) => {
        const majorDiv = label.closest('.dept-select-container').dataset.majorDiv;
        if (majorDiv && majorDiv >= 0 && majorDiv < getMajorDivs().length) {
            label.textContent = getMajorDivs()[parseInt(majorDiv)];
        }
    });
}

// 학과 선택 드롭다운 업데이트
function updateDeptSelects() {
    // 모든 학과 선택 드롭다운 업데이트
    const deptSelects = document.querySelectorAll('.dept-select');
    deptSelects.forEach(select => {
        const year = select.closest('.dept-select-container').querySelector('.year-select').value;
        const majorDiv = select.closest('.dept-select-container').dataset.majorDiv;
        const selectedDeptCd = select.value; // 현재 선택된 학과 코드

        updateDeptSelectList(select, year, majorDiv, selectedDeptCd);
    });
}
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

// 학기 관련 요소 업데이트
function updateSemesterElements() {
    // 학년명 업데이트 (서수 사용)
    const yearTitles = document.querySelectorAll('.year-title');
    yearTitles.forEach(title => {
        const yearMatch = title.textContent.match(/^(\d+)/);
        if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            const yearKey = `year${year}`;
            if (translations[currentLanguage][yearKey]) {
                title.textContent = getText(yearKey);
            } else {
                // 8학년 이상인 경우 n'th 형태로 생성
                title.textContent = `${year}${getText('yearSuffix')}`;
            }
        }
    });

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

    // 학년 편집/삭제 버튼 title 업데이트
    const yearEditTitles = document.querySelectorAll('.year-title[style*="cursor: pointer"]');
    yearEditTitles.forEach(title => {
        title.title = getText('yearEditTitle');
    });

    const yearRemoveBtns = document.querySelectorAll('.remove-year-btn');
    yearRemoveBtns.forEach(btn => {
        btn.title = getText('yearRemoveTitle');
    });

    // 년도 선택 드롭다운 업데이트
    const yearSelects = document.querySelectorAll('.year-select option');
    yearSelects.forEach(option => {
        const yearMatch = option.textContent.match(/^(\d+)/);
        if (yearMatch) {
            const year = yearMatch[1];
            option.textContent = year;
        }
    });

    // 기준년도 라벨 업데이트
    const yearLabels = document.querySelectorAll('.dept-select-container span');
    yearLabels.forEach(label => {
        // 기존 조건을 더 포괄적으로 변경
        if (label.textContent === '기준년도' || label.textContent === 'Criteria') {
            label.textContent = getText('yearLabel');
        }
    });
}

// semester cell 번역 업데이트
function updateSemesterCells() {
    document.querySelectorAll('.semester-cell').forEach(cell => {
        updateCellCredit(cell);
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
        loadDeckGraduationRequirements(deckId); // 졸업요건도 초기화
        updateChart(); // UI 업데이트와 저장을 한 번에
        refreshSearchResults(); // 검색 결과도 초기화
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

// 덱 전환 함수
function switchDeck(deckId) {
    if (!decks[deckId]) return;

    // 현재 덱의 졸업요건 정보 저장
    saveCurrentDeck();

    currentDeck = deckId;
    updateDeckTabs();
    loadDeck(deckId);

    // 새 덱의 졸업요건 로드
    loadDeckGraduationRequirements(deckId);

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
    updateChart({ save: false }); // 히스토리 복원 시에는 저장하지 않음
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
function showCoursePopup(courseElement, event) {
    // 기존 팝업이 있으면 제거
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
    }

    const courseCode = courseElement.dataset.courseCode;
    const courseName = courseElement.dataset.courseName;
    const credit = courseElement.dataset.credit;
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
    info.innerHTML = `<div><strong>학점:</strong> ${credit}학점</div>`;
    popup.appendChild(info);

    // 평점 선택 영역
    const gradeSection = document.createElement('div');
    gradeSection.className = 'course-popup-grade';
    gradeSection.innerHTML = '<div><strong>평점:</strong></div>';

    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'grade-select';
    gradeSelect.style.width = '100%';
    gradeSelect.style.padding = '4px';
    gradeSelect.style.marginTop = '4px';

    // 기본 옵션 (평점 미입력)
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '평점 선택';
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
    majorSection.innerHTML = '<div><strong>전공 과목:</strong></div>';

    const majorCheckbox = document.createElement('input');
    majorCheckbox.type = 'checkbox';
    majorCheckbox.id = 'major-checkbox';

    // 전공 여부 판단 (자동 판단 결과를 우선하고, 수동 설정도 유지)
    let isMajor = isMajorCourse(courseElement);

    majorCheckbox.checked = isMajor;
    majorCheckbox.style.marginTop = '4px';
    majorCheckbox.style.marginRight = '8px';

    const majorLabel = document.createElement('label');
    majorLabel.htmlFor = 'major-checkbox';
    majorLabel.textContent = '이 과목을 전공 평점 계산에 포함';
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
    saveBtn.textContent = '저장';
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
        courseElement.title = `${courseName} (${credit}학점)${gradeText}`;
        updateChart(); // UI 업데이트와 저장을 한 번에
        closeCoursePopup();
        saveToHistory();
    });
    buttons.appendChild(saveBtn);

    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'course-popup-delete-btn';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
        if (confirm(`"${courseName}" 과목을 삭제하시겠습니까?`)) {
            deleteCourse(courseElement);
        }
    });
    buttons.appendChild(deleteBtn);

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.className = 'course-popup-close-btn';
    closeBtn.textContent = '닫기';
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

//#region --- 검색 알고리즘 ---

// 이미 수강한 과목인지 확인하는 함수
function isCourseAlreadyTaken(courseCode) {
    const takenCourses = getTakenCourses();
    return takenCourses.some(course => isEqualCourse(course.dataset.courseCode, courseCode));
}

// 검색된 강의 셀을 생성하는 함수(code만 주면 courses에서 찾아 넣기)
function createSearchResultCourse(code, name = undefined, credit = undefined) {
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
    const courseItem = createSearchResultCourse(code, name, credit);

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
            const courseData = {
                code: selectedCourse.dataset.courseCode,
                name: selectedCourse.dataset.courseName,
                credit: selectedCourse.dataset.credit,
                isTakenCourse: false
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
    const takenCourse = document.createElement('div');
    takenCourse.className = 'taken-course';
    takenCourse.textContent = courseData.name;
    takenCourse.dataset.courseCode = courseData.code;
    takenCourse.dataset.courseName = courseData.name;
    takenCourse.dataset.credit = courseData.credit;
    takenCourse.dataset.grade = courseData.grade || ''; // 평점 정보 추가
    // 전공 여부 기본값은 undefined
    takenCourse.dataset.isMajor = courseData.isMajor;

    // 제목에 평점 정보도 포함
    const gradeText = courseData.grade ? ` (${courseData.grade})` : '';
    takenCourse.title = `${courseData.name} (${courseData.credit}학점)${gradeText}`;

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

    takenCourse.addEventListener('click', (e) => {
        // 드래그 중이면 클릭 이벤트 무시
        if (draggedCourse === takenCourse || !clickTimeout) {
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
            
            // 목표 평점 계산 버튼
            if (e.target.id === 'gpa-goal-btn') {
                e.preventDefault();
                showGpaGoalPopup();
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
                        menu.remove();
                        menu = null;
                        createDeptDropdown(idx);
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

                setTimeout(() => {
                    document.addEventListener('click', closeMenu);
                }, 0);
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
          
            // 메뉴 외부 클릭 시 메뉴 닫기
            if (menu && !menu.contains(e.target) && e.target.id !== 'major-add-btn') {
                menu.remove();
                menu = null;
                document.removeEventListener('click', closeMenu);
                return;
            }
        });

        // 메뉴 닫기 함수
        function closeMenu() {
            if (menu) {
                menu.remove();
                menu = null;
            }
            document.removeEventListener('click', closeMenu);
        }

        // 전역 키보드 이벤트 위임
        document.addEventListener('keydown', function (e) {
            // Ctrl+Z (실행 취소)
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                undo();
                return;
            }

            // Ctrl+Y (다시 실행)
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                redo();
                return;
            }

            // ESC 키 (팝업 닫기)
            if (e.key === 'Escape') {
                closeCoursePopup();
                closeHelpPopup();
                closeGpaGoalPopup();
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
        });
    }

    // 이벤트 위임 시스템 초기화
    setupEventDelegation();
    
    // 목표 평점 계산 이벤트 리스너 설정
    setupGpaGoalEventListeners();

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
    const minCredit = parseFloat(groupContainer.dataset.minCredit);
    const maxCredit = parseFloat(groupContainer.dataset.maxCredit);
    let currentCredit = parseFloat(groupContainer.dataset.currentCredit);
    currentCredit = maxCredit > 0 ? Math.min(maxCredit, currentCredit) : currentCredit;

    // 최소학점이 양수가 아니면 최대학점 기준으로 진행률 체크
    const stdCredit = minCredit > 0 ? minCredit : maxCredit > 0 ? maxCredit : 0;

    const progress = (stdCredit > 0) ? (currentCredit / stdCredit * 100).toFixed(0) : 0;
    const groupProgress = groupContainer.querySelector('.group-progress');

    groupProgress.textContent = `${Number.isInteger(currentCredit) ? currentCredit.toString() : currentCredit.toFixed(1)}/${Number.isInteger(stdCredit) ? stdCredit.toString() : stdCredit.toFixed(1)} (${progress}%)`;

    const progressPercent = Math.min(100, parseFloat(progress));

    // 둥근 모서리를 위한 배경 설정
    if (progressPercent > 0) {
        groupProgress.style.background = `linear-gradient(to right, #dc143c ${progressPercent}%, rgba(220, 20, 60, 0.15) ${progressPercent}%)`;
        groupProgress.style.border = '1px solid rgba(220, 20, 60, 0.3)';
    } else {
        groupProgress.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        groupProgress.style.border = '1px solid #dee2e6';
    }

    if (progressPercent >= 100) {
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
        displayText += ` (${getText('average')}: ${gpa})`;
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
            if (course.dataset.isMajor !== 'true') return;
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
        gpaElement.textContent = `${getText('majorGpaDisplay')} ${gpa}`;
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
        checkMark.textContent = '✓';
        courseElement.appendChild(checkMark);
    }
}

// 과목이 졸업요건의 전공 영역에 속하는지 확인하는 함수
function isCourseInMajorRequirements(courseCode) {

    let isMajor = false;

    document.querySelectorAll('.group-container').forEach(groupContainer => {
        const groupCourses = groupContainer._takenCourses || [];
        if (groupCourses.some(course => course.dataset.courseCode === courseCode)) {
            if (groupContainer.querySelector('.group-label').textContent.includes('전공')) {
                isMajor = true;
                return true;
            }
        }
    });

    return isMajor;
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
        overallGpaElement.textContent = overallGpa;
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
        majorGpaElement.textContent = majorGpa;
    } else {
        majorGpaElement.textContent = 'N/A';
    }

    // 각 전공별 그룹 업데이트(한 강의는 1개의 전공영역에만 적용)
    // 여기서 takenCourses를 변경하므로 아래에서 사용 시 주의
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

        const joinedCourses = []; // 중복 추가 방지
        takenCourses.forEach(takenCourse => {
            const courseCode = takenCourse.dataset.courseCode;

            const foundGroup = dept.groups.find(group => {
                // 과목코드로 매칭
                return group.courses.some(courseCd => isEqualCourse(courseCd, courseCode));
            });

            if (foundGroup) {
                // 그룹 코드 일치하는 곳에 추가
                const groupContainer = Array.from(groupContainers).find(gc =>
                    gc.dataset.groupCd === foundGroup.code
                );
                if (groupContainer) {
                    addCourese(groupContainer, takenCourse);
                    joinedCourses.push(takenCourse);
                }
            }
        });
        // 중복 방지를 위해 제거
        joinedCourses.forEach(courses => {
            takenCourses.some((takenCourse, index) => {
                if (courses === takenCourse) {
                    takenCourses.splice(index, 1);
                    return true;
                }
                return false;
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
            const isMajor = courseEl.dataset.isMajor === 'true';

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
            gpaText = gpa;
        }

        // 전공 평점 평균 계산
        let majorGpaText = 'N/A';
        if (majorGradedCredits > 0) {
            const majorGpa = (majorGradePoints / majorGradedCredits).toFixed(2);
            majorGpaText = majorGpa;
        }

        // 학점, 평점, 전공평점 업데이트 (한 줄로 표시)
        yearStatsElement.textContent = `${getText('creditHeader')}: ${Number.isInteger(totalCredits) ? totalCredits.toString() : totalCredits.toFixed(1)}, ${getText('gpaHeader')}: ${gpaText}, ${getText('majorHeader')}: ${majorGpaText}`;
    });
}

// 목표 평점 계산 기능
let gpaGoalPopup = null;

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

// 팝업 외부 클릭 시 닫기
function handleGpaGoalOutsideClick(event) {
    const popup = document.getElementById('gpa-goal-popup');
    if (popup && !popup.contains(event.target) && event.target.id !== 'gpa-goal-btn') {
        closeGpaGoalPopup();
    }
}

// 키보드 이벤트 처리 (ESC로 닫기)
function handleGpaGoalKeydown(event) {
    if (event.key === 'Escape') {
        closeGpaGoalPopup();
    }
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
    
    // 외부 클릭 이벤트
    document.addEventListener('click', handleGpaGoalOutsideClick);
    
    // 키보드 이벤트
    document.addEventListener('keydown', handleGpaGoalKeydown);
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
let dragOffsetX = 0;
let dragOffsetY = 0;

function centerGpaGoalPopup() {
    const popup = document.getElementById('gpa-goal-popup');
    if (!popup) return;
    // 초기에는 fixed 중앙 정렬 유지 (기존 CSS를 덮어씀)
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
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