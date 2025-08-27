// 선택자 선언
let display = document.querySelector('.display');       // 현재 월
let prevBtn = document.querySelector('.prev');          // 지난달 버튼
let nextBtn = document.querySelector('.next');          // 다음달 버튼
let days = document.querySelector('.days');             // 날짜

let today = document.querySelector('#btnToday span');   // 오늘 날짜 버튼
let everyBtn = document.querySelector('#btnEvery');     // 매일 일정 버튼
let addBtn = document.querySelector('#btnAdd');         // 일정 추가 버튼

let date = new Date();

// 오늘 년,월,일
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();



// 월, 일 포맷
function rendDisplay() {
    let currentYear = date.getFullYear();

    if (year != currentYear) {
        display.textContent  = year + '년 ' + (month + 1) + '월';
    } else {
        display.textContent  = (month + 1) + '월';
    }
    
    today.textContent  = day;
}



// 일자 포맷
function rendDays() {
    // 첫번째 날짜
    const firstDay = new Date(year, month, 1);
    // 첫번째 요일 - 0:일 ~ 6:토
    const firstDayIndex = firstDay.getDay();
    // 마지막 날짜
    const lastDay = new Date(year, month + 1, 0).getDate();

    // 첫번째 요일 시작 전까지 빈칸 삽입
    for (let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement('div');
        empty.classList.add('empty');
        days.appendChild(empty);
    }

    //날짜 삽입
    for (let i = 1; i <= lastDay; i++) {
        const cell = document.createElement('div');
        cell.classList.add('day');

        const dayWeek = (firstDayIndex + (i - 1)) % 7;

        if (dayWeek === 0) {
            cell.classList.add('sun'); // 일요일
        } else if (dayWeek === 6) {
            cell.classList.add('sat'); // 토요일
        }

        cell.textContent = i;
        days.appendChild(cell);
    }

}

// 오늘 날짜에 테두리 적용
function highlightToday() {
    // 모든 날짜 테두리 초기화 후 오늘 날짜 테두리 적용
    document.querySelectorAll('.days > .day').forEach(d => {
        d.style.borderColor = 'transparent';
        d.style.borderRadius = '';

        if (d.textContent == day) {
            d.style.borderColor = 'var(--main)';
            d.style.borderRadius = '7px';
        }
    });
}


rendDisplay();
rendDays();
highlightToday();

// 지난달 클릭
prevBtn.addEventListener("click", function(){
    month = month - 1;

    if (month < 0) {
        month = 11; // 12월로 설정
        year = year - 1; // 년도 감소
    }

    days.innerHTML = '';

    rendDisplay();
    rendDays();
});

// 다음달 클릭
nextBtn.addEventListener("click", function() {
    month = month + 1;

    if (month > 11) {
        month = 0; // 1월로 설정
        year = year + 1; // 년도 증가
    }

    days.innerHTML = '';

    rendDisplay();
    rendDays();    
});

// 날짜 클릭 시 테두리 변경
days.addEventListener("click", function(e) {
    if (e.target.classList.contains('day')) {

        console.log("클릭된 날짜:", e.target.textContent);

        // 모든 날짜 테두리 초기화
        document.querySelectorAll('.days > .day').forEach(d => {
            d.style.borderColor = 'transparent';
            d.style.borderRadius = '';
        });

        // 클릭된 날짜 테두리 적용
        e.target.style.borderColor = 'var(--main)';
        e.target.style.borderRadius = '7px';
    }
});

// 오늘날짜 클릭
today.addEventListener("click", function() {
    // 오늘 날짜로 이동
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    day = now.getDate();

    days.innerHTML = '';
    rendDisplay();
    rendDays();

    // 모든 날짜 테두리 초기화 후 오늘 날짜 테두리 적용
    document.querySelectorAll('.days > .day').forEach(d => {
        d.style.borderColor = 'transparent';
        d.style.borderRadius = '';

        if (d.textContent == day) {
            d.style.borderColor = 'var(--main)';
            d.style.borderRadius = '7px';
        }
    });
});

// ******************반복일정 modal *************************************************
const dailyPlusBtn = document.querySelector('#dailyPlus');
const dailyModalBody = document.querySelector('#daily-modal .modal-body');


// 매일 일정추가 모달 팝업
everyBtn.addEventListener("click", function() {
    document.getElementById('daily-modal')?.classList.add('open');
});

// 바깥(오버레이) 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (e.target.classList?.contains('modal')) e.target.classList.remove('open');
});

