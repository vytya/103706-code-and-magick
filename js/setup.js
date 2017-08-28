'use strict';

(function () {
  // Constants
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

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

  // Skin change
  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');

  var onPopupChangeWizardCoat = function () {
    var coatColor = window.util.getRandomElementFromArray(COAT_COLORS);

    window.util.fillData(setupWizard, '.wizard-coat', 'fill', coatColor);
    window.util.fillHiddenInput('input[name="coat-color"]', coatColor);
  };

  var onPopupChangeWizardEyes = function () {
    var eyeColor = window.util.getRandomElementFromArray(EYES_COLORS);

    window.util.fillData(setupWizard, '.wizard-eyes', 'fill', eyeColor);
    window.util.fillHiddenInput('input[name="eyes-color"]', eyeColor);
  };

  var onPopupChangeFireballColor = function () {
    var fireballColor = window.util.getRandomElementFromArray(FIREBALL_COLORS);

    window.util.fillData(document, '.setup-fireball-wrap', 'background', fireballColor);
    window.util.fillHiddenInput('input[name="fireball-color"]', fireballColor);
  };

  setupWizardCoat.addEventListener('click', onPopupChangeWizardCoat);
  setupWizardEyes.addEventListener('click', onPopupChangeWizardEyes);
  setupFireball.addEventListener('click', onPopupChangeFireballColor);

  // Template
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Render wizard func
  var renderWizard = function (wizard) {
    var wizardClonedTemplate = similarWizardTemplate.cloneNode(true);

    window.util.fillData(wizardClonedTemplate, '.setup-similar-label', 'text', wizard.name);
    window.util.fillData(wizardClonedTemplate, '.wizard-coat', 'fill', wizard.coatColor);
    window.util.fillData(wizardClonedTemplate, '.wizard-eyes', 'fill', wizard.eyesColor);

    return wizardClonedTemplate;
  };

  // Generate 4 wizards from template & constants
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
    var wizard = {
      'name': window.util.getRandomElementFromArray(NAMES) + ' ' + window.util.getRandomElementFromArray(SURNAMES),
      'coatColor': window.util.getRandomElementFromArray(COAT_COLORS),
      'eyesColor': window.util.getRandomElementFromArray(EYES_COLORS)
    };

    fragment.appendChild(renderWizard(wizard));
  }

  // Add fragments to HTML
  similarListElement.appendChild(fragment);

  // Remove .hidden at .setup-similar
  window.util.removeHiddenClass('.setup-similar');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElements = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (event) {
    if (event.target.tagName.toLowerCase() === 'img') {
      var clonedDragElement = event.target.cloneNode(true);

      draggedItem = clonedDragElement;

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
})();
