const buttons = $('.saveBtn');
const textInput = $('textarea');
const hours = $('.hour');
const previous = $('.prev');
const next = $('.next');
let currentDay = $('#currentDay')
let calendarDate = moment();
let today = moment();

function loadEvents(currentDay) {
    for(let i = 0; i < 9; i++) {
        textInput[i].textContent = '';
        let calendarEvent = JSON.parse(localStorage.getItem(`${hours[i].textContent}`+`${currentDay}`))
        if(calendarEvent && calendarEvent.date === calendarDate.format('dddd, MMMM Do YYYY')) {
            textInput[i].textContent = calendarEvent.text;
        }
    }
}

function initialLoad() {
    currentDay.text(calendarDate.format('dddd, MMMM Do YYYY'));
    for(let i = 0; i < 9; i++) {
        if(today.isBefore(calendarDate)) {
            textInput[i].setAttribute('class', 'future');
        }
        else if(today.isAfter(calendarDate)) {
            textInput[i].setAttribute('class', 'past')
        }
        else {
            let clockHour = parseInt(hours[i].textContent);
            if(hours[i].textContent.includes('PM') && clockHour !== 12) {
                clockHour += 12;
            }
            textInput[i].classList = '';
            if(clockHour < today.format('HH')) {
                textInput[i].setAttribute('class', 'past');
            }
            else if(clockHour == today.format('HH')) {
                textInput[i].setAttribute('class', 'present');
            }
            else {
                textInput[i].setAttribute('class', 'future');
            }
        }
    }
    loadEvents(currentDay[0].textContent);
}

buttons.click(function(event) {

    if(event.target.parentElement.children[1].value !== '') {
        let note = {
            time: event.target.parentElement.children[0].textContent,
            text: event.target.parentElement.children[1].value,
            date: currentDay[0].innerText
        }
        localStorage.setItem(`${note.time}`+`${note.date}`, JSON.stringify(note));
    }
    else {
        console.log("No note to save");
    }
})

next.click(function(event) {
    calendarDate.add(1, 'd');
    initialLoad();
})

previous.click(function(event) {
    calendarDate.subtract(1, 'd');
    initialLoad()
})

initialLoad();