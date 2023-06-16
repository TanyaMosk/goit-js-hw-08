import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const { email, message } = refs;

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

controlData();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all fields');
  }
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('Відправлені дані:', formData);
// console.log(`Відправлені дані:${JSON.stringify(formData)}`);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);  
}

function onFormInput() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: email.value, message: message.value })
  );
}

function controlData() {
  let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
    // console.log('Збережені дані:', savedData);
  }  
}
