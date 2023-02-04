import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', submitForCreatePromise);
form.addEventListener('change', setOptions);

let delay = null;
let step = null;
let amount = null;

function setOptions() {
  delay = +inputDelay.value;
  step = +inputStep.value;
  amount = +inputAmount.value;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject;
        reject({ position, delay });
      }
    }, delay);
  });
}

function startCraetPromise() {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function submitForCreatePromise(e) {
  e.preventDefault();

  startCraetPromise();
}
