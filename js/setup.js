'use strict';

var removeHiddenClass = function (hiddenblock) {
  var hiddenBlock = document.querySelector(hiddenblock);

  if (hiddenBlock !== null && hiddenBlock.classList.contains('hidden')) {
    hiddenBlock.classList.remove('hidden');
  }
};

// Random function with min & max from array
var getMinMaxRandomFromArray = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Remove .hidden at .setup
removeHiddenClass('.setup');

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

var COATCOLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYESCOLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Template
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Fill block with data
var fillData = function (clonedNode, selector, type, value) {
  if (type === 'text') {
    clonedNode.querySelector(selector).textContent = value;
  } else {
    clonedNode.querySelector(selector).style.fill = value;
  }
};

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
    'name': NAMES[getMinMaxRandomFromArray(NAMES)] + ' ' + SURNAMES[getMinMaxRandomFromArray(SURNAMES)],
    'coatColor': COATCOLORS[getMinMaxRandomFromArray(COATCOLORS)],
    'eyesColor': EYESCOLORS[getMinMaxRandomFromArray(EYESCOLORS)]
  };

  fragment.appendChild(renderWizard(wizard));
}

// Add fragments to HTML
similarListElement.appendChild(fragment);

// Remove .hidden at .setup-similar
removeHiddenClass('.setup-similar');
