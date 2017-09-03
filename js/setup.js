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

  var OUTLINE_STYLE = '2px dashed red';

  var SIMILAR_WIZARDS_NUMBER = 4;

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

    node.style.width = 50 + '%';
    node.style.height = 100 + 'px';
    node.style.backgroundColor = 'red';
    node.style.position = 'absolute';
    node.style.zIndex = 10;
    node.style.top = 50 + '%';
    node.style.left = 50 + '%';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.display = 'flex';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';

    node.textContent = message;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccessLoad = function (data) {
    var fragment = document.createDocumentFragment();

    data = window.util.getShuffledArray(data);

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
      }, onError);
    }
  });
})();
