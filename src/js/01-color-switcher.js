const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onClickStartDecorateBgr);

let timerId = null;

function onClickStartDecorateBgr() {
  timerId = setInterval(() => {
    console.log('Start Decorate Bgr');
    let currentBrgColor = getRandomHexColor();
    document.body.style.backgroundColor = currentBrgColor;
  }, 1000);
    startBtn.removeEventListener('click', onClickStartDecorateBgr);
    stopBtn.addEventListener('click', onClickStopDecorateBgr);
}

function onClickStopDecorateBgr() {
    console.log('Stop Decorate Bg');
    clearInterval(timerId);
    startBtn.addEventListener('click', onClickStartDecorateBgr);
    stopBtn.removeEventListener('click', onClickStopDecorateBgr);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
