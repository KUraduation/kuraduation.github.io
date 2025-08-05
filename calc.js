const majorDivs = [
    "제1전공",
    "이중전공",
    "복수전공",
    "학사편입",
    "융합전공",
    "심화전공",
    "학생설계전공"
];

// 학번별 과목을 업데이트하려면 여기다가 년도 추가하고 파일 업로드하면 됨
const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const courses = {};

// 전공 과목 자동 분류 함수
function isMajorCourse(groupNm) {
    if (!groupNm) return false;
    // 전공필수, 전공선택이 포함된 과목을 전공으로 분류
    return /전공(필수|선택)/.test(groupNm);
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
        name: "덱1",
        years: { '1': {}, '2': {}, '3': {}, '4': {} }
    },
    deck2: {
        name: "덱2",
        years: { '1': {}, '2': {}, '3': {}, '4': {} }
    },
    deck3: {
        name: "덱3",
        years: { '1': {}, '2': {}, '3': {}, '4': {} }
    }
};

// --- localStorage 관련 함수 ---
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
            deck1: { name: "덱1", years: { '1': {}, '2': {}, '3': {}, '4': {} } },
            deck2: { name: "덱2", years: { '1': {}, '2': {}, '3': {}, '4': {} } },
            deck3: { name: "덱3", years: { '1': {}, '2': {}, '3': {}, '4': {} } }
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
                    deck1: { name: "덱1", years: { '1': {}, '2': {}, '3': {}, '4': {} }, majorSelections: [] },
                    deck2: { name: "덱2", years: { '1': {}, '2': {}, '3': {}, '4': {} }, majorSelections: [] },
                    deck3: { name: "덱3", years: { '1': {}, '2': {}, '3': {}, '4': {} }, majorSelections: [] }
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
        updateAndSave(); // UI 업데이트와 저장을 한 번에
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
        updateAndSave(); // UI 업데이트와 저장을 한 번에
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
            copyPasteBtn.textContent = '붙여넣기';
            copyPasteBtn.title = '덱 붙여넣기 (복사된 덱 있음)';
            copyPasteBtn.classList.add('paste-mode');
        } else {
            copyPasteBtn.textContent = '복사';
            copyPasteBtn.title = '현재 덱 복사';
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

    updateAndSave(); // UI 업데이트와 저장을 한 번에
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
                    isMajor: course.dataset.isMajor === 'true', // 전공 여부 저장
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
        name: `덱${deckCount}`,
        years: { '1': {}, '2': {}, '3': {}, '4': {} },
        majorSelections: [] // 빈 졸업요건 설정으로 초기화
    };

    const deckTabs = document.querySelector('.deck-tabs');
    const newTab = document.createElement('button');
    newTab.className = 'deck-tab';
    newTab.dataset.deck = newDeckId;
    newTab.textContent = `덱${deckCount}`;
    newTab.addEventListener('click', () => switchDeck(newDeckId));

    const addBtn = document.getElementById('add-deck-btn');
    deckTabs.insertBefore(newTab, addBtn);

    if (deckCount >= maxDeckCount) {
        if (addBtn) addBtn.style.display = 'none';
    }
    switchDeck(newDeckId);
}

