import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const button = document.querySelector('button[type="submit"]');

form.addEventListener('submit', submitCreatePromise);
form.addEventListener('change', setOutput);

let delay = null;
let step = null;
let amount = null;
let position = 1;

function setOutput() {
  console.log('Что-то там выбираем');
  delay = inputDelay.value;
  console.log('setOutput  delay', delay);

  console.log(inputDelay.value);
  console.log(inputStep.value);
  console.log(inputAmount.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
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
}

const p = createPromise(1, 1000);

p.then(resolve => {
  console.log(resolve);
  console.log('Это успех');
}).catch(reject => {
  console.log(reject);
  console.log('Все пропало');
});

// console.dir(p);

function submitCreatePromise(e) {
  e.prevenDefault();

  const timerId = setTimeout(createPromise, delay);

  e.currentTarget.reset();
}
