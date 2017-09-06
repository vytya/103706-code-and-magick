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

  // Skin changes
  var setupWizardCoat = document.querySelector('.wizard-coat');
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball');

  var coatColor;
  var eyesColor;

  var updateWizards = function () {
    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor && it.colorEyes === eyesColor;
    });
    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    window.render(uniqueWizards);
  };

  var onPopupChangeWizardCoat = function () {
    var newColor = window.util.getRandomElementFromArray(COAT_COLORS);

    window.colorizeElement(setupWizardCoat, newColor, window.util.fillElement);
    window.util.fillHiddenInput('input[name="coat-color"]', newColor);
    coatColor = newColor;
    updateWizards();
  };


  var onPopupChangeWizardEyes = function () {
    var newColor = window.util.getRandomElementFromArray(EYES_COLORS);

    window.colorizeElement(setupWizardEyes, newColor, window.util.fillElement);
    window.util.fillHiddenInput('input[name="eyes-color"]', newColor);
    eyesColor = newColor;
    updateWizards();
  };

  var onPopupChangeFireballColor = function () {
    var newColor = window.util.getRandomElementFromArray(FIREBALL_COLORS);

    window.colorizeElement(setupFireball, newColor, window.util.changeElementBackground);
    window.util.fillHiddenInput('input[name="fireball-color"]', newColor);

    updateWizards();
  };

  setupWizardCoat.addEventListener('click', onPopupChangeWizardCoat);
  setupWizardEyes.addEventListener('click', onPopupChangeWizardEyes);
  setupFireball.addEventListener('click', onPopupChangeFireballColor);

  var wizards = [];

  var onSuccessLoad = function (data) {
    wizards = data;
    window.render(wizards);
  };

  window.backend.load(onSuccessLoad, window.backend.onError);
})();
