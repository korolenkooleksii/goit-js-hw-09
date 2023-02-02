import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const button = document.querySelector('button[type="submit"]');

form.addEventListener('submit', submitForCreatePromise);
form.addEventListener('change', setOptions);

let delay = null;
let step = null;
let amount = null;
// let position = 1;

function setOptions() {
  console.log('Что-то там выбираем');
  delay = +inputDelay.value;
  step = +inputStep.value;
  amount = +inputAmount.value;
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve('Success!, состояние - fulfilled');
      } else {
        // Reject;
        reject('Error, состояние - rejected');
      }
    }, delay);
  });

  return promise;
  console.log('createPromise  promise', promise);
}

function startCraetPromise() {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(resolve => {
        console.log(resolve);
        console.log('Это успех');
      })
      .catch(reject => {
        console.log(reject);
        console.log('Все пропало');
      });

    // console.log(i);
    // console.log(delay, step, amount);

    delay += step;
  }
}

// const p = createPromise(1, 1000);

// p.then(resolve => {
//   console.log(resolve);
//   console.log('Это успех');
// }).catch(reject => {
//   console.log(reject);
//   console.log('Все пропало');
// });

function submitForCreatePromise(e) {
  e.preventDefault();

  startCraetPromise();

  e.currentTarget.reset();
}
