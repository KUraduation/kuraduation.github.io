// 전공 목록
const majorDivs = [
    "제1전공",
    "이중전공",
    "복수전공",
    "학사편입",
    "융합전공",
    "심화전공",
    "학생설계전공"
];

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

// 덱 데이터 구조
const decks = {
    deck1: {
        name: "덱1",
        courses: [],
        totalCredits: 0
    },
    deck2: {
        name: "덱2", 
        courses: [],
        totalCredits: 0
    },
    deck3: {
        name: "덱3",
        courses: [],
        totalCredits: 0
    }
};

// 통합된 복사/붙여넣기 함수
function copyOrPasteDeck() {
    if (copiedDeckData) {
        // 복사된 덱이 있으면 붙여넣기 실행
        pasteDeck(currentDeck);
        // 붙여넣기 후 복사 데이터 초기화
        copiedDeckData = null;
        updateCopyPasteButton();
    } else {
        // 복사된 덱이 없으면 복사 실행
        if (!decks[currentDeck]) return;
        
        // 현재 덱 저장
        saveCurrentDeck();
        
        // 현재 활성 덱 데이터 복사
        copiedDeckData = {
            name: decks[currentDeck].name,
            courses: [...decks[currentDeck].courses],
            totalCredits: decks[currentDeck].totalCredits
        };
        
        console.log('Current deck copied:', currentDeck, copiedDeckData);
        updateCopyPasteButton();
    }
}

// 덱 초기화 함수
function resetDeck(deckId) {
    if (!decks[deckId]) return;
    
    // 초기화 확인
    if (!confirm(`"${decks[deckId].name}"의 모든 과목을 초기화하시겠습니까?`)) {
        return;
    }
    
    // 덱 데이터 초기화
    decks[deckId] = {
        name: decks[deckId].name,
        courses: [],
        totalCredits: 0
    };
    
    // 현재 덱이 초기화된 덱이면 즉시 반영
    if (currentDeck === deckId) {
        // 모든 과목 제거
        document.querySelectorAll('.taken-course').forEach(course => course.remove());
        
        // 차트 업데이트
        updateChart();
    }
    
    console.log('Deck reset:', deckId);
}

// 덱 붙여넣기 함수
function pasteDeck(targetDeckId) {
    if (!copiedDeckData || !decks[targetDeckId]) return;
    
    // 현재 덱 저장
    saveCurrentDeck();
    
    // 덱 데이터 붙여넣기
    decks[targetDeckId] = {
        name: copiedDeckData.name,
        courses: [...copiedDeckData.courses],
        totalCredits: copiedDeckData.totalCredits
    };
    
    console.log('Deck pasted to:', targetDeckId, decks[targetDeckId]);
    
    // 현재 덱이 붙여넣기 대상이면 즉시 로드
    if (currentDeck === targetDeckId) {
        loadDeck(targetDeckId);
        updateChart();
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
    console.log('switchDeck called with:', deckId);
    if (!decks[deckId]) {
        console.log('Deck not found:', deckId);
        return;
    }
    
    // 현재 덱 저장
    saveCurrentDeck();
    
    // 새 덱으로 전환
    currentDeck = deckId;
    console.log('Current deck changed to:', currentDeck);
    
    // UI 업데이트
    updateDeckTabs();
    
    // 덱 데이터 로드
    loadDeck(deckId);
    
    // 차트 업데이트
    updateChart();
}

// 현재 덱 저장
function saveCurrentDeck() {
    const takenCourses = getTakenCourses();
    const coursesData = takenCourses.map(course => ({
        code: course.dataset.courseCode,
        name: course.dataset.courseName,
        credit: course.dataset.credit,
        year: course.closest('.semester-cell').dataset.year,
        semester: course.closest('.semester-cell').dataset.semester
    }));
    
    decks[currentDeck].courses = coursesData;
    decks[currentDeck].totalCredits = takenCourses.reduce((sum, course) => 
        sum + (parseInt(course.dataset.credit) || 0), 0);
}

// 히스토리에 현재 상태 저장
function saveToHistory() {
    const currentState = {
        courses: getTakenCourses().map(course => ({
            code: course.dataset.courseCode,
            name: course.dataset.courseName,
            credit: course.dataset.credit,
            year: course.closest('.semester-cell').dataset.year,
            semester: course.closest('.semester-cell').dataset.semester
        })),
        timestamp: Date.now()
    };
    
    // 현재 인덱스 이후의 히스토리 제거
    historyStack = historyStack.slice(0, currentHistoryIndex + 1);
    
    // 새 상태 추가
    historyStack.push(currentState);
    currentHistoryIndex++;
    
    // 히스토리 크기 제한
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
    
    // 기존 과목들 제거
    document.querySelectorAll('.taken-course').forEach(course => course.remove());
    
    // 히스토리의 과목들 추가
    state.courses.forEach(courseData => {
        const targetCell = document.querySelector(
            `.semester-cell[data-year="${courseData.year}"][data-semester="${courseData.semester}"]`
        );
        if (targetCell) {
            const newCourse = createTakenCourseElement(courseData);
            targetCell.appendChild(newCourse);
        }
    });
    
    currentHistoryIndex = historyIndex;
    updateHistoryButtons();
    updateChart();
}

// Undo 실행
function undo() {
    if (currentHistoryIndex > 0) {
        restoreFromHistory(currentHistoryIndex - 1);
    }
}

// Redo 실행
function redo() {
    if (currentHistoryIndex < historyStack.length - 1) {
        restoreFromHistory(currentHistoryIndex + 1);
    }
}

// 히스토리 버튼 상태 업데이트
function updateHistoryButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    
    if (undoBtn) {
        undoBtn.disabled = currentHistoryIndex <= 0;
    }
    
    if (redoBtn) {
        redoBtn.disabled = currentHistoryIndex >= historyStack.length - 1;
    }
}

