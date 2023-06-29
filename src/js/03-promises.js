import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  formRef: document.querySelector(`.form`),
  btSubmitRef: document.querySelector(`.form button`),
}


ref.formRef.addEventListener(`submit`, (e) => {
  e.preventDefault();
  let delayValue = Number(e.currentTarget.elements.delay.value);
  const stepValue = Number(e.currentTarget.elements.step.value);
  const amountValue = Number(e.currentTarget.elements.amount.value);

  for(let i = 0; i < amountValue; i+=1) {
       
       createPromise(i + 1, delayValue)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
       delayValue += stepValue;
  }

})


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  });
  
}
