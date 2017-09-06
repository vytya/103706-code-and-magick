'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Render wizard func
  var renderWizard = function (wizard) {
    var wizardClonedTemplate = similarWizardTemplate.cloneNode(true);
    var clonedWizardName = wizardClonedTemplate.querySelector('.setup-similar-label');
    var clonedCoat = wizardClonedTemplate.querySelector('.wizard-coat');
    var clonedEyes = wizardClonedTemplate.querySelector('.wizard-eyes');

    window.util.fillTextData(clonedWizardName, wizard.name);
    window.colorizeElement(clonedCoat, wizard.colorCoat, window.util.fillElement);
    window.colorizeElement(clonedEyes, wizard.colorEyes, window.util.fillElement);

    return wizardClonedTemplate;
  };

  var similarListElement = document.querySelector('.setup-similar-list');

  window.render = function (data) {
    similarListElement.innerHTML = '';

    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > 4 ? 4 : data.length;

    console.log(takeNumber);

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    // Add fragments to HTML
    similarListElement.appendChild(fragment);

    // Remove .hidden at .setup-similar
    window.util.removeHiddenClass('.setup-similar');
  };
})();