// 덱 데이터 로드
function loadDeck(deckId) {
    // 기존 과목들 제거
    document.querySelectorAll('.taken-course').forEach(course => course.remove());
    
    // 덱의 과목들 추가
    decks[deckId].courses.forEach(courseData => {
        const targetCell = document.querySelector(
            `.semester-cell[data-year="${courseData.year}"][data-semester="${courseData.semester}"]`
        );
        if (targetCell) {
            const newCourse = createTakenCourseElement(courseData);
            targetCell.appendChild(newCourse);
        }
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
    
    // 현재 덱 저장
    saveCurrentDeck();
    
    // 새 덱 생성 (현재 덱 복사)
    decks[newDeckId] = {
        name: `덱${deckCount}`,
        courses: [...decks[currentDeck].courses],
        totalCredits: decks[currentDeck].totalCredits
    };
    
    // 새 덱 탭 추가
    const deckTabs = document.querySelector('.deck-tabs');
    if (deckTabs) {
        const newTab = document.createElement('button');
        newTab.className = 'deck-tab';
        newTab.dataset.deck = newDeckId;
        newTab.textContent = `덱${deckCount}`;
        newTab.addEventListener('click', () => switchDeck(newDeckId));
        
        // 플러스 버튼 앞에 삽입
        const addBtn = document.getElementById('add-deck-btn');
        if (addBtn) {
            deckTabs.insertBefore(newTab, addBtn);
        }
    }
    
    // 새 덱으로 전환
    switchDeck(newDeckId);
    
    // 플러스 버튼 숨기기 (최대 개수 도달 시)
    if (deckCount >= maxDeckCount) {
        const addBtn = document.getElementById('add-deck-btn');
        if (addBtn) {
            addBtn.style.display = 'none';
        }
    }
}

let courses; // 전역 변수로 courses 선언
let currentYear = 2025; // 기본 기준년도

// 기준년도에 따른 JSON 파일 로드
function loadCoursesData(year) {
    const fileName = `${year}.json`;
    
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${year}년 데이터를 불러올 수 없습니다.`);
            }
            return response.json();
        })
        .then(data => {
            courses = data; // courses 설정
            currentYear = year; // 현재 년도 업데이트
            
            // 검색 결과 초기화
            const searchResult = document.getElementById('search-result');
            if (searchResult) {
                searchResult.innerHTML = '';
            }
            
            // 차트 업데이트
            updateChart();
            
            // 데이터 로드 완료 후 커스텀 이벤트 발생
            window.dispatchEvent(new Event('coursesLoaded'));
            
            console.log(`${year}년 데이터 로드 완료`);
        })
        .catch(error => {
            console.error(`${year}년 JSON 파일을 불러오는 중 오류 발생:`, error);
            alert(`${year}년 데이터를 불러올 수 없습니다. 다른 년도를 선택해주세요.`);
        });
}

// 초기 데이터 로드 (기본값: 2025년)
loadCoursesData(currentYear);

///////////////// json 로드

// Global variable to store the dragged element
let draggedCourse = null;

function handleDragStart(e) {
    draggedCourse = e.target;
    e.dataTransfer.effectAllowed = 'move';
    // Store data about the course
    e.dataTransfer.setData('text/plain', JSON.stringify({
        code: draggedCourse.dataset.courseCode,
        name: draggedCourse.dataset.courseName,
        credit: draggedCourse.dataset.credit,
        isTakenCourse: draggedCourse.classList.contains('taken-course') // Check if it's an existing taken-course
    }));
    // Add a class to the dragged element for styling (optional)
    setTimeout(() => {
        draggedCourse.classList.add('dragging');
    }, 0);
}

function createTakenCourseElement(courseData) {
    const takenCourse = document.createElement('div');
    takenCourse.className = 'taken-course';
    takenCourse.textContent = courseData.name;
    takenCourse.dataset.courseCode = courseData.code;
    takenCourse.dataset.courseName = courseData.name;
    takenCourse.dataset.credit = courseData.credit;
    takenCourse.title = `${courseData.name} (${courseData.credit}학점)`; // 툴팁 추가
    takenCourse.draggable = true; // Make taken courses draggable
    takenCourse.addEventListener('dragstart', handleDragStart);
    takenCourse.addEventListener('dragend', handleDragEnd);
    return takenCourse;
}

function handleDragOver(e) {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const targetCell = e.target.closest('.semester-cell');
    if (!targetCell) return; // Not a semester cell

    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (data.isTakenCourse) {
        // Moving an existing taken-course
        if (draggedCourse && draggedCourse.classList.contains('taken-course')) {
            // Remove from old parent if it was moved from another semester-cell
            if (draggedCourse.parentNode !== targetCell) {
                draggedCourse.parentNode.removeChild(draggedCourse);
            }
            targetCell.appendChild(draggedCourse);
        }
    } else {
        // Dropping a new course from search results
        const newTakenCourse = createTakenCourseElement(data);
        targetCell.appendChild(newTakenCourse);
    }
    
    // 히스토리에 저장
    saveToHistory();
    updateChart(); // Update chart after course is added/moved
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    // If the dragged element was a taken-course
    if (e.target.classList.contains('taken-course')) {
        // If dropEffect is 'none', it means it was dropped outside any valid drop target
        // or the drop was cancelled. In this case, remove it.
        if (e.dataTransfer.dropEffect === 'none') {
            e.target.remove();
            // 히스토리에 저장
            saveToHistory();
        }
    }
    draggedCourse = null;
    updateChart(); // Update chart after course is potentially removed
}

document.addEventListener('DOMContentLoaded', function () {
    ///////////////// 기준년도 설정
    const searchYearSelect = document.getElementById('search-year-select');
    
    // 2021년부터 2025년까지 옵션 추가
    for (let year = 2021; year <= 2025; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}년`;
        if (year === currentYear) {
            option.selected = true;
        }
        searchYearSelect.appendChild(option);
    }
    
    // 기준년도 변경 이벤트 리스너
    searchYearSelect.addEventListener('change', function() {
        const selectedYear = parseInt(this.value);
        console.log('기준년도 변경:', selectedYear);
        loadCoursesData(selectedYear);
    });
    
    ///////////////// 강의검색 영역
    const majorDivSelect = document.getElementById('majorDiv-select');
    majorDivs.forEach((majorDiv, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = majorDiv;
        majorDivSelect.appendChild(option);
    });

    const searchResult = document.getElementById('search-result');
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    const deptSearchContainer = document.getElementById('dept-search-container');
    const courseSearchContainer = document.getElementById('course-search-container');

    searchTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'byDept') {
                deptSearchContainer.style.display = 'flex';
                courseSearchContainer.style.display = 'none';
            } else {
                deptSearchContainer.style.display = 'none';
                courseSearchContainer.style.display = 'flex';
            }
            searchResult.innerHTML = '';
        });
    });

    // --- 자동완성 기능 ---
    const deptDatalist = document.getElementById('dept-suggestions');
    const courseDatalist = document.getElementById('course-suggestions');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');

    // 학과 자동완성 목록 업데이트
    function updateDeptDatalist() {
        if (!courses) return;
        const selectedMajorDiv = majorDivSelect.value;
        const deptList = courses[selectedMajorDiv];
        deptDatalist.innerHTML = '';
        if (deptList) {
            deptList.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.deptNm;
                deptDatalist.appendChild(option);
            });
        }
    }

    // 강의명/학수번호 자동완성 목록 업데이트
    function updateCourseDatalist() {
        if (!courses) return;
        const keyword = courseSearchInput.value.trim().toLowerCase();
        courseDatalist.innerHTML = '';
        if (keyword.length < 2) return;

        const suggestions = new Set();
        const maxSuggestions = 50; // 자동완성 후보 최대 개수

        for (const divList of courses) {
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
    
    // 이벤트 리스너 연결
    majorDivSelect.addEventListener('change', () => {
        deptSearchInput.value = ''; // 전공 유형 변경 시 입력 초기화
        updateDeptDatalist();
    });
    
    // courses.json 로드 완료 시 초기 학과 목록 로드
    window.addEventListener('coursesLoaded', updateDeptDatalist);

    // 자동완성 항목 선택 시 바로 검색 실행
    deptSearchInput.addEventListener('input', function() {
        const inputValue = this.value;
        const options = deptDatalist.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === inputValue) {
                searchDept();
                return;
            }
        }
    });

    courseSearchInput.addEventListener('input', function() {
        updateCourseDatalist(); // 입력 시마다 자동완성 목록 갱신
        const inputValue = this.value;
        const options = courseDatalist.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === inputValue) {
                searchCourseByName();
                return;
            }
        }
    });

    // 1. 학과로 검색 기능
    const deptSearchBtn = document.getElementById('dept-search-btn');

    function renderDeptSearchResult(dept, takenCourseCodes) {
        searchResult.innerHTML = '';
        if (!dept) {
            searchResult.textContent = '해당 학과를 찾을 수 없습니다.';
            return;
        }

        dept.groups.forEach(group => {
            // 그룹 컨테이너
            const groupContainer = document.createElement('div');
            groupContainer.className = 'result-group';

            // 그룹 헤더 (토글 기능)
            const groupHeader = document.createElement('div');
            groupHeader.className = 'result-group-header';
            groupHeader.innerHTML = `<span>${group.groupNm}</span>`;
            
            // 그룹 콘텐츠 (강의 목록)
            const groupContent = document.createElement('div');
            groupContent.className = 'result-group-content';

            group.courses.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.className = 'course-item';
                if (takenCourseCodes.has(course.code)) {
                    courseItem.classList.add('taken-in-search');
                }
                courseItem.textContent = `[${course.code}] ${course.name} (${course.credit}학점)`;
                // 드래그를 위한 데이터 속성 추가
                courseItem.dataset.courseCode = course.code;
                courseItem.dataset.courseName = course.name;
                courseItem.dataset.credit = course.credit;
                courseItem.draggable = true; // 드래그 가능하도록 설정
                courseItem.addEventListener('dragstart', handleDragStart);
                groupContent.appendChild(courseItem);
            });

            // 헤더 클릭 시 접기/펴기
            groupHeader.addEventListener('click', () => {
                groupHeader.classList.toggle('collapsed');
                groupContent.classList.toggle('collapsed');
            });

            groupContainer.appendChild(groupHeader);
            groupContainer.appendChild(groupContent);
            searchResult.appendChild(groupContainer);
        });
    }

    function searchDept() {
        const keyword = deptSearchInput.value.trim();
        const selectedMajorDiv = majorDivSelect.value;

        if (!keyword || !courses) {
            searchResult.textContent = '학과 이름을 입력하세요.';
            return;
        }
        
        const deptList = courses[selectedMajorDiv];
        const foundDept = deptList ? deptList.find(dept => dept.deptNm === keyword) : null;

        const takenCourseCodes = new Set(getTakenCourses().map(course => course.dataset.courseCode));
        renderDeptSearchResult(foundDept, takenCourseCodes);
    }

    deptSearchBtn.addEventListener('click', searchDept);
    deptSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchDept();
        }
    });

    // 2. 강의명으로 검색 기능
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
            // 드래그를 위한 데이터 속성 추가
            courseItem.dataset.courseCode = course.code;
            courseItem.dataset.courseName = course.name;
            courseItem.dataset.credit = course.credit;
            courseItem.draggable = true; // 드래그 가능하도록 설정
            courseItem.addEventListener('dragstart', handleDragStart);
            searchResult.appendChild(courseItem);
        });
    }

    function searchCourseByName() {
        let keyword = courseSearchInput.value.trim().toLowerCase();
        // 자동완성 형식("강의명 (학수번호)")에서 키워드 추출
        const match = keyword.match(/^(.*) \((.*)\)$/);
        if (match) {
            keyword = match[1].toLowerCase(); // 괄호 앞의 강의명 또는 학수번호 전체를 키워드로 사용
        }

        if (keyword.length < 2) {
            searchResult.textContent = '2글자 이상 입력하세요.';
            return;
        }
        if (!courses) {
            searchResult.textContent = '강의 데이터가 로딩 중입니다. 잠시 후 다시 시도해주세요.';
            return;
        }

        const foundCourses = [];
        const addedCodes = new Set(); // 중복 추가 방지
        for (const divList of courses) {
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

    courseSearchBtn.addEventListener('click', searchCourseByName);
    courseSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchCourseByName();
        }
    });
    ///////////////// 강의검색 영역

    ///////////////// 차트 영역
    // 전공유형 플러스 버튼 설정
    const plusBtn = document.getElementById('major-add-btn');
    let menu = null;

    plusBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        // 이미 메뉴가 있으면 제거
        if (menu) {
            menu.remove();
            menu = null;
            return;
        }
        // 메뉴 생성
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

        // 메뉴를 마우스 위치에 표시
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        menu.style.left = mouseX + 'px';
        menu.style.top = mouseY + 'px';

        // 메뉴 항목 추가
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

        // 화면을 벗어나면 위치 조정 (오른쪽/아래)
        const menuRect = menu.getBoundingClientRect();
        if (menuRect.right > window.innerWidth) {
            menu.style.left = (window.innerWidth - menuRect.width - 8) + 'px';
        }
        if (menuRect.bottom > window.innerHeight) {
            menu.style.top = (window.innerHeight - menuRect.height - 8) + 'px';
        }

        // 메뉴 외 클릭 시 닫기
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

    // 초기 차트 업데이트
    updateChart();
    ///////////////// 차트 영역

    ///////////////// 강의 컨테이너 토글
    const courseContainer = document.querySelector('.course-container');
    const toggleBtn = document.getElementById('container-toggle-btn');
    const divider = document.getElementById('container-divider');

    divider.addEventListener('click', () => {
        courseContainer.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
    });
    ///////////////// 강의 컨테이너 토글

    ///////////////// 학기 컨테이너 영역
    const semesterScrollContainer = document.getElementById('semester-scroll-container');
    const semesterGridContainer = document.getElementById('semester-grid-container');
    const addYearBtn = document.getElementById('add-year-btn');
    const semesterRowHeaders = document.getElementById('semester-row-headers');

    const semesterNames = ["1학기", "여름", "2학기", "겨울"];

    // 로우 헤더 생성
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
        const existingYears = Array.from(semesterGridContainer.querySelectorAll('.year-column'))
                                   .map(col => parseInt(col.dataset.year, 10))
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

    function createYearColumn(year) {
        const yearColumn = document.createElement('div');
        yearColumn.className = 'year-column';
        yearColumn.dataset.year = year;

        const header = document.createElement('div');
        header.className = 'semester-header';
        header.innerHTML = `<span>${year}학년</span>`;

        if (year > 4) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-year-btn';
            removeBtn.textContent = '✕';
            removeBtn.title = '학년 삭제';
            removeBtn.addEventListener('click', () => {
                yearColumn.remove();
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

            const creditTotalElement = document.createElement('div');
            creditTotalElement.className = 'semester-credit-total';
            creditTotalElement.textContent = '0학점'; // 초기값
            cell.appendChild(creditTotalElement);

            yearColumn.appendChild(cell);
        });

        return yearColumn;
    }

    function addYearColumn() {
        const nextYear = getNextYearNumber();
        const newYearColumn = createYearColumn(nextYear);
        
        // 정렬된 상태로 삽입
        const columns = Array.from(semesterGridContainer.querySelectorAll('.year-column'));
        const insertionIndex = columns.findIndex(col => parseInt(col.dataset.year, 10) > nextYear);
        
        if (insertionIndex === -1) {
            semesterGridContainer.appendChild(newYearColumn);
        } else {
            semesterGridContainer.insertBefore(newYearColumn, columns[insertionIndex]);
        }
    }

    addYearBtn.addEventListener('click', addYearColumn);

    // 마우스 휠로 가로 스크롤
    semesterScrollContainer.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            semesterScrollContainer.scrollLeft += evt.deltaY;
        }
    });

    // 초기 4개 학년 생성
    for (let i = 1; i <= 4; i++) {
        const newYearColumn = createYearColumn(i);
        semesterGridContainer.appendChild(newYearColumn);
    }
    ///////////////// 학기 컨테이너 영역

    ///////////////// 덱 시스템 이벤트 리스너
    // 덱 탭 클릭 이벤트 - DOM이 완전히 로드된 후 실행
    setTimeout(() => {
        const deckTabs = document.querySelectorAll('.deck-tab');
        console.log('Found deck tabs:', deckTabs.length);
        
        deckTabs.forEach(tab => {
            console.log('Adding event listener to deck tab:', tab.dataset.deck);
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const deckId = tab.dataset.deck;
                console.log('Deck tab clicked:', deckId);
                switchDeck(deckId);
            });
        });

        // 통합된 덱 복사/붙여넣기 버튼 이벤트
        const copyPasteBtn = document.getElementById('deck-copy-paste-btn');
        if (copyPasteBtn) {
            copyPasteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Copy/Paste button clicked for current deck:', currentDeck);
                copyOrPasteDeck();
            });
        }

        // 덱 초기화 버튼 이벤트
        const resetBtn = document.getElementById('deck-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Reset button clicked for current deck:', currentDeck);
                resetDeck(currentDeck);
            });
        }

        // 새 덱 추가 버튼 이벤트
        const addDeckBtn = document.getElementById('add-deck-btn');
        if (addDeckBtn) {
            addDeckBtn.addEventListener('click', addNewDeck);
            console.log('Add deck button event listener added');
        }

        // 히스토리 버튼 이벤트 리스너
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');
        
        if (undoBtn) {
            undoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                undo();
            });
        }
        
        if (redoBtn) {
            redoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                redo();
            });
        }

        // 초기 복사/붙여넣기 버튼 상태 설정
        updateCopyPasteButton();
        
        // 초기 히스토리 버튼 상태 설정
        updateHistoryButtons();
    }, 100);

    // 키보드 단축키 이벤트 리스너
    document.addEventListener('keydown', function(e) {
        // Ctrl+Z (Undo)
        if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
        // Ctrl+Y 또는 Ctrl+Shift+Z (Redo)
        else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
            e.preventDefault();
            redo();
        }
    });

    // 과목 추가/삭제 시 덱 자동 저장을 위한 updateChart 오버라이드
    const originalUpdateChart = window.updateChart || function() {};
    window.updateChart = function() {
        originalUpdateChart();
        saveCurrentDeck();
    };
    ///////////////// 덱 시스템 이벤트 리스너
});

