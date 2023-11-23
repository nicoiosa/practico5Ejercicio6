let startTime;
let inputTime;
let timerInterval;
let pausedTime = 0;
let isRunning = false;

function start(e) {
  e.preventDefault();
  if (!isRunning) {
    startTime = new Date().getTime() - pausedTime;
    const inputHour = document.querySelector("#inputHour").value * 3.6e6;
    const inputMin = document.querySelector("#inputMin").value * 60000;
    const inputSeg = document.querySelector("#inputSeg").value * 1000;
    inputTime = inputHour + inputMin + inputSeg;
    if (inputHour === 0 && inputMin === 0 && inputSeg < 1) {
      return;
    }
    timerInterval = setInterval(display, 1);
    formTime.reset();
    btns[0].innerText = "Reanudar";
    formTime.removeEventListener("submit", start);
    btns[0].addEventListener("click", resume);
    isRunning = true;
  }
}

function resume(e) {
  e.preventDefault();
  if (!isRunning) {
    timerInterval = setInterval(display, 1);
    isRunning = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  pausedTime = new Date().getTime() - startTime;
  timerInterval = null;
  isRunning = false;
}

function reset() {
  pause();
  pausedTime = 0;
  const clock = document.querySelector("h5");
  clock.innerHTML = "00 : 00 : 00";
  btns[0].innerText = "Iniciar";
  isRunning = false;
  btns[0].removeEventListener("click", resume);
  formTime.addEventListener("submit", start);
}

function display() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const chronoTime = inputTime - elapsedTime;
  const seg = Math.floor(chronoTime / 1000) % 60;
  const min = Math.floor(chronoTime / 1000 / 60) % 60;
  const hour = Math.floor(chronoTime / 1000 / 60 / 60) % 60;
  const displayTime = zerod(hour) + " : " + zerod(min) + " : " + zerod(seg);
  const clock = document.querySelector("h5");
  clock.innerHTML = displayTime;
  if (chronoTime <= 0) {
    pause();
    pausedTime = 0;
    const clock = document.querySelector("h5");
    clock.innerHTML = "00 : 00 : 00";
    btns[0].innerText = "Iniciar";
    isRunning = false;
    btns[0].removeEventListener("click", resume);
    formTime.addEventListener("submit", start);
  }
}
function zerod(number) {
  return (number < 10 ? "0" : "") + number;
}

const formTime = document.querySelector("#formTime");
formTime.addEventListener("submit", start);
const btns = document.getElementsByTagName("button");
btns[1].addEventListener("click", pause);
btns[2].addEventListener("click", reset);
