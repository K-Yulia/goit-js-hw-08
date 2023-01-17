import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateInput();

function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      email: input.value,
      message: textarea.value,
    })
  );
}

function populateInput() {
  const savedInput = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedInput) {
    input.value = savedInput.email || '';
    textarea.value = savedInput.message || '';
  }
}