///////////////// 차트 영역
// 현재 수강한 강의 element 목록 반환
function getTakenCourses() {
    const takenCourses = [];
    const codeSet = new Set(); // 중복 제거를 위한 Set
    document.getElementById('semester-grid-container').querySelectorAll('.taken-course').forEach(course => {
        const courseCode = course.dataset.courseCode;
        if (!codeSet.has(courseCode)) {
            codeSet.add(courseCode);
            takenCourses.push(course);
        }
    });
    return takenCourses;
}

// majorDiv 값에 따라 해당 전공유형의 학과 목록 드롭다운 생성
function createDeptDropdown(majorDiv) {
    if (!courses) {
        console.error('courses 데이터가 아직 로드되지 않았습니다.');
        return;
    }
    const deptList = courses[majorDiv];

    // 컨테이너 생성
    const container = document.createElement('div');
    container.className = 'dept-select-container';
    container.dataset.majorDiv = majorDiv;

    // X 버튼 생성
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '4px';
    closeBtn.style.right = '4px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '1em';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.lineHeight = '1';
    closeBtn.setAttribute('aria-label', '닫기');
    closeBtn.onclick = () => container.remove();
    container.appendChild(closeBtn);

    // 레이블 생성
    const label = document.createElement('div');
    label.textContent = majorDivs[majorDiv];
    container.appendChild(label);

    // 드롭다운 생성
    const select = document.createElement('select');
    select.className = 'dept-select';
    deptList.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.deptCd;
        option.textContent = dept.deptNm;
        select.appendChild(option);
    });
    container.appendChild(select);

    // 접기/펼치기 토글 영역 생성
    const groupToggleArea = document.createElement('div');
    groupToggleArea.className = 'group-toggle-area';

    // hr 생성
    const hr = document.createElement('hr');
    groupToggleArea.appendChild(hr);

    // group 리스트를 표시할 div
    const groupListDiv = document.createElement('div');
    groupListDiv.className = 'group-list';
    groupToggleArea.appendChild(groupListDiv);

    container.appendChild(groupToggleArea);

    // 토글 버튼 생성
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'group-toggle-btn';
    toggleBtn.textContent = '△';

    container.appendChild(toggleBtn);

    // 접기/펼치기 동작
    let expanded = true;
    toggleBtn.addEventListener('click', () => {
        expanded = !expanded;
        if (expanded) {
            groupToggleArea.classList.remove('collapsed');
            toggleBtn.textContent = '△';
        } else {
            groupToggleArea.classList.add('collapsed');
            toggleBtn.textContent = '▽';
        }
    });

    container.appendChild(document.createElement('hr'));

    // 드롭다운 변경 시 group 리스트 갱신
    select.addEventListener('change', updateChart);

    document.getElementById('selectContainer').appendChild(container);

    updateChart();
}

