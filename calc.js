const majorDivs = [
    "제1전공",
    "이중전공",
    "복수전공",
    "학사편입",
    "융합전공",
    "심화전공",
    "학생설계전공"
];
let courses = null; // courses.json의 데이터를 저장할 배열

fetch('courses.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 오류');
        }
        return response.json();
    })
    .then(data => {
        courses = data; // courses 설정
    })
    .catch(error => {
        console.error('JSON 파일을 불러오는 중 오류 발생:', error);
    });
///////////////// json 로드

document.addEventListener('DOMContentLoaded', function () {
    // 전공유형 플러스 버튼 설정
    const plusBtn = document.querySelector('.plus-rect-btn');
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
            ghostClass: 'sortable-ghost'
        });
    }
});

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
    select.addEventListener('change', () => updateGroups(container));

    // 최초 1회 group 리스트 표시
    updateGroups(container);

    document.getElementById('selectContainer').appendChild(container);
}

// group 표시 함수
function updateGroups(selectContainer) {
    const deptList = courses[selectContainer.dataset.majorDiv];
    const groupListDiv = selectContainer.querySelector('.group-list');

    groupListDiv.innerHTML = '';
    const selectedDeptCd = selectContainer.querySelector('.dept-select').value;
    const dept = deptList.find(d => d.deptCd === selectedDeptCd);
    if (dept && Array.isArray(dept.groups)) {
        dept.groups.forEach((group, idx) => {
            const groupContainer = document.createElement('div');

            const groupLabel = document.createElement('span');
            groupLabel.textContent = group.groupNm;
            groupLabel.className = 'group-label';
            groupContainer.appendChild(groupLabel);
            const groupProgress = document.createElement('span');
            groupProgress.className = 'group-progress';
            const minCredit = group.minCredit;
            const maxCredit = group.maxCredit;
            let currentCredit = 0; // 현재 수강학점
            // todo 여기에 수강학점 계산 로직 구현하기

            const progress = currentCredit / minCredit * 100;
            groupProgress.textContent = `${currentCredit}/${minCredit} (${progress.toFixed(0)}%)`;
            groupContainer.appendChild(groupProgress);

            groupContainer.className = 'group-container' + idx % 2; // 짝수/홀수 스타일링을 위해 클래스 추가
            // groupCd를 숨겨진 데이터로 포함
            groupContainer.dataset.groupCd = group.groupCd || '';
            groupListDiv.appendChild(groupContainer);
        });
    }
}
