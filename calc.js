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
let decks = {
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

// --- 쿠키 관련 함수 ---
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// --- 상태 저장 및 복원 ---
function saveStateToCookie() {
    saveCurrentDeck(); // 현재 DOM의 수강과목 정보를 decks 객체에 최종 반영

    const majorSelections = [];
    document.querySelectorAll('.dept-select-container').forEach(container => {
        majorSelections.push({
            majorDiv: container.dataset.majorDiv,
            year: container.querySelector('.year-select').value,
            deptCd: container.querySelector('.dept-select').value
        });
    });

    const appState = {
        decks,
        deckCount,
        currentDeck,
        majorSelections
    };

    try {
        setCookie('graduationCalculatorState', JSON.stringify(appState), 365);
    } catch (e) {
        console.error("쿠키 저장 오류:", e);
    }
}

function loadStateFromCookie() {
    const savedState = getCookie('graduationCalculatorState');
    if (!savedState) return;

    try {
        const appState = JSON.parse(savedState);

        // 덱 데이터 복원
        decks = appState.decks || decks;
        deckCount = appState.deckCount || deckCount;
        currentDeck = appState.currentDeck || currentDeck;

        // 덱 탭 UI 재생성
        const deckTabsContainer = document.querySelector('.deck-tabs');
        const addBtn = document.getElementById('add-deck-btn');
        deckTabsContainer.querySelectorAll('.deck-tab').forEach(tab => tab.remove());
        
        for (let i = 1; i <= deckCount; i++) {
            const deckId = `deck${i}`;
            if (decks[deckId]) {
                const newTab = document.createElement('button');
                newTab.className = 'deck-tab';
                newTab.dataset.deck = deckId;
                newTab.textContent = decks[deckId].name;
                newTab.addEventListener('click', () => switchDeck(deckId));
                deckTabsContainer.insertBefore(newTab, addBtn);
            }
        }
        addBtn.style.display = deckCount >= maxDeckCount ? 'none' : 'flex';

        // 전공 선택 영역 복원
        const selectContainer = document.getElementById('selectContainer');
        selectContainer.innerHTML = ''; // 기존 영역 초기화
        if (appState.majorSelections) {
            appState.majorSelections.forEach(selection => {
                createDeptDropdown(selection.majorDiv, selection.year, selection.deptCd);
            });
        }
        
        // 현재 덱의 과목들을 화면에 로드하고 전체 UI 업데이트
        loadDeck(currentDeck);
        updateDeckTabs();
        updateChart({ save: false }); // 첫 로드 시에는 다시 저장하지 않음

    } catch (e) {
        console.error("쿠키 로드 오류:", e);
    }
}


// 통합된 복사/붙여넣기 함수
function copyOrPasteDeck() {
    if (copiedDeckData) {
        pasteDeck(currentDeck);
        copiedDeckData = null;
        updateCopyPasteButton();
    } else {
        if (!decks[currentDeck]) return;
        saveCurrentDeck();
        copiedDeckData = JSON.parse(JSON.stringify(decks[currentDeck])); // Deep copy
        updateCopyPasteButton();
    }
}

// 덱 초기화 함수
function resetDeck(deckId) {
    if (!decks[deckId] || !confirm(`"${decks[deckId].name}"의 모든 과목을 초기화하시겠습니까?`)) return;
    
    decks[deckId].courses = [];
    decks[deckId].totalCredits = 0;
    
    if (currentDeck === deckId) {
        document.querySelectorAll('.taken-course').forEach(course => course.remove());
        updateChart();
    } else {
        saveStateToCookie();
    }
}

// 덱 붙여넣기 함수
function pasteDeck(targetDeckId) {
    if (!copiedDeckData || !decks[targetDeckId]) return;
    
    saveCurrentDeck();
    decks[targetDeckId] = JSON.parse(JSON.stringify(copiedDeckData));
    
    if (currentDeck === targetDeckId) {
        loadDeck(targetDeckId);
        updateChart();
    } else {
        saveStateToCookie();
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
    saveCurrentDeck();
    currentDeck = deckId;
    updateDeckTabs();
    loadDeck(deckId);
    updateChart();
}

// 현재 덱 저장
function saveCurrentDeck() {
    if (!decks[currentDeck]) return;
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
    document.querySelectorAll('.taken-course').forEach(course => course.remove());
    
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

function undo() {
    if (currentHistoryIndex > 0) restoreFromHistory(currentHistoryIndex - 1);
}

function redo() {
    if (currentHistoryIndex < historyStack.length - 1) restoreFromHistory(currentHistoryIndex + 1);
}

function updateHistoryButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    if(undoBtn) undoBtn.disabled = currentHistoryIndex <= 0;
    if(redoBtn) redoBtn.disabled = currentHistoryIndex >= historyStack.length - 1;
}

// 덱 데이터 로드
function loadDeck(deckId) {
    document.querySelectorAll('.taken-course').forEach(course => course.remove());
    if (!decks[deckId] || !decks[deckId].courses) return;

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
    saveCurrentDeck();
    
    decks[newDeckId] = { name: `덱${deckCount}`, courses: [], totalCredits: 0 };
    
    const deckTabs = document.querySelector('.deck-tabs');
    const newTab = document.createElement('button');
    newTab.className = 'deck-tab';
    newTab.dataset.deck = newDeckId;
    newTab.textContent = `덱${deckCount}`;
    newTab.addEventListener('click', () => switchDeck(newDeckId));
    
    // 플러스 버튼 앞에 삽입
    const addBtn = document.getElementById('add-deck-btn');
    deckTabs.insertBefore(newTab, addBtn);
    
    if (deckCount >= maxDeckCount) {
        if (addBtn) {
            addBtn.style.display = 'none';
        }
    }
}

Promise.all(years.map(year =>
    fetch(`${year}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`네트워크 오류: ${year}.json`);
            }
            return response.json();
        })
        .then(data => {
            courses[year] = data;
        })
)).then(() => {
    console.log('모든 강의 데이터 로드 완료:', courses);
    // 데이터 로드 완료 후 커스텀 이벤트 발생
    window.dispatchEvent(new Event('coursesLoaded'));
}).catch(error => {
    console.error('JSON 파일을 불러오는 중 오류 발생:', error);
});
///////////////// json 로드

let draggedCourse = null;

function handleDragStart(e) {
    draggedCourse = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({
        code: draggedCourse.dataset.courseCode,
        name: draggedCourse.dataset.courseName,
        credit: draggedCourse.dataset.credit,
        isTakenCourse: draggedCourse.classList.contains('taken-course')
    }));
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
    takenCourse.title = `${courseData.name} (${courseData.credit}학점)`;
    takenCourse.draggable = true;
    takenCourse.addEventListener('dragstart', handleDragStart);
    takenCourse.addEventListener('dragend', handleDragEnd);
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
    
    saveToHistory();
    updateChart();
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    if (e.target.classList.contains('taken-course')) {
        if (e.dataTransfer.dropEffect === 'none') {
            e.target.remove();
            saveToHistory();
        }
    }
    draggedCourse = null;
    updateChart();
}

document.addEventListener('DOMContentLoaded', function () {
    ///////////////// 강의검색 영역
    const majorDivSelect = document.getElementById('majorDiv-select');
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

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}년`;
        searchYearSelect.appendChild(option);
    });
    searchYearSelect.value = years[years.length - 1]; // 최신 년도로 기본 설정

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

    const deptDatalist = document.getElementById('dept-suggestions');
    const courseDatalist = document.getElementById('course-suggestions');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');

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

    function updateCourseDatalist() {
        if (!courses) return;
        const keyword = courseSearchInput.value.trim().toLowerCase();
        courseDatalist.innerHTML = '';
        if (keyword.length < 2) return;

        const suggestions = new Set();
        const maxSuggestions = 50;

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
    
    majorDivSelect.addEventListener('change', () => {
        deptSearchInput.value = '';
        updateDeptDatalist();
    });
    
    window.addEventListener('coursesLoaded', updateDeptDatalist);

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


    // 1. 학과로 검색 기능
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
                courseItem.draggable = true;
                courseItem.addEventListener('dragstart', handleDragStart);
                groupContent.appendChild(courseItem);
            });

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
            courseItem.draggable = true;
            courseItem.addEventListener('dragstart', handleDragStart);
            searchResult.appendChild(courseItem);
        });
    }

    function searchCourseByName() {
        let keyword = courseSearchInput.value.trim().toLowerCase();
        const selectedYear = searchYearSelect.value;
        // 자동완성 형식("강의명 (학수번호)")에서 키워드 추출
        const match = keyword.match(/^(.*) \((.*)\)$/);
        if (match) {
            keyword = match[1].toLowerCase();
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

    /* 전공유형 드래그 순서변경 설정
    const selectContainer = document.getElementById('selectContainer');
    if (selectContainer) {
        new Sortable(selectContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: function (evt) { updateChart(); } // 드래그 후 차트 업데이트
        });
    }
    */

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

    const semesterScrollContainer = document.getElementById('semester-scroll-container');
    const semesterGridContainer = document.getElementById('semester-grid-container');
    const addYearBtn = document.getElementById('add-year-btn');
    const semesterRowHeaders = document.getElementById('semester-row-headers');

    const semesterNames = ["1학기", "여름", "2학기", "겨울"];

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
                updateChart();
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
            creditTotalElement.textContent = '0학점';
            cell.appendChild(creditTotalElement);

            yearColumn.appendChild(cell);
        });

        return yearColumn;
    }

    function addYearColumn() {
        const nextYear = getNextYearNumber();
        const newYearColumn = createYearColumn(nextYear);
        
        const columns = Array.from(semesterGridContainer.querySelectorAll('.year-column'));
        const insertionIndex = columns.findIndex(col => parseInt(col.dataset.year, 10) > nextYear);
        
        if (insertionIndex === -1) {
            semesterGridContainer.appendChild(newYearColumn);
        } else {
            semesterGridContainer.insertBefore(newYearColumn, columns[insertionIndex]);
        }
    }

    addYearBtn.addEventListener('click', addYearColumn);

    semesterScrollContainer.addEventListener('wheel', (evt) => {
        if (evt.deltaY !== 0) {
            evt.preventDefault();
            semesterScrollContainer.scrollLeft += evt.deltaY;
        }
    });

    for (let i = 1; i <= 4; i++) {
        const newYearColumn = createYearColumn(i);
        semesterGridContainer.appendChild(newYearColumn);
    }

    document.getElementById('deck-copy-paste-btn').addEventListener('click', copyOrPasteDeck);
    document.getElementById('deck-reset-btn').addEventListener('click', () => resetDeck(currentDeck));
    document.getElementById('add-deck-btn').addEventListener('click', addNewDeck);
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);

    updateCopyPasteButton();
    updateHistoryButtons();

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
        else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && (e.key === 'Z' || e.key === 'z'))) {
            e.preventDefault();
            redo();
        }
    });

    // 과목 추가/삭제 시 덱 자동 저장 - updateChart 함수 오버라이드 수정
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
    /*
    const takenCourses = [];
    const semesterCells = document.querySelectorAll('.semester-cell');
    semesterCells.forEach(cell => {
        cell.querySelectorAll('.taken-course').forEach(course => {
            takenCourses.push(course);
        });
    });
    // 재수강을 걸러야 하므로 과목 코드로 중복 제거 (나중에 필요시 구현)
    return takenCourses;*/
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
    const selectedYear = years[years.length - 1]; // 기본값으로 최신 년도
    if (!courses[selectedYear]) {
        console.error('courses 데이터가 아직 로드되지 않았습니다.');
        return;
    }
    const deptList = courses[selectedYear][majorDiv];

    const container = document.createElement('div');
    container.className = 'dept-select-container';
    container.dataset.majorDiv = majorDiv;

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

    // 헤더 (레이블 + 년도 선택)
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const label = document.createElement('div');
    label.textContent = majorDivs[majorDiv];
    header.appendChild(label);

    const yearSelect = document.createElement('select');
    yearSelect.className = 'year-select';
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}년`;
        yearSelect.appendChild(option);
    });
    yearSelect.value = selectedYear;
    header.appendChild(yearSelect);
    container.appendChild(header);


    // 드롭다운 생성
    const select = document.createElement('select');
    select.className = 'dept-select';
    if (deptList) {
        deptList.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.deptCd;
            option.textContent = dept.deptNm;
            select.appendChild(option);
        });
    }
    if (selectedDeptCd) {
        select.value = selectedDeptCd;
    }
    container.appendChild(select);

    // 년도 변경 시 학과 목록 업데이트
    yearSelect.addEventListener('change', () => {
        const newYear = yearSelect.value;
        const newDeptList = courses[newYear][majorDiv];
        select.innerHTML = '';
        newDeptList.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.deptCd;
            option.textContent = dept.deptNm;
            select.appendChild(option);
        });
        updateChart();
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
    select.addEventListener('change', updateChart);
    document.getElementById('selectContainer').appendChild(container);
    
    if (!selectedYear) { // 사용자가 직접 추가한 경우에만 차트 업데이트 및 저장
        updateChart();
    }
}

function initGroups(selectContainer) {
    const year = selectContainer.querySelector('.year-select').value;
    const majorDiv = selectContainer.dataset.majorDiv;
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
// 그룹 진행률 업데이트
function updateGroupProgress(groupContainer) {
    const minCredit = parseInt(groupContainer.dataset.minCredit);
    const maxCredit = parseInt(groupContainer.dataset.maxCredit);
    let currentCredit = parseInt(groupContainer.dataset.currentCredit);
    currentCredit = maxCredit > 0 ? Math.min(maxCredit, currentCredit) : currentCredit;

    const progress = (currentCredit / minCredit * 100).toFixed(0);
    const groupProgress = groupContainer.querySelector('.group-progress');
    
    groupProgress.textContent = `${currentCredit}/${minCredit} (${progress}%)`;
    
    const progressPercent = Math.min(100, parseFloat(progress));
    groupProgress.style.background = `linear-gradient(to right, #ff69b4 ${progressPercent}%, transparent ${progressPercent}%)`;
    
    if (progressPercent >= 100) {
        groupProgress.style.color = 'white';
    } else {
        groupProgress.style.color = 'inherit';
    }
}
// 그룹에 과목 추가(학점 업데이트)
function addCourese(groupContainer, course) {
    groupContainer._takenCourses.push(course);
    groupContainer.dataset.currentCredit = parseInt(groupContainer.dataset.currentCredit) + parseInt(course.dataset.credit);
    updateGroupProgress(groupContainer);
}

function updateChart(options = { save: true }) {
    const myMajors = document.querySelectorAll('.dept-select-container');
    myMajors.forEach(initGroups);

    const takenCourses = getTakenCourses();
    const currentCredit = takenCourses.reduce((sum, course) => sum + (parseInt(course.dataset.credit) || 0), 0);
    document.getElementById('current-credit').textContent = currentCredit;

    const multipleDeptCourses = [];
    takenCourses.forEach(course => {
        const groups = [];
        myMajors.forEach(selectContainer => {
            const majorDiv = selectContainer.dataset.majorDiv;
            const deptCd = selectContainer.querySelector('.dept-select').value;
            if (!courses[year] || !courses[year][majorDiv]) return;
            
            selectContainer.querySelectorAll('.group-container0, .group-container1').forEach(groupContainer => {
                const groupCd = groupContainer.dataset.groupCd;

                const searchRes =
                    courses[year][majorDiv]
                        .find(dept => dept.deptCd === deptCd)
                        .groups.find(g => g.groupCd === groupCd)
                        .courses.find(c => c.code === course.dataset.courseCode);
                if (searchRes) {
                    groups.push(groupContainer);
                }
            });
        });

        if (groups.length === 1) {
            addCourese(groups[0], course);
        } else if (groups.length > 1) {
            multipleDeptCourses.push({ course, groups });
        }
    });

    multipleDeptCourses.forEach(({ course, groups }) => {
        // 각 그룹에 대해 강의 추가
        groups.some(groupContainer => {
            if (parseInt(groupContainer.dataset.minCredit) > 0 &&
                parseInt(groupContainer.dataset.currentCredit) >= parseInt(groupContainer.dataset.minCredit)) {
                // 최소 학점을 초과한 그룹은 건너뛰기
                return false;
            }
            addCourese(groupContainer, course);
            return true; // 첫 번째 그룹에만 추가
        });
    });

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

    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    const deptSearchInput = document.getElementById('dept-search-input');
    const courseSearchInput = document.getElementById('course-search-input');

    let currentSearchType = null;
    searchTypeRadios.forEach(radio => {
        if (radio.checked) currentSearchType = radio.value;
    });

    if (currentSearchType === 'byDept' && deptSearchInput.value.trim() !== '') {
        document.getElementById('dept-search-btn').click();
    } else if (currentSearchType === 'byCourseName' && courseSearchInput.value.trim() !== '') {
        document.getElementById('course-search-btn').click();
    }
    
    if (options.save) {
        saveStateToCookie();
    }
}
