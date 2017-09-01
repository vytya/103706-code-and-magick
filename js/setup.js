'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var SIMILAR_WIZARDS_NUMBER = 4;

  var OUTLINE_STYLE = '2px dashed red';

  // Skin changes
  var setupWizardCoat = document.querySelector('.wizard-coat');
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball');

  var onPopupChangeWizardCoat = function () {
    var coatColor = window.util.getRandomElementFromArray(COAT_COLORS);

    window.colorizeElement(setupWizardCoat, coatColor, window.util.fillElement);
    window.util.fillHiddenInput('input[name="coat-color"]', coatColor);
  };

  var onPopupChangeWizardEyes = function () {
    var eyesColor = window.util.getRandomElementFromArray(EYES_COLORS);

    window.colorizeElement(setupWizardEyes, eyesColor, window.util.fillElement);
    window.util.fillHiddenInput('input[name="eyes-color"]', eyesColor);
  };

  var onPopupChangeFireballColor = function () {
    var fireballColor = window.util.getRandomElementFromArray(FIREBALL_COLORS);

    window.colorizeElement(setupFireball, fireballColor, window.util.changeElementBackground);
    window.util.fillHiddenInput('input[name="fireball-color"]', fireballColor);
  };

  setupWizardCoat.addEventListener('click', onPopupChangeWizardCoat);
  setupWizardEyes.addEventListener('click', onPopupChangeWizardEyes);
  setupFireball.addEventListener('click', onPopupChangeFireballColor);

  // Template
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Render wizard func
  var renderWizard = function (data) {
    var wizardClonedTemplate = similarWizardTemplate.cloneNode(true);
    var clonedWizardName = wizardClonedTemplate.querySelector('.setup-similar-label');
    var clonedCoat = wizardClonedTemplate.querySelector('.wizard-coat');
    var clonedEyes = wizardClonedTemplate.querySelector('.wizard-eyes');

    window.util.fillTextData(clonedWizardName, data.name);
    window.colorizeElement(clonedCoat, data.colorCoat, window.util.fillElement);
    window.colorizeElement(clonedEyes, data.colorEyes, window.util.fillElement);

    return wizardClonedTemplate;
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.style = 'width: 50%; height: 100px; background-color: red; position: absolute; z-index: 10; top: 50%; left: 50%; transform: translate(-50%,-50%); display: flex; align-items: center; justify-content: center;';
    node.textContent = message;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccessLoad = function (data) {
    // Generate 4 wizards from template & constants
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    // Add fragments to HTML
    similarListElement.appendChild(fragment);
  };

  window.backend.load(onSuccessLoad, onError);

  // Remove .hidden at .setup-similar
  window.util.removeHiddenClass('.setup-similar');

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
    if (event.target.innerHTML === '' && event.target.tagName.toLowerCase() === 'div') {
      event.target.style.backgroundColor = '';
      artifactsElements.style.outline = '';

      event.target.appendChild(draggedItem);
    }

    event.preventDefault();
  });

  artifactsElements.addEventListener('dragenter', function (event) {
    if (event.target.innerHTML === '' && event.target.tagName.toLowerCase() === 'div') {
      event.target.style.backgroundColor = 'yellow';
      artifactsElements.style.outline = OUTLINE_STYLE;
    }

    event.preventDefault();
  });

  artifactsElements.addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';

    event.preventDefault();
  });

  var form = document.querySelector('.setup-wizard-form');
  var userDialog = document.querySelector('.setup');

  form.addEventListener('submit', function (event) {
    var formData = new FormData(form);
    var data = {};

    for (var [key, value] of formData.entries()) {
      data[key] = value;
    }

    window.backend.save(data, function () {
      userDialog.classList.add('hidden');
    }, onError);

    event.preventDefault();
  });
})();
