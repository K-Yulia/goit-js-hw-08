import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const form = document.querySelector('.feedback-form');
// const input = document.querySelector('input');
// const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateInput();
// let formObject = {};

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// function onFormInput(evt) {
//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify({
//       email: input.value,
//       message: textarea.value,
//     })
//   );
// }

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInput() {
  const savedFormInput = localStorage.getItem(STORAGE_KEY);
  if (savedFormInput === null) {
    return;
  }
  try {
    formData = JSON.parse(savedFormInput);
    Object.entries(formData).forEach(([name, value]) => {
      form[name].value = value;
    });
  } catch (error) {}
}
// const savedInput = JSON.parse(localStorage.getItem(STORAGE_KEY));

// if (savedInput) {
//   input.value = savedInput.email || '';
//   textarea.value = savedInput.message || '';
// }
// }
