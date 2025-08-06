// 선택자 선언
let display = document.querySelector('.display');   // 현재 월
let prevBtn = document.querySelector('.prev');      // 지난달 버튼
let nextBtn = document.querySelector('.next');      // 다음달 버튼
let today = document.querySelector('#btnToday span'); 
let days = document.querySelector('.days');         // 날짜

let date = new Date();

// 오늘 년,월,일
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();



// 월, 일 포맷
function rendDisplay() {
    display.innerHTML = month + 1;
    today.innerHTML = day;
}

rendDisplay();

// 일자 포맷
function rendDays() {
    // 첫번째 날짜
    const firstDay = new Date(year, month, 1);
    // 마지막 요일 - 0:일 ~ 6:토
    const firstDayIndex = firstDay.getDay();
    // 마지막 날짜
    const lastDay = new Date(year, month + 1, 0).getDate();

    // 첫번째 요일 시작 전까지 빈칸 삽입
    for (let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement('div');
        days.appendChild(empty);
    }

    //날짜 삽입
        for (let i = 1; i <= lastDay; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        days.appendChild(day);
    }
}

rendDays();