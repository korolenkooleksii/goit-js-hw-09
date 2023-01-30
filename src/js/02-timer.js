import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const inputDate = document.getElementById('datetime-picker');
const startTimerBtn = document.querySelector('[data-start]');

startTimerBtn.disabled = true;
let timeStartSaleInUnix = null;

// startTimerBtn.addEventListener('click', () => {});
// inputDate.addEventListener('focus', inputTimeForStartSale);

const timer = {
  timeStartSale: 100000000,
  start() {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.timeStartSale - (currentTime - startTime);
      const time = convertMs(deltaTime);
      
      updateTimerClock(time);
    }, 1000);

    
  },
};

// timer.start();

function updateTimerClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}



function inputTimeForStartSale() {
  timeAAA();
}

function timeAAA() {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };
  let dateStartSale = flatpickr(inputDate, options);
  console.log(dateStartSale.selectedDates);
  timeStartSaleInUnix = new Date(dateStartSale.selectedDates).getTime();
  console.log('timeStartSaleInUnix', timeStartSaleInUnix);
  return timeStartSaleInUnix;
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