// 그룹 초기화
function initGroups(selectContainer) {
    const deptList = courses[selectContainer.dataset.majorDiv];
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

            const minCredit = group.minCredit;
            const maxCredit = group.maxCredit;
            const currentCredit = 0; // 현재 수강학점

            groupContainer.className = 'group-container' + idx % 2; // 짝수/홀수 스타일링을 위해 클래스 추가
            // groupCd를 데이터로 포함
            groupContainer.dataset.groupCd = group.groupCd || '';

            // 현재 수강학점, min, max을 데이터로 포함
            groupContainer.dataset.currentCredit = currentCredit;
            groupContainer.dataset.minCredit = minCredit;
            groupContainer.dataset.maxCredit = maxCredit;

            // 포함되는 수강한 과목들을 보관
            groupContainer._takenCourses = [];

            // 마우스 호버 시 수강 과목 하이라이트
            groupContainer.addEventListener('mouseenter', () => {
                groupContainer._takenCourses.forEach(courseEl => {
                    courseEl.classList.add('highlight');
                });
            });
            groupContainer.addEventListener('mouseleave', () => {
                groupContainer._takenCourses.forEach(courseEl => {
                    courseEl.classList.remove('highlight');
                });
            });

            updateGroupProgress(groupContainer); // 초기 진행률 업데이트

            groupListDiv.appendChild(groupContainer);
        });
    }
}

