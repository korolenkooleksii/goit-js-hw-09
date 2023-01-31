import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const inputDate = document.getElementById('datetime-picker');
const startTimerBtn = document.querySelector('[data-start]');

startTimerBtn.disabled = true;

// startTimerBtn.addEventListener('click', () => {});


const timer = {
  timeStartSale: null,
  nowDate: 0,

  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      // console.log('Выбрали дату - ', selectedDates[0]);
      this.timeStartSale = selectedDates[0].getTime();
      console.log('timeStartSale после выбора даты - ', this.timeStartSale);
      this.compareDate();
    },
  },

  getTimeToday() {
    let flp = flatpickr(inputDate, this.options);
    this.nowDate = new Date(flp.selectedDates).getTime();
    console.log('nowDate при запуске', this.nowDate);
  },

  compareDate() {
    console.log('Дата текущая - ', this.nowDate);
    console.log('Дата выбора  - ', this.timeStartSale);

  },

  start() {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.timeStartSale - (currentTime - startTime);
      const time = convertMs(deltaTime);

      updateTimerClock(time);
    }, 1000);
  },

  inputDateStartSale() {
    // const startTime = Date.now();
    let dateStartSale = flatpickr(inputDate, this.options);
    const timeStartSaleInUnix = new Date(dateStartSale.selectedDates).getTime();
    // console.log(this.timeStartSale);
    dateStartSale.onClose(selectedDates[0]);

    // if (timeStartSaleInUnix < Date.now()) {
    //   this.timeStartSale = timeStartSaleInUnix;
    //   // startTimerBtn.disabled = false;
    // } else {
    //   alert('Please choose a date in the future');
    // }

  },
};

timer.getTimeToday();
console.log(timer.nowDate);
// console.log(timer.nowDate);
// console.log(timer.nowDate);

// timer.inputDateStartSale()

// inputDate.addEventListener('focus', () => {
//   timer.inputDateStartSale();
// });

// timer.start();

function updateTimerClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
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
