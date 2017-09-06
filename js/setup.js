'use strict';

(function () {
  var OUTLINE_STYLE = '2px dashed red';

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElements = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (event) {
    if (event.target.tagName.toLowerCase() === 'img') {
      draggedItem = event.target.cloneNode(true);

      event.dataTransfer.setData('text/plain', event.target.alt);

      artifactsElements.style.outline = OUTLINE_STYLE;
    }
  });

  artifactsElements.addEventListener('dragover', function (event) {
    event.preventDefault();

    return false;
  });

  artifactsElements.addEventListener('drop', function (event) {
    event.preventDefault();

    if (event.target.innerHTML === '' && event.target.tagName.toLowerCase() === 'div') {
      event.target.style.backgroundColor = '';
      artifactsElements.style.outline = '';

      event.target.appendChild(draggedItem);
    }
  });

  artifactsElements.addEventListener('dragenter', function (event) {
    event.preventDefault();

    if (event.target.innerHTML === '' && event.target.tagName.toLowerCase() === 'div') {
      event.target.style.backgroundColor = 'yellow';
      artifactsElements.style.outline = OUTLINE_STYLE;
    }
  });

  artifactsElements.addEventListener('dragleave', function (event) {
    event.preventDefault();

    event.target.style.backgroundColor = '';
  });

  var form = document.querySelector('.setup-wizard-form');
  var userDialog = document.querySelector('.setup');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
      window.backend.save(new FormData(form), function () {
        userDialog.classList.add('hidden');
      }, window.backend.onError);
    }
  });
})();
