const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onClickDecorateBgr);
stopBtn.addEventListener('click', onClickDecorateBgr);

let timerId = null;

stopBtn.disabled = true;

function onClickDecorateBgr() {
  let currentBrgColor = getRandomHexColor();
  if (!startBtn.disabled) {
    timerId = setInterval(() => {
      // console.log('Start Decorate Bgr');
      currentBrgColor = getRandomHexColor();
      document.body.style.backgroundColor = currentBrgColor;
    }, 1000);
      startBtn.disabled = true;
      stopBtn.disabled = false;
  } else {
    // console.log('Stop Decorate Bg');
      clearInterval(timerId);
      startBtn.disabled = false;
      stopBtn.disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