Promise.all(years.map(year =>
    fetch(`${year}.json`)
        .then(response => {
            if (!response.ok) throw new Error(`네트워크 오류: ${year}.json`);
            return response.json();
        })
        .then(data => {
            courses[year] = data;
        })
)).then(() => {
    console.log('모든 강의 데이터 로드 완료');
    window.dispatchEvent(new Event('coursesLoaded'));
}).catch(error => {
    console.error('JSON 파일 로딩 중 오류 발생:', error);
});

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
    
    // 전공 여부 판단: 기존 설정이 있으면 사용, 없으면 현재 전공 그룹과 비교
    let isMajor = courseElement.dataset.isMajor === 'true';
    if (!isMajor && courseElement.dataset.isMajor === 'false') {
        // 명시적으로 false로 설정된 경우가 아니라면, 현재 전공 그룹과 비교
        isMajor = isCourseInMajorGroups(courseElement.dataset.courseCode);
    }
    
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
            updateAndSave(); // UI 업데이트와 저장을 한 번에
            updateMajorGPADisplay(); // 전공별 평점 업데이트
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
    updateAndSave(); // UI 업데이트와 저장을 한 번에
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
    title.textContent = '📚 사용법 안내';
    popup.appendChild(title);

    // 도움말 내용
    const content = document.createElement('div');
    content.className = 'help-popup-content';
    content.innerHTML = `
        <p>• PC나 태블릿 등 가로화면 기기 사용을 권장합니다.</p>
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
        <p>• 문의사항은 여기로 —> <a href="mailto:lemonplugin@gmail.com" target="_blank">lemonplugin@gmail.com</a></p>
    `;
    popup.appendChild(content);

    // 닫기 버튼
    const closeBtn = document.createElement('button');
    closeBtn.className = 'help-popup-close-btn';
    closeBtn.textContent = '닫기';
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

    // 과목 아이템 생성 (전공 여부 자동 판단 포함)
    const courseItem = createSearchResultCourse(code, name, credit);
    
    // 전공 여부 확인 및 표시
    const isMajor = isCourseInMajorGroups(code);
    if (isMajor) {
        courseItem.classList.add('major-course');
        courseItem.title += ' (전공과목)';
    }

    content.appendChild(courseItem);
    searchResult.appendChild(content);
}

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

    const courseItem = e.target;

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

    // 선택된 모든 과목을 처리
    selectedCourses.forEach(selectedCourse => {
        let takenCourse;

        // 블록 옮기기라면
        if (selectedCourse.classList.contains('taken-course'))
            takenCourse = selectedCourse;
        // 새로 추가라면
        else {
            // 선택된 과목의 데이터 가져오기
            const courseData = {
                code: selectedCourse.dataset.courseCode,
                name: selectedCourse.dataset.courseName,
                credit: selectedCourse.dataset.credit,
                isTakenCourse: false
            };
            
            // 전공 여부 자동 판단
            courseData.isMajor = isCourseInMajorGroups(courseData.code);
            
            takenCourse = createTakenCourseElement(courseData);
        }

        // 새 과목 추가
        targetCell.appendChild(takenCourse);

        processedCourses.push({
            element: takenCourse,
            originalCell: null,
        });

    });

    // 검색 결과에서 해당 과목 표시 업데이트
    refreshSearchResults();

    // 처리된 과목이 있으면 UI 업데이트
    if (processedCourses.length > 0) {
        // 영향받은 모든 셀의 학점 업데이트
        const cellsToUpdate = new Set([targetCell]);
        processedCourses.forEach(processed => {
            if (processed.originalCell) {
                cellsToUpdate.add(processed.originalCell);
            }
        });

        cellsToUpdate.forEach(cell => updateCellCredit(cell));
        updateAndSave(); // UI 업데이트와 저장을 한 번에
        updateMajorGPADisplay(); // 전공별 평점 업데이트
    }

    // 히스토리 저장 (여러 과목 이동이므로 한 번만)
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
    
    // 전공 여부 판단 로직 개선
    let isMajor = false;
    if (courseData.isMajor !== undefined) {
        isMajor = courseData.isMajor;
    } else if (courseData.groupNm) {
        isMajor = isMajorCourse(courseData.groupNm);
    } else {
        // 현재 설정된 전공 그룹들과 비교하여 전공 과목인지 판단
        isMajor = isCourseInMajorGroups(courseData.code);
    }
    
    takenCourse.dataset.isMajor = isMajor.toString();

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

    // 기존 선택을 초기화하고 드래그된 과목만 선택
    clearCourseSelection();
    toggleCourseSelection(draggedCourse);

    // 통합된 추가/이동 로직 호출
    addSelectedCoursesToCell(targetCell);

    // 드래그오버 태그 제거
    targetCell.classList.remove('dragover');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedCourse = null;
}