// 그룹 진행률 업데이트
function updateGroupProgress(groupContainer) {
    const minCredit = parseInt(groupContainer.dataset.minCredit);
    const maxCredit = parseInt(groupContainer.dataset.maxCredit);
    let currentCredit = parseInt(groupContainer.dataset.currentCredit);
    currentCredit = maxCredit > 0 ? Math.min(maxCredit, currentCredit)
        : currentCredit;

    const progress = (currentCredit / minCredit * 100).toFixed(0);
    const groupProgress = groupContainer.querySelector('.group-progress');
    
    // 기존 텍스트 내용
    groupProgress.textContent = `${currentCredit}/${minCredit} (${progress}%)`;
    
    // 진행률에 따른 배경색 변경
    const progressPercent = Math.min(100, parseFloat(progress));
    groupProgress.style.background = `linear-gradient(to right, #ff69b4 ${progressPercent}%, transparent ${progressPercent}%)`;
    groupProgress.style.borderRadius = '4px';
    groupProgress.style.padding = '2px 4px';
    groupProgress.style.transition = 'background 0.3s ease';
    
    // 100% 이상일 때 전체 핑크색
    if (progressPercent >= 100) {
        groupProgress.style.background = '#ff69b4';
        groupProgress.style.color = 'white';
    } else {
        groupProgress.style.color = 'inherit';
    }
}

