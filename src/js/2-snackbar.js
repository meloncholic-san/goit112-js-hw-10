import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stateRadios: document.querySelectorAll('input[name="state"]'),
};


refs.form.addEventListener('submit', createNotificationHandler);
refs.delayInput.min = 0;

function createNotificationHandler(event) {
  event.preventDefault(); 

  const delayValue = refs.delayInput.value;
  const stateValue = Array.from(refs.stateRadios).find((radio) => radio.checked)?.value;


  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (stateValue === 'fulfilled') resolve(delayValue);
        else reject(delayValue);
    }, delayValue);
  });


  promise
    .then((delay) => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });
}
