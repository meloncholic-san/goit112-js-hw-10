import iziToast from "izitoast";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


const refs = {
    inputDatetime: document.querySelector("#datetime-picker"),
    startButton: document.querySelector("button[data-start]"),
    daysValue: document.querySelector(".value[data-days]"),
    hoursValue: document.querySelector(".value[data-hours]"),
    minutesValue: document.querySelector(".value[data-minutes]"),
    secondsValue: document.querySelector(".value[data-seconds]"),
};

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



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        refs.startButton.disabled = true;
        if (selectedDates.length > 0) {
            userSelectedDate = selectedDates[0];
            let currentTime = new Date();

            if (userSelectedDate < currentTime) {
                iziToast.show({
                    title: "Error",
                    message: "Please choose a date in the future!",
                    color: "red",
                    position: "topRight",
                    timeout: 3000,
                  });
                return;
            }
            refs.startButton.disabled = false;
        }
    },
  };
  


function timerStartHandler(){
    refs.startButton.disabled = true;
    refs.inputDatetime.disabled = true;
    const timerId = setInterval(() => {
    currentTime = new Date();
    const timerTime = userSelectedDate - currentTime;
    displayTimer(convertMs(timerTime));
    if (timerTime <= 0) {
        clearInterval(timerId);
        displayTimer(convertMs(0))
        refs.inputDatetime.disabled = false;
        refs.startButton.disabled = false;

        iziToast.success({
            title: 'OK',
            message: 'Successfully inserted record!',
            message: 'Time is up!',
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            timeout: 3000,
        });
        return;
    }
    },1000);
};


function displayTimer ({days, hours, minutes, seconds}) {
    refs.daysValue.textContent = String(days).padStart(2, '0');
    refs.hoursValue.textContent = String(hours).padStart(2, '0');
    refs.minutesValue.textContent = String(minutes).padStart(2, '0');
    refs.secondsValue.textContent = String(seconds).padStart(2, '0');
  }
  


let currentTime = null;
let userSelectedDate = null;



refs.startButton.disabled = true;
flatpickr(refs.inputDatetime, options);
refs.startButton.addEventListener('click', timerStartHandler);