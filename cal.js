// 선택자 선언
let display = document.querySelector('.display');   // 현재 월
let prevBtn = document.querySelector('.prev');      // 지난달 버튼
let nextBtn = document.querySelector('.next');      // 다음달 버튼
let today = document.querySelector('#btnToday span'); 
let days = document.querySelector('.days');         // 날짜

let date = new Date();

// 오늘 년,월,일
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();



// 월, 일 포맷
function rendDisplay() {
    let currentYear = date.getFullYear();

    if (year != currentYear) {
        display.innerHTML = year + '년 ' + (month + 1) + '월';
    } else {
        display.innerHTML = (month + 1) + '월';
    }
    
    today.innerHTML = day;
}

rendDisplay();

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
        const day = document.createElement('div');
        day.classList.add('day');

        const dayWeek = (firstDayIndex + (i - 1)) % 7;

        if (dayWeek === 0) {
            day.classList.add('sun'); // 일요일
        } else if (dayWeek === 6) {
            day.classList.add('sat'); // 토요일
        }

        day.textContent = i;
        days.appendChild(day);
    }

}

rendDays();

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
        year = year + 1; // 년도 감소
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

    // 모든 날짜 테두리 초기화
    document.querySelectorAll('.days > .day').forEach(d => {
        d.style.borderColor = 'transparent';
        d.style.borderRadius = '';

        if (d.textContent == day) {
            d.style.borderColor = 'var(--main)';
            d.style.borderRadius = '7px';
        }
    });
});