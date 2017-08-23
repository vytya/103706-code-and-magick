'use strict';

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

var KEY_CODES = {
  escape: 27,
  enter: 13
};

// Check for hidden class is on block & remove it form block if it exist
var removeHiddenClass = function (hiddenblock) {
  var hiddenBlock = document.querySelector(hiddenblock);

  if (hiddenBlock !== null && hiddenBlock.classList.contains('hidden')) {
    hiddenBlock.classList.remove('hidden');
  }
};

// Random function with min & max from array
var getRandomElementFromArray = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);

  return array[randomElement];
};

// Fill block with data
var fillData = function (clonedNode, selector, type, value) {
  if (type === 'text') {
    clonedNode.querySelector(selector).textContent = value;
  } else if (type === 'fill') {
    clonedNode.querySelector(selector).style.fill = value;
  } else {
    throw new Error('parameter "fill" must be equal to "text" or "fill"');
  }
};

// Open / hide setup
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupSubmit = document.querySelector('.setup-submit');
var setup = document.querySelector('.setup');

var onPopupEscPress = function (event) {
  if (event.keyCode === KEY_CODES.escape) {
    setup.classList.add('hidden');
  }
};

var onPopupEnterPress = function (event) {
  if (event.keyCode === KEY_CODES.enter) {
    if (setup.classList.contains('hidden')) {
      setup.classList.remove('hidden');
    } else {
      setup.classList.add('hidden');
    }
  }
};

// Open
var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', onPopupEnterPress);

// Close
var closePopup = function () {
  setup.classList.add('hidden');
};

setupClose.addEventListener('click', closePopup);
setupClose.addEventListener('keydown', onPopupEnterPress);

setupSubmit.addEventListener('click', closePopup);
setupSubmit.addEventListener('keydown', onPopupEnterPress);

// Skin change
var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes')

var onPopupChangeWizardCoat = function () {
  fillData(setupWizard, '.wizard-coat', 'fill', getRandomElementFromArray(COAT_COLORS));
};

setupWizardCoat.addEventListener('click', onPopupChangeWizardCoat);

var onPopupChangeWizardEyes = function () {
  fillData(setupWizard, '.wizard-eyes', 'fill', getRandomElementFromArray(EYES_COLORS));
};

setupWizardEyes.addEventListener('click', onPopupChangeWizardEyes);

// Template
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Render wizard func
var renderWizard = function (wizard) {
  var wizardClonedTemplate = similarWizardTemplate.cloneNode(true);

  fillData(wizardClonedTemplate, '.setup-similar-label', 'text', wizard.name);
  fillData(wizardClonedTemplate, '.wizard-coat', 'fill', wizard.coatColor);
  fillData(wizardClonedTemplate, '.wizard-eyes', 'fill', wizard.eyesColor);

  return wizardClonedTemplate;
};

// Generate 4 wizards from template & constants
var fragment = document.createDocumentFragment();

for (var i = 0; i < 4; i++) {
  var wizard = {
    'name': getRandomElementFromArray(NAMES) + ' ' + getRandomElementFromArray(SURNAMES),
    'coatColor': getRandomElementFromArray(COAT_COLORS),
    'eyesColor': getRandomElementFromArray(EYES_COLORS)
  };

  fragment.appendChild(renderWizard(wizard));
}

// Add fragments to HTML
similarListElement.appendChild(fragment);

// Remove .hidden at .setup-similar
removeHiddenClass('.setup-similar');
