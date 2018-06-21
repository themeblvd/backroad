import '../scss/install.scss';
import axios from 'axios';
import { timeoutPromise } from '../../../../lib/utils/timing';

const endpoint = window.location.pathname;
const form = document.getElementById('register-form');
const fields = ['projectName', 'username', 'password', 'email'];

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (
    !event.target.projectName.value ||
    !event.target.username.value ||
    !event.target.password.value ||
    !event.target.email.value
  ) {
    removeFieldErrors();
    fields.forEach(function(field) {
      if (!event.target[field].value) {
        event.target[field].classList.add('error');
      }
    });
    displayError('Please fill out all fields.');
    return;
  }

  if (event.target.password.value.length < 8) {
    removeFieldErrors();
    event.target.password.classList.add('error');
    displayError('Your password must be at least 8 characters.');
    return;
  }

  document.getElementById('btn-submit').classList.add('loading');

  const data = {
    projectName: event.target.projectName.value,
    username: event.target.username.value,
    password: event.target.password.value,
    email: event.target.email.value
  };

  axios
    .post(endpoint, data)
    .then(response => {
      const notification = document.createElement('div');

      notification.className = 'notification success';

      notification.innerHTML = `
        <p>Successfully installed!</p>
        <div class="circle">
          <div class="checkmark draw"></div>
        </div>
      `;

      form.prepend(notification);

      timeoutPromise(10)
        .then(() => {
          notification.classList.add('show');
          return timeoutPromise(250);
        })
        .then(() => {
          notification.classList.add('apply-check');
          return timeoutPromise(2000);
        })
        .then(() => {
          window.location = response.data.redirect;
        });
    })
    .catch(error => {
      console.log(error.response);
    });
});

function displayError(message) {
  const oldAlert = document.getElementById('form-error');

  if (oldAlert) {
    oldAlert.remove();
  }

  const newAlert = document.createElement('div');

  newAlert.id = 'form-error';
  newAlert.className = 'alert alert-danger';
  newAlert.innerHTML = `<strong>Oops!</strong> ${message}`;

  form.prepend(newAlert);
}

function removeFieldErrors() {
  fields.forEach(function(field) {
    form[field].classList.remove('error');
  });
}
