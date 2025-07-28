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
const years = ['2021', '2022', '2023', '2024', '2025'];
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
};

const gradeOptions = Object.keys(gradeSystem);

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
    const majorSelections = [];
    document.querySelectorAll('.dept-select-container').forEach(container => {
        majorSelections.push({
            majorDiv: container.dataset.majorDiv,
            year: container.querySelector('.year-select').value,
            deptCd: container.querySelector('.dept-select').value
        });
    });

    // 모든 데이터를 하나의 객체로 통합하여 저장
    const appState = {
        deckCount,
        currentDeck,
        majorSelections,
        decks,
        version: '2.0' // 향후 호환성을 위한 버전 정보
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
                    deck1: { name: "덱1", years: { '1': {}, '2': {}, '3': {}, '4': {} } },
                    deck2: { name: "덱2", years: { '1': {}, '2': {}, '3': {}, '4': {} } },
                    deck3: { name: "덱3", years: { '1': {}, '2': {}, '3': {}, '4': {} } }
                };
            }

            // 전공 선택 영역 복원
            const selectContainer = document.getElementById('selectContainer');
            selectContainer.innerHTML = ''; // 기존 영역 초기화
            if (savedState.majorSelections) {
                savedState.majorSelections.forEach(selection => {
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

    if (currentDeck === deckId) {
        loadDeck(deckId);
        updateAndSave(); // UI 업데이트와 저장을 한 번에
    } else {
        saveStateToLocalStorage();
    }
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
    currentDeck = deckId;
    updateDeckTabs();
    loadDeck(deckId);
    updateAndSave(); // UI 업데이트와 저장을 한 번에
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
}

// 히스토리에 현재 상태 저장
function saveToHistory() {
    const decksData = JSON.parse(JSON.stringify(decks));

    const currentState = {
        decks: decksData,
        timestamp: Date.now()
    };
    
    historyStack = historyStack.slice(0, currentHistoryIndex + 1);
    console.log('현재 상태 저장:', currentHistoryIndex);
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
}

function redo() {
    if (currentHistoryIndex < historyStack.length - 1) restoreFromHistory(currentHistoryIndex + 1);
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
    
    decks[newDeckId] = { name: `덱${deckCount}`, years: { '1': {}, '2': {}, '3': {}, '4': {} } };

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
    majorCheckbox.checked = courseElement.dataset.isMajor === 'true';
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
            courseElement.remove();
            updateAndSave(); // UI 업데이트와 저장을 한 번에
            closeCoursePopup();
            saveToHistory();
            
            // 검색 결과 다시 렌더링하여 줄 그은 효과 업데이트 (약간의 지연 후)
            setTimeout(() => {
                refreshSearchResults();
            }, 100);
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
}



// 교양과목을 검색 결과에 추가하는 함수
function addCustomCourse(name, code, credit) {
    const searchResult = document.getElementById('search-result');

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
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.textContent = `[${code}] ${name} (${credit}학점)`;
    courseItem.dataset.courseCode = code;
    courseItem.dataset.courseName = name;
    courseItem.dataset.credit = credit;
    courseItem.draggable = true;
    courseItem.addEventListener('dragstart', handleDragStart);
    courseItem.addEventListener('click', handleCourseClick);

    content.appendChild(courseItem);
    searchResult.appendChild(content);

    console.log(`교양과목 추가됨: ${name} (${code}, ${credit}학점)`);
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
        console.log(`과목 선택 해제: ${courseElement.dataset.courseName}`);
    } else {
        // 새로운 과목 선택
        courseElement.classList.add('selected');
        selectedCourses.add(courseElement);
        console.log(`과목 선택: ${courseElement.dataset.courseName}`);
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
    
    // 히스토리 저장 (여러 과목 이동이므로 한 번만)
    saveToHistory();
    
    const processedCourses = [];
    let hasError = false;
    
    // 선택된 모든 과목을 처리
    selectedCourses.forEach(selectedCourse => {
        // 선택된 과목의 데이터 가져오기
        const courseData = {
            code: selectedCourse.dataset.courseCode,
            name: selectedCourse.dataset.courseName,
            credit: selectedCourse.dataset.credit,
            groupNm: selectedCourse.dataset.groupNm || '',
            isTakenCourse: selectedCourse.classList.contains('taken-course')
        };
        
        // 이미 수강한 과목인지 확인 (새로 추가하는 경우만)
        if (!courseData.isTakenCourse) {
            const existingCourse = document.querySelector(
                `.taken-course[data-course-code="${courseData.code}"]`
            );
            if (existingCourse) {
                console.log(`이미 수강한 과목입니다: ${courseData.name}`);
                hasError = true;
                return; // 이 과목은 건너뛰고 다음 과목 처리
            }
        }
        
        // 과목 이동 또는 추가
        if (courseData.isTakenCourse) {
            // 기존 과목을 다른 셀로 이동
            const originalCell = selectedCourse.closest('.semester-cell');
            if (originalCell !== targetCell) {
                // 과목을 새 셀로 이동
                targetCell.appendChild(selectedCourse);
                processedCourses.push({
                    element: selectedCourse,
                    originalCell: originalCell,
                    action: 'moved',
                    name: courseData.name
                });
                console.log(`과목이 ${targetCell.dataset.year}학년 ${targetCell.dataset.semester}학기로 이동됨: ${courseData.name}`);
            } else {
                console.log(`같은 셀로는 이동할 수 없습니다: ${courseData.name}`);
            }
        } else {
            // 새 과목 추가
            const takenCourse = createTakenCourseElement(courseData);
            targetCell.appendChild(takenCourse);
            
            // 검색 결과에서 해당 과목 표시 업데이트
            selectedCourse.classList.add('taken-in-search');
            
            processedCourses.push({
                element: takenCourse,
                originalCell: null,
                action: 'added',
                name: courseData.name
            });
            console.log(`새 과목 ${courseData.name}이 ${targetCell.dataset.year}학년 ${targetCell.dataset.semester}학기에 추가됨`);
        }
    });
    
    // 선택 해제
    clearCourseSelection();
    
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
        
        console.log(`총 ${processedCourses.length}개 과목이 처리되었습니다.`);
    }
    
    // 에러가 있었다면 알림
    if (hasError && processedCourses.length === 0) {
        alert('선택한 과목들이 모두 이미 수강한 과목입니다.');
    } else if (hasError) {
        alert('일부 과목은 이미 수강한 과목이어서 제외되었습니다.');
    }
}

function createTakenCourseElement(courseData) {
    const takenCourse = document.createElement('div');
    takenCourse.className = 'taken-course';
    takenCourse.textContent = courseData.name;
    takenCourse.dataset.courseCode = courseData.code;
    takenCourse.dataset.courseName = courseData.name;
    takenCourse.dataset.credit = courseData.credit;
    takenCourse.dataset.grade = courseData.grade || ''; // 평점 정보 추가
    takenCourse.dataset.isMajor = courseData.isMajor !== undefined ? courseData.isMajor.toString() : isMajorCourse(courseData.groupNm).toString(); // 전공 여부 자동 분류

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
        
        // 클릭 이동 모드가 활성화되어 있으면 과목 선택 처리
        if (isClickMoveMode) {
            // taken-course 선택/해제 토글
            toggleCourseSelection(takenCourse);
            return;
        }
        
        // 일반 클릭이면 팝업 표시
        showCoursePopup(takenCourse, e);
    });

    return takenCourse;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const targetCell = e.target.closest('.semester-cell');
    if (!targetCell) return;

    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (data.isTakenCourse) {
        if (draggedCourse && draggedCourse.classList.contains('taken-course')) {
            if (draggedCourse.parentNode !== targetCell) {
                draggedCourse.parentNode.removeChild(draggedCourse);
            }
            targetCell.appendChild(draggedCourse);
        }
    } else {
        const newTakenCourse = createTakenCourseElement(data);
        targetCell.appendChild(newTakenCourse);
    }
    updateAndSave(); // UI 업데이트와 저장을 한 번에
    saveToHistory();
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    if (e.target.classList.contains('taken-course')) {
        if (e.dataTransfer.dropEffect === 'none') {
            e.target.remove();
            updateAndSave(); // UI 업데이트와 저장을 한 번에
            saveToHistory();
        }
    }
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
        yearTitle.addEventListener('click', function(e) {
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
    input.addEventListener('keydown', function(e) {
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

    function renderDeptSearchResult(dept, takenCourseCodes) {
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
                const courseItem = document.createElement('div');
                courseItem.className = 'course-item';
                if (takenCourseCodes.has(course.code)) {
                    courseItem.classList.add('taken-in-search');
                }
                courseItem.textContent = `[${course.code}] ${course.name} (${course.credit}학점)`;
                courseItem.dataset.courseCode = course.code;
                courseItem.dataset.courseName = course.name;
                courseItem.dataset.credit = course.credit;
                courseItem.dataset.groupNm = group.groupNm || '';
                courseItem.draggable = true;
                courseItem.addEventListener('dragstart', handleDragStart);
                courseItem.addEventListener('click', handleCourseClick);
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

        const takenCourseCodes = new Set(getTakenCourses().map(course => course.dataset.courseCode));
        renderDeptSearchResult(foundDept, takenCourseCodes);
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

    function renderCourseSearchResult(foundCourses, takenCourseCodes) {
        searchResult.innerHTML = '';
        if (foundCourses.length === 0) {
            searchResult.textContent = '해당 강의를 찾을 수 없습니다.';
            return;
        }
        foundCourses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            if (takenCourseCodes.has(course.code)) {
                courseItem.classList.add('taken-in-search');
            }
            courseItem.textContent = `[${course.code}] ${course.name} (${course.credit}학점)`;
            courseItem.dataset.courseCode = course.code;
            courseItem.dataset.courseName = course.name;
            courseItem.dataset.credit = course.credit;
            courseItem.dataset.groupNm = course.groupNm || '';
            courseItem.draggable = true;
            courseItem.addEventListener('dragstart', handleDragStart);
            courseItem.addEventListener('click', handleCourseClick);
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
        const takenCourseCodes = new Set(getTakenCourses().map(course => course.dataset.courseCode));
        renderCourseSearchResult(foundCourses, takenCourseCodes);
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

    // 교양과목 초기화 버튼 이벤트
    document.getElementById('custom-course-clear-btn').addEventListener('click', () => {
        document.getElementById('custom-course-name').value = '';
        document.getElementById('custom-course-code').value = '';
        document.getElementById('custom-course-credit').value = '';
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
    const codeSet = new Set();
    document.getElementById('semester-grid-container').querySelectorAll('.taken-course').forEach(course => {
        const courseCode = course.dataset.courseCode;
        if (!codeSet.has(courseCode)) {
            codeSet.add(courseCode);
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
    select.addEventListener('change', () => updateAndSave()); // UI 업데이트와 저장을 한 번에
    document.getElementById('selectContainer').appendChild(container);

    if (!selectedYear) {
        updateChart({ save: false }); // 초기 로드 시에는 저장하지 않음
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

    const progress = (minCredit > 0) ? (currentCredit / minCredit * 100).toFixed(0) : 0;
    const groupProgress = groupContainer.querySelector('.group-progress');
    
    groupProgress.textContent = `${currentCredit}/${minCredit} (${progress}%)`;
    
    const progressPercent = Math.min(100, parseFloat(progress));
    
    // 둥근 모서리를 위한 배경 설정
    if (progressPercent > 0) {
        groupProgress.style.background = `linear-gradient(to right, #ff69b4 ${progressPercent}%, rgba(255, 105, 180, 0.1) ${progressPercent}%)`;
        groupProgress.style.border = '1px solid rgba(255, 105, 180, 0.3)';
    } else {
        groupProgress.style.background = 'rgba(255, 105, 180, 0.1)';
        groupProgress.style.border = '1px solid rgba(255, 105, 180, 0.2)';
    }
    
    if (progressPercent >= 100) {
        groupProgress.style.color = 'white';
        groupProgress.style.background = 'linear-gradient(135deg, #ff69b4, #e91e63)';
        groupProgress.style.border = '1px solid #e91e63';
        groupProgress.style.boxShadow = '0 2px 4px rgba(255, 105, 180, 0.3)';
    } else {
        groupProgress.style.color = '#333';
        groupProgress.style.boxShadow = 'none';
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
        
        // F학점이면 학점 인정 안함
        if (grade !== 'F') {
            totalCredit += credit;
        }
        
        // 평점 계산
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

// 과목 매핑 시스템 (2023년 이전과 2024년 이후 과목명 대응)
const courseMapping = {
    '자유정의진리I': '학문세계의탐구I',
    '자유정의진리II': '학문세계의탐구II',
    '학문세계의탐구I': '자유정의진리I',
    '학문세계의탐구II': '자유정의진리II'
};

const reverseCourseMapping = {
    '학문세계의탐구I': '자유정의진리I',
    '학문세계의탐구II': '자유정의진리II',
    '자유정의진리I': '학문세계의탐구I',
    '자유정의진리II': '학문세계의탐구II'
};

// 과목명 매핑 함수
function getMappedCourseName(courseName, year) {
    // 과목 매핑이 필요한 경우 처리
    if (courseMapping && courseMapping[courseName]) {
        return courseMapping[courseName];
    }
    if (reverseCourseMapping && reverseCourseMapping[courseName]) {
        return reverseCourseMapping[courseName];
    }
    return courseName;
}

// 이미 수강한 과목인지 확인하는 함수
function isCourseAlreadyTaken(courseCode) {
    const takenCourses = getTakenCourses();
    return takenCourses.some(course => course.dataset.courseCode === courseCode);
}

// 검색 결과를 다시 렌더링하는 함수
function refreshSearchResults() {
    const searchResult = document.getElementById('search-result');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    
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
                const takenCourseCodes = new Set(getTakenCourses().map(course => course.dataset.courseCode));
                window.renderDeptSearchResult(foundDept, takenCourseCodes);
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
                const takenCourseCodes = new Set(getTakenCourses().map(course => course.dataset.courseCode));
                window.renderCourseSearchResult(foundCourses, takenCourseCodes);
            }
        }
    }
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

        // F학점이면 학점 인정 안함
        if (grade !== 'F') {
            currentCredit += credit;
        }

        // 평점 계산 (평점이 입력된 과목만)
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
            const mappedCourseName = getMappedCourseName(takenCourse.dataset.courseName, year);
            const foundGroup = dept.groups.find(group =>
                group.courses.some(course => course.name === mappedCourseName)
            );

            if (foundGroup) {
                const groupContainer = Array.from(groupContainers).find(gc =>
                    gc.querySelector('.group-label').textContent === foundGroup.groupNm
                );
                if (groupContainer) {
                    addCourese(groupContainer, takenCourse);
                }
            }
        });
    });

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

            // F학점이면 학점 인정 안함, 그 외에는 학점 인정
            if (grade !== 'F') {
                totalCredits += credit;
            }

            // 평점 계산 (평점이 입력된 과목만)
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