// 그룹에 과목 추가(학점 업데이트)
function addCourese(groupContainer, course) {
    groupContainer._takenCourses.push(course);

    groupContainer.dataset.currentCredit =
        parseInt(groupContainer.dataset.currentCredit) + parseInt(course.dataset.credit);
    updateGroupProgress(groupContainer);
}

// 차트 전체 업데이트
function updateChart() {
    const myMajors = document.querySelectorAll('.dept-select-container');

    myMajors.forEach(selectContainer => {
        initGroups(selectContainer);
    });

    const takenCourses = getTakenCourses();

    const currentCredit = takenCourses.reduce((sum, course) => sum + (parseInt(course.dataset.credit) || 0), 0);

    document.getElementById('current-credit').textContent = currentCredit;

    // 여러 학과에서 인정되는 강의 목록
    const multipleDeptCourses = [];
    // 각 강의마다 반복
    takenCourses.forEach(course => {
        // 강의가 소속된 그룹
        const groups = [];
        // 각 전공유형에 대해 반복
        myMajors.forEach(selectContainer => {
            const majorDiv = selectContainer.dataset.majorDiv;
            const deptCd = selectContainer.querySelector('.dept-select').value;
            selectContainer.querySelectorAll('.group-container0, .group-container1').forEach(groupContainer => {
                const groupCd = groupContainer.dataset.groupCd;

                const searchRes =
                    courses[majorDiv]
                        .find(dept => dept.deptCd === deptCd)
                        .groups.find(g => g.groupCd === groupCd)
                        .courses.find(c => c.code === course.dataset.courseCode);
                if (searchRes) {
                    // 속하면 그 그룹 추가
                    groups.push(groupContainer);
                }
            });
        });

        if (groups.length == 1) {
            // 하나의 그룹에만 속하는 경우
            addCourese(groups[0], course);
        }
        else if (groups.length > 1) {
            // 여러 그룹에 속하는 경우
            multipleDeptCourses.push({ course, groups });
        }
    });

    // 여러 학과에서 인정되는 강의 처리
    multipleDeptCourses.forEach(({ course, groups }) => {
        // 각 그룹에 대해 강의 추가
        groups.some(groupContainer => {
            if (groupContainer.dataset.minCredit <= groupContainer.dataset.currentCredit) {
                // 최소 학점을 초과한 그룹은 건너뛰기
                return false;
            }
            addCourese(groupContainer, course);
            return true; // 첫 번째 그룹에만 추가
        });
    });

    // 각 semester-cell의 학점 합계 업데이트
    document.querySelectorAll('.semester-cell').forEach(cell => {
        let totalCredits = 0;
        cell.querySelectorAll('.taken-course').forEach(courseEl => {
            totalCredits += parseInt(courseEl.dataset.credit) || 0;
        });
        const creditTotalElement = cell.querySelector('.semester-credit-total');
        if (creditTotalElement) {
            creditTotalElement.textContent = `${totalCredits}학점`;
        }
    });

    // 강의 추가/삭제 시 검색 결과 업데이트
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');

    let currentSearchType = null;
    searchTypeRadios.forEach(radio => {
        if (radio.checked) {
            currentSearchType = radio.value;
        }
    });

    if (currentSearchType === 'byDept' && deptSearchInput.value.trim() !== '') {
        document.getElementById('dept-search-btn').click();
    } else if (currentSearchType === 'byCourseName' && courseSearchInput.value.trim() !== '') {
        document.getElementById('course-search-btn').click();
    }
}

///////////////// 차트 영역