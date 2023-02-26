import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  emailInput: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';
//об'єкт в якому ми зберігаємо значення всіх полів
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateInputs();

function onFormSubmit(evt) {
  // скидаємо налаштування по замовчуванню
  evt.preventDefault();

  // Перевірка чи заповнені всі поля форми
  if (refs.textarea.value === '' || refs.emailInput.value === '') {
    return alert('Заповніть всі поля!');
  }

  //скидаємо значення полів
  evt.currentTarget.reset();

  //при сабміті форми очищуємо локал сторідж
  localStorage.removeItem(STORAGE_KEY);

  //при сабміті виводимо у консоль об'єкт з полями email, message
  console.log(formData);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  //значення інпутів у вигляді рядка об'єкта записуємо в локал сторідж
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInputs() {
  const savedMessages = localStorage.getItem(STORAGE_KEY);

  //перевіряємо чи є дані в локал сторідж
  if (savedMessages) {
    const parsedData = JSON.parse(savedMessages);

    // якщо є - оновлюємо DOM
    // робимо додаткову перевірку, якщо заповнене тільки 1 поле
    for (const key in parsedData) {
      if (key === 'message') {
        refs.textarea.value = parsedData.message;
      } else if (key === 'email') {
        refs.emailInput.value = parsedData.email;
      }
    }
  }
  //якщо ні нічого не робимо
}