// 일정 추가
dailyPlusBtn.addEventListener("click", function() {
    // 모달바디의 마지막 자식요소
    const lastList = dailyModalBody.lastElementChild;
    const lastLabel = lastList ? lastList.querySelector('label') : null;

    // 입력값 체크
    if (lastLabel && lastLabel.textContent.trim() === '') {
        alert('일정을 입력하세요.');
        // 편집 모드가 아닐 수 있으니 강제 편집 모드 진입
        lastLabel.setAttribute('contenteditable', 'true');
        lastLabel.focus();
        return;
    }

    // 고유 ID 생성
    const id = `elCheck-${(crypto.randomUUID && crypto.randomUUID()) || Date.now()}`;

    const everyList = document.createElement('div');
    everyList.className = 'everyList';

    const elItem = document.createElement('div');
    elItem.className = 'elItem';


    // 체크박스를 디자인 하기 위해서는 label의 for 속성이 필요
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = '';

    //elItem.append(checkbox, label);
    elItem.append(label);

    // 버튼영역
    const elBtn = document.createElement('div');
    elBtn.className = 'elBtn';

    // 저장버튼
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'elSave';
    // 아이콘/태그는 innerHTML 사용
    saveBtn.innerHTML = '<span class="material-symbols-outlined">check</span>';

    // 취소버튼
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'elCancel';
    cancelBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';

    elBtn.append(saveBtn, cancelBtn);

    everyList.append(elItem, elBtn);
    dailyModalBody.appendChild(everyList);

    // 입력 포커스
    label.contentEditable = true;
    label.focus();

});

// 삭제 혹은 저장
dailyModalBody.addEventListener('click', (e) => {
    // closest : 자신과 조상 요소 중에서 가장 가까운 요소
    const cancelBtn = e.target.closest('.elCancel');
    const saveBtn = e.target.closest('.elSave');
    const editBtn = e.target.closest('.elEdit');

    const row = e.target.closest('.everyList');

    // 삭제
    if (cancelBtn) {
        if (row) row.remove();
        return;
    } 
    
    // 저장
    if (saveBtn) {
        if (!row) return;

        const label = row.querySelector('label');
        if (!label) return;

        // 입력값 체크
        if (label.textContent.trim() === '') {
            alert('일정을 입력하세요.');
            
            // 편집 모드가 아닐 수 있으니 강제 편집 모드 진입
            label.setAttribute('contenteditable', 'true');
            label.focus();
            return;
        }

        // 체크박스 없으면 생성
        let checkbox = row.querySelector('input[type="checkbox"]');

        if (!checkbox) {
            const elItem = row.querySelector('.elItem');

             // 이미 plusBtn 클릭 때 라벨에 넣어둔 for 값을 재사용
            const id = label.getAttribute('for'); 

            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;

            // 체크박스를 디자인 하기 위해서는 label의 for 속성이 필요
            label.setAttribute('for', id);

            // 라벨 앞에 삽입 - prepend: 선택한 요소의 자식 노드 목록의 맨 앞에 새로운 노드나 텍스트를 삽입
            elItem.prepend(checkbox);
        }

        // 편집 모드 해제
        label.removeAttribute('contenteditable');

        // 버튼영역 변경(저장 + 삭제 -> 수정 + 삭제)
        const elBtn = row.querySelector('.elBtn');
        if (!elBtn) return;

        elBtn.innerHTML = ''; // 기존 버튼 제거

        // 수정버튼
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'elEdit';
        editBtn.innerHTML = `<span class="material-symbols-outlined">edit</span>`;

        // 삭제버튼
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'elCancel';
        cancelBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';

        elBtn.append(editBtn, cancelBtn);
    }

    // 수정
    if (editBtn) {
        const label = row.querySelector('label');
        if (!label) return;

        // 편집모드
        label.contentEditable = true;
        label.focus();

        // 체크박스 있으면 제거
        let checkbox = row.querySelector('input[type="checkbox"]');

        if (checkbox) {
            checkbox.remove();
        }

        const elBtn = row.querySelector('.elBtn');
        elBtn.innerHTML = ''; // 기존 버튼 제거

        // 저장버튼
        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.className = 'elSave';
        saveBtn.innerHTML = '<span class="material-symbols-outlined">check</span>';

        // 삭제버튼
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'elCancel';
        cancelBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';

        elBtn.append(saveBtn, cancelBtn);
    }
});


// ******************하루하루일정 modal *************************************************
const dayPlusBtn = document.querySelector('#dayPlus');
const dayModalBody = document.querySelector('#day-modal .modal-body');

addBtn.addEventListener("click", function() {
    document.getElementById('day-modal')?.classList.add('open');

    // 클릭한 날짜 가져오기
    const selectedDayElem = document.querySelector('.days > .day[style*="var(--main)"]');
    let selectDay = selectedDayElem.textContent

    document.querySelector('#day-modal .modal-header h2').textContent = `${selectDay}일`;

    // 초기화
    dayModalBody.innerHTML = ''; 
    
    // 반복일정을 가져온다.
    document.querySelectorAll('.everyList').forEach(d => {
        // 수정하지 못하도록 버튼영역은 제거
        const clone = d.cloneNode(true);
        const btnArea = clone.querySelector('.elBtn');

        // label의 for, checkbox id 변경
        const label = clone.querySelector('label');
        const oldFor = label.getAttribute('for');

        const checkbox = clone.querySelector('input[type="checkbox"]');
        const oldChkboxId = checkbox.id;


        btnArea.remove();

        dayModalBody.appendChild(clone);
    });    
});


