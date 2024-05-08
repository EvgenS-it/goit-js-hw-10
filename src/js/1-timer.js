import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
const startBtn = document.querySelector('button[data-start]');
const inputDate = document.querySelector('input#datetime-picker');

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            startBtn.classList.add("deactivated");

            iziToast.show({
                message: "Please choose a date in the future",
                position: "topRight",
                color: "red"
            });

        } else {
        userSelectedDate = selectedDates[0];
        startBtn.classList.remove("deactivated");
        };
    },
};

flatpickr(inputDate, options);

startBtn.classList.add("deactivated");

startBtn.addEventListener("click", (event) => {
    event.currentTarget.classList.add("deactivated");

    const intervalId = setInterval(() => {
        const currentDate = new Date();
        const deltaTime = userSelectedDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        if (deltaTime < 0) {
            clearInterval(intervalId);
            startBtn.classList.remove("deactivated");
            return;
        }

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);
    }, 1000);
});