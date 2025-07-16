const majorDivs = [
    "제1전공",
    "이중전공",
    "복수전공",
    "학사편입",
    "융합전공",
    "심화전공",
    "학생설계전공"
];
fetch('courses.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 오류');
        }
        return response.json();
    })
    .then(data => {
        courses = data; // courses 설정
        // 데이터 로드 완료 후 커스텀 이벤트 발생
        window.dispatchEvent(new Event('coursesLoaded'));
    })
    .catch(error => {
        console.error('JSON 파일을 불러오는 중 오류 발생:', error);
    });
///////////////// json 로드

document.addEventListener('DOMContentLoaded', function () {
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

    function renderDeptSearchResult(dept) {
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
                courseItem.textContent = `[${course.code}] ${course.name} (${course.credit}학점)`;
                // 드래그를 위한 데이터 속성 추가
                courseItem.dataset.courseCode = course.code;
                courseItem.dataset.courseName = course.name;
                courseItem.dataset.credit = course.credit;
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

        renderDeptSearchResult(foundDept);
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

    function renderCourseSearchResult(foundCourses) {
        searchResult.innerHTML = '';
        if (foundCourses.length === 0) {
            searchResult.textContent = '해당 강의를 찾을 수 없습니다.';
            return;
        }
        foundCourses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.textContent = `[${course.code}] ${course.name} (${course.credit}학점)`;
            // 드래그를 위한 데이터 속성 추가
            courseItem.dataset.courseCode = course.code;
            courseItem.dataset.courseName = course.name;
            courseItem.dataset.credit = course.credit;
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
        renderCourseSearchResult(foundCourses);
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

    // 전공유형 드래그 순서변경 설정
    const selectContainer = document.getElementById('selectContainer');
    if (selectContainer) {
        new Sortable(selectContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: function (evt) { updateChart(); } // 드래그 후 차트 업데이트
        });
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
    semesterHeader.textContent = 'ㅤ';
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
            // 각 셀에는 이제 헤더를 넣지 않습니다.
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
});

///////////////// 차트 영역
// 현재 수강한 강의 element 목록 반환
function getTakenCourses() {
    // todo 여기에 현재 수강한 강의 목록을 반환하는 로직 구현하기
    // 재수강을 걸러야 하므로 과목 코드로 중복 제거
    // 각 element는 dataset.credit, dataset.courseCd를 포함해야 함

    //test
    const codes = ["COSE101", "COSE213"];

    const testCourses = [];
    codes.forEach(code => {
        const course = document.createElement('div');
        course.dataset.credit = 3;
        course.dataset.courseCd = code;
        testCourses.push(course);
    });
    return testCourses;
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
    groupProgress.textContent = `${currentCredit}/${minCredit} (${progress}%)`;
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

    const targetCredit = parseInt(document.getElementById('target-credit').value, 10);
    const currentCredit = takenCourses.reduce((sum, course) => sum + (parseInt(course.dataset.credit) || 0), 0);
    const percent = ((currentCredit / targetCredit) * 100).toFixed(0);

    document.getElementById('current-credit').textContent = currentCredit;
    document.getElementById('credit-percent').textContent = `(${percent}%)`;

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
                        .courses.find(c => c.code === course.dataset.courseCd);
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
}
///////////////// 차트 영역