const semesterNames = ["1학기", "여름", "2학기", "겨울"];

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
    yearTitle.textContent = `${year}학년`;

    // 추가 학년(5학년 이상)인 경우 클릭 편집 가능하도록 설정
    if (year > 4) {
        yearTitle.style.cursor = 'pointer';
        yearTitle.title = '클릭하여 학년명 편집';
        yearTitle.addEventListener('click', function (e) {
            e.stopPropagation();
            editYearTitle(yearTitle, year);
        });
    }

    const yearStats = document.createElement('span');
    yearStats.className = 'year-stats';
    yearStats.textContent = '학점: 0, 평점: N/A, 전공: N/A';

    yearInfo.appendChild(yearTitle);
    yearInfo.appendChild(yearStats);
    header.appendChild(yearInfo);

    if (year > 4) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-year-btn';
        removeBtn.textContent = '✕';
        removeBtn.title = '학년 삭제';
        removeBtn.addEventListener('click', () => {
            yearColumn.remove();
            delete decks[currentDeck].years[year];
            // 커스텀 학년명도 함께 삭제
            if (decks[currentDeck].customYearNames && decks[currentDeck].customYearNames[year]) {
                delete decks[currentDeck].customYearNames[year];
            }
            updateAndSave(); // UI 업데이트와 저장을 한 번에
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
        creditTotalElement.textContent = '0학점';
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
        const newText = input.value.trim() || `${year}학년`; // 빈 값이면 기본값으로 복원
        yearTitleElement.textContent = newText;
        yearTitleElement.style.display = '';
        input.remove();

        // 변경된 학년명을 localStorage에 저장
        if (!decks[currentDeck].customYearNames) {
            decks[currentDeck].customYearNames = {};
        }
        decks[currentDeck].customYearNames[year] = newText;
        saveCurrentDeck();
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

    window.addEventListener('coursesLoaded', () => {
        loadStateFromLocalStorage();
        updateDeptDatalist();
        saveToHistory(); // 초기 상태 저장
    });

    const majorDivSelect = document.getElementById('majorDiv-select');
    const searchYearSelect = document.getElementById('search-year-select');

    majorDivs.forEach((majorDiv, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = majorDiv;
        majorDivSelect.appendChild(option);
    });

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}년`;
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
        if (!courses[selectedYear]) return;

        const selectedMajorDiv = majorDivSelect.value;
        const deptList = courses[selectedYear][selectedMajorDiv];
        deptDatalist.innerHTML = '';
        if (deptList) {
            deptList.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.deptNm;
                deptDatalist.appendChild(option);
            });
        }
    }

    function updateCourseDatalist() {
        const selectedYear = searchYearSelect.value;
        if (!courses[selectedYear]) return;

        const keyword = courseSearchInput.value.trim().toLowerCase();
        courseDatalist.innerHTML = '';
        if (keyword.length < 2) return;

        const suggestions = new Set();
        const maxSuggestions = 50;

        for (const divList of courses[selectedYear]) {
            if (suggestions.size >= maxSuggestions) break;
            for (const dept of divList) {
                if (suggestions.size >= maxSuggestions) break;
                if (dept.groups) {
                    for (const group of dept.groups) {
                        if (suggestions.size >= maxSuggestions) break;
                        if (group.courses) {
                            for (const course of group.courses) {
                                const courseName = course.name.toLowerCase();
                                const courseCode = course.code.toLowerCase();
                                if (courseName.includes(keyword) || courseCode.includes(keyword)) {
                                    suggestions.add(`${course.name} (${course.code})`);
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
            groupHeader.innerHTML = `<span>${group.groupNm}</span>`;
            const groupContent = document.createElement('div');
            groupContent.className = 'result-group-content';

            group.courses.forEach(course => {
                const courseItem = createSearchResultCourse(course.code, course.name, course.credit);
                groupContent.appendChild(courseItem);
            });

            groupContainer.appendChild(groupHeader);
            groupContainer.appendChild(groupContent);
            searchResult.appendChild(groupContainer);
        });
    }

    // 전역 함수로 등록
    window.renderDeptSearchResult = renderDeptSearchResult;

    function searchDept() {
        const keyword = deptSearchInput.value.trim();
        const selectedMajorDiv = majorDivSelect.value;
        const selectedYear = searchYearSelect.value;

        if (!keyword || !courses[selectedYear]) {
            searchResult.textContent = '학과 이름을 입력하세요.';
            return;
        }

        const deptList = courses[selectedYear][selectedMajorDiv];
        const foundDept = deptList ? deptList.find(dept => dept.deptNm === keyword) : null;

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

    const courseSearchBtn = document.getElementById('course-search-btn');

    function renderCourseSearchResult(foundCourses) {
        clearCourseSelection();

        searchResult.innerHTML = '';
        if (foundCourses.length === 0) {
            searchResult.textContent = '해당 강의를 찾을 수 없습니다.';
            return;
        }
        foundCourses.forEach(course => {
            const courseItem = createSearchResultCourse(course.code, course.name, course.credit);
            searchResult.appendChild(courseItem);
        });
    }

    // 전역 함수로 등록
    window.renderCourseSearchResult = renderCourseSearchResult;

    function searchCourseByName() {
        let keyword = courseSearchInput.value.trim().toLowerCase();
        const selectedYear = searchYearSelect.value;
        const match = keyword.match(/^(.*) \((.*)\)$/);
        if (match) {
            keyword = match[1].toLowerCase();
        }

        if (keyword.length < 2) {
            searchResult.textContent = '2글자 이상 입력하세요.';
            return;
        }
        if (!courses[selectedYear]) {
            searchResult.textContent = '강의 데이터가 로딩 중입니다. 잠시 후 다시 시도해주세요.';
            return;
        }

        const foundCourses = [];
        const addedCodes = new Set();
        for (const divList of courses[selectedYear]) {
            for (const dept of divList) {
                if (dept.groups) {
                    for (const group of dept.groups) {
                        if (group.courses) {
                            for (const course of group.courses) {
                                const courseName = course.name.toLowerCase();
                                const courseCode = course.code.toLowerCase();
                                if (!addedCodes.has(course.code) && (courseName.includes(keyword) || courseCode.includes(keyword))) {
                                    foundCourses.push(course);
                                    addedCodes.add(course.code);
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

    courseSearchBtn.addEventListener('click', searchCourseByName);
    courseSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchCourseByName();
        }
    });

    const plusBtn = document.getElementById('major-add-btn');
    let menu = null;

    plusBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (menu) {
            menu.remove();
            menu = null;
            return;
        }
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

        majorDivs.forEach((div, idx) => {
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
    });

    function closeMenu() {
        if (menu) {
            menu.remove();
            menu = null;
        }
        document.removeEventListener('click', closeMenu);
    }

    const courseContainer = document.querySelector('.course-container');
    const toggleBtn = document.getElementById('container-toggle-btn');
    const divider = document.getElementById('container-divider');

    divider.addEventListener('click', () => {
        courseContainer.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
    });

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
        saveToHistory();
    }

    addYearBtn.addEventListener('click', addYearColumn);

    semesterScrollContainer.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            semesterScrollContainer.scrollLeft += evt.deltaY;
        }
    });



    document.getElementById('deck-copy-paste-btn').addEventListener('click', copyOrPasteDeck);
    document.getElementById('deck-reset-btn').addEventListener('click', () => resetDeck(currentDeck));
    document.getElementById('add-deck-btn').addEventListener('click', addNewDeck);
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);
    document.getElementById('help-btn').addEventListener('click', showHelpPopup);

    // 교양과목 추가 버튼 이벤트
    document.getElementById('custom-course-add-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('custom-course-name');
        const codeInput = document.getElementById('custom-course-code');
        const creditInput = document.getElementById('custom-course-credit');

        const name = nameInput.value.trim();
        const code = codeInput.value.trim();
        const credit = creditInput.value.trim();

        if (!name || !code || !credit) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        // 교양과목 추가
        addCustomCourse(name, code, parseInt(credit));
    });

    // 교양과목 버튼 이벤트
    document.getElementById('custom-course-clear-btn').addEventListener('click', () => {
        document.getElementById('custom-course-name').value = '';
        document.getElementById('custom-course-code').value = '';
        document.getElementById('custom-course-credit').value = '';
        clearCourseSelection();
    });

    updateCopyPasteButton();
    updateHistoryButtons();

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
        else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && (e.key === 'Z' || e.key === 'z'))) {
            e.preventDefault();
            redo();
        }
        else if (e.key === 'Escape') {
            // ESC 키로 과목 선택 해제
            if (isClickMoveMode) {
                clearCourseSelection();
            }
        }
    });
});

function getTakenCourses() {
    const takenCourses = [];
    const allCourses = document.getElementById('semester-grid-container').querySelectorAll('.taken-course');
    allCourses.forEach(course => {
        const courseCode = course.dataset.courseCode;
        const isAlreadyAdded = takenCourses.some(addedCourse => isEqualCourse(addedCourse.dataset.courseCode, courseCode));
        if (!isAlreadyAdded) {
            takenCourses.push(course);
        }
    });
    return takenCourses;
}

function createDeptDropdown(majorDiv, selectedYear, selectedDeptCd) {
    const yearToUse = selectedYear || years[years.length - 1];
    if (!courses[yearToUse] || !courses[yearToUse][majorDiv]) {
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
    label.textContent = majorDivs[majorDiv];
    label.style.fontWeight = 'bold';
    header.appendChild(label);

    // 오른쪽: 기준년도 라벨 + 드롭다운 + 삭제 버튼
    const rightSection = document.createElement('div');
    rightSection.style.display = 'flex';
    rightSection.style.alignItems = 'center';
    rightSection.style.gap = '6px';

    // 기준년도 라벨
    const yearLabel = document.createElement('span');
    yearLabel.textContent = '기준년도';
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
        option.textContent = `${year}년`;
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
        updateAndSave(); // UI 업데이트와 저장을 한 번에
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

    const populateDeptSelect = (year, deptToSelect) => {
        const deptList = courses[year] ? courses[year][majorDiv] : [];
        select.innerHTML = ''; // Clear existing options
        if (deptList) {
            deptList.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.deptCd;
                option.textContent = dept.deptNm;
                select.appendChild(option);
            });
        }
        if (deptToSelect) {
            select.value = deptToSelect;
        }
    };

    populateDeptSelect(yearToUse, selectedDeptCd);

    yearSelect.addEventListener('change', () => {
        populateDeptSelect(yearSelect.value, null);
        updateAndSave(); // UI 업데이트와 저장을 한 번에
        updateMajorGPADisplay(); // 전공별 평점 업데이트
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
        updateAndSave(); // UI 업데이트와 저장을 한 번에
        updateMajorGPADisplay(); // 전공별 평점 업데이트
    });
    document.getElementById('selectContainer').appendChild(container);

    if (!selectedYear) {
        updateChart({ save: false }); // 초기 로드 시에는 저장하지 않음
        updateMajorGPADisplay(); // 전공별 평점 표시
    }
}

function initGroups(selectContainer) {
    const year = selectContainer.querySelector('.year-select').value;
    const majorDiv = selectContainer.dataset.majorDiv;
    if (!courses[year] || !courses[year][majorDiv]) return;
    const deptList = courses[year][majorDiv];
    const groupListDiv = selectContainer.querySelector('.group-list');

    groupListDiv.innerHTML = '';
    const selectedDeptCd = selectContainer.querySelector('.dept-select').value;
    const dept = deptList.find(d => d.deptCd === selectedDeptCd);
    if (dept) {
        dept.groups.forEach((group, idx) => {
            const groupContainer = document.createElement('div');
            const groupLabel = document.createElement('span');
            groupLabel.textContent = group.groupNm;
            groupLabel.className = 'group-label';
            groupContainer.appendChild(groupLabel);
            const groupProgress = document.createElement('span');
            groupProgress.className = 'group-progress';
            groupContainer.appendChild(groupProgress);

            groupContainer.className = 'group-container' + idx % 2;
            groupContainer.dataset.groupCd = group.groupCd || '';
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
    const minCredit = parseInt(groupContainer.dataset.minCredit);
    const maxCredit = parseInt(groupContainer.dataset.maxCredit);
    let currentCredit = parseInt(groupContainer.dataset.currentCredit);
    currentCredit = maxCredit > 0 ? Math.min(maxCredit, currentCredit) : currentCredit;

    // 최소학점이 양수가 아니면 최대학점 기준으로 진행률 체크
    const stdCredit = minCredit > 0 ? minCredit : maxCredit > 0 ? maxCredit : 0;

    const progress = (stdCredit > 0) ? (currentCredit / stdCredit * 100).toFixed(0) : 0;
    const groupProgress = groupContainer.querySelector('.group-progress');

    groupProgress.textContent = `${currentCredit}/${stdCredit} (${progress}%)`;

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
    groupContainer.dataset.currentCredit = parseInt(groupContainer.dataset.currentCredit) + parseInt(course.dataset.credit);
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
        const credit = parseInt(courseEl.dataset.credit) || 0;
        const grade = courseEl.dataset.grade;

        // F학점이거나 NP이면 학점 인정 안함
        if (grade !== 'F' && grade !== 'NP') {
            totalCredit += credit;
        }

        // 평점 계산 (P/NP 제외)
        if (grade && gradeSystem[grade] !== undefined) {
            totalGradePoints += gradeSystem[grade] * credit;
            gradedCourseCount += credit;
        }
    });

    // 셀의 학점 표시 업데이트
    let displayText = `${totalCredit}학점`;

    // 평균 평점 계산 및 표시
    if (gradedCourseCount > 0) {
        const gpa = (totalGradePoints / gradedCourseCount).toFixed(2);
        displayText += ` (평균: ${gpa})`;
    } else if (cell.querySelectorAll('.taken-course').length > 0) {
        displayText += ` (평균: N/A)`;
    }

    creditTotalElement.textContent = displayText;
}

// 강의(과목) 매핑 시스템(개편된 과목은 여기 추가)
const courseMapping = [
    ['GELI001', 'GELI003', 'GELI005', 'GELI007', 'SPGE210', 'GSCE024'], // 학세탐1
    ['GELI002', 'GELI004', 'GELI006', 'GELI008', 'GSCE025'], // 학세탐2
    ['IFLS011', 'IFLS013', 'IFLS800'], // 아잉1
    ['IFLS012', 'IFLS014', 'IFLS801'], // 아잉2
    ['GEWR001', 'GEWR002'], // 글쓰기
    ['GEKS005', 'GEKS007'], // 1학년세미나1
    ['GEKS006', 'GEKS008'], // 1학년세미나2
    ['GECT001', 'GSKS004', 'SPGS284'], // 정보적사고

    ['HISE131', 'HISE141'], // 한국역사와문화입문
    ['HISE132', 'HISE142'], // 중국역사와문화입문
    ['HISE133', 'HISE143'], // 일본역사와문화입문
];
// 강의(과목) 코드가 같은지 확인하려면 모두 이 함수를 사용
function isEqualCourse(courseCode1, courseCode2) {
    if (courseCode1 === courseCode2) return true;
    for (const group of courseMapping) {
        if (group.includes(courseCode1) && group.includes(courseCode2)) {
            return true;
        }
    }
    return false;
}

// 과목이 현재 설정된 전공 그룹에 포함되는지 확인하는 함수 (방안 1: groupNm 기반)
function isCourseInMajorGroups(courseCode) {
    // 모든 전공 그룹에서 groupNm을 확인
    const majorContainers = document.querySelectorAll('.dept-select-container');
    for (const container of majorContainers) {
        const year = container.querySelector('.year-select').value;
        const majorDiv = container.dataset.majorDiv;
        const selectedDeptCd = container.querySelector('.dept-select').value;
        if (!courses[year] || !courses[year][majorDiv]) continue;
        const deptList = courses[year][majorDiv];
        const dept = deptList.find(d => d.deptCd === selectedDeptCd);
        if (dept && dept.groups) {
            for (const group of dept.groups) {
                if (group.courses && isMajorCourse(group.groupNm)) {
                    for (const course of group.courses) {
                        if (isEqualCourse(course.code, courseCode)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

// 특정 전공의 평점을 계산하는 함수 (groupNm 기반)
function calculateMajorGPA(majorContainer) {
    const year = majorContainer.querySelector('.year-select').value;
    const majorDiv = majorContainer.dataset.majorDiv;
    const selectedDeptCd = majorContainer.querySelector('.dept-select').value;
    if (!courses[year] || !courses[year][majorDiv]) return { gpa: 'N/A', credit: 0 };
    const deptList = courses[year][majorDiv];
    const dept = deptList.find(d => d.deptCd === selectedDeptCd);
    if (!dept || !dept.groups) return { gpa: 'N/A', credit: 0 };
    let totalGradePoints = 0;
    let totalGradedCredits = 0;
    // 전공 그룹에서 groupNm이 전공필수/전공선택인 과목만 수집
    const majorCourseCodes = new Set();
    dept.groups.forEach(group => {
        if (group.courses && isMajorCourse(group.groupNm)) {
            group.courses.forEach(course => {
                majorCourseCodes.add(course.code);
            });
        }
    });
    // 수강한 과목들 중에서 해당 전공 과목들만 필터링
    const takenCourses = getTakenCourses();
    takenCourses.forEach(course => {
        const courseCode = course.dataset.courseCode;
        const grade = course.dataset.grade;
        const credit = parseInt(course.dataset.credit) || 0;
        if (majorCourseCodes.has(courseCode)) {
            if (grade && gradeSystem[grade] !== undefined) {
                totalGradePoints += gradeSystem[grade] * credit;
                totalGradedCredits += credit;
            }
        }
    });
    if (totalGradedCredits > 0) {
        const gpa = (totalGradePoints / totalGradedCredits).toFixed(2);
        return { gpa, credit: totalGradedCredits };
    } else {
        return { gpa: 'N/A', credit: 0 };
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
        gpaElement.textContent = `전공 평점: ${gpa}`;
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

// 이미 수강한 과목인지 확인하는 함수
function isCourseAlreadyTaken(courseCode) {
    const takenCourses = getTakenCourses();
    return takenCourses.some(course => isEqualCourse(course.dataset.courseCode, courseCode));
}

// 검색된 강의 셀을 생성하는 함수
function createSearchResultCourse(code, name, credit) {
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    // 강의 툴팁 추가
    courseItem.title = "드래그 또는 클릭(다중선택 가능) 후 학기 클릭";
    if (isCourseAlreadyTaken(code)) {
        courseItem.classList.add('taken-in-search');
    }
    courseItem.textContent = `[${code}] ${name} (${credit}학점)`;
    courseItem.dataset.courseCode = code;
    courseItem.dataset.courseName = name;
    courseItem.dataset.credit = credit;
    courseItem.draggable = true;
    courseItem.addEventListener('dragstart', handleDragStart);
    courseItem.addEventListener('click', handleCourseClick);

    return courseItem;
}

// 검색 결과를 다시 렌더링하는 함수
function refreshSearchResults() {
    const searchResult = document.getElementById('search-result');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    const nameInput = document.getElementById('custom-course-name');
    const codeInput = document.getElementById('custom-course-code');
    const creditInput = document.getElementById('custom-course-credit');

    // 현재 활성화된 검색 타입 확인
    let currentSearchType = null;
    searchTypeRadios.forEach(radio => {
        if (radio.checked) currentSearchType = radio.value;
    });

    // 검색 결과가 있고, 검색어가 있는 경우에만 다시 렌더링
    if (searchResult.children.length > 0) {
        if (currentSearchType === 'byDept' && deptSearchInput.value.trim() !== '') {
            // 직접 검색 함수 호출
            const keyword = deptSearchInput.value.trim();
            const selectedMajorDiv = document.getElementById('majorDiv-select').value;
            const selectedYear = document.getElementById('search-year-select').value;

            if (keyword && courses[selectedYear]) {
                const deptList = courses[selectedYear][selectedMajorDiv];
                const foundDept = deptList ? deptList.find(dept => dept.deptNm === keyword) : null;
                window.renderDeptSearchResult(foundDept);
            }
        } else if (currentSearchType === 'byCourseName' && courseSearchInput.value.trim() !== '') {
            // 직접 검색 함수 호출
            let keyword = courseSearchInput.value.trim().toLowerCase();
            const selectedYear = document.getElementById('search-year-select').value;
            const match = keyword.match(/^(.*) \((.*)\)$/);
            if (match) {
                keyword = match[1].toLowerCase();
            }

            if (keyword.length >= 2 && courses[selectedYear]) {
                const foundCourses = [];
                const addedCodes = new Set();
                for (const divList of courses[selectedYear]) {
                    for (const dept of divList) {
                        if (dept.groups) {
                            for (const group of dept.groups) {
                                if (group.courses) {
                                    for (const course of group.courses) {
                                        const courseName = course.name.toLowerCase();
                                        const courseCode = course.code.toLowerCase();
                                        if (!addedCodes.has(course.code) && (courseName.includes(keyword) || courseCode.includes(keyword))) {
                                            foundCourses.push(course);
                                            addedCodes.add(course.code);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                window.renderCourseSearchResult(foundCourses);
            }
        } else if (currentSearchType === 'customCourse') {
            const name = nameInput.value.trim();
            const code = codeInput.value.trim();
            const credit = creditInput.value.trim();
            if (name && code && credit) {
                addCustomCourse(name, code, parseInt(credit));
            }
        }
    }
    else clearCourseSelection();
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
        const credit = parseInt(course.dataset.credit) || 0;
        const grade = course.dataset.grade;

        // F학점이거나 NP이면 학점 인정 안함
        if (grade !== 'F' && grade !== 'NP') {
            currentCredit += credit;
        }

        // 평점 계산 (평점이 입력된 과목만, P/NP 제외)
        if (grade && gradeSystem[grade] !== undefined) {
            totalGradePoints += gradeSystem[grade] * credit;
            totalGradedCredits += credit;
        }
    });

    // 전체 학점 업데이트
    document.getElementById('current-credit').textContent = currentCredit;

    // 전체 평점 업데이트
    const overallGpaElement = document.getElementById('overall-gpa');
    if (totalGradedCredits > 0) {
        const overallGpa = (totalGradePoints / totalGradedCredits).toFixed(2);
        overallGpaElement.textContent = overallGpa;
    } else {
        overallGpaElement.textContent = 'N/A';
    }

    // 전공 평점 계산
    let majorGradePoints = 0;
    let majorGradedCredits = 0;

    takenCourses.forEach(courseEl => {
        const credit = parseInt(courseEl.dataset.credit) || 0;
        const grade = courseEl.dataset.grade;
        const isMajor = courseEl.dataset.isMajor === 'true';

        if (isMajor && grade && gradeSystem[grade] !== undefined) {
            majorGradePoints += gradeSystem[grade] * credit;
            majorGradedCredits += credit;
        }
    });

    const majorGpaElement = document.getElementById('major-gpa');
    if (majorGradedCredits > 0) {
        const majorGpa = (majorGradePoints / majorGradedCredits).toFixed(2);
        majorGpaElement.textContent = majorGpa;
    } else {
        majorGpaElement.textContent = 'N/A';
    }

    // 각 전공별 그룹 업데이트
    myMajors.forEach(myMajor => {
        const year = myMajor.querySelector('.year-select').value;
        const majorDiv = myMajor.dataset.majorDiv;
        const selectedDeptCd = myMajor.querySelector('.dept-select').value;
        const deptList = courses[year] ? courses[year][majorDiv] : [];
        const dept = deptList ? deptList.find(d => d.deptCd === selectedDeptCd) : null;

        if (!dept) return;

        const groupContainers = myMajor.querySelectorAll('.group-container0, .group-container1');
        groupContainers.forEach(groupContainer => {
            groupContainer._takenCourses = [];
            groupContainer.dataset.currentCredit = 0;
        });

        takenCourses.forEach(takenCourse => {
            const courseCode = takenCourse.dataset.courseCode;

            const foundGroup = dept.groups.find(group => {
                // 과목코드로 매칭
                return group.courses.some(course => isEqualCourse(course.code, courseCode));
            });

            if (foundGroup) {
                // 그룹 코드 일치하는 곳에 추가
                const groupContainer = Array.from(groupContainers).find(gc =>
                    gc.dataset.groupCd === foundGroup.groupCd
                );
                if (groupContainer) {
                    addCourese(groupContainer, takenCourse);
                }
            }
        });
    });

    // 전공별 평점 표시 업데이트
    updateMajorGPADisplay();

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

// UI 업데이트와 저장을 함께 수행
function updateAndSave() {
    updateChart({ save: false }); // 중복 저장 방지
    updateYearStats();
    saveCurrentDeck();
    saveStateToLocalStorage();
}

// 학년별 학점과 평점을 계산하고 업데이트하는 함수
function updateYearStats() {
    document.querySelectorAll('.year-column').forEach(yearColumn => {
        const year = parseInt(yearColumn.dataset.year);
        const yearStatsElement = yearColumn.querySelector('.year-stats');

        if (!yearStatsElement) return;

        let totalCredits = 0;
        let totalGradePoints = 0;
        let gradedCourseCount = 0;
        let majorGradePoints = 0;
        let majorGradedCredits = 0;

        // 해당 학년의 모든 semester-cell에서 과목들을 가져와서 계산
        yearColumn.querySelectorAll('.semester-cell .taken-course').forEach(courseEl => {
            const credit = parseInt(courseEl.dataset.credit) || 0;
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
        yearStatsElement.textContent = `학점: ${totalCredits}, 평점: ${gpaText}, 전공: ${majorGpaText}`;
    });
}