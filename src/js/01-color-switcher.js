
let timerId = null;

const refs = {
    startButton: document.querySelector(`[data-start]`),
    stopButton: document.querySelector(`[data-stop]`),
    body: document.querySelector(`body`),
}



refs.startButton.addEventListener(`click`, () => {
    refs.startButton.setAttribute(`disabled`, '');
    timerId = setInterval(() => {
        refs.body.setAttribute(`style`, `background-color:${getRandomHexColor()}`);
        console.log(timerId);
     }, 1000)
    });


refs.stopButton.addEventListener(`click`, () => {
    if(timerId) {
        clearInterval(timerId);
        refs.startButton.removeAttribute(`disabled`);
    }
})    















function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

