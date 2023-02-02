import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const inputDate = document.getElementById('datetime-picker');
const startTimerBtn = document.querySelector('[data-start]');

startTimerBtn.addEventListener('click', startTimerForSale);

startTimerBtn.disabled = true;

let dateStartSale = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      dateStartSale = selectedDates[0].getTime();
      startTimerBtn.disabled = false;
      Notiflix.Notify.success('Press the start button to start the timer');
      countDownTimeToSale(dateStartSale);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }
  },
};

let flp = flatpickr(inputDate, options);

function countDownTimeToSale() {
  const deltaTime = dateStartSale - Date.now();

  if (deltaTime <= 0) {
    clearInterval(intervalId);
    console.log('Очищаем и итервал');
    Notiflix.Notify.success('Sales start');
    // console.log('После остановки intervalId - ', intervalId);
    return;
  }

  updateTimerClock(convertMs(deltaTime));
}

// function stopTimerForSale() {

// }

function startTimerForSale() {
  startTimerBtn.disabled = true;
  intervalId = setInterval(countDownTimeToSale, 1000);
}

function updateTimerClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
  // console.log(`${days}:${hours}:${minutes}:${seconds}`);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
