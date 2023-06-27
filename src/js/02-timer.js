import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate = null;
let timerId = null;

const refs = {
    startButton: document.querySelector(`[data-start]`),
    spanDays: document.querySelector(`[data-days]`),
    spanHours: document.querySelector(`[data-hours]`),
    spanMinutes: document.querySelector(`[data-minutes]`),
    spanSeconds: document.querySelector(`[data-seconds]`),
}

const timePicker = flatpickr("#datetime-picker", {enableTime: true, time_24hr: true, defaultDate: new Date(),  minuteIncrement: 1, onClose: validDate,});



    refs.startButton.addEventListener(`click`, () => {
        timerId = setInterval(timerFn, 1000);
    });

    const timerFn = () => {
        const difference = selectedDate - Date.now();
        if(difference < 1000) {
            clearInterval(timerId);
            refs.spanSeconds.textContent = "00";
            return;
        }
        
        renderTimer(convertMs(difference));
    }



    function renderTimer({ days, hours, minutes, seconds }) {
        refs.spanDays.textContent = addLeadingZero(days);
        refs.spanHours.textContent = addLeadingZero(hours);
        refs.spanMinutes.textContent = addLeadingZero(minutes);
        refs.spanSeconds.textContent = addLeadingZero(seconds);
    }


    function addLeadingZero(value) {
        return value.toString().padStart(2, `0`);
    }

    function validDate(selectedDates) {
        if(Date.now() > selectedDates[0].getTime()) {
            Notify.failure(`Please choose a date in the future`);
            refs.startButton.setAttribute(`disabled`, ``);
           } else if(refs.startButton.hasAttribute(`disabled`)) {
            refs.startButton.removeAttribute(`disabled`);
           }
    
           selectedDate = selectedDates[0].getTime();
    }

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